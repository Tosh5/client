
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';






import Avatar from '@mui/material/Avatar';




import * as React from 'react';


import Button from '@mui/material/Button';
import Item from '@mui/material/Button';
import Grid from '@mui/material/Button';
import { shadows } from '@mui/system';



// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import { Card, Button } from 'react-bootstrap';


import io from "socket.io-client";

import './App.css';
import Gauge from './Gauge';
import MiniGauge from './MiniGauge';
import { useEffect, useState } from 'react';
import Monitor from './Monitor';
import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import { Info } from './Info';


const socket = io.connect("http://localhost:8000")


function App() {

  const [index, useIndex] = useState(0)
  const [received, setReceived] = useState("サーバと接続できていません")

  const [totalIndex, setTotalIndex] = useState('')

  const [info, useInfo] = useState('応援してください')

  const hello = "hello"

  const sendMessage = () =>{
    socket.emit("send_message", {message : "hello"})
  }
  const sendIndex = () =>{
    socket.emit("sendIndex" , {index : index})
  }

  sendIndex();

  const render = () =>{
    socket.on("fan", (data) =>{
      setReceived(data.index)
    })
  }
  
  render();

  const render2 = () =>{
    socket.on("fan", (data) =>{
      setTotalIndex(data.index)
    })
  }

  render2();





  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));


  const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));
  
  const message = `Truncation should be conditionally applicable on this long line of text
   as this is a much longer line than what the container can support. `;



  return (
    <div className="App">
      {/* <Button onClick={sendMessage} >Click </Button>
      <h1>ボタンを押すと、下にHelloと表示される</h1> */}


      {/* <h1>盛り上がり指数</h1>
      <h3>{received}</h3>
      <Gauge score={index} />
      <Monitor useIndex={useIndex} /> */}





<Box
  sx={{
    display: 'grid',
    gridAutoColumns: '1fr',
    gap: 1,
  }}
>
  <Item sx={{ gridRow: '1', gridColumn: 'span 3' }}>
    <h1>合計盛り上がり度</h1>
  <Gauge score={totalIndex} />
  </Item>
  <Item sx={{ gridRow: '1', gridColumn: 'span 2' }}>
    <h1>ブーイング</h1>
  <Gauge score={index} />
  </Item>
</Box>



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

      

      
<Info />

      

    </div>
  );
}

export default App;
