# Discord Clone

A simplified real-time Discord-style messaging app built with React, Express, Socket.io, MongoDB, JWT, and pure CSS.

## Features

- User registration and login with JWT authentication
- Password hashing with bcrypt
- Protected channel and message API routes
- Default channels created automatically on first server start
- Create and join chat channels
- Fetch existing channel messages
- Real-time messaging with Socket.io rooms
- Clean dark chat interface with sidebar, channel list, message feed, input box, and logout
- Login and register error handling with basic loading states

## Tech Stack

- Frontend: ReactJS, React Router, Axios, Socket.io Client, Vite
- Backend: ExpressJS, Socket.io, Mongoose
- Database: MongoDB
- Authentication: JWT and bcryptjs
- Styling: Pure CSS

## Folder Structure

```text
discord-clone/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── config/
│   │   └── db.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Channel.js
│   │   └── Message.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── channelRoutes.js
│   │   └── messageRoutes.js
│   └── middleware/
│       └── authMiddleware.js
└── frontend/
    ├── index.html
    ├── package.json
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api.js
        ├── socket.js
        ├── pages/
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   └── Chat.jsx
        ├── components/
        │   ├── Sidebar.jsx
        │   ├── MessageList.jsx
        │   └── MessageInput.jsx
        └── styles.css
```

## Environment Variables

Create a `.env` file inside `backend/`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/discord_clone
JWT_SECRET=replace_this_with_a_long_random_secret
CLIENT_URL=http://localhost:5173
```

Optional frontend environment variables can be placed in `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

## How To Run Backend

```bash
cd discord-clone/backend
npm install
cp .env.example .env
npm run dev
```

Make sure MongoDB is running locally, or replace `MONGO_URI` with your MongoDB Atlas connection string.

## How To Run Frontend

```bash
cd discord-clone/frontend
npm install
npm run dev
```

Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

## Demo Instructions

1. Start MongoDB.
2. Start the backend with `npm run dev`.
3. Start the frontend with `npm run dev`.
4. Register a new account.
5. Open another browser or incognito window and register a second account.
6. Select the same channel in both windows.
7. Send messages and watch them appear in real time.
8. Create a new channel from the sidebar and switch into it.

## API Overview

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/channels`
- `POST /api/channels`
- `GET /api/messages/:channelId`
- `POST /api/messages`

## Socket Events

- `join_channel`
- `send_message`
- `receive_message`

## Future Improvements

- Typing indicators
- Online user presence
- Channel member lists
- Message editing and deletion
- File uploads
- Direct messages
- Role-based permissions
- Better mobile navigation
