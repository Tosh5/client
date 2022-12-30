import React, { useEffect, useState } from "react";
import "./styles.css";

export default function App() {
//   const [count, setCount] = useState(0);

  const sendmyindex = async () =>{

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