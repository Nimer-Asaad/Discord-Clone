import { io } from "socket.io-client";

let socket;

export const getSocket = () => {
  const token = localStorage.getItem("token");

  if (!socket || !socket.connected) {
    socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:5000", {
      auth: { token }
    });
  }

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
