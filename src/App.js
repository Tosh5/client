import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card, Button } from 'react-bootstrap';
import io from "socket.io-client";

import './App.css';
import Gauge from './Gauge';
import { useEffect, useState } from 'react';
import Monitor from './Monitor';


const socket = io.connect("http://localhost:8000")


function App() {

  const [index, useIndex] = useState(0)
  const [received, setReceived] = useState("")

  const hello = "hello"

  const sendMessage = () =>{
    socket.emit("send_message", {message : "hello"})
  }

  const render = () =>{
    socket.on("receive_message", (data) => {
    console.log(data.message)
    // alert(data.message)
    // setReceived(data.message)
    })
  }

  render();
  



  // useEffect(() =>{
  //   render()
  // },[])

  return (
    <div className="App">
      <Button onClick={sendMessage} >Click </Button>
      <h1>ボタンを押すと、下にHelloと表示される</h1>
      <h1>{received}</h1>
      {/* <Gauge score={index} />
      <Monitor useIndex={useIndex} /> */}

      

      

      

    </div>
  );
}

export default App;
