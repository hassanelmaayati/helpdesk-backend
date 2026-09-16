const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  createComment,
  indexComments,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

router.post('/tickets/:ticketId/comments', verifyToken, createComment);
router.get('/tickets/:ticketId/comments', verifyToken, indexComments);
router.put('/tickets/:ticketId/comments/:commentId', verifyToken, updateComment);
router.delete('/tickets/:ticketId/comments/:commentId', verifyToken, deleteComment);

module.exports = router;
