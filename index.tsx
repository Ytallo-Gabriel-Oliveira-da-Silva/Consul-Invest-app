(import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { initializeGemini } from './services/geminiService';

// Initialize AI service
try {
  initializeGemini();
} catch (e) {
  console.warn("Could not initialize Gemini immediately", e);
}

const mount = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}