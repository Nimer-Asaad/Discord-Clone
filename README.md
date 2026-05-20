# Discord Clone - Real-Time Chat Application

A simplified Discord-style messaging application built as a technical task.  
The project allows users to create an account, log in, join different chat channels, and send/receive messages in real time.

This project was built using **ReactJS**, **ExpressJS**, **MongoDB**, **Socket.io**, **Axios**, and **Pure CSS**.

---

## 🚀 Project Overview

This application is a simple real-time chat platform inspired by Discord.  
It focuses on the core features of a messaging system:

- User registration and login
- Authentication using JWT
- Multiple chat channels
- Real-time message sending and receiving
- Message storage in MongoDB
- Simple and user-friendly interface

The goal of this project is to demonstrate how modern web applications handle:

- Real-time communication
- User authentication
- Backend API development
- Database management
- Frontend and backend integration

---

## ✅ Features

### Authentication

- Create a new account
- Log in with an existing account
- Passwords are hashed using bcrypt
- JWT-based authentication
- User data stored in MongoDB

### Channels

- Users can view available chat channels
- Users can join/select different channels
- Each channel has its own messages

### Real-Time Chat

- Real-time communication using Socket.io
- Users can send messages instantly
- Messages appear immediately in the selected channel
- Messages are saved in MongoDB

### User Interface

- Simple Discord-like layout
- Sidebar for chat channels
- Main chat area for messages
- Message input area
- Clean responsive design using Pure CSS

---

## 🛠️ Tech Stack

### Frontend

- ReactJS
- React Router
- Axios
- Socket.io Client
- Pure CSS
- Vite

### Backend

- Node.js
- ExpressJS
- Socket.io
- MongoDB
- Mongoose
- JWT
- bcryptjs
- dotenv
- cors

### Database

- MongoDB Atlas or Local MongoDB

---

## 📁 Folder Structure

```text
discord-clone/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── middleware/
│   │   └── authMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Channel.js
│   │   └── Message.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── channelRoutes.js
│   │   └── messageRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Sidebar.jsx
│   │   │   ├── MessageList.jsx
│   │   │   └── MessageInput.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Chat.jsx
│   │   │
│   │   ├── api.js
│   │   ├── socket.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── styles.css
│   │
│   ├── package.json
│   └── index.html
│
└── README.md
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster0.mongodb.net/discord_clone?retryWrites=true&w=majority
JWT_SECRET=your_long_secret_key_here
CLIENT_URL=http://localhost:5173
```

### Important

Do not upload `.env` to GitHub.

Make sure `.gitignore` includes:

```gitignore
node_modules
.env
dist
```

---

## 🔧 Backend Setup

Go to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Run the backend server:

```bash
npm run dev
```

Expected output:

```text
Server running on port 5000
MongoDB connected
```

The backend runs on:

```text
http://localhost:8000
```

---

## 🎨 Frontend Setup

Open another terminal and go to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

The frontend runs on:

```text
http://localhost:5173
```

---

## 🔌 API Endpoints

### Authentication

```http
POST /api/auth/register
```

Registers a new user.

```http
POST /api/auth/login
```

Logs in an existing user and returns a JWT token.

---

### Channels

```http
GET /api/channels
```

Returns all available chat channels.

```http
POST /api/channels
```

Creates a new chat channel.

---

### Messages

```http
GET /api/messages/:channelId
```

Returns all messages for a specific channel.

```http
POST /api/messages
```

Creates and stores a new message.

---

## ⚡ Socket.io Events

The real-time chat system uses Socket.io.

### Client joins a channel

```js
socket.emit("join_channel", channelId);
```

### Client sends a message

```js
socket.emit("send_message", messageData);
```

### Client receives a message

```js
socket.on("receive_message", (message) => {
  // display message
});
```

---

## 🧠 How It Works

1. The user creates an account or logs in.
2. The backend validates the user and returns a JWT token.
3. The token is stored in localStorage.
4. The user is redirected to the chat page.
5. The frontend loads available channels from the backend.
6. When the user selects a channel:
   - Old messages are fetched from MongoDB.
   - The user joins the Socket.io room for that channel.
7. When a message is sent:
   - The frontend sends it through Socket.io.
   - The backend saves it in MongoDB.
   - The backend emits the message to all users in the same channel.
8. The message appears in real time without refreshing the page.

---

## 🧪 Testing the App

To test the real-time functionality:

1. Run the backend.
2. Run the frontend.
3. Open the app in one browser window.
4. Register or log in with one account.
5. Open the app in another browser or incognito window.
6. Register or log in with another account.
7. Join the same channel.
8. Send a message from one account.
9. The message should appear instantly for the other user.

---

## 🌐 Deployment Notes

The project can be deployed using:

- **Frontend:** Vercel
- **Backend:** Render or Railway
- **Database:** MongoDB Atlas

### Why not deploy the full project only on Vercel?

Vercel is great for deploying the React frontend, but the backend uses **ExpressJS + Socket.io**.  
Socket.io needs a long-running server for WebSocket connections, so it is better to host the backend on a service like **Render** or **Railway**.

Recommended deployment structure:

```text
React Frontend   → Vercel
Express Backend  → Render / Railway
MongoDB Database → MongoDB Atlas
```

---

## 🌍 Frontend Environment Variables for Deployment

For Vercel, create environment variables like:

```env
VITE_API_URL=https://your-backend-url.onrender.com/api
VITE_SOCKET_URL=https://your-backend-url.onrender.com
```

Example frontend API setup:

```js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000/api",
});

export default api;
```

Example Socket.io setup:

```js
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_SOCKET_URL || "http://localhost:8000");

export default socket;
```

---

## 📹 Demo Video Requirements

For the project submission, a short demo video should show:

1. Opening the application.
2. Creating a new account.
3. Logging in.
4. Viewing available channels.
5. Joining/selecting a channel.
6. Sending a message.
7. Opening another browser or incognito window.
8. Logging in with another user.
9. Showing real-time message receiving.
10. Briefly explaining the tech stack.

---

## 🎙️ Suggested Demo Script

```text
Hello, my name is Nimer Asaad.

This is my simplified Discord Clone project built using ReactJS, ExpressJS, MongoDB, Axios, Socket.io, and Pure CSS.

First, I will create a new account.
Then I will log in using the created account.

After login, the user is redirected to the chat page.
On the left side, we can see different chat channels.

When I click on a channel, the app loads the old messages from MongoDB.
The user can send a new message using the input box.

The real-time chat is handled using Socket.io.
When a message is sent, it is saved in MongoDB and emitted immediately to users inside the same channel.

The backend handles authentication, channels, messages, and Socket.io events.
The frontend provides a simple Discord-like interface with a sidebar, message area, and message input.

Thank you.
```

---

## 🔐 Security Notes

- User passwords are hashed before being saved.
- JWT is used for authentication.
- Environment variables are used for sensitive data.
- `.env` should not be pushed to GitHub.
- MongoDB credentials should be kept private.
- If database credentials are exposed, the password should be changed immediately from MongoDB Atlas.

---

## 🚧 Future Improvements

Possible future improvements:

- Add user avatars
- Add typing indicator
- Add online/offline user status
- Add private direct messages
- Add message delete/edit feature
- Add file/image sharing
- Add admin roles
- Improve responsive design
- Add email verification
- Add password reset
- Deploy backend and frontend fully online

---

## 👨‍💻 Developer

**Nimer Ziad Asaad**

Computer Engineering student interested in software development, AI systems, DevOps, Linux, Docker, Git, and real-time web applications.

- GitHub: https://github.com/Nimer-Asaad
- Portfolio: https://linkin1.com/nimerziad46
- Email: nimerziad46@gmail.com

---

## 📌 Submission

This project was created for a technical task requiring:

- Account creation and login
- Joining different chat channels
- Sending and receiving messages in real time
- A simple and user-friendly interface
- Using ReactJS, ExpressJS, Axios, Socket.io, MongoDB, and Pure CSS
- Providing a public demo video URL
