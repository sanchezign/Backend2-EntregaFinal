import ticketDao from '../dao/classes/TicketDao.js';

class TicketRepository {
  async create(ticketData) {
    return await ticketDao.create(ticketData);
  }

  async getById(id) {
    return await ticketDao.getById(id);
  }
}

export default new TicketRepository();