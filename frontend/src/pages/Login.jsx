import {useNavigate} from "react-router-dom";
import {useState} from "react";
import API from "../api/axios";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";


function Login(){
    const navigate=useNavigate();
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const handleLogin=async(e)=>{

        e.preventDefault();//stops page from reloading//
        console.log("login clicked")
        try{

            const res=await API.post("/users/login",{
                email,password
            });

            console.log(res.data);

            //save token//
            localStorage.setItem("token",res.data.token);
            toast.success(" ✅Login Successfull",{
                style:{
                   backgroundColor:"linear-gradient(to right, #4facfe, #00f2fe)",
                   color:"white"
                }
            });
            //alert("login successfull");
            navigate("/");

        }catch(error){
            
            console.log(error);
            toast.success("❌ Invalid credentials",{
                style:{
                    backgroundColor:"#ff4d4f",
                    color:"white"
                }
            })
            //alert("invalid credentials");

        }
    };

    return (
      <div 
        style={{
            minHeight:"100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"linear-gradient(to right,#141e30,#243b55)",
            fontFamily:"Arial"
        }}
      >
        <form
            onSubmit={handleLogin}
            style={{
                backgroundColor:"white",
                padding:"40px",
                borderRadius:"16px",
                width:"380px",
                boxShadow:"0 8px 20px rgba(0,0,0,0.3)"
            }}
        >
            <h1 style={{
                textAlign:"center",
                marginBottom:"10px",
                color:"#222"
                }}>
                Welcome Back 👋
            </h1>
            <p
              style={{
                textAlign:"center",
                marginBottom:"30px",
                color:"#666"
              }}
            >Login to continue shopping</p>
            <input 
               type="email"
               placeholder="Email"
               value={email}
               onChange={(e) =>setEmail(e.target.value)}
               style={{
                width:"100%",
                padding:"14px",
                marginBottom:"18px",
                borderRadius:"10px",
                border:"1px solid #ccc",
                fontSize:"15px",
                outline:"none",
                boxSizing:"border-box"
               }}
            />

            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                style={{
                    width:"100%",
                    padding:"14px",
                    marginBottom:"25px",
                    borderRadius:"10px",
                    border:"1px solid #ccc",
                    fontSize:"15px",
                    outline:"none",
                    boxSizing:"border-box"
                }}
            />
            <button
              type="submit"
              style={{
                width:"100%",
                padding:"14px",
                backgroundColor:" #4facfe",
                color:"white",
                border:"none",
                borderRadius:"10px",
                fontSize:"16px",
                fontWeight:"bold",
                cursor:"pointer"
              }}
            >
                Login
            </button>
        <p
        style={{
            textAlign:"center",
            marginTop:"20px",
            color:"#777",
            fontSize:"14px"
        }}
        >Don't have an account?{""}
        <Link
          to="/register"
          style={{
            color:"#4facfe",
            textDecoration:"none",
            fontWeight:"bold"
          }}
        >Register</Link>
        </p>
        </form>
      </div>
    );
}

export default Login;