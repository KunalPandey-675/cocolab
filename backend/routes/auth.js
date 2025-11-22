import express from 'express';
import Creator from '../models/Creator.js';
import Brand from '../models/Brand.js';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { role, name, email, password, ...otherData } = req.body;

    if (role === 'creator') {
      const existingCreator = await Creator.findOne({ email });
      if (existingCreator) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const creator = new Creator({
        name,
        email,
        password,
        ...otherData
      });
      await creator.save();

      return res.status(201).json({
        message: 'Creator account created successfully',
        user: {
          id: creator._id,
          name: creator.name,
          email: creator.email,
          role: 'creator'
        }
      });
    } else if (role === 'brand') {
      const existingBrand = await Brand.findOne({ email });
      if (existingBrand) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      const brand = new Brand({
        name,
        email,
        password,
        credits: 10,
        ...otherData
      });
      await brand.save();

      return res.status(201).json({
        message: 'Brand account created successfully',
        user: {
          id: brand._id,
          name: brand.name,
          email: brand.email,
          role: 'brand',
          credits: brand.credits
        }
      });
    }

    return res.status(400).json({ message: 'Invalid role' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { role, email, password } = req.body;

    if (role === 'creator') {
      const creator = await Creator.findOne({ email });
      if (!creator || creator.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.json({
        message: 'Login successful',
        user: {
          id: creator._id,
          name: creator.name,
          email: creator.email,
          role: 'creator',
          niche: creator.niche,
          profileViews: creator.profileViews
        }
      });
    } else if (role === 'brand') {
      const brand = await Brand.findOne({ email });
      if (!brand || brand.password !== password) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      return res.json({
        message: 'Login successful',
        user: {
          id: brand._id,
          name: brand.name,
          email: brand.email,
          role: 'brand',
          credits: brand.credits,
          industry: brand.industry
        }
      });
    }

    return res.status(400).json({ message: 'Invalid role' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
