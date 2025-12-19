import { useMemo, useState } from "react";
import KeepTopBar from "./components/KeepTopBar.jsx";
import KeepSidebar from "./components/KeepSidebar.jsx";
import NoteComposer from "./components/NoteComposer.jsx";
import NotesSection from "./components/NotesSection.jsx";
import { useLocalStorageState } from "./hooks/useLocalStorageState.js";
import { useReminderNotifications } from "./hooks/useReminderNotifications.js";
import { createNote } from "./lib/notes.js";

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [currentView, setCurrentView] = useState("notes");
  const [viewMode, setViewMode] = useState("grid");
  const [notes, setNotes] = useLocalStorageState("keepClone.notes.v1", []);

  // Enable reminder notifications
  useReminderNotifications(notes);

  const filtered = useMemo(() => {
    let result = notes;

    // Filter by view
    if (currentView === "reminders") {
      result = result.filter((n) => n.reminder !== null && n.reminder !== undefined);
    }

    // Filter by search query
    const q = query.trim().toLowerCase();
    if (q) {
      result = result.filter((n) => {
        const t = `${n.title}\n${n.body}`.toLowerCase();
        return t.includes(q);
      });
    }

    return result;
  }, [notes, query, currentView]);

  const pinnedNotes = filtered
    .filter((n) => n.pinned)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  const otherNotes = filtered
    .filter((n) => !n.pinned)
    .sort((a, b) => b.updatedAt - a.updatedAt);

  function addNote({ title, body, reminder }) {
    const now = Date.now();
    const note = createNote({ title, body, reminder, now });
    setNotes((prev) => [note, ...prev]);
  }

  function deleteNote(id) {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  }

  function togglePin(id) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, pinned: !n.pinned, updatedAt: Date.now() } : n
      )
    );
  }

  function updateReminder(id, reminderTimestamp) {
    setNotes((prev) =>
      prev.map((n) =>
        n.id === id ? { ...n, reminder: reminderTimestamp, updatedAt: Date.now() } : n
      )
    );
  }

  return (
    <div className="appShell">
      <KeepTopBar
        query={query}
        onQueryChange={setQuery}
        onToggleSidebar={() => setSidebarOpen((s) => !s)}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      <div className="contentShell">
        <KeepSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          currentView={currentView}
          onViewChange={setCurrentView}
        />

        <main className="main">
          <div className="centerColumn">
            <NoteComposer onAdd={addNote} />

            <NotesSection
              title="Pinned"
              notes={pinnedNotes}
              emptyHint="Pin notes to keep them at the top."
              onDelete={deleteNote}
              onTogglePin={togglePin}
              onUpdateReminder={updateReminder}
              viewMode={viewMode}
            />

            <NotesSection
              title="Others"
              notes={otherNotes}
              emptyHint={
                currentView === "reminders"
                  ? "No notes with reminders."
                  : "Create a note to get started."
              }
              onDelete={deleteNote}
              onTogglePin={togglePin}
              onUpdateReminder={updateReminder}
              viewMode={viewMode}
            />
          </div>
        </main>
      </div>
    </div>
  );
}


