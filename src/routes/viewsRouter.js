// src/routes/viewsRouter.js
import { Router } from 'express';
import productController from '../controllers/ProductController.js';

const router = Router();

// Home
router.get('/', async (req, res) => {
  res.render('home', {
    title: 'Proyecto con MongoDB, carritos, paginación y vistas Handlebars',
    user: req.user || null
  });
});

// Lista de productos (pública)
router.get('/products', async (req, res) => {
  try {
    const result = await productController.getProducts(req.query);

    // Links de paginación
    const queryParams = new URLSearchParams(req.query);

    const prevLink = result.hasPrevPage
      ? `/products?${new URLSearchParams({
          ...Object.fromEntries(queryParams),
          page: result.prevPage.toString(),
        }).toString()}`
      : null;

    const nextLink = result.hasNextPage
      ? `/products?${new URLSearchParams({
          ...Object.fromEntries(queryParams),
          page: result.nextPage.toString(),
        }).toString()}`
      : null;

    res.render('products', {
      docs:          result.docs          || [],
      page:          result.page          || 1,
      totalPages:    result.totalPages    || 1,
      hasPrevPage:   result.hasPrevPage   || false,
      hasNextPage:   result.hasNextPage   || false,
      prevLink,
      nextLink,
      query:         (req.query.query || '').trim(),
      sort:          req.query.sort === 'desc' ? 'desc' : 'asc',
      user:          req.user || null,
      cartId:        req.user?.cart || null,
      isAdmin:       req.user?.role === 'admin' || false,
      debugInfo: {
        totalDocs: result.totalDocs ?? 'no disponible',
        filterApplied: !!Object.keys(result.filter || {}).length,
        limitApplied: req.query.limit || 50,
      }
    });

  } catch (error) {
    console.error('[GET /products] Error:', error.message, error.stack);
    res.status(500).render('error', {
      message: 'Error al cargar los productos. Intenta nuevamente más tarde.'
    });
  }
});

export default router;