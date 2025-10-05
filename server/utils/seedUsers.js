import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "../models/User.js";

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(" MongoDB connected");

    await User.deleteMany({}); // clean first

    const users = [
      {
        username: "admin",
        email: "admin@example.com",
        password: await bcrypt.hash("admin123", 10),
        role: "admin",
      },
      {
        username: "agent1",
        email: "agent1@example.com",
        password: await bcrypt.hash("agent123", 10),
        role: "agent",
      },
      {
        username: "user1",
        email: "user1@example.com",
        password: await bcrypt.hash("user123", 10),
        role: "user",
      },
    ];

    await User.insertMany(users);
    console.log(" Users seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedUsers();
