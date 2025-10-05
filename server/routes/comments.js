import express from "express";
import { protect } from "../middleware/auth.js";
import { addComment, getComments } from "../controllers/commentController.js";

const router = express.Router({ mergeParams: true });

router.post("/", protect, addComment); 
router.get("/", protect, getComments);

export default router;
