import { useState } from "react";

function MessageInput({ disabled, channelName, onSendMessage }) {
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!content.trim()) return;

    onSendMessage(content);
    setContent("");
  };

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        value={content}
        onChange={(event) => setContent(event.target.value)}
        placeholder={disabled ? "Select a channel first" : `Message #${channelName}`}
        disabled={disabled}
      />
      <button type="submit" disabled={disabled || !content.trim()}>
        Send
      </button>
    </form>
  );
}

export default MessageInput;
