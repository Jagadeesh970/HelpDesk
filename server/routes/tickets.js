import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  createTicket,
  getTickets,
  getTicketById,
  updateTicket
} from "../controllers/ticketController.js";

const router = express.Router();

router.use(protect);

router.post("/", authorize("user"), createTicket);
router.get("/", getTickets);
router.get("/:id", getTicketById);
router.patch("/:id", authorize("agent","admin"), updateTicket);

export default router;
