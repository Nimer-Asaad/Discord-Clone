import express from "express";
import Message from "../models/Message.js";
import Channel from "../models/Channel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:channelId", protect, async (req, res) => {
  try {
    const messages = await Message.find({ channel: req.params.channelId })
      .populate("sender", "username email")
      .sort({ createdAt: 1 })
      .limit(100);

    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Could not fetch messages." });
  }
});

router.post("/", protect, async (req, res) => {
  const { content, channelId } = req.body;

  if (!content || !channelId) {
    return res.status(400).json({ message: "Content and channelId are required." });
  }

  try {
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found." });
    }

    const message = await Message.create({
      content,
      sender: req.user._id,
      channel: channelId
    });

    const populatedMessage = await message.populate("sender", "username email");
    res.status(201).json(populatedMessage);
  } catch (error) {
    res.status(500).json({ message: "Could not send message." });
  }
});

export default router;
