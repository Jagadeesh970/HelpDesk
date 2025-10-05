import Ticket from "../models/Ticket.js";

export const createTicket = async (req, res) => {
  const { title, description, priority, sla } = req.body;
  try {
    const ticket = await Ticket.create({
      title,
      description,
      priority,
      sla,
      createdBy: req.user._id
    });
    res.status(201).json(ticket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getTickets = async (req, res) => {
  const { limit = 100, offset = 0, search } = req.query;
  try {
    const query = {};

    if (search) query.title = { $regex: search, $options: "i" };

    if (req.user.role === "user") {
      query.createdBy = req.user._id;
    } else if (req.user.role === "agent") {
      query.assignedTo = req.user._id;
    }
    // Admin sees all tickets

    const tickets = await Ticket.find(query)
      .skip(parseInt(offset))
      .limit(parseInt(limit))
      .populate("assignedTo", "username")
      .populate("createdBy", "username");

    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTicketById = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id)
      .populate("assignedTo", "username")
      .populate("createdBy", "username")
      .populate("comments");

    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    Object.assign(ticket, req.body);
    await ticket.save();
    res.json(ticket);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
