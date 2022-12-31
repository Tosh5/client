// import React, { useEffect, useState } from "react";
// import io from "socket.io-client";

// const async = require("async");
// const socket = io.connect("https://cheer-app-server1.onrender.com")

// let myindex3 = 24

// const sendmyindex = async (props) =>{
//   console.log(`current myindex is...... ${props}`)
//   await socket.emit("send_myindex" , props)
//   console.log('ran sendTest')
// }


// function SendMyIndex(props) {

//   console.log(props.myindex)

//   useEffect(() => {
//     myindex3 = props.myindex
//   },[props.myindex])

//   useEffect(() => {
//     const interval = setInterval(() => {
//       sendmyindex(myindex3)
//     }, 100);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>MyIndex is : {myindex3}</div>
//   )
// }

// export default SendMyIndex