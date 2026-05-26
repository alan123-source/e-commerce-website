import {useEffect,useState} from "react";
import API from "../api/axios";

function MyOrders(){

    const [orders,setOrders]=useState([]);

    useEffect(()=>{
        const fetchOrders=async()=>{

            try{

                const token=localStorage.getItem("token");
                const res=await API.get(
                    "/orders/my-orders",
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );
                console.log(res.data);
                setOrders(res.data.data||res.data);

            }catch(error){
                console.log(error);

            }
        };
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
                marginBottom:"30px",
                color:"#222"
              }}
            >
                My Orders
            </h1>
            {
                orders.length>0?(

                    orders.map((order) =>(
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
                            <h3
                              style={{
                                mrginBottom:"10px"
                              }}
                            >Order ID</h3>
                            <p
                            style={{
                                marginBottom:"15px",
                                color:"666",
                                fontSize:"14px"
                            }}
                            >{order._id}</p>
                            <p
                              style={{
                                marginBottom:"10px"
                              }}
                            >
                                <strong>Status:</strong>{""}
                                <span
                                  style={{
                                    color:order.status==="DELIVERED"
                                    ?"green"
                                    : order.status==="CANCELLED"
                                    ?"red"
                                    :"#ff9966",
                                    fontWeight:"bold"
                                  }}
                                >
                                    {order.status}
                                </span>
                            </p>
                            <p 
                             style={{
                                marginBottom:"10px"
                             }}
                            >
                                <strong>Total:</strong>{""}
                                ₹{order.totalPrice}
                            </p>
                            <p
                              style={{
                                marginBottom:"10px"
                              }}
                            >
                                <strong>Items:</strong>{""}
                                {order.orderItems.length}
                            </p>
                            <p>
                                <strong>Date:</strong>{""}
                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString()}
                            </p>
                        </div>
                    ))

                ):(
                <p>No orders yet</p>
                )
            }
        </div>
    );

}

export default MyOrders;