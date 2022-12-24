
import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';




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
import { useEffect, useState } from 'react';
import Monitor from './Monitor';
import { Box } from '@mui/system';


const socket = io.connect("http://localhost:8000")


function App() {

  const [index, useIndex] = useState(0)
  const [received, setReceived] = useState("サーバと接続できていません")

  const hello = "hello"

  const sendMessage = () =>{
    socket.emit("send_message", {message : "hello"})
  }

  // const render = () =>{
  //   socket.on("receive_message", (data) => {
  //   // console.log(data.message)
  //   // alert(data.message)
  //   setReceived(data.message)
  //   })
  // }

  // render();

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



  // useEffect(() =>{
  //   render()
  // },[])


  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));



  return (
    <div className="App">
      {/* <Button onClick={sendMessage} >Click </Button>
      <h1>ボタンを押すと、下にHelloと表示される</h1> */}


      {/* <h1>盛り上がり指数</h1>
      <h3>{received}</h3>
      <Gauge score={index} />
      <Monitor useIndex={useIndex} /> */}

<StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar>W</Avatar>
          </Grid>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid>
      </StyledPaper>


      <StyledPaper
        sx={{
          my: 1,
          mx: 'auto',
          p: 2,
        }}
      >

<Box
  sx={{
    display: 'grid',
    gridAutoColumns: '1fr',
    gap: 1,
  }}
>
  <Item sx={{ gridRow: '1', gridColumn: 'span 3' }}>span 2</Item>
  {/* The second non-visible column has width of 1/4 */}
  <Item sx={{ gridRow: '1', gridColumn: 'span 2' }}>4 / 5
  <Gauge score={index} />
  </Item>
</Box>


        {/* <Grid container wrap="nowrap" spacing={2}>
          <Grid item xs>
            <Typography>{message}</Typography>
          </Grid>
        </Grid> */}
      </StyledPaper>

{/* 
<Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8} md={8} sx={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
        <Grid item xs={4} md={4} sx={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={4} md={4} sx={4}>
          <Item>xs=6 md=4</Item>
        </Grid>
        <Grid item xs={8} md={8} sx={8}>
          <Item>xs=6 md=8</Item>
        </Grid>
      </Grid>
    </Box> */}

{/* 

<Grid container spacing={2}>
  <Grid item xs={6} md={8}>
    <Item>xs=6 md=8</Item>
  </Grid>
  <Grid item xs={6} md={4}>
    <Item>xs=6 md=4</Item>
  </Grid>
  <Grid item xs={6} md={4}>
    <Item>xs=6 md=4</Item>
  </Grid>
  <Grid item xs={6} md={8}>
    <Item>xs=6 md=8</Item>
  </Grid>
</Grid> */}


<br></br>

{/* <Grid container spacing={2}>
  <Grid xs={8}>
    <Item>xs=8</Item>
  </Grid>
  <Grid xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid xs={4}>
    <Item>xs=4</Item>
  </Grid>
  <Grid xs={8}>
    <Item>xs=8</Item>
  </Grid>
</Grid> */}


<Box
  sx={{
    display: 'grid',
    gridAutoColumns: '1fr',
    gap: 1,
  }}
>
  <Item sx={{ gridRow: '1', gridColumn: 'span 3' }}>span 2</Item>
  {/* The second non-visible column has width of 1/4 */}
  <Item sx={{ gridRow: '1', gridColumn: 'span 2' }}>4 / 5
  <Gauge score={index} />
  </Item>
</Box>


<Box
  sx={{
    display: 'grid',
    gridAutoColumns: '1fr',
    gap: 1,
  }}
>
  <Item sx={{ gridRow: '1', gridColumn: 'span 2' }}>span 2</Item>
  {/* The second non-visible column has width of 1/4 */}
  <Item sx={{ gridRow: '1', gridColumn: '4 / 5' }}>4 / 5
  <Gauge score={index} />
  </Item>
</Box>


<Box
  sx={{
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: 1,
    gridTemplateRows: 'auto',
    gridTemplateAreas: `"header header header header"
  "main main . sidebar"
  "footer footer footer footer"`,
  }}
>
  <Box sx={{ gridArea: 'header', bgcolor: 'primary.main' }}>Header</Box>
  
  <Box
    sx={{
      display: 'grid',
      gridAutoColumns: '1fr',
      gap: 1,
  }}>
  <Item sx={{ gridRow: '1', gridColumn: 'span 2' }}>span 2</Item>
  {/* The second non-visible column has width of 1/4 */}
  <Item sx={{ gridRow: '1', gridColumn: '4 / 5' }}>4 / 5</Item>
</Box>



  <Box sx={{ gridArea: 'main', bgcolor: 'secondary.main' }}>Main</Box>
  <Box sx={{ gridArea: 'sidebar', bgcolor: 'error.main' }}>Sidebar</Box>
  <Box sx={{ gridArea: 'footer', bgcolor: 'warning.dark' }}>Footer</Box>
</Box>
{/* <Box sx={{ width: 1/4 ,boxShadow: 0 }}> arstarstarstarstarstarstarstarstarstarstarstarstarstarstarstarsta </Box> */}
{/* <Box sx={{ width: 300 }}> // Numbers are converted to pixel values.
<Box sx={{ width: '75%' }}> // String values are used as raw CSS.
<Box sx={{ width: 1 }}> // 100% */}


      

      

      

      

    </div>
  );
}

export default App;
