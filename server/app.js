import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";

import authRoutes from "./routes/auth.js";
import ticketRoutes from "./routes/tickets.js";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/tickets/:id/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("✅ HelpDesk Backend Running"));

export default app;
