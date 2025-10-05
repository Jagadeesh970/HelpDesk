import Comment from "../models/Comment.js";
import Ticket from "../models/Ticket.js";

export const addComment = async (req, res) => {
  const { message } = req.body;
  try {
    const ticket = await Ticket.findById(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });

    const comment = await Comment.create({
      message,
      user: req.user._id,
      ticket: ticket._id
    });

    ticket.comments.push(comment._id);
    ticket.timeline.push({ action: `Comment added by ${req.user.username}`, date: new Date() });
    await ticket.save();

    const populatedComment = await comment.populate("user", "username role");
    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ ticket: req.params.id })
      .populate("user", "username role")
      .sort({ createdAt: 1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
