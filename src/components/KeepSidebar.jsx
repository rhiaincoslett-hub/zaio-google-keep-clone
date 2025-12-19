const NAV_ITEMS = [
  { key: "notes", label: "Notes", icon: "lightbulb" },
  { key: "reminders", label: "Reminders", icon: "notifications" },
  { key: "labels", label: "Edit labels", icon: "edit" },
  { key: "archive", label: "Archive", icon: "archive" },
  { key: "trash", label: "Trash", icon: "delete" }
];

export default function KeepSidebar({ open, onClose, currentView, onViewChange }) {
  const handleNavClick = (key) => {
    onViewChange(key);
    if (window.innerWidth <= 720) {
      onClose();
    }
  };

  return (
    <>
      <aside className={`sidebar ${open ? "open" : ""}`} aria-label="Navigation">
        <nav className="navList">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.key}
              className={`navItem ${item.key === currentView ? "active" : ""}`}
              onClick={() => handleNavClick(item.key)}
              type="button"
            >
              <span className="materialSymbol navIcon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="navLabel">{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <button
        className={`backdrop ${open ? "show" : ""}`}
        type="button"
        aria-label="Close navigation"
        onClick={onClose}
      />
    </>
  );
}


