import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const async = require("async");
const socket = io.connect("https://cheer-app-server1.onrender.com")

const sendmyindex = async (props) =>{
  // setMyIndex2(props.myindex)
  // console.log(`current myindex ${myindex2} dayo`)
  console.log(`current myindex ${props}`)
  // await socket.emit("send_message" , props.myindex)
  console.log('ran sendTest')
}


export default function SendMyIndex(props) {
  // console.log(props.myindex)
  
  const [myindex2, useMyIndex2] = useState()
  // useMyIndex2('aa');
  // const functiondayo = ()=>{useMyIndex2('aa')}

//   const [count, setCount] = useState(0);

 

  useEffect(() => {
    const interval = setInterval(() => {
    //   setCount(c => c + 1);
    sendmyindex(props.myindex)

    }, 1000);
    return () => clearInterval(interval);
  }, []);

//   return <div>count = {count}</div>;
}