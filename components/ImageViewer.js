function ImageViewer({ imagePath }) {
    try {
        return (
            <div className="image-viewer" data-name="image-viewer">
                <div className="image-container" data-name="image-container">
                    <img src={imagePath} alt="Selected" data-name="displayed-image" />
                </div>
            </div>
        );
    } catch (error) {
        console.error('ImageViewer component error:', error);
        reportError(error);
        return null;
    }
}
