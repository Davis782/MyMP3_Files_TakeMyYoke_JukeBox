function AdminPanel({ onLogout }) {
    try {
        const [selectedType, setSelectedType] = React.useState('music');
        const [newFolderName, setNewFolderName] = React.useState('');
        const [feedback, setFeedback] = React.useState('');
        const [feedbackType, setFeedbackType] = React.useState('');

        const handleCreateFolder = (e) => {
            e.preventDefault();
            
            // Validate folder name
            if (!/^[a-zA-Z0-9-_]+$/.test(newFolderName)) {
                setFeedback('Folder name can only contain letters, numbers, hyphens, and underscores');
                setFeedbackType('error');
                return;
            }

            // Frontend simulation - actual implementation would require backend
            setFeedback(`New ${selectedType} folder "${newFolderName}" created successfully!`);
            setFeedbackType('success');
            setNewFolderName('');
            
            setTimeout(() => {
                setFeedback('');
                setFeedbackType('');
            }, 3000);
        };

        return (
            <div className="admin-panel" data-name="admin-panel">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Admin Panel</h2>
                    <button 
                        onClick={onLogout}
                        className="logout-button"
                        data-name="logout-button"
                    >
                        <i className="fas fa-sign-out-alt mr-2"></i>
                        Logout
                    </button>
                </div>

                <div className="panel-section" data-name="folder-creation">
                    <h3 className="text-xl font-semibold mb-4">Create New Folder</h3>
                    {feedback && (
                        <div className={`feedback-message ${feedbackType}`} data-name="folder-feedback">
                            {feedback}
                        </div>
                    )}
                    <form onSubmit={handleCreateFolder} className="flex gap-4 mb-6">
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="folder-type-select"
                            data-name="folder-type-select"
                        >
                            <option value="music">Music</option>
                            <option value="pictures">Pictures</option>
                        </select>
                        <input
                            type="text"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            placeholder="Folder name"
                            className="folder-name-input"
                            required
                            pattern="[a-zA-Z0-9-_]+"
                            title="Only letters, numbers, hyphens, and underscores allowed"
                            data-name="folder-name-input"
                        />
                        <button 
                            type="submit"
                            className="create-folder-button"
                            data-name="create-folder-button"
                        >
                            Create Folder
                        </button>
                    </form>
                </div>

                <FileUpload />
            </div>
        );
    } catch (error) {
        console.error('AdminPanel component error:', error);
        reportError(error);
        return null;
    }
}
