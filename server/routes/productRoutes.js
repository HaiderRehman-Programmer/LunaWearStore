import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductReviews,
  addProductReview
} from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Nested reviews endpoints
router.get('/:id/reviews', getProductReviews);
router.post('/:id/reviews', addProductReview);

export default router;
