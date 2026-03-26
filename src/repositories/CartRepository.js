import cartDao from '../dao/classes/CartDao.js';

class CartRepository {
  async getAll() {
    return await cartDao.getAll();
  }

  async create() {
    return await cartDao.create();
  }

  async getById(id) {
    return await cartDao.getById(id);
  }

  async addProduct(cid, pid, quantity = 1) {
    return await cartDao.addProduct(cid, pid, quantity);
  }

  async removeProduct(cid, pid) {
    return await cartDao.removeProduct(cid, pid);
  }

  async updateProducts(cid, products) {
    return await cartDao.updateProducts(cid, products);
  }
}

export default new CartRepository();