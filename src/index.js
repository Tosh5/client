import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import Notification from './Notification';
import SocketsProvider from './context/socket.context'

import 'bootstrap/dist/css/bootstrap.min.css';
import AudioRecong from './AudioRecong';
// import { BotttomRight } from './BottomRight';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketsProvider>
    <React.StrictMode>
      <App />
      <AudioRecong />
      {/* <BotttomRight /> */}
      {/* <Notification /> */}
    </React.StrictMode>
  </SocketsProvider>
);


