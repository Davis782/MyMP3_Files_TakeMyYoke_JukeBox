function Navigation({ currentPage, pages, mediaType, mediaFiles, onPageChange, onMediaChange }) {
    try {
        return (
            <div className="nav-container text-center p-4 bg-blue-100" data-name="navigation-container">
                <h2 className="text-xl font-bold mb-4" data-name="navigation-title">Media Player</h2>
                <select 
                    className="dropdown-select mb-4"
                    value={currentPage}
                    onChange={(e) => onPageChange(e.target.value)}
                    data-name="page-selector"
                >
                    {pages.map(page => (
                        <option key={page} value={page} data-name={`page-option-${page}`}>
                            {page}
                        </option>
                    ))}
                </select>
                {mediaFiles.length > 0 && (
                    <select 
                        className="dropdown-select"
                        onChange={(e) => onMediaChange(e.target.value)}
                        data-name="media-selector"
                    >
                        <option value="">Select {mediaType} Folder</option>
                        {mediaFiles.map(folder => (
                            <option key={folder.name} value={folder.name} data-name={`media-option-${folder.name}`}>
                                {folder.name}
                            </option>
                        ))}
                    </select>
                )}
            </div>
        );
    } catch (error) {
        console.error('Navigation component error:', error);
        reportError(error);
        return null;
    }
}
