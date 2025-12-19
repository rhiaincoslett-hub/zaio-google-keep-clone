import { useEffect, useRef, useState } from "react";

export default function NoteComposer({ onAdd }) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [reminder, setReminder] = useState("");
  const cardRef = useRef(null);

  const canSave = title.trim().length > 0 || body.trim().length > 0;

  function reset() {
    setTitle("");
    setBody("");
    setReminder("");
    setExpanded(false);
  }

  function save() {
    if (!canSave) return;
    const reminderTimestamp = reminder ? new Date(reminder).getTime() : null;
    onAdd({
      title: title.trim(),
      body: body.trim(),
      reminder: reminderTimestamp
    });
    reset();
  }

  useEffect(() => {
    function onDocMouseDown(e) {
      if (!expanded) return;
      if (!cardRef.current) return;
      if (cardRef.current.contains(e.target)) return;
      save();
    }

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expanded, title, body, reminder]);

  return (
    <section className="composerWrap" aria-label="Create note">
      <div
        className={`composerCard ${expanded ? "expanded" : ""}`}
        ref={cardRef}
        onFocus={() => setExpanded(true)}
      >
        {expanded && (
          <input
            className="composerTitle"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Note title"
          />
        )}

        <div className="composerRow">
          <textarea
            className="composerBody"
            placeholder="Take a note..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onFocus={() => setExpanded(true)}
            aria-label="Note body"
            rows={expanded ? 3 : 1}
          />

          {!expanded && (
            <div className="composerIcons" aria-hidden="true">
              <span className="materialSymbol">check_box</span>
              <span className="materialSymbol">brush</span>
              <span className="materialSymbol">image</span>
            </div>
          )}
        </div>

        {expanded && (
          <>
            <div className="composerToolbar">
              <div className="reminderInput">
                <span className="materialSymbol" style={{ fontSize: '18px', color: 'var(--muted)' }}>
                  notifications
                </span>
                <input
                  type="datetime-local"
                  value={reminder}
                  onChange={(e) => setReminder(e.target.value)}
                  className="reminderPicker"
                  aria-label="Set reminder"
                />
                {reminder && (
                  <button
                    className="clearReminderBtn"
                    type="button"
                    onClick={() => setReminder("")}
                    aria-label="Clear reminder"
                  >
                    <span className="materialSymbol" style={{ fontSize: '18px' }}>
                      close
                    </span>
                  </button>
                )}
              </div>
            </div>
            <div className="composerActions">
              <button
                className="ghostButton"
                type="button"
                onClick={() => reset()}
              >
                Close
              </button>
              <button
                className="primaryButton"
                type="button"
                onClick={() => save()}
                disabled={!canSave}
              >
                Add
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}


