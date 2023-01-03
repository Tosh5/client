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


function SendMyIndex(props) {

  console.log(props.myindex)

  const myindex3 = props.myindex

  const [myindex2, useMyIndex2] = useState('bb')
  // useMyIndex2('aa');

  const [myindex4, useMyIndex4] = useState()

  useEffect(() => {
    console.log(`myindex3 daze ${myindex3}`) 
    const myindex4 = props.myindex
    console.log(`myindex4 is ${myindex4}`) 
    useMyIndex4(props.myindex)



    // componentWillUnmountを実装したければ
    // ここから関数を返すと
    // Reactはアンマウントの直前にそれを呼び出す
    return () => console.log('unmounting...');
  }, [props.myindex])

  useEffect(() => {
    // console.log(`myindex3 ${myindex3}`) //←特に動きていない 
    const interval = setInterval(() => {
    //   setCount(c => c + 1);
    sendmyindex(myindex3)
    console.log(`myindex3 ${myindex3}`) 
    

    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>SendMyIndex{myindex3}</div>
  )
}

export default SendMyIndex