function ContentViewer({ content }) {
    try {
        return (
            <div className="description-container" data-name="content-viewer">
                <pre className="whitespace-pre-wrap text-left" data-name="content-text">
                    {content}
                </pre>
            </div>
        );
    } catch (error) {
        console.error('ContentViewer component error:', error);
        reportError(error);
        return null;
    }
}
