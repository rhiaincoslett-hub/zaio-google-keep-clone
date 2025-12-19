import NoteCard from "./NoteCard.jsx";

export default function NotesSection({
  title,
  notes,
  emptyHint,
  onDelete,
  onTogglePin,
  onUpdateReminder,
  viewMode = "grid"
}) {
  if (!notes.length) {
    return (
      <section className="notesSection" aria-label={title}>
        <div className="sectionHeader">
          <span className="sectionTitle">{title}</span>
        </div>
        <div className="emptyState">{emptyHint}</div>
      </section>
    );
  }

  return (
    <section className="notesSection" aria-label={title}>
      <div className="sectionHeader">
        <span className="sectionTitle">{title}</span>
      </div>

      <div className={viewMode === "grid" ? "masonry" : "listView"} role="list">
        {notes.map((note) => (
          <div
            className={viewMode === "grid" ? "masonryItem" : "listItem"}
            role="listitem"
            key={note.id}
          >
            <NoteCard
              note={note}
              onDelete={onDelete}
              onTogglePin={onTogglePin}
              onUpdateReminder={onUpdateReminder}
            />
          </div>
        ))}
      </div>
    </section>
  );
}


