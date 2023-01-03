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
import AppContainer from './AppContainer';

// require('dotenv').config()

const async = require("async");
const socket = io.connect(process.env.REACT_APP_SOCKET_URL)


// const socket = io.connect("http://localhost:8000")
// const socket = io.connect("https://cheer-app-server1.onrender.com")

// const index2 = io("https://cheer-app-server1.onrender.com/index")

function logoutMsg(aveIndex){
  console.log('来たぜ！！')
  console.log(`msg is : ${aveIndex}`)
}

// 関数名は小文字スタートcamelCaseで書く。コンポーネントはわかりやすく大文字スタートPascalCaseにしている。
export function add(a, b) {
  return a + b;
}

// testmsgを送信するボタンのonClick関数
const sendTest = async () =>{
  console.log('running sendTest')
  await socket.emit("send_message" , "testmsg")
  console.log('ran sendTest')
}





function App() {
  console.log('function App()が呼ばれたよ')

  // indexをサーバに送りつける関数
  const sendmyindex = async () =>{
  // console.log(`current myindex is...... ${props}`)
  // await socket.emit("send_myindex" , props)
  console.log("サーバにindexを送信する!")
  await socket.emit("send_myindex" , index)
  console.log('サーバにindexを送信したぜ!')
}


  // console.log(add(1,2))

  // 以下の20行くらいは、socket.ioの公式ドキュメントからのコピペ
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
    });

    socket.on('pong', () => {
      setLastPong(new Date().toISOString());
    });

    socket.on('receive_message', function(aveIndex) {
      setMsg(aveIndex)
      console.log('setMsg done')
    })

    socket.on('receive_message2', function(aveIndex) {
      setAveIndex(aveIndex)
      console.log('来たぜよ！！！！！')
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);



  
  
  const [index, useIndex] = useState(0)
  const [info, setInfo] = useState('応援してください')
  const [num_participants, setNumParticipants] = useState()
  // const [aveIndex, setAveIndex] = useState()
  const [aveIndex, setAveIndex] = useState()

  

  const [msg, setMsg] = useState('original msg')

  // // ボタン→メッセージのやり取り部分
  // socket.off("receive_message") // <= この行を追加
  // socket.on('receive_message', function(aveIndex) {
  //   setMsg(aveIndex)
  //   console.log('setMsg done')
  // })

  // // aveIndexの受信
  // socket.off("receive_message2")
  // socket.on("receive_message2", function(aveIndex) {
  //   console.log('来たぜよ！！')
  // });

  let myindex3 = 24

  // useEffect(() => {
  //   // myindex3 = props.myindex
  // },[index])

  useEffect(() => {
    const interval = setInterval(() => {
      sendmyindex(index)
    }, 200);
    return () => clearInterval(interval);
  }, []);



  return (
    <div className="App">
      {/* <AppContainer 
        msg = {msg} 
        /> */}

      <div className="team-index">
        {/* <SocketTest /> */}
        <h1 className='title'>チーム全体の応援</h1>
        <h3>{aveIndex}</h3>
        {/* <h1 className='title'>aveIndex: {aveIndex}</h1> */}

        <button 
          className='button' 
          onClick={sendTest}
        >サーバに送信</button>
        <h3>下のメッセージがoriginalmsgからtestmsgに書き変わる</h3>
        <h2>{msg}</h2>

        <SendMyIndex myindex={index}/> 

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
