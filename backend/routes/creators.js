import express from 'express';
import Creator from '../models/Creator.js';
import ProfileView from '../models/ProfileView.js';

const router = express.Router();

// Get all creators with filters
router.get('/', async (req, res) => {
  try {
    const {
      platform,
      niche,
      minFollowers,
      maxFollowers,
      minEngagement,
      location
    } = req.query;

    let query = {};

    if (niche) {
      query.niche = new RegExp(niche, 'i');
    }

    if (location) {
      query.location = new RegExp(location, 'i');
    }

    if (platform) {
      query['platforms.name'] = platform;
    }

    if (minFollowers || maxFollowers) {
      query['platforms.followers'] = {};
      if (minFollowers) query['platforms.followers'].$gte = parseInt(minFollowers);
      if (maxFollowers) query['platforms.followers'].$lte = parseInt(maxFollowers);
    }

    if (minEngagement) {
      query['platforms.engagementRate'] = { $gte: parseFloat(minEngagement) };
    }

    const creators = await Creator.find(query).sort({ isBoosted: -1, profileViews: -1 });

    res.json(creators);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single creator by ID
router.get('/:id', async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.id);
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found' });
    }
    res.json(creator);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add testimonial to creator
router.post('/:id/testimonial', async (req, res) => {
  try {
    const { brandId, brandName, rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    const creator = await Creator.findById(req.params.id);
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    creator.testimonials.push({
      brandId,
      brandName,
      rating,
      comment
    });

    // Update average rating
    creator.updateAverageRating();
    await creator.save();

    res.json({
      message: 'Testimonial added successfully',
      averageRating: creator.averageRating,
      testimonials: creator.testimonials
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get creator testimonials
router.get('/:id/testimonials', async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.id).select('testimonials averageRating');
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    res.json({
      testimonials: creator.testimonials,
      averageRating: creator.averageRating,
      totalTestimonials: creator.testimonials.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Add portfolio item
router.post('/:id/portfolio', async (req, res) => {
  try {
    const { title, description, imageUrl, brandName, results, campaignType, date } = req.body;

    const creator = await Creator.findById(req.params.id);
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    creator.portfolio.push({
      title,
      description,
      imageUrl,
      brandName,
      results,
      campaignType,
      date
    });

    await creator.save();

    res.json({
      message: 'Portfolio item added successfully',
      portfolio: creator.portfolio
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get creator portfolio
router.get('/:id/portfolio', async (req, res) => {
  try {
    const creator = await Creator.findById(req.params.id).select('portfolio');
    if (!creator) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    res.json({
      portfolio: creator.portfolio,
      totalItems: creator.portfolio.length
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update creator skills
router.put('/:id/skills', async (req, res) => {
  try {
    const { skills } = req.body;

    if (!Array.isArray(skills)) {
      return res.status(400).json({ message: 'Skills must be an array' });
    }

    const creator = await Creator.findByIdAndUpdate(
      req.params.id,
      { skills },
      { new: true }
    ).select('skills');

    res.json({
      message: 'Skills updated successfully',
      skills: creator.skills
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update creator rate
router.put('/:id/rate', async (req, res) => {
  try {
    const { rate } = req.body;

    if (typeof rate !== 'number' || rate < 0) {
      return res.status(400).json({ message: 'Invalid rate value' });
    }

    const creator = await Creator.findByIdAndUpdate(
      req.params.id,
      { rate },
      { new: true }
    ).select('rate');

    res.json({
      message: 'Rate updated successfully',
      rate: creator.rate
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Verify creator (admin action)
router.post('/:id/verify', async (req, res) => {
  try {
    const creator = await Creator.findByIdAndUpdate(
      req.params.id,
      { isVerified: true },
      { new: true }
    ).select('isVerified name');

    res.json({
      message: 'Creator verified successfully',
      creator
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Log profile view
router.post('/:id/view', async (req, res) => {
  try {
    const { brandId } = req.body;
    const creatorId = req.params.id;

    const profileView = new ProfileView({
      brandId,
      creatorId
    });
    await profileView.save();

    await Creator.findByIdAndUpdate(creatorId, {
      $inc: { profileViews: 1 }
    });

    res.json({ message: 'Profile view logged' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Boost creator profile
router.post('/:id/boost', async (req, res) => {
  try {
    const creator = await Creator.findByIdAndUpdate(
      req.params.id,
      { isBoosted: true },
      { new: true }
    );

    if (!creator) {
      return res.status(404).json({ message: 'Creator not found' });
    }

    res.json({ message: 'Profile boosted successfully', creator });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get profile views for a creator
router.get('/:id/views', async (req, res) => {
  try {
    const views = await ProfileView.find({ creatorId: req.params.id })
      .populate('brandId', 'name industry')
      .sort({ viewedAt: -1 })
      .limit(10);

    const totalViews = await ProfileView.countDocuments({ creatorId: req.params.id });

    // Views in last 7 days
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentViews = await ProfileView.countDocuments({
      creatorId: req.params.id,
      viewedAt: { $gte: sevenDaysAgo }
    });

    res.json({
      totalViews,
      recentViews,
      viewHistory: views
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
