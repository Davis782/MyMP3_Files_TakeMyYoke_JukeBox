function Form({ onSubmit }) {
    try {
        const [formData, setFormData] = React.useState({
            name: '',
            email: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        };

        return (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto" data-name="contact-form">
                <div className="mb-4" data-name="name-field">
                    <label className="form-label" htmlFor="name">Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                        data-name="name-input"
                    />
                </div>
                <div className="mb-4" data-name="email-field">
                    <label className="form-label" htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                        data-name="email-input"
                    />
                </div>
                <button 
                    type="submit" 
                    className="submit-button"
                    data-name="submit-button"
                >
                    Submit
                </button>
            </form>
        );
    } catch (error) {
        console.error('Form component error:', error);
        reportError(error);
        return null;
    }
}
