const Comment = require('../models/comment');

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      content: req.body.content,
      ticket: req.params.ticketId,
      author: req.user._id,
    });

    const populatedComment = await comment.populate('author', 'name email');

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  createComment,
};