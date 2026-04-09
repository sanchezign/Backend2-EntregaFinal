import userDao from '../dao/UserDao.js';
import CurrentUserDTO from '../dtos/CurrentUserDTO.js';

class UserRepository {
  async getById(id) {
    return await userDao.findById(id);
  }

  async getByEmail(email) {
    return await userDao.findByEmail(email);
  }

  // Método específico para recuperación de contraseña
  async getByEmailForReset(token) {
    return await userDao.findOne({ resetToken: token });
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
