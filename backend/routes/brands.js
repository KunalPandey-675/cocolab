import express from 'express';
import Brand from '../models/Brand.js';
import ContactUnlock from '../models/ContactUnlock.js';

const router = express.Router();

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
