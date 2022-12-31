import * as React from 'react';
import './App.css';
import Gauge from './Gauge';
import MiniGauge from './MiniGauge';
import { useState } from 'react';
import Monitor from './Monitor';
// import { Info } from './Info';
import StartSupport from './StartSupport';
import SendMyIndex from './SendMyIndex';

// import CreateRand from './CreateRand';

import io from "socket.io-client";

const async = require("async");
const socket = io.connect("https://cheer-app-server1.onrender.com")


let grossIndex = 0





function App() {
  console.log('function App()が呼ばれたよ')
  
  const [index, useIndex] = useState(0)
  const [info, useInfo] = useState('応援してください')
  const [num_participants, setNumParticipants] = useState()
  const [aveIndex, setAveIndex] = useState()

  // socket.on("num_participants", (data) => {
  //   setNumParticipants(data)
  //   // console.log(data)
  // })

  

 


  // 試しに消してみる
  // socket.off("ave_index") // <= この行を追加
  // socket.on('ave_index', function(data) {
  //   setAveIndex(data)
  //   console.log('ave_index received')
  // })

  const sendTest = async () =>{
    console.log('running sendTest')
    await socket.emit("send_message" , "testmsg")
    console.log('ran sendTest')
  }

  const [msg, setMsg] = useState('original msg')

  // ボタン→メッセージのやり取り部分
  socket.off("receive_message") // <= この行を追加
  socket.on('receive_message', function(data) {
    setMsg(data)
    console.log('setMsg done')
  })

  // socket.off("aveIndex") // <= この行を追加
  // socket.on("aveIndex", (data) => {
  //   // grossIndex = data
  //   // useAveIndex(data)
  //   console.log(`aveIndex is ${data}`)
  // })

  // socket.off("receive_message2") // <= この行を追加
  // socket.on("receive_message2", function(data) {
  //   console.log('received_aveIndex')
  //   // console.log(data)
  //   // setAveIndex(data)
  //   console.log('setAveIndex done')
  // })

  const logoutMsg = () =>{
    console.log('来たぜ！！')
  }


  socket.off("receive_message2")
  socket.on("receive_message2", logoutMsg);
  // socket.on("receive_message2", console.log('来たよ！'));

  // socket.on("receive_message2", function(data){
  //   console.log('来たよ！')
  //   console.log(data)
  // });

  return (
    <div className="App">
      <div className="team-index">
        <h1 className='title'>チーム全体の応援</h1>
        <h1 className='title'>aveIndex: {aveIndex}</h1>

        <button 
          className='button' 
          onClick={sendTest}
        >サーバに送信</button>
        <h3>下のメッセージがoriginalmsgからtestmsgに書き変わる</h3>
        <h2>{msg}</h2>

        <SendMyIndex myindex={index}/> 

        {/* <CreateRand /> */}

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
