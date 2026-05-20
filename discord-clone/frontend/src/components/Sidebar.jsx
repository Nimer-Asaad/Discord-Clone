function Sidebar({
  channels,
  activeChannel,
  loading,
  user,
  newChannelName,
  onChannelChange,
  onChannelNameChange,
  onCreateChannel,
  onLogout
}) {
  return (
    <aside className="sidebar">
      <div className="server-title">
        <div>
          <span>Discord Clone</span>
          <small>Simple chat workspace</small>
        </div>
      </div>

      <div className="channel-section">
        <div className="section-title">Channels</div>

        {loading ? (
          <p className="muted">Loading channels...</p>
        ) : (
          <nav className="channel-list">
            {channels.map((channel) => (
              <button
                key={channel._id}
                className={activeChannel?._id === channel._id ? "active" : ""}
                type="button"
                onClick={() => onChannelChange(channel)}
              >
                <span>#</span>
                {channel.name}
              </button>
            ))}
          </nav>
        )}
      </div>

      <form className="channel-form" onSubmit={onCreateChannel}>
        <input
          value={newChannelName}
          onChange={(event) => onChannelNameChange(event.target.value)}
          placeholder="new-channel"
          aria-label="New channel name"
        />
        <button type="submit">Add</button>
      </form>

      <div className="user-panel">
        <div>
          <strong>{user?.username || "Guest"}</strong>
          <small>{user?.email}</small>
        </div>
        <button type="button" onClick={onLogout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
