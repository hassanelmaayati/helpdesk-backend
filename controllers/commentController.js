const Comment = require('../models/Comment');
const Ticket = require('../models/Ticket');

const findAccessibleTicket = async (req, res) => {
  const ticket = await Ticket.findById(req.params.ticketId);

  if (!ticket) {
    res.status(404).json({ err: 'Ticket not found.' });
    return null;
  }

  if (req.user.role === 'employee' && ticket.createdBy.toString() !== req.user._id) {
    res.status(403).json({ err: 'Access denied.' });
    return null;
  }

  return ticket;
};

const createComment = async (req, res) => {
  try {
    const ticket = await findAccessibleTicket(req, res);
    if (!ticket) return;

    const comment = await Comment.create({
      content: req.body.content,
      ticket: ticket._id,
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
    const ticket = await findAccessibleTicket(req, res);
    if (!ticket) return;

    const comments = await Comment.find({
      ticket: ticket._id,
    })
      .populate('author', 'name email')
      .sort({ createdAt: 1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const updateComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId,
      ticket: req.params.ticketId,
      author: req.user._id,
    });

    if (!comment) {
      return res.status(403).json({
        err: 'You can only edit your own comments.',
      });
    }

    comment.content = req.body.content;

    await comment.save();

    const populatedComment = await comment.populate('author', 'name email');

    res.status(200).json(populatedComment);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findOne({
      _id: req.params.commentId,
      ticket: req.params.ticketId,
      author: req.user._id,
    });

    if (!comment) {
      return res.status(403).json({
        err: 'You can only delete your own comments.',
      });
    }

    await comment.deleteOne();

    res.status(200).json({
      message: 'Comment deleted successfully.',
    });
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

module.exports = {
  createComment,
  indexComments,
  updateComment,
  deleteComment,

};

