import express from 'express';
import Brand from '../models/Brand.js';
import ContactUnlock from '../models/ContactUnlock.js';
import Creator from '../models/Creator.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Get brand by ID
router.get('/:id', async (req, res) => {
  try {
    const brand = await Brand.findById(req.params.id)
      .populate('unlockedCreators', 'name niche platforms');

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.json(brand);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// NLP Search - AI-powered creator discovery
router.post('/:brandId/nlp-search', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query) {
      return res.status(400).json({ message: 'Search query is required' });
    }

    // Fetch all creators for context
    const allCreators = await Creator.find().lean();

    if (allCreators.length === 0) {
      return res.json({ creators: [], message: 'No creators available' });
    }

    // Use Gemini to understand the query and find matching creators
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

    const creatorsContext = allCreators.map(c => ({
      id: c._id,
      name: c.name,
      niche: c.niche,
      platforms: c.platforms?.map(p => ({ name: p.name, followers: p.followers })),
      location: c.location,
      tier: c.tier,
      averageRating: c.averageRating,
      skills: c.skills || [],
      rate: c.rate,
      bio: c.bio
    }));

    const prompt = `
You are an AI assistant helping match brands with creators. 
A brand is searching for creators with this requirement: "${query}"

Here are all available creators:
${JSON.stringify(creatorsContext, null, 2)}

Based on the brand's natural language query, analyze which creators would be the best matches. 
Consider factors like niche, platforms, location, skills, ratings, and collaboration history.

Return a JSON response with:
{
  "reasoning": "brief explanation of your matching logic",
  "matchedCreatorIds": ["id1", "id2", "id3"],
  "scores": { "id1": 0.95, "id2": 0.87, "id3": 0.78 },
  "recommendations": "brief recommendations for the brand"
}

Only return valid JSON, no additional text.
    `;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    // Parse the JSON response
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(responseText);
    } catch (parseError) {
      // Try to extract JSON from the response
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('Could not parse Gemini response');
      }
    }

    // Fetch the full creator details for matched creators
    const matchedCreators = await Promise.all(
      parsedResponse.matchedCreatorIds.map(id => Creator.findById(id))
    );

    // Filter out null results and sort by score
    const sortedCreators = matchedCreators
      .filter(c => c !== null)
      .map(c => ({
        ...c.toObject(),
        matchScore: parsedResponse.scores[c._id.toString()] || 0
      }))
      .sort((a, b) => b.matchScore - a.matchScore);

    res.json({
      creators: sortedCreators,
      reasoning: parsedResponse.reasoning,
      recommendations: parsedResponse.recommendations,
      query
    });
  } catch (error) {
    console.error('NLP Search error:', error);
    res.status(500).json({
      message: 'Error processing natural language search',
      error: error.message
    });
  }
});

// Unlock creator contact
router.post('/:brandId/unlock/:creatorId', async (req, res) => {
  try {
    const { brandId, creatorId } = req.params;

    const brand = await Brand.findById(brandId);
    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    if (brand.credits < 1) {
      return res.status(400).json({ message: 'Insufficient credits' });
    }

    // Check if already unlocked
    if (brand.unlockedCreators.includes(creatorId)) {
      return res.status(400).json({ message: 'Creator already unlocked' });
    }

    // Deduct credit and add to unlocked creators
    brand.credits -= 1;
    brand.unlockedCreators.push(creatorId);
    await brand.save();

    // Create unlock record
    const unlock = new ContactUnlock({
      brandId,
      creatorId
    });
    await unlock.save();

    res.json({
      message: 'Contact unlocked successfully',
      credits: brand.credits,
      unlockedCreators: brand.unlockedCreators
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
