function Page({ pageNumber, children }) {
    try {
        return (
            <div className="content-container p-4" data-name={`page-${pageNumber}-content`}>
                <h1 className="text-2xl font-bold mb-6" data-name={`page-${pageNumber}-title`}>
                    Page {pageNumber}
                </h1>
                {children}
            </div>
        );
    } catch (error) {
        console.error('Page component error:', error);
        reportError(error);
        return null;
    }
}
