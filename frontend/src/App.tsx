import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
const socket = io(import.meta.env.VITE_WS_URL || 'http://localhost:4000');
export default function App(){
  const [msgs,setMsgs]=useState([]); const [text,setText]=useState('');
  useEffect(()=>{socket.on('message',(m)=>setMsgs((p)=>[...p,m]));},[]);
  return <div style={{padding:20,background:'#111b21',color:'white',minHeight:'100vh',fontFamily:'sans-serif'}}>
    <h2>VECTOR CHAT - By David Kamsi Elvis | Vector's Element Tech</h2>
    <div style={{border:'1px solid #333',height:300,overflow:'auto',padding:10,marginBottom:10}}>{msgs.map((m,i)=><div key={i}>{m.content||JSON.stringify(m)}</div>)}</div>
    <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type message" style={{padding:10,width:'70%'}}/>
    <button onClick={()=>{socket.emit('message',{content:text}); setText('')}} style={{padding:10,background:'#4f46e5',color:'white',marginLeft:10}}>Send</button>
    <div style={{marginTop:20}}><a href="/health" style={{color:'#4f46e5'}}>Backend Health: /health</a></div>
  </div>
}
