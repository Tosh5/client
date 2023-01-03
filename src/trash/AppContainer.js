import * as React from 'react';
import './App.css';
import Gauge from './Gauge';
import MiniGauge from './MiniGauge';
import { useState, useEffect } from 'react';
import Monitor from './Monitor';
// import { Info } from './Info';
import StartSupport from './StartSupport';
import SendMyIndex from './SendMyIndex';


// import CreateRand from './CreateRand';

import io from "socket.io-client";
import AudioRecong from './AudioRecong';
import SocketTest from './SocketTest';

const socket = io.connect(process.env.REACT_APP_SOCKET_URL)

// testmsgを送信するボタンのonClick関数
const sendTest = async () =>{
    console.log('ボタンをクリックしたね！')
    await socket.emit("send_message" , "testmsg")
    console.log('ボタンクリックを伝えときました')
  }

const AppContainer = (props) => {
    // console.log('appcontainerが呼ばれた')

    const [index, useIndex] = useState(0)
    const [info, setInfo] = useState('応援してください')
    const [num_participants, setNumParticipants] = useState()
    // const [msg, setMsg] = useState('original msg')

  return (
    <div>
        <div className="team-index">
        {/* <SocketTest /> */}
        <h1 className='title'>チーム全体の応援</h1>
        <h3>{process.env.REACT_APP_SOCKET_URL}</h3>
        {/* <h1 className='title'>aveIndex: {aveIndex}</h1> */}

        <button 
          className='button' 
          onClick={sendTest}
        >サーバに送信</button>
        <h3>下のメッセージがoriginalmsgからtestmsgに書き変わる</h3>
        <h2>{props.msg}</h2>

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
        {/* <AudioRecong /> */}
      </div>
    </div>
  )
}

export default AppContainer