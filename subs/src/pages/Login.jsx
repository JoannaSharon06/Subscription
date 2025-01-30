import {useState} from 'react'
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const Login=(p)=>{
    const navigate = useNavigate();
     const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const handleLogin =async (e) =>{
        e.preventDefault()
        try{
            console.log("event triggered");
            const req = await axios.post("https://subscription-1-08z8.onrender.com/login",{
              email:email,
              password:password
            })
            
            alert(req.data.response);
            if(req.data.loginStatus){
              localStorage.setItem("userEmail", email);
              navigate("/home");
            }
            else{
              navigate("/login")
            }
          }
            catch(err){
              console.log(err);
            }
      }

    return(
        <div>
            <form method = "POST" onSubmit={handleLogin}>
            Email : <input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/><br/>
            Password : <input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/><br/>
            <button type='submit'>Login</button>
            </form>
        </div>
    )
}

export default Login