import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: { type: String, enum: ["Open","In Progress","Resolved","Planned"], default: "Open" },
  priority: { type: String, enum: ["Low","Medium","High"], default: "Medium" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  sla: Date,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  timeline: [{ action: String, date: Date }]
}, { timestamps: true });

export default mongoose.model("Ticket", ticketSchema);
