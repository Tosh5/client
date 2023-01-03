import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { add } from './App.js'
import hoge from './App.js'
import {useSockets} from './context/socket.context';

const async = require("async");
const socket = io.connect(process.env.REACT_APP_SOCKET_URL) //socketProviderを使わないなら必要
// const socket = io.connect("http://localhost:8000")
// const socket = io.connect("https://cheer-app-server1.onrender.com")
// const index = io.connect("https://cheer-app-server1.onrender.com/index")

let myindex3 = 24

// const {socket, messages, setMessages} = useSockets();



const sendmyindex = async (props) =>{
  console.log(`current myindex is...... ${props}`)
  await socket.emit("send_myindex" , props)
  console.log('ran sendTest1')
}


function SendMyIndex(props) {

  // const {socket, messages, setMessages} = useSockets();

  // console.log(add(3,5));

  // console.log(props.myindex) //propsで受け取ったindexの値をリアルタイムに更新。
 
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