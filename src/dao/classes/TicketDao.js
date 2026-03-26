import Ticket from '../models/Ticket.js';

class TicketDao {
    async create(ticketData) {
        const ticket = new Ticket(ticketData);
        return await ticket.save();
    }

    async getById(id) {
        return await Ticket.findById(id).populate('purchaser').lean();
    }

    // Puedes agregar más métodos si los usás en tu TicketManager
    async getByPurchaser(email) {
        return await Ticket.find({ purchaser: email }).lean();
    }
}

export default new TicketDao();