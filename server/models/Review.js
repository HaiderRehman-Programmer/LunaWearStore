import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: { type: String, required: true },
  author: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String, required: true },
  fitFeedback: { type: String, enum: ['Runs Small', 'True to Size', 'Runs Large'], default: 'True to Size' },
  verifiedBuyer: { type: Boolean, default: true },
  helpfulVotes: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);
export default Review;
