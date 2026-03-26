import userDao from '../dao/classes/UserDao.js';
import CurrentUserDTO from '../dtos/CurrentUserDTO.js';

class UserRepository {
  async getAll() {
    return await userDao.getAll();
  }

  async getById(id) {
    return await userDao.findById(id);
  }

  async getByEmail(email) {
    return await userDao.findByEmail(email);
  }

  async create(userData) {
    return await userDao.create(userData);
  }

  async update(id, updateData) {
    return await userDao.update(id, updateData);
  }

  async delete(id) {
    return await userDao.delete(id);
  }

  async getCurrentUser(id) {
    const user = await this.getById(id);
    return new CurrentUserDTO(user);
  }
}

export default new UserRepository();