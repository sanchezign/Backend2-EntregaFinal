import { Router } from 'express';
import passport from 'passport';
import { authorization } from '../middlewares/authorization.js';
import ProductManager from '../managers/ProductManager.js';

const router = Router();
const productManager = ProductManager.getInstance();

// Solo admin puede crear, actualizar y eliminar productos
router.post('/', passport.authenticate('current', { session: false }), authorization('admin'), async (req, res) => {
  try {
    const product = await productManager.create(req.body);
    res.status(201).json({ status: 'success', payload: product });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.put('/:pid', passport.authenticate('current', { session: false }), authorization('admin'), async (req, res) => {
  try {
    const updated = await productManager.update(req.params.pid, req.body);
    res.json({ status: 'success', payload: updated });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

router.delete('/:pid', passport.authenticate('current', { session: false }), authorization('admin'), async (req, res) => {
  try {
    await productManager.delete(req.params.pid);
    res.json({ status: 'success', message: 'Producto eliminado' });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

// Ruta pública para listar productos
router.get('/', async (req, res) => {
  try {
    const products = await productManager.getProducts(req.query);
    res.json({ status: 'success', payload: products });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
