import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api.js";
import { disconnectSocket, getSocket } from "../socket.js";
import Sidebar from "../components/Sidebar.jsx";
import MessageList from "../components/MessageList.jsx";
import MessageInput from "../components/MessageInput.jsx";

function Chat() {
  const navigate = useNavigate();
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "null"), []);
  const [channels, setChannels] = useState([]);
  const [activeChannel, setActiveChannel] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newChannelName, setNewChannelName] = useState("");
  const [loadingChannels, setLoadingChannels] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchChannels = async () => {
      try {
        const { data } = await api.get("/channels");
        setChannels(data);
        setActiveChannel(data[0] || null);
      } catch (error) {
        setError("Could not load channels.");
      } finally {
        setLoadingChannels(false);
      }
    };

    fetchChannels();
  }, []);

  useEffect(() => {
    if (!activeChannel) return;

    const socket = getSocket();

    const fetchMessages = async () => {
      setLoadingMessages(true);
      setError("");

      try {
        const { data } = await api.get(`/messages/${activeChannel._id}`);
        setMessages(data);
        socket.emit("join_channel", activeChannel._id);
      } catch (error) {
        setError("Could not load messages.");
      } finally {
        setLoadingMessages(false);
      }
    };

    const handleReceiveMessage = (message) => {
      if (message.channel === activeChannel._id || message.channel?._id === activeChannel._id) {
        setMessages((currentMessages) => {
          if (currentMessages.some((item) => item._id === message._id)) {
            return currentMessages;
          }

          if (message.clientId) {
            const withoutOptimisticMessage = currentMessages.filter((item) => item.clientId !== message.clientId);
            return [...withoutOptimisticMessage, message];
          }

          return [...currentMessages, message];
        });
      }
    };

    fetchMessages();
    socket.on("receive_message", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
    };
  }, [activeChannel]);

  const handleCreateChannel = async (event) => {
    event.preventDefault();

    if (!newChannelName.trim()) return;

    try {
      const { data } = await api.post("/channels", { name: newChannelName });
      setChannels((currentChannels) => [...currentChannels, data]);
      setActiveChannel(data);
      setNewChannelName("");
    } catch (error) {
      setError(error.response?.data?.message || "Could not create channel.");
    }
  };

  const handleSendMessage = (content) => {
    if (!content.trim() || !activeChannel) return;

    const socket = getSocket();
    const clientId = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const optimisticMessage = {
      _id: clientId,
      clientId,
      content: content.trim(),
      channel: activeChannel._id,
      createdAt: new Date().toISOString(),
      sender: {
        _id: user.id,
        id: user.id,
        username: user.username,
        email: user.email
      }
    };

    setMessages((currentMessages) => [...currentMessages, optimisticMessage]);

    socket.emit(
      "send_message",
      {
        content,
        channelId: activeChannel._id,
        clientId
      },
      (response) => {
        if (!response?.ok) {
          setError(response?.message || "Could not send message.");
          setMessages((currentMessages) => currentMessages.filter((message) => message.clientId !== clientId));
        }
      }
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    disconnectSocket();
    navigate("/login");
  };

  return (
    <main className="chat-shell">
      <Sidebar
        channels={channels}
        activeChannel={activeChannel}
        loading={loadingChannels}
        user={user}
        newChannelName={newChannelName}
        onChannelChange={setActiveChannel}
        onChannelNameChange={setNewChannelName}
        onCreateChannel={handleCreateChannel}
        onLogout={handleLogout}
      />

      <section className="chat-main">
        <header className="chat-header">
          <div>
            <span className="channel-symbol">#</span>
            <strong>{activeChannel?.name || "No channel selected"}</strong>
          </div>
        </header>

        {error && <div className="chat-alert">{error}</div>}

        <MessageList
          messages={messages}
          loading={loadingMessages}
          currentUserId={user?.id}
          activeChannel={activeChannel}
        />

        <MessageInput
          disabled={!activeChannel}
          channelName={activeChannel?.name}
          onSendMessage={handleSendMessage}
        />
      </section>
    </main>
  );
}

export default Chat;
