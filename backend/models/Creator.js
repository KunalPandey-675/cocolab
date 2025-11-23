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

const testimonialSchema = new mongoose.Schema({
  brandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  },
  brandName: String,
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const portfolioItemSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  brandName: String,
  results: String,
  campaignType: String,
  date: Date
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
  isVerified: {
    type: Boolean,
    default: false
  },
  profileViews: {
    type: Number,
    default: 0
  },
  // New fields for enhanced features
  rate: {
    type: Number,
    description: 'Rate per collaboration (in USD or preferred currency)'
  },
  skills: [String],
  portfolio: [portfolioItemSchema],
  testimonials: [testimonialSchema],
  collaborationHistory: [{
    brandName: String,
    date: Date,
    type: String,
    outcome: String
  }],
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  totalCollaborations: {
    type: Number,
    default: 0
  },
  website: String,
  twitterHandle: String,
  linkedinHandle: String
}, {
  timestamps: true
});

// Calculate average rating when testimonials change
creatorSchema.methods.updateAverageRating = function () {
  if (this.testimonials.length === 0) {
    this.averageRating = 0;
  } else {
    const sum = this.testimonials.reduce((acc, t) => acc + (t.rating || 0), 0);
    this.averageRating = sum / this.testimonials.length;
  }
};

export default mongoose.model('Creator', creatorSchema);
