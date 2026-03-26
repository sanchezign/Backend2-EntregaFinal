import productDao from '../dao/classes/ProductDao.js';

class ProductRepository {
  async getProducts(filter = {}, options = {}) {
    return await productDao.getProducts(filter, options);
  }

  async create(productData) {
    return await productDao.create(productData);
  }

  async update(id, updateData) {
    return await productDao.update(id, updateData);
  }

  async delete(id) {
    return await productDao.delete(id);
  }
}

export default new ProductRepository();