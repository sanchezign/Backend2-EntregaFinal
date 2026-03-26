import User from '../models/User.js';

class UserDao {
    async getAll() {
        return await User.find().populate('cart').lean();
    }

    async findById(id) {
        return await User.findById(id).populate('cart').lean();
    }

    async findByEmail(email) {
        return await User.findOne({ email });
    }

    async create(userData) {
        const user = new User(userData);
        return await user.save();
    }

    async update(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(id) {
        return await User.findByIdAndDelete(id);
    }
}

export default new UserDao();