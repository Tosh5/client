import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SOCKET_URL)

const sendmyindex = async (index) =>{
  // console.log(`current myindex is...... ${props}`)
  await socket.emit("send_myindex" , index)
}

function SendMyIndex(props) {
  useEffect(() => {
    const interval = setInterval(() => {
      sendmyindex(props.myindex)
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    </div>
  )
}

export default SendMyIndex