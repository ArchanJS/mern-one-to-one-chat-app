import React, {  useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate=useNavigate();

    const [username,setUsername]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const [userId,setUserId]=useState("");

    // useEffect(()=>{
    //     if(localStorage.getItem("chtToken")){
    //         axios.get('/api/private/getdetails',{
    //             headers:{
    //                 "Content-Type":"application/json",
    //                 Authorization:`Bearer ${localStorage.getItem("chtToken")}`
    //             }
    //         }).then(({data})=>{navigate('/chat',{state:data})});
    //     } 
    // })

    const loginFunc=async()=>{
        if(username.trim()&&email.trim()&&password.trim()){
            const {data}=await axios.post('/api/public/login',{username,email,password},{
                headers:{
                    "Content-Type":"Application/json"
                }
            });
            const res=await axios.post('/api/public/createchat',{user1:data,user2:userId},{
                             headers:{
                                "Content-Type":"application/json"
                             }});
            navigate('/chat',{state:{userId:data,roomId:res.data}});
        }
        else alert("Don't leave any field empty!");
    }

    return (
        <div className="join-div">
            <h1 className="join-header">Chat App</h1>
            <input type="text" className="join-inp" placeholder="Enter you name" value={username} onChange={(e)=>setUsername(e.target.value)} />
            <input type="text" className="join-inp" placeholder="Enter you email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" className="join-inp" placeholder="Enter you password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <input type="text" className="join-inp" placeholder="Enter the userId" value={userId} onChange={(e)=>setUserId(e.target.value)} />
            <button className="join-btn" onClick={loginFunc}>Login</button>
        </div>
    )
}

export default Login