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

    const updateStatus=async(orderId,status)=>{
        try{
            
            const token=localStorage.getItem("token");
            const res=await API.put(
                `/orders/${orderId}/status`,{status},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setOrders(
                orders.map((order)=>
                    order._id===orderId
                   ? {...order,status}
                   :order
            )
            );


        }catch(error){
            console.log(error);
        }
    };

    const handleRefund=async(orderId)=>{
        try{

            const confirmRefund=window.confirm("Refunf this order");
            if(!confirmRefund){
                return;
            }
            const token=localStorage.getItem("token");
            await API.post("/payment/refund",{orderId},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            setOrders(
                orders.map((order)=>
                order._id===orderId
                ?{
                    ...order,
                    status:"CANCELLED",
                    isRefunded:true
                }
                :order
            )
            );

        }catch(error){
            console.log(error);
        }
    }

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
                            <strong>Payment:</strong>{" "}
                            <span
                               style={{
                                color:
                                order.isPaid?"green"
                                :"red",
                                fontWeight:"bold"
                               }}
                            >
                                {
                                    order.isPaid
                                    ?"✅ Paid"
                                    :"❌ Pending"
                                }
                            </span>
                        </p>
                        <p>
                            <strong>Status:</strong>{" "}
                            {order.status}
                        </p>
                        <div
                          style={{
                            marginTop:"15px",
                            display:"flex",
                            gap:"10px"
                          }}
                        >
                            {order.status==="PLACED" &&(
                                <button
                                 onClick={()=>
                                    updateStatus(order._id,"SHIPPED")
                                 }
                                 style={{
                                    padding:"10px 15px",
                                    border:"none",
                                    borderRadius:"10px",
                                    backgroundColor:"#4facfe",
                                    color:"white",
                                    cursor:"pointer",
                                    fontWeight:"bold"
                                 }}
                                >
                                    Mark Shipped
                                </button>
                            )
                        }

                        {
                            order.status==="SHIPPED" &&(
                                <button
                                  onClick={()=>
                                    updateStatus(order._id,"DELIVERED")
                                  }
                                  style={{
                                    padding:"10px 15px",
                                    border:"none",
                                    borderRadius:"10px",
                                    backgroundColor:"#32CD32",
                                    color:"white",
                                    cursor:"pointer",
                                    fontWeight:"bold"
                                  }}
                                >
                                    Mark Delivered
                                </button>
                            )
                        }
                        {
                            order.isPaid &&order.status!=="DELIVERED"&&
                            !order.isRefunded &&(
                                <button
                                 onClick={()=>handleRefund(order._id)}
                                  style={{
                                    padding:"10px 15px",
                                    border:"none",
                                    borderRadius:"10px",
                                    backgroundColor:"#ff4d4f",
                                    color:"white",
                                    cursor:"pointer",
                                    fontWeight:"bold"
                                  }}
                                >
                                    Refund Order
                                </button>
                            )
                        }
                        </div>
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