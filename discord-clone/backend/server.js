import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Channel from "./models/Channel.js";
import Message from "./models/Message.js";
import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 8000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(cors({ origin: CLIENT_URL, credentials: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Discord Clone API is running." });
});

app.use("/api/auth", authRoutes);
app.use("/api/channels", channelRoutes);
app.use("/api/messages", messageRoutes);

const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;

    if (!token) {
      return next(new Error("Authentication token missing."));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(new Error("Authenticated user not found."));
    }

    socket.user = user;
    next();
  } catch (error) {
    next(new Error("Socket authentication failed."));
  }
});

io.on("connection", (socket) => {
  socket.on("join_channel", (channelId) => {
    socket.join(channelId);
  });

  socket.on("send_message", async ({ content, channelId, clientId }, callback) => {
    if (!content?.trim() || !channelId) {
      callback?.({ ok: false, message: "Message content and channel are required." });
      return;
    }

    try {
      const channel = await Channel.findById(channelId);

      if (!channel) {
        callback?.({ ok: false, message: "Channel not found." });
        return;
      }

      const message = await Message.create({
        content: content.trim(),
        sender: socket.user._id,
        channel: channelId
      });

      const populatedMessage = await message.populate("sender", "username email");
      const messagePayload = {
        ...populatedMessage.toObject(),
        clientId
      };

      io.to(channelId).emit("receive_message", messagePayload);
      callback?.({ ok: true, message: messagePayload });
    } catch (error) {
      callback?.({ ok: false, message: "Could not send message." });
    }
  });
});

const seedDefaultChannels = async () => {
  const count = await Channel.countDocuments();

  if (count === 0) {
    await Channel.insertMany([
      { name: "general" },
      { name: "introductions" },
      { name: "random" }
    ]);
    console.log("Default channels created.");
  }
};

const startServer = async () => {
  await connectDB();
  await seedDefaultChannels();

  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
