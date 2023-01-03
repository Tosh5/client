import React ,{useContext} from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import {useGanbareUpdater} from './VoiceContext'
import { GanbareCount } from './VoiceContext';


const AudioRecong = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  // const { ganbareCount, setGanbareCount} = useContext(UserCount);
  const { ganbareCount, setGanbareCount } = useContext(GanbareCount)

  var count1 = ( transcript.match( /頑張れ/g ) || [] ).length ;
  var count2 = ( transcript.match( /がんばれ/g ) || [] ).length ;
  var count3 = ( transcript.match( /ガンバレ/g ) || [] ).length ;
  var counts = count1+count2+count3

  // const ganbareUpdate = useGanbareUpdater()
  // ganbareUpdate(counts)
  setGanbareCount(counts)

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  // else{
  //   return
  // }

SpeechRecognition.startListening({continuous: true, language: "ja"})
console.log(transcript)

  return (
    <div>      
    </div>
  );
};
export default AudioRecong;