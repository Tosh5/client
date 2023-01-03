import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// import 'bootstrap/dist/css/bootstrap.min.css';
import AudioRecong from './AudioRecong';
import { GanbareProvider } from './VoiceContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
    <React.StrictMode>
      <GanbareProvider >
        <App />
        <AudioRecong />
      </GanbareProvider>
    </React.StrictMode>
  
);


