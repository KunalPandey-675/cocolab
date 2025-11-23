import mongoose from 'mongoose';

const platformSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ['instagram', 'youtube', 'tiktok'],
    required: true
  },
  handle: String,
  followers: Number,
  avgViews: Number,
  engagementRate: Number
});

const creatorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'creator'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  phone: String,
  niche: [String],
  location: String,
  bio: String,
  instagramLink: String,
  youtubeLink: String,
  platforms: [platformSchema],
  audience: {
    topCountry: String,
    ageBrackets: {
      type: Map,
      of: Number
    },
    genderSplit: {
      male: Number,
      female: Number
    }
  },
  tier: {
    type: String,
    enum: ['Rising', 'Growth', 'Established'],
    default: 'Rising'
  },
  isBoosted: {
    type: Boolean,
    default: false
  },
  profileViews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Creator', creatorSchema);
