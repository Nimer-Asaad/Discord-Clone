import express from "express";
import Channel from "../models/Channel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const channels = await Channel.find().sort({ createdAt: 1 });
    res.json(channels);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch channels." });
  }
});

router.post("/", protect, async (req, res) => {
  const { name } = req.body;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ message: "Channel name must be at least 2 characters." });
  }

  try {
    const normalizedName = name.trim().toLowerCase().replace(/\s+/g, "-");
    const existingChannel = await Channel.findOne({ name: normalizedName });

    if (existingChannel) {
      return res.status(409).json({ message: "Channel already exists." });
    }

    const channel = await Channel.create({ name: normalizedName });
    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({ message: "Could not create channel." });
  }
});

export default router;
