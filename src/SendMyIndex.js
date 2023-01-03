import React, { useEffect } from "react";
import io from "socket.io-client";

const socket = io.connect(process.env.REACT_APP_SOCKET_URL)

let myindex3 = 24 // マジで何の数字でも良い。

const sendmyindex = async (props) =>{
  // console.log(`current myindex is...... ${props}`)
  await socket.emit("send_myindex" , props)
}


function SendMyIndex(props) {
  
  useEffect(() => {
    myindex3 = props.myindex
  },[props.myindex])

  useEffect(() => {
    const interval = setInterval(() => {
      sendmyindex(myindex3)
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    </div>
  )
}

export default SendMyIndex