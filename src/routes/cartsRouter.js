import { Router } from 'express';
import passport from 'passport';
import { authorization } from '../middlewares/authorization.js';
import cartController from '../controllers/CartController.js';

const router = Router();

// GET /api/carts - Lista todos los carritos (solo admin)
router.get('/', passport.authenticate('current', { session: false }), authorization('admin'), async (req, res) => {
  try {
    const carts = await cartController.getAll();
    res.json({ status: 'success', payload: carts });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message || 'Error al obtener carritos' });
  }
});

// POST /api/carts - Crea un carrito vacío
router.post('/', async (req, res) => {
  try {
    const newCart = await cartController.create();
    res.status(201).json({ status: 'success', message: 'Carrito creado exitosamente', payload: newCart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message || 'Error al crear carrito' });
  }
});

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
  try {
    const cart = await cartController.getById(req.params.cid);
    if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
    res.json({ status: 'success', payload: cart });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message || 'Error al obtener carrito' });
  }
});

// POST /api/carts/:cid/product/:pid
router.post('/:cid/product/:pid', passport.authenticate('current', { session: false }), authorization('user'), async (req, res) => {
  try {
    const quantity = req.body.quantity || 1;
    const updatedCart = await cartController.addProduct(req.params.cid, req.params.pid, quantity);
    res.json({ status: 'success', message: 'Producto agregado al carrito', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message || 'Error al agregar producto' });
  }
});

// DELETE /api/carts/:cid/product/:pid
router.delete('/:cid/product/:pid', passport.authenticate('current', { session: false }), authorization('user'), async (req, res) => {
  try {
    const updatedCart = await cartController.removeProduct(req.params.cid, req.params.pid);
    res.json({ status: 'success', message: 'Producto eliminado del carrito', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message || 'Error al eliminar producto' });
  }
});

// PUT /api/carts/:cid
router.put('/:cid', passport.authenticate('current', { session: false }), authorization('user'), async (req, res) => {
  try {
    const updatedCart = await cartController.updateProducts(req.params.cid, req.body.products);
    res.json({ status: 'success', message: 'Carrito actualizado', payload: updatedCart });
  } catch (error) {
    res.status(400).json({ status: 'error', message: error.message || 'Error al actualizar carrito' });
  }
});

export default router;