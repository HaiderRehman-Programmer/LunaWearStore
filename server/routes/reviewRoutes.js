import express from 'express';
import { getReviewsByProduct, addReview } from '../services/storeService.js';

const router = express.Router();

router.get('/:productId', async (req, res) => {
  try {
    const reviews = await getReviewsByProduct(req.params.productId);
    res.json({ success: true, count: reviews.length, reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/:productId', async (req, res) => {
  try {
    const { author, rating, title, comment, fitFeedback } = req.body;
    if (!author || !rating || !comment) {
      return res.status(400).json({ success: false, message: 'Please provide author name, rating, and review comments' });
    }
    const review = await addReview({
      productId: req.params.productId,
      author,
      rating: Number(rating),
      title: title || 'Verified Customer Review',
      comment,
      fitFeedback: fitFeedback || 'True to Size'
    });
    res.status(201).json({ success: true, review });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

export default router;
