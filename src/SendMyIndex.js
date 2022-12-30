import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const async = require("async");
const socket = io.connect("https://cheer-app-server1.onrender.com")

export default function SendMyIndex(props) {
//   const [count, setCount] = useState(0);

  const sendmyindex = async (props) =>{

    console.log(`current myindex ${props.myindex}`)
    await socket.emit("send_message" , props.myindex)
    console.log('ran sendTest')
  }

  useEffect(() => {
    const interval = setInterval(() => {
    //   setCount(c => c + 1);
    sendmyindex()

    }, 1000);
    return () => clearInterval(interval);
  }, []);

//   return <div>count = {count}</div>;
}