import React, { useRef, useState } from 'react';
import {useSockets} from './context/socket.context';

function SocketTest() {
  const {socket, messages, setMessages} = useSockets();
  const messageRef = useRef(null);
  console.log('messages1を出力from SocketTest.js')
  console.log(messages);

  function handleClick() {
    const message = messageRef.current.value;
    if (!String(message).trim()) return;

    socket.emit("sendMessage", message);

    messageRef.current.value = "";
  }

  socket.on("responseMessage", (message) => {
    console.log('messageを出力from SocketTest.js')
    console.log(message);
    setMessages([...messages, message]);
    console.log('messages2を出力from SocketTest.js')
    console.log(messages);
  });

  return (
    <>
      <input type="text" ref={messageRef} placeholder="write message" />
      <button onClick={handleClick}>Send</button>
      <Messages />
        
    </>
  );
}

function Messages() {
  const {socket, messages, setMessages} = useSockets();
  return (<>
    {
    messages && 
    (<div>
      {messages.map(({message}, index) => {
        return <li key={index}>{message}</li>
      })}
    </div>)
    }
  </>
  );
}

export default SocketTest;