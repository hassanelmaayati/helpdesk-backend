const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { createTicket, getTickets, getTicket, updateTicket, updateStatus, deleteTicket } = require('../controllers/ticketController');

router.post('/', verifyToken, createTicket);
router.get('/', verifyToken, getTickets);
router.get('/:id', verifyToken, getTicket);
router.put('/:id', verifyToken, updateTicket);
router.put('/:id/status', verifyToken, updateStatus);
router.delete('/:id', verifyToken, deleteTicket);

module.exports = router;