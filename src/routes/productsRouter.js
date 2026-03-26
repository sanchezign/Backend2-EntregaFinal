import { Router } from 'express';
import passport from 'passport';
import { authorization } from '../middlewares/authorization.js';
import productController from '../controllers/ProductController.js';

const router = Router();

// Solo admin puede crear, actualizar y eliminar productos
router.post('/', passport.authenticate('current', { session: false }), authorization('admin'), async (req, res) => {
  try {
    const product = await productController.create(req.body);
    res.status(201).json({ status: 'success', payload: product });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.put('/:pid', passport.authenticate('current', { session: false }), authorization('admin'), async (req, res) => {
  try {
    const updated = await productController.update(req.params.pid, req.body);
    res.json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/:pid', passport.authenticate('current', { session: false }), authorization('admin'), async (req, res) => {
  try {
    await productController.delete(req.params.pid);
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

// Ruta pública
router.get('/', async (req, res) => {
  try {
    const products = await productController.getProducts(req.query);
    res.json({ status: 'success', payload: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;