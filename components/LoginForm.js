function LoginForm({ onLogin }) {
    try {
        const [credentials, setCredentials] = React.useState({
            username: '',
            password: ''
        });
        const [error, setError] = React.useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            if (credentials.username === 'admin' && credentials.password === 'mymp3songs') {
                onLogin(true);
                setError('');
            } else {
                setError('Invalid username or password');
                setCredentials({ username: '', password: '' }); // Reset form
            }
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setCredentials(prev => ({
                ...prev,
                [name]: value
            }));
        };

        return (
            <div className="login-container" data-name="login-form">
                <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
                {error && (
                    <div className="error-message mb-4" data-name="login-error">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="form-label" htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            className="form-input"
                            required
                            data-name="username-input"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="form-label" htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            className="form-input"
                            required
                            data-name="password-input"
                        />
                    </div>
                    <button 
                        type="submit" 
                        className="login-button"
                        data-name="login-submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        );
    } catch (error) {
        console.error('LoginForm component error:', error);
        reportError(error);
        return null;
    }
}
