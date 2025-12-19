export default function KeepTopBar({
  query,
  onQueryChange,
  onToggleSidebar,
  viewMode,
  onViewModeChange
}) {
  const toggleViewMode = () => {
    onViewModeChange(viewMode === "grid" ? "list" : "grid");
  };

  return (
    <header className="topBar">
      <button
        className="iconButton"
        aria-label="Open navigation"
        onClick={onToggleSidebar}
        type="button"
      >
        <span className="materialSymbol" aria-hidden="true">
          menu
        </span>
      </button>

      <div className="brand">
        <span className="keepDot" aria-hidden="true" />
        <span className="brandText">Keep</span>
      </div>

      <div className="searchWrap" role="search">
        <span className="materialSymbol searchIcon" aria-hidden="true">
          search
        </span>
        <input
          className="searchInput"
          placeholder="Search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Search notes"
        />
      </div>

      <div className="topBarActions" aria-label="Top bar actions">
        <button
          className="iconButton"
          type="button"
          aria-label={viewMode === "grid" ? "List view" : "Grid view"}
          onClick={toggleViewMode}
          title={viewMode === "grid" ? "List view" : "Grid view"}
        >
          <span className="materialSymbol" aria-hidden="true">
            {viewMode === "grid" ? "view_agenda" : "grid_view"}
          </span>
        </button>
        <button className="iconButton" type="button" aria-label="Settings">
          <span className="materialSymbol" aria-hidden="true">
            settings
          </span>
        </button>
        <button className="iconButton" type="button" aria-label="Google apps">
          <span className="materialSymbol" aria-hidden="true">
            apps
          </span>
        </button>
        <div className="avatar" aria-label="Account">
          R
        </div>
      </div>
    </header>
  );
}


