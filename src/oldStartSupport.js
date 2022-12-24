import { wait } from '@testing-library/user-event/dist/utils';
import React, { useState } from 'react'

import io from "socket.io-client";
const socket = io.connect("http://localhost:8000")
// ↑ 他のコンポーネントでも、同様の記載あり。接続先変更時は合わせて変更せよ

function StartSupport(props) {
  // const [timerId, setTimerId] = useState(null);
  // if (timerId === null) {
  //   setTimerId(setInterval(sendmyindex, 1000));
  // }

  const sendmyindex = async ()=>{
    // socket.emit('myindex', {myindex : props.index})
    // await wait(4)
    setTimeout(function(){
      var random = Math.random();
      socket.emit('myindex', {myindex : props.index})
      console.log(`log ${props.index}`);
    },0);
  }


  // sendmyindex()

  setTimeout(()=>{
    const index_now = props.index
    socket.emit('myindex', {myindex : index_now})

    // sendmyindex()
  },1000)



  

  

  // socket.emit('myindex', {myindex : props.index})

    const sendStart = () =>{
        socket.emit("sendStart" , {start : "start"})
        console.log(`aa${props.index}`)
        socket.emit('myindex', {myindex : props.index})
    }
  return (
    <div className='center sendStart'>
        {/* <h3>{numPart}</h3> */}
        <h3>現在の参加者数</h3>
        <h1 className='title'>{props.num_participants}</h1>
        <h3>\参加者が揃ったら/</h3>
        <button className='button' 
        onClick={sendStart}
        >▶︎ 応援を開始</button>
    </div>
  )
}

export default StartSupport