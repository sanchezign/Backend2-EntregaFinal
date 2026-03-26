import cartRepository from '../repositories/CartRepository.js';

class CartController {
  async getAll() {
    return await cartRepository.getAll();
  }

  async create() {
    return await cartRepository.create();
  }

  async getById(id) {
    return await cartRepository.getById(id);
  }

  async addProduct(cid, pid, quantity = 1) {
    return await cartRepository.addProduct(cid, pid, quantity);
  }

  async removeProduct(cid, pid) {
    return await cartRepository.removeProduct(cid, pid);
  }

  async updateProducts(cid, products) {
    return await cartRepository.updateProducts(cid, products);
  }
}

export default new CartController();