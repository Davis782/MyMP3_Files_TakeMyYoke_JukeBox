function FileUpload() {
    try {
        const [selectedFolder, setSelectedFolder] = React.useState('');
        const [selectedFiles, setSelectedFiles] = React.useState({
            media: null,
            text: null
        });
        const [feedback, setFeedback] = React.useState('');
        const [feedbackType, setFeedbackType] = React.useState('');
        const [isUploading, setIsUploading] = React.useState(false);

        const validateFile = (file, type) => {
            if (type === 'media') {
                const validTypes = selectedFolder.includes('mp3_files') 
                    ? ['audio/mpeg'] 
                    : ['image/jpeg', 'image/png'];
                
                if (!validTypes.includes(file.type)) {
                    return selectedFolder.includes('mp3_files')
                        ? 'Please select a valid MP3 file'
                        : 'Please select a valid image file (JPEG/PNG)';
                }
            } else if (type === 'text') {
                if (!file.type.includes('text/plain')) {
                    return 'Please select a valid text file (.txt)';
                }
            }
            return null;
        };

        const handleFileChange = (type, e) => {
            const file = e.target.files[0];
            if (!file) return;

            if (!selectedFolder) {
                setFeedback('Please select a folder first');
                setFeedbackType('error');
                e.target.value = '';
                return;
            }

            const error = validateFile(file, type);
            if (error) {
                setFeedback(error);
                setFeedbackType('error');
                e.target.value = '';
                return;
            }

            setSelectedFiles(prev => ({
                ...prev,
                [type]: file
            }));
            setFeedback('');
            setFeedbackType('');
        };

        const handleUpload = async (e) => {
            e.preventDefault();
            setIsUploading(true);

            try {
                // Simulate file upload with delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                setFeedback(`Files uploaded to ${selectedFolder} successfully!`);
                setFeedbackType('success');
                setSelectedFiles({ media: null, text: null });
                e.target.reset();
                
                setTimeout(() => {
                    setFeedback('');
                    setFeedbackType('');
                }, 3000);
            } catch (error) {
                setFeedback('Error uploading files. Please try again.');
                setFeedbackType('error');
            } finally {
                setIsUploading(false);
            }
        };

        return (
            <div className="upload-section" data-name="file-upload">
                <h3 className="text-xl font-semibold mb-4">Upload Files</h3>
                {feedback && (
                    <div className={`feedback-message ${feedbackType}`} data-name="upload-feedback">
                        {feedback}
                    </div>
                )}
                <form onSubmit={handleUpload}>
                    <div className="mb-4">
                        <label className="form-label">Select Folder</label>
                        <select
                            value={selectedFolder}
                            onChange={(e) => setSelectedFolder(e.target.value)}
                            className="folder-select"
                            required
                            data-name="upload-folder-select"
                        >
                            <option value="">Choose folder...</option>
                            <optgroup label="Music Folders">
                                <option value="mp3_files/song1">Song 1</option>
                                <option value="mp3_files/song2">Song 2</option>
                                <option value="mp3_files/song3">Song 3</option>
                            </optgroup>
                            <optgroup label="Picture Folders">
                                <option value="pictures/picture1">Picture 1</option>
                                <option value="pictures/picture2">Picture 2</option>
                                <option value="pictures/picture3">Picture 3</option>
                            </optgroup>
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="form-label">
                            Media File {selectedFolder.includes('mp3_files') ? '(MP3)' : '(JPEG/PNG)'}
                        </label>
                        <input
                            type="file"
                            accept={selectedFolder.includes('mp3_files') ? '.mp3' : 'image/*'}
                            onChange={(e) => handleFileChange('media', e)}
                            className="file-input"
                            required
                            data-name="media-file-input"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            {selectedFolder.includes('mp3_files') 
                                ? 'Accepted format: MP3' 
                                : 'Accepted formats: JPEG, PNG'}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="form-label">Text File (Lyrics/Description)</label>
                        <input
                            type="file"
                            accept=".txt"
                            onChange={(e) => handleFileChange('text', e)}
                            className="file-input"
                            required
                            data-name="text-file-input"
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Accepted format: TXT
                        </p>
                    </div>

                    <button 
                        type="submit"
                        className="upload-button"
                        disabled={isUploading}
                        data-name="upload-submit"
                    >
                        {isUploading ? (
                            <span>
                                <i className="fas fa-spinner fa-spin mr-2"></i>
                                Uploading...
                            </span>
                        ) : (
                            <span>
                                <i className="fas fa-upload mr-2"></i>
                                Upload Files
                            </span>
                        )}
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('FileUpload component error:', error);
        reportError(error);
        return null;
    }
}
