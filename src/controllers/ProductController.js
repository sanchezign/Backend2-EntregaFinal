import productRepository from '../repositories/ProductRepository.js';

class ProductController {
  async getProducts(query = {}) {
    const limit   = Math.max(1, Math.min(100, parseInt(query.limit) || 50));
    const page    = Math.max(1, parseInt(query.page) || 1);
    const sortStr = query.sort === 'desc' ? 'desc' : 'asc';
    const q       = (query.query || '').trim();

    const filter = {};
    if (q) {
      filter.$or = [
        { category: q },
        { title: { $regex: q, $options: 'i' } }
      ];
    }

    const options = {
      limit,
      page,
      lean: true,
      sort: sortStr === 'desc' ? { price: -1 } : { price: 1 },
    };

    return await productRepository.getProducts(filter, options);
  }

  async create(productData) {
    return await productRepository.create(productData);
  }

  async update(id, updateData) {
    return await productRepository.update(id, updateData);
  }

  async delete(id) {
    return await productRepository.delete(id);
  }
}

export default new ProductController();