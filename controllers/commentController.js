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

const indexComments = async (req, res) => {
  try {
    const comments = await Comment.find({
      ticket: req.params.ticketId,
    })
      .populate('author', 'name email')
      .sort({ createdAt: 1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};


module.exports = {
  createComment,
  indexComments,
};