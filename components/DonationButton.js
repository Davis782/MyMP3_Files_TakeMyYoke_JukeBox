function DonationButton({ cashAppUsername }) {
    try {
        const handleDonateClick = () => {
            window.open(`https://cash.app/$${cashAppUsername}`, '_blank');
        };

        return (
            <div className="donation-container" data-name="donation-container">
                <h3 className="text-lg font-semibold mb-2" data-name="donation-title">
                    Support Our Work
                </h3>
                <p className="text-gray-600 mb-4" data-name="donation-description">
                    If you enjoy our content, consider making a contribution
                </p>
                <button 
                    onClick={handleDonateClick}
                    className="donation-button"
                    data-name="cash-app-button"
                >
                    <i className="fas fa-dollar-sign"></i>
                    Donate with Cash App
                </button>
            </div>
        );
    } catch (error) {
        console.error('DonationButton component error:', error);
        reportError(error);
        return null;
    }
}
