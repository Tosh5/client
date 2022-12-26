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
const async = require("async");

// const socket = io.connect("https://43.207.73.189:8000")
// const socket = io.connect("http://localhost:8000")
// const socket = io.connect("https://hdpcvd23qq.ap-northeast-1.awsapprunner.com:8000")
// const socket = io.connect("https://13.228.225.19:8000")
// const socket = io.connect("https://cheer-app-server1.onrender.com:10000")
// const socket = io.connect("http://cheer-app-server2:10000")
const socket = io.connect("https://cheer-app-server1.onrender.com")
// ↑ 他のコンポーネントでも、同様の記載あり。接続先変更時は合わせて変更せよ

// socket.on('receive_message', function(data) {
//   async.waterfall([
//     function(callback) {
//       console.log('received_message')
//       callback(null, 'one');
//     }, 
//     function(callback) {
//       console.log(data)
//       callback(null, 'two');
//     }, 
//     function(callback) {
//       setMsg(data)
//       callback(null, 'three');
//     }, 
//     function(callback) {
//       console.log('setMsg done')
//       callback(null, 'four');
//     }, 
//   ], function(err,result) {
//   });
// })


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
  const sendTest = async () =>{
    console.log('running sendTest')
    await socket.emit("send_message" , "testmsg")
    // socket.emit("send_message" , {myIndex : 'index'})
    console.log('ran sendTest')
  }


  // const asyncFunc = async (mes) => {
  //   const waitTime = Math.floor((Math.random() * 100) + 1)
  //   await sleep(waitTime)
  //   console.log(mes)
  //   return `result_${mes}`
  // }

  // async function appleAsync(){
  //   let val = await apple(1)  //関数appleでresolveされた値(ここでは2)がvalに代入される
  //   val = await apple(val)　　 //3がvalに代入される
  //   val = await apple(val)　　 //4がvalに代入される
  // 　console.log("終了！")
  // }


  const [msg, setMsg] = useState('original msg')

  // socket.on("receive_message", (data) => {
  //   async.waterfall([
  //     console.log('received_message'),
  //     console.log(data),
  //     setMsg(data),
  //     console.log('setMsg done')
  //   ], function (err, result) {
  //   }
  //   );
  // })


  // 問題なく動くが、uncaught (in promise)error
  // とかいう、謎のエラーが出てくる
  // socket.on('receive_message', function(data) {
  //   async.waterfall([
  //     console.log('received_message'),
  //     console.log(data),
  //     setMsg(data),
  //     console.log('setMsg done')
  //   ], function(err,result) {
  //   });
  // })


  // 回数を繰り返すごとに、ますますreceived_messageのエラーが増える
  // socket.on('receive_message', function(data) {
  //   async.waterfall([
  //     function(callback) {
  //       console.log('received_message')
  //     }, 
  //     function(callback) {
  //       console.log(data)
  //     }, 
  //     function(callback) {
  //       setMsg(data)
  //     }, 
  //     function(callback) {
  //       console.log('setMsg done')
  //     }, 
  //   ], function(err,result) {
  //   });
  // })

  // let arg1 = ''

  socket.on('receive_message', function(data) {
    async.waterfall([
      function(callback) {
        console.log('received_message')
        callback(null, 'one');
      }, 
      function(arg1, callback) {
        console.log(data)
        callback(null, 'two');
      }, 
      function(arg1, callback) {
        setMsg(data)
        callback(null, 'three');
      }, 
      function(arg1, callback) {
        console.log('setMsg done')
        callback(null, 'four');
      }, 
    ], function(err,result) {
    });
  })






  // 以下の設定では、ボタンを押すたびに、
  // 過去の手の座標の認識回数分だけconsole.logが出力されてしまう
  // socket.on("receive_message", async (data) => {
  //   await console.log('received_message')
  //   await console.log(data)
  //   await setMsg(data)
  //   await console.log('setMsg done')
  // })
 
 

  // sendMyIndex()

  return (
    <div className="App">
      <div className="team-index">
        <h1 className='title'>チーム全体の応援</h1>
        <button 
          className='button' 
          onClick={sendTest}
        >サーバに送信</button>
        <h3>サーバにメッセージを送る。それにより、下のメッセージがoriginalmsgからtestmsgに書き変わる</h3>
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
