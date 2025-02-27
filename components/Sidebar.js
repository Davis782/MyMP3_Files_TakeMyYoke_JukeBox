function Sidebar({ isOpen, onClose }) {
    try {
        return (
            <div 
                className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}
                data-name="sidebar"
            >
                <button 
                    onClick={onClose}
                    className="sidebar-close"
                    data-name="sidebar-close"
                >
                    <i className="fas fa-times"></i>
                </button>
                <div className="sidebar-content" data-name="sidebar-content">
                    <h2 className="text-xl font-bold mb-6">Admin Access</h2>
                    <LoginForm onLogin={onClose} />
                </div>
            </div>
        );
    } catch (error) {
        console.error('Sidebar component error:', error);
        reportError(error);
        return null;
    }
}
