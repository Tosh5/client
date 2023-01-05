import React ,{useContext} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import {useGanbareUpdater} from './VoiceContext'
import { GanbareCount , interim, InterimCount } from './VoiceContext';


const AudioRecong = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    interimTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // const { ganbareCount, setGanbareCount} = useContext(UserCount);
  const { ganbareCount, setGanbareCount } = useContext(GanbareCount)
  // const { interim, setInterim } = useContext(InterimCount)

  var count1 = ( transcript.match( /頑張れ/g ) || [] ).length ;
  var count2 = ( transcript.match( /がんばれ/g ) || [] ).length ;
  var count3 = ( transcript.match( /ガンバレ/g ) || [] ).length ;
  var counts = count1+count2+count3

  setGanbareCount(counts)

  // var countInterim = ( interimTranscript.match( /頑張れ/g ) || [] ).length ;
  // setInterim(countInterim)

  if (!browserSupportsSpeechRecognition) {
    return (
      alert('このブラウザでは音声認識を利用できません。Chromeを使用してください。')
    )
  }

SpeechRecognition.startListening({continuous: true, language: "ja"})
console.log(`transcript is: ${transcript}`)
// console.log(`interim script is: ${interimTranscript}`)

  return (
    <div>      
    </div>
  );
};
export default AudioRecong;