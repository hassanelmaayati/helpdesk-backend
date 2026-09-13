const express = require('express');

const router = express.Router();

const {
  createComment,
} = require('../controllers/commentController');

const verifyToken = require('../middleware/verifyToken');

router.post(
  '/tickets/:ticketId/comments',
  verifyToken,
  createComment
);

module.exports = router;