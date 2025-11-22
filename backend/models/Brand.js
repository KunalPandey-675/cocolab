import mongoose from 'mongoose';

const brandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'brand'
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  industry: String,
  location: String,
  credits: {
    type: Number,
    default: 10
  },
  unlockedCreators: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Creator'
  }]
}, {
  timestamps: true
});

export default mongoose.model('Brand', brandSchema);
