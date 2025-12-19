function formatReminderDate(timestamp) {
  const date = new Date(timestamp);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const reminderDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  const isToday = reminderDate.getTime() === today.getTime();
  const isTomorrow = reminderDate.getTime() === today.getTime() + 86400000;

  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  if (isToday) return `Today, ${timeStr}`;
  if (isTomorrow) return `Tomorrow, ${timeStr}`;

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

export default function NoteCard({ note, onDelete, onTogglePin, onUpdateReminder }) {
  const isOverdue = note.reminder && note.reminder < Date.now();

  return (
    <article className="noteCard" aria-label="Note">
      <div className="noteCardTop">
        <button
          className={`iconButton small ${note.pinned ? "active" : ""}`}
          type="button"
          onClick={() => onTogglePin(note.id)}
          aria-label={note.pinned ? "Unpin note" : "Pin note"}
          title={note.pinned ? "Unpin" : "Pin"}
        >
          <span className="materialSymbol" aria-hidden="true">
            push_pin
          </span>
        </button>
      </div>

      {note.reminder && (
        <div className={`noteReminder ${isOverdue ? 'overdue' : ''}`}>
          <span className="materialSymbol" style={{ fontSize: '16px' }}>
            notifications
          </span>
          <span className="reminderText">{formatReminderDate(note.reminder)}</span>
          <button
            className="clearReminderInCard"
            type="button"
            onClick={() => onUpdateReminder(note.id, null)}
            aria-label="Clear reminder"
          >
            <span className="materialSymbol" style={{ fontSize: '16px' }}>
              close
            </span>
          </button>
        </div>
      )}

      {note.title ? <h3 className="noteTitle">{note.title}</h3> : null}
      {note.body ? <p className="noteBody">{note.body}</p> : null}

      <div className="noteFooter" aria-label="Note actions">
        <button
          className="iconButton small danger"
          type="button"
          onClick={() => onDelete(note.id)}
          aria-label="Delete note"
          title="Delete"
        >
          <span className="materialSymbol" aria-hidden="true">
            delete
          </span>
        </button>
      </div>
    </article>
  );
}


