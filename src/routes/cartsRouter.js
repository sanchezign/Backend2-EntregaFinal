import { Router } from 'express';
import passport from 'passport';
import { authorization } from '../middlewares/authorization.js';
import CartManager from '../managers/CartManager.js';

const router = Router();
const cartManager = CartManager.getInstance();

// Crear carrito vacío (público)
router.post('/', async (req, res) => {
  try {
    const newCart = await cartManager.create();
    res.status(201).json({
      status: 'success',
      message: 'Carrito creado',
      payload: newCart
    });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Agregar producto al carrito (solo usuarios logueados)
router.post('/:cid/product/:pid', passport.authenticate('current', { session: false }), authorization('user'), async (req, res) => {
  try {
    const quantity = req.body.quantity || 1;
    const updatedCart = await cartManager.addProduct(req.params.cid, req.params.pid, quantity);
    res.json({
      status: 'success',
      message: 'Producto agregado al carrito',
      payload: updatedCart
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

// Eliminar producto del carrito (solo usuarios logueados)
router.delete('/:cid/product/:pid', passport.authenticate('current', { session: false }), authorization('user'), async (req, res) => {
  try {
    const updatedCart = await cartManager.removeProduct(req.params.cid, req.params.pid);
    res.json({
      status: 'success',
      message: 'Producto eliminado del carrito',
      payload: updatedCart
    });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message });
  }
});

// Ver detalle de carrito
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartManager.getById(req.params.cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
