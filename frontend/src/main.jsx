import React from 'react';
import ReactDOM from 'react-dom/client';
import 'highlight.js/styles/atom-one-dark.css';
import './styles.css';
import App from './App.jsx';
import { ChatProvider } from './context/ChatContext.jsx';
import ErrorBoundary from './components/ui/ErrorBoundary.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ChatProvider>
        <App />
      </ChatProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
