import Cart from '../models/Cart.js';

class CartDao {
    async getAll() {
        return await Cart.find().populate('products.product').lean();
    }

    async create() {
        const newCart = new Cart({ products: [] });
        return await newCart.save();
    }

    async getById(id) {
        return await Cart.findById(id).populate('products.product').lean();
    }

    async addProduct(cid, pid, quantity = 1) {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Carrito no encontrado');

        const existingProduct = cart.products.find(p => p.product.toString() === pid);

        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ product: pid, quantity });
        }

        return await cart.save();
    }

    async removeProduct(cid, pid) {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = cart.products.filter(p => p.product.toString() !== pid);
        return await cart.save();
    }

    async updateProducts(cid, products) {
        const cart = await Cart.findById(cid);
        if (!cart) throw new Error('Carrito no encontrado');

        cart.products = products;
        return await cart.save();
    }
}

export default new CartDao();