import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import Creator from '../models/Creator.js';
import Brand from '../models/Brand.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Creator.deleteMany({});
    await Brand.deleteMany({});
    console.log('Cleared existing data');

    // Read seed data
    const creatorsData = JSON.parse(
      fs.readFileSync(join(__dirname, 'creators.json'), 'utf-8')
    );
    const brandsData = JSON.parse(
      fs.readFileSync(join(__dirname, 'brands.json'), 'utf-8')
    );

    // Insert data
    await Creator.insertMany(creatorsData);
    console.log('✅ Inserted creators');

    await Brand.insertMany(brandsData);
    console.log('✅ Inserted brands');

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
