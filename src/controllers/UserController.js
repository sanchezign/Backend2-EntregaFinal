import userRepository from '../repositories/UserRepository.js';

class UserController {
  async getUsers() {
    return await userRepository.getAll();
  }

  async getById(id) {
    return await userRepository.getById(id);
  }

  async create(userData) {
    return await userRepository.create(userData);
  }

  async update(id, updateData) {
    return await userRepository.update(id, updateData);
  }

  async delete(id) {
    return await userRepository.delete(id);
  }
}

export default new UserController();