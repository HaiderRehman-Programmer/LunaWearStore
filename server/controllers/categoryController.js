import Category from '../models/Category.js';
import { getMongoStatus } from '../config/db.js';
import { successResponse, errorResponse } from '../utils/formatResponse.js';

let defaultCategories = [
  { _id: 'cat-1', id: 'cat-1', name: 'Women', slug: 'women', description: 'Contemporary designs for women', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80', featured: true },
  { _id: 'cat-2', id: 'cat-2', name: 'Men', slug: 'men', description: 'Tailored essentials for men', image: 'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80', featured: true },
  { _id: 'cat-3', id: 'cat-3', name: 'Outerwear', slug: 'outerwear', description: 'Structured coats & jackets', image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80', featured: true },
  { _id: 'cat-4', id: 'cat-4', name: 'Dresses', slug: 'dresses', description: 'Silk & fluid silhouettes', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80', featured: true },
  { _id: 'cat-5', id: 'cat-5', name: 'Tops', slug: 'tops', description: 'Organic cotton & luxury shirts', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=600&q=80', featured: false },
  { _id: 'cat-6', id: 'cat-6', name: 'Denim', slug: 'denim', description: 'Selvedge & raw premium denim', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=600&q=80', featured: true },
  { _id: 'cat-7', id: 'cat-7', name: 'Activewear', slug: 'activewear', description: 'Performance & lounge wear', image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80', featured: false },
  { _id: 'cat-8', id: 'cat-8', name: 'Accessories', slug: 'accessories', description: 'Belts, bags & scarves', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80', featured: false }
];

export const getCategories = async (req, res) => {
  try {
    if (getMongoStatus()) {
      try {
        const categories = await Category.find().sort({ displayOrder: 1, name: 1 });
        if (categories && categories.length > 0) {
          return successResponse(res, categories);
        }
      } catch (e) {
        // Fall through
      }
    }
    return successResponse(res, defaultCategories);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    if (getMongoStatus()) {
      try {
        const cat = await Category.findOne({ $or: [{ _id: id }, { slug: id }] });
        if (cat) return successResponse(res, cat);
      } catch (e) {
        // Fall through
      }
    }

    const cat = defaultCategories.find(c => c._id === id || c.id === id || c.slug === id);
    if (!cat) return errorResponse(res, 'Category not found', 404);
    return successResponse(res, cat);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, slug, description, image, gender, featured } = req.body;
    if (!name) return errorResponse(res, 'Category name is required', 400);

    const newCat = {
      _id: `cat-${Date.now()}`,
      id: `cat-${Date.now()}`,
      name,
      slug: slug || name.toLowerCase().replace(/\s+/g, '-'),
      description: description || '',
      image: image || '',
      gender: gender || 'All',
      featured: Boolean(featured)
    };

    if (getMongoStatus()) {
      try {
        const created = await Category.create(newCat);
        defaultCategories.push(created);
        return successResponse(res, created, 'Category created', 201);
      } catch (e) {
        // Fall through
      }
    }

    defaultCategories.push(newCat);
    return successResponse(res, newCat, 'Category created', 201);
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (getMongoStatus()) {
      try {
        const updated = await Category.findByIdAndUpdate(id, updates, { new: true });
        if (updated) return successResponse(res, updated, 'Category updated');
      } catch (e) {
        // Fall through
      }
    }

    const idx = defaultCategories.findIndex(c => c._id === id || c.id === id);
    if (idx === -1) return errorResponse(res, 'Category not found', 404);

    defaultCategories[idx] = { ...defaultCategories[idx], ...updates };
    return successResponse(res, defaultCategories[idx], 'Category updated');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    if (getMongoStatus()) {
      try {
        await Category.findByIdAndDelete(id);
      } catch (e) {
        // Fall through
      }
    }

    defaultCategories = defaultCategories.filter(c => c._id !== id && c.id !== id);
    return successResponse(res, { id }, 'Category deleted');
  } catch (err) {
    return errorResponse(res, err.message, 500);
  }
};
