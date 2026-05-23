import {useState} from "react";
import {useNavigate} from "react-router-dom";
import API from "../api/axios";
import {Link} from "react-router-dom";

function Register(){
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleRegister=async(e)=>{

        e.preventDefault();

        try{

            const res=await API.post("/users/register",{
                name,
                email,
                password
            });

            console.log(res.data);
            localStorage.setItem("token",res.data.token);
            alert("registration successful");
            navigate("/");

        }catch(error){

           console.log(error.response.data);
           alert("registration failed");
        }

    };

    return (
        <div 
          style={{
            minHeight:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            background: "rgba(255, 255, 255, 0.41)",
            fontFamily:"Arial"

          }}
        >
          <form
            onSubmit={handleRegister}
            style={{
                backgroundColor:"white",
                padding:"40px",
                borderRadius:"16px",
                width:"380px",
                boxShadow:"0 10px 25px rgba(0,0,0,0.25)"
            }}
          >
            <h1
               style={{
                textAlign:"center",
                marginBottom:"10px",
                color:"#222",
                fontSize:"32px"
               }}
            >Create Acount</h1>

            <p
              style={{
                textAlign:"center",
                marginBottom:"35px",
                color:"#666",
                fontSize:"15px"
              }}
            >Join Myshop and start shopping today</p>

            <input 
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              style={{
                width:"100%",
                padding:"15px",
                marginBottom:"18px",
                borderRadius:"12px",
                border:"1px solid #ddd",
                fontSize:"15px",
                outline:"none",
                boxSizing:"border-box"
              }}

            />

            <input 
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              style={{
                width:"100%",
                padding:"15px",
                marginBottom:"18px",
                borderRadius:"12px",
                border:"1px solid #ddd",
                fontSize:"15px",
                outline:"none",
                boxSizig:"border-box"
              }}
            />
            <input 
              type="password"
              value={password}
              placeholder="Enter your password"
              onChange={(e)=>setPassword(e.target.value)}
              style={{
                width:"100%",
                padding:"15px",
                marginBottom:"28px",
                borderRadius:"12px",
                border:"1px solid #ddd",
                boxSizing:"border-box",
                fontSize:"15px",
                outline:"none",

              }}
            />
            <button
              type="submit"
              style={{
                width:"100%",
                padding:"15px",
                background:
                "#ff5e62",
                color:"white",
                border:"none",
                borderRadius:"12px",
                fontSize:"16px",
                fontWeight:"bold",
                cursor:"pointer",
                boxShadow:"0 4px 10px rgba(0,0,0,0.2)"
              }}
            >
                Create Account
            </button>
           <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#777",
          fontSize: "14px"
        }}
    >Alraedy have an account?{""}
    <Link
     to="/login"
     style={{
        color:"#ff5e62",
        textDecoration:"none",
        fontWeight:"bold"
     }}
    >Login</Link>
    </p>
          </form>
        </div>
    );
}

export default Register;