import * as React from 'react';
import './App.css';
import Gauge from './Gauge';
import MiniGauge from './MiniGauge';
import { useState, useEffect, useContext, useRef} from 'react';
import Monitor, {additionalIndex} from './Monitor';
import StartSupport from './StartSupport';
import { GanbareCount, interim, InterimCount } from './VoiceContext';
import {motion, useAnimation} from 'framer-motion'


import io from "socket.io-client";
const socket = io.connect(process.env.REACT_APP_SOCKET_URL)

let prev_ganbare = 0

let voiceCheered = false;

export function useDidUpdateEffect(fn, deps) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
    } else {
      fn();
    }
  }, deps);
}



export const AnimateSample = () => (
  <motion.div
    style={{ 
      width: 700, height: 100, 
      backgroundColor: '#03bc44', borderRadius: 15
    }}
    animate={
      voiceCheered ?
      { 
        x: [window.innerWidth * 1, 
          window.innerWidth * 0.6,
          window.innerWidth * 0.6,
          window.innerWidth * 1]
      }: 
      { 
        x: [window.innerWidth * 1, 
          window.innerWidth * 1,
          window.innerWidth * 1,
          window.innerWidth * 1]
      }
  }
    
    // initial={{opacity: 1}}
    // exit={{opacity: 1}}
    transition={{
      duration: 2,
      times: [0, 0.15, 0.8, 1]
    }}
  >
  <p className='popupAnimation'>ナイス声援！ +50</p>
  </motion.div>
)

function App() {

  const { ganbareCount, setGanbareCount } = useContext(GanbareCount)
  // const { interim, setInterim } = useContext(InterimCount)
  // const [ voiceCheered, setVoiceCheered ] = useState(false) 
  // 声援が入ればtrue。

  const controls = useAnimation()

  const [index, setIndex] = useState(0)
  const [info, setInfo] = useState('応援してください')
  const [num_participants, setNumParticipants] = useState()
  const [aveIndex, setAveIndex] = useState()
  const indexRef = useRef(0) // 過度なレンダリングを防ぐためuseRefを使用

  const [voiceAdd, setVoiceAdd] = useState(0)
  const voiceAddRef = useRef(0)

  // const ganbareChecker = () => {
  //   if (ganbareCount > prev_ganbare){
  //     ganbare - 
  //   }
  // }

  // サーバからの信号を受信したら作動
  useEffect(() => {
    socket.on('receive_message2', function(aveIndex) {
      setAveIndex(aveIndex)
    });
    return () => {
      socket.off('receive_message2');
    };
  }, []);
  
  // 現在のindexをサーバに送信。
  useEffect(() => {
    indexRef.current = index
  },[index])

  const sendmyindex = async (index) =>{
    await socket.emit("send_myindex" , index)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      sendmyindex(indexRef.current)
    }, 200);
    return () => clearInterval(interval);
    // アンマウント時にsetIntervalを解除してくれる
  }, []);

  // useEffect(() =>{
  //   voiceCheered = !voiceCheered;
  //   // () => controls.start({ x: [0, 100, 50] })
  //   controls.start({ x: [0, 100, 50] })
  //   // return () => voiceCheered = !voiceCheered;
  // },[ganbareCount])


  // これは良さげなコード
  // useEffect(() =>{
  //   const cheerNotify = async () =>{
  //     voiceCheered = true
  //     await new Promise(s => setTimeout(s, 2000))
  //     voiceCheered = false
  //     // setIndex((current) => (current + 50))
  //   }
  //   cheerNotify()
  // },[ganbareCount])

  // voiceCheered = false


  // useEffect(() =>{
  //   console.log(interim)
  //   voiceCheered = !voiceCheered;

  //   // return () => voiceCheered = !voiceCheered;
  // },[interim])

  // useEffect(() => {
  //   voiceAddRef.current = voiceAdd
  // },[voiceAdd])

  

  // const setIndexUp = () =>{
  //   additionalIndex(50);
  // }

  useDidUpdateEffect(() => {
    console.log("依存配列に変更がありました")
    additionalIndex(50)
    const cheerNotify = async () =>{
      voiceCheered = true
      await new Promise(s => setTimeout(s, 2000))
      voiceCheered = false
      // setIndex((current) => (current + 50))
    }
    cheerNotify()
  }, [ganbareCount]);


  return (
    <div className="App">
      <div className="team-index">
        <h1 className='title'>チーム全体の応援</h1>
        <h3>チーム全体の応援熱量: {aveIndex}</h3>
        <h3>ガンバレカウンター{ganbareCount}</h3>
        {/* <button onClick={setIndexUp} >aaa</button> */}
        {/* <button onClick={setIndex((current) => (current + 50))}>aaa</button> */}

        <Gauge score={index} />
        <StartSupport 
          num_participants={num_participants}
          index={index}
          />
      </div>

      <div className='bottom'>
        <h1 className='title'>あなたの応援</h1>
        <div className='monitor'>
            <Monitor useIndex={setIndex}  /> 
        </div>  

        <div className='info'>
            <h3>メッセージ：</h3>
            <h1>{info}</h1>
            <div className="minigauge">
              <h1>あなたの応援熱量</h1>
              <br />
              <MiniGauge score={index} />
            </div>
        </div>
        <AnimateSample />
      </div>


    </div>
  );
}

export default App;
