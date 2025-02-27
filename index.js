import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    return (
        // HTML code from app.js file
        <div className="container mx-auto px-4" data-name="app-container">
            // ...
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
