import ticketRepository from '../repositories/TicketRepository.js';

class TicketController {
  async create(ticketData) {
    return await ticketRepository.create(ticketData);
  }

  async getById(id) {
    return await ticketRepository.getById(id);
  }
}

export default new TicketController();