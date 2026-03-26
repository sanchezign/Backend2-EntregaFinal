// src/dao/classes/ProductDao.js
import Product from '../models/Product.js';

class ProductDao {
    // Método principal usado en views y API (con paginación)
    async getProducts(filter = {}, options = {}) {
        return await Product.paginate(filter, options);
    }

    async create(productData) {
        const product = new Product(productData);
        return await product.save();
    }

    async update(id, updateData) {
        return await Product.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(id) {
        return await Product.findByIdAndDelete(id);
    }
}

export default new ProductDao();