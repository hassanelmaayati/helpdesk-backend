const Ticket = require("../models/Ticket");

const createTicket = async (req, res) => {
  try {
    const { title, description, priority, category, contactInfo } = req.body;

    const newTicket = await Ticket.create({
      title,
      description,
      priority,
      category,
      contactInfo,
      createdBy: req.user._id,
    });

    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getTickets = async (req, res) => {
  try {
    let tickets;

    if (req.user.role === "employee") {
      tickets = await Ticket.find({ createdBy: req.user._id })
        .populate("category")
        .populate("createdBy", "name email role");
    } else {
      tickets = await Ticket.find()
        .populate("category")
        .populate("createdBy", "name email role");
    }

    res.status(200).json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("category")
      .populate("createdBy", "name email role");

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (
      req.user.role === "employee" &&
      ticket.createdBy._id.toString() !== req.user._id
    ) {
      return res.status(403).json({ error: "Access denied" });
    }

    res.status(200).json(ticket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (ticket.createdBy.toString() !== req.user._id) {
      return res.status(403).json({ error: "Access denied" });
    }

    const { title, description, priority, category, contactInfo } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { title, description, priority, category, contactInfo },
      { returnDocument: "after", runValidators: true },
    );

    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const updateStatus = async (req, res) => {
  try {
    if (req.user.role !== "it-staff") {
      return res.status(403).json({ error: "Access denied" });
    }

    const { status } = req.body;

    const updatedTicket = await Ticket.findByIdAndUpdate(
      req.params.id,
      { status },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedTicket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    res.status(200).json(updatedTicket);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      return res.status(404).json({ error: "Ticket not found" });
    }

    if (ticket.createdBy.toString() !== req.user._id) {
      return res.status(403).json({ error: "Access denied" });
    }

    await Ticket.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Ticket deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createTicket,
  getTickets,
  getTicket,
  updateTicket,
  updateStatus,
  deleteTicket,
};
