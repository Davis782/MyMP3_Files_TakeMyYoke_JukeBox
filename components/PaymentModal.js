function PaymentModal({ isOpen, onClose, onSkip, cashAppUsername }) {
    try {
        const [amount, setAmount] = React.useState('');

        if (!isOpen) return null;

        const handleSubmit = (e) => {
            e.preventDefault();
            window.open(`https://cash.app/$${cashAppUsername}/${amount}`, '_blank');
            onClose();
        };

        return (
            <div className="payment-modal-overlay" data-name="payment-modal">
                <div className="payment-modal">
                    <h2 className="text-xl font-bold mb-4">Support the Artist</h2>
                    <p className="mb-4">To enable autoplay, please consider making a donation:</p>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="form-label" htmlFor="amount">Amount ($)</label>
                            <input
                                type="number"
                                id="amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="form-input"
                                min="1"
                                step="1"
                                required
                                data-name="payment-amount"
                            />
                        </div>
                        <div className="flex gap-4">
                            <button 
                                type="submit" 
                                className="payment-submit"
                                data-name="payment-submit"
                            >
                                Pay with Cash App
                            </button>
                            <button 
                                type="button" 
                                onClick={onSkip}
                                className="payment-skip"
                                data-name="payment-skip"
                            >
                                Skip Payment
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    } catch (error) {
        console.error('PaymentModal component error:', error);
        reportError(error);
        return null;
    }
}
