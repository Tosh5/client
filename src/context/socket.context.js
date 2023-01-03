import { useContext, createContext, useState } from 'react';
import io from 'socket.io-client';
// import { Socket } from 'socket.io-client';

// import fs from 'fs'
// import { SOCKET_URL } from './config/default';
// import EVENTS from "./config/events";
// require('dotenv').config()

// interface Context {
//     socket: Socket,
//     setUsername: Function
//     messages?: {message: string, username: string, time: string}[],
//     setMessages: Function
// }

//SOCKET_URLの中身のところに接続を要求
const socket = io(process.env.REACT_APP_SOCKET_URL);
// const socket = io.connect(process.env.REACT_APP_SOCKET_URL);

const SocketContext = createContext({
    socket, 
    setUsername: () => false ,
    setMessages: () => false
});

function SocketsProvier(props) {
    const [messages, setMessages] = useState([]);

    return (
        <SocketContext.Provider value={{ socket, messages, setMessages }} {...props} />
    );
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvier;