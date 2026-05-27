import {useState,useEffect} from "react";
import API from "../api/axios";

function AdminOrders(){

    const [orders,setOrders]=useState([]);
    useEffect(()=>{
        const fetchOrders=async()=>{

            try{
                const token=localStorage.getItem("token");
                const res=await API.get(
                    "/orders",
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );
                console.log(res.data);
                setOrders(res.data);
            }catch(error){
                console.log(error);
            }
        }
        fetchOrders();
    },[]);

    return (
        <div 
          style={{
            minHeight:"100vh",
            backgroundColor:"#f5f5f5",
            padding:"40px",
            fontFamily:"Arial"
          }}
        >
            <h1
              style={{
                marginBottom:"30px"
              }}
            >Admin Orders</h1>
            {
                orders.map((order)=>(
                    <div 
                      key={order._id}
                      style={{
                        backgroundColor:"white",
                        padding:"25px",
                        borderRadius:"15px",
                        marginBottom:"20px",
                        boxShadow:"0 4px 10px rgba(0,0,0,0.1)"

                      }}
                    >
                        <p>
                            <strong>User:</strong>{" "}
                            {order.user?.email}
                        </p>
                        <p>
                            <strong>Total:</strong>{" "}
                            ₹{order.totalPrice}
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {order.status}
                        </p>
                        <p>
                            <strong>Date:</strong>{" "}
                            {new Date(order.createdAt).toLocaleDateString()}
                        </p>

                    </div>
                ))
            }

        </div>
    );

}

export default AdminOrders;