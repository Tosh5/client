import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

const AudioRecong = () => {
    console.log('AudioRecong running')
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

//   var count = ( transcript.match( /頑張れ/g ) || [] ).length ;

//   if (transcript )

SpeechRecognition.startListening({continuous: true, language: "ja"})

  return (
    <div>
        {/* <p>{count}</p> */}
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      {/* <button className='button' onClick={SpeechRecognition.startListening({continuous: true, language: "ja"})}>Start</button> */}
      {/* <button className='button' onClick={SpeechRecognition.stopListening}>Stop</button>  */}
      {/* <button className='button' onClick={resetTranscript}>Reset</button> */}
      <p>here: {transcript}</p>
      
    </div>
  );
};
export default AudioRecong;