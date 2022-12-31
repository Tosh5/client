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
const index = io.connect("https://cheer-app-server1.onrender.com/index")

function App() {
  console.log('function App()が呼ばれたよ')
  
  const [index, useIndex] = useState(0)
  const [info, useInfo] = useState('応援してください')
  const [num_participants, setNumParticipants] = useState()
  const [aveIndex, setAveIndex] = useState()

  const sendTest = async () =>{
    console.log('running sendTest')
    await socket.emit("send_message" , "testmsg")
    console.log('ran sendTest')
  }

  const [msg, setMsg] = useState('original msg')

  // ボタン→メッセージのやり取り部分
  socket.off("receive_message") // <= この行を追加
  socket.on('receive_message', function(aveIndex) {
    setMsg(aveIndex)
    console.log('setMsg done')
  })

  // const logoutMsg = (aveIndex) =>{
  //   console.log('来たぜ！！')
  //   console.log(`msg is : ${aveIndex}`)
  // }


  // index.off("receive_message2")
  index.on("receive_message2", function(aveIndex){
    console.log('来たぜよ！！')
    console.log(`this is aveIndex ${aveIndex}`)
  });



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
