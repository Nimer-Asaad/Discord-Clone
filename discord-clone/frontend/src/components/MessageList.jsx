import { useEffect, useRef } from "react";

function MessageList({ messages, loading, currentUserId, activeChannel }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (!activeChannel) {
    return <div className="message-empty">Create or select a channel to start chatting.</div>;
  }

  if (loading) {
    return <div className="message-empty">Loading messages...</div>;
  }

  return (
    <div className="message-list">
      {messages.length === 0 ? (
        <div className="message-empty">No messages yet. Start the conversation.</div>
      ) : (
        messages.map((message) => {
          const isOwnMessage = message.sender?._id === currentUserId || message.sender?.id === currentUserId;

          return (
            <article key={message._id} className={`message ${isOwnMessage ? "own-message" : ""}`}>
              <div className="avatar">{message.sender?.username?.charAt(0).toUpperCase() || "?"}</div>
              <div className="message-body">
                <div className="message-meta">
                  <strong>{message.sender?.username || "Unknown user"}</strong>
                  <time>{new Date(message.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</time>
                </div>
                <p>{message.content}</p>
              </div>
            </article>
          );
        })
      )}
      <div ref={bottomRef} />
    </div>
  );
}

export default MessageList;
