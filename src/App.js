import * as React from 'react';
import './App.css';
import Gauge from './Gauge';
import MiniGauge from './MiniGauge';
import { useState } from 'react';
import Monitor from './Monitor';
// import { Info } from './Info';
import StartSupport from './StartSupport';

import io from "socket.io-client";
import CreateRand from './CreateRand';
// const socket = io.connect("https://43.207.73.189:8000")
// const socket = io.connect("http://localhost:8000")
// const socket = io.connect("https://hdpcvd23qq.ap-northeast-1.awsapprunner.com:8000")
// const socket = io.connect("https://13.228.225.19:8000")
// const socket = io.connect("https://cheer-app-server1.onrender.com:10000")
// const socket = io.connect("http://cheer-app-server2:10000")
const socket = io.connect("https://cheer-app-server1.onrender.com")
// ↑ 他のコンポーネントでも、同様の記載あり。接続先変更時は合わせて変更せよ

function App() {
  const [index, useIndex] = useState(0)
  // const [received, setReceived] = useState("サーバと接続できていません")
  // const [totalIndex, setTotalIndex] = useState('')
  const [info, useInfo] = useState('応援してください')
  const [num_participants, setNumParticipants] = useState()
  // const [rand, setRand] = useState()

  // socket.emit("myIndex" , {myIndex : 'index'})
  socket.on("num_participants", (data) => {
    setNumParticipants(data)
    console.log(data)
  })

  socket.on("rand", (data) => {
    // setRand(data)
    // socket.emit("myIndex" , {myIndex : 'index'})

    socket.emit('myindex', {myindex : index})
  })


  

  // const sendMyIndex = () =>{
  //   socket.emit("myIndex" , {myIndex : 'index'})
  // }
  const sendTest = () =>{
    console.log('running sendTest')
    socket.emit("send_message" , {myIndex : 'index'})
    console.log('ran sendTest')
  }

  const [msg, setMsg] = useState('original msg')

  socket.on("receive_message", (data) => {
    console.log('received_message')
    console.log(data)
    // setMsg(data)
    // socket.emit('myindex', {myindex : index})
  })

 
 

  // sendMyIndex()

  return (
    <div className="App">
      <div className="team-index">
        <h1 className='title'>チーム全体の応援</h1>
        <button 
          className='button' 
          onClick={sendTest}
        >arstarsta</button>
        <h2>{msg}</h2>
        <CreateRand />

        <Gauge score={index} />
        <StartSupport 
          num_participants={num_participants}
          index={index}
          // rand={rand}
          />
      </div>

      <div className='bottom'>
        <h1 className='title'>あなたの応援</h1>
        <div className='monitor'>
            {/* <h1>メッセージ</h1> */}
            <Monitor useIndex={useIndex} /> 
        </div>  

        <div className='info'>
            <h3>メッセージ：</h3>
            <h1>{info}</h1>
            <div className="minigauge">
              <h1>あなたの応援熱量</h1>
              <br />
              {/* <h1 className='score'>{index}</h1> */}
              <MiniGauge score={index} />
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
