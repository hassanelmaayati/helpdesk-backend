const express = require('express');

const router = express.Router();

const {
  createComment,
  indexComments,
} = require('../controllers/commentController');

const verifyToken = require('../middleware/verifyToken');

router.post(
  '/tickets/:ticketId/comments',
  verifyToken,
  createComment
);


router.get(
  '/tickets/:ticketId/comments',
  verifyToken,
  indexComments
);

module.exports = router;