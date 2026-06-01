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

    const handleCancelOrder=async(orderId)=>{
        try{

            const token=localStorage.getItem("token");
            await API.put(
                `/orders/${orderId}/cancel`,
                {},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            setOrders(
                orders.map((order)=>
                order._id===orderId
                ?{...order,status:"CANCELLED"}
                :order
                )
            );

        }catch(error){
            console.log(error)
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
                                    marginTop:"10px",
                                    fontWeight:"bold",
                                    color:
                                 order.isPaid?"green"
                                 :"red"   
                                }}
                             >
                                {
                                    order.isPaid ? "✅ Paid"
                                    :"❌ Pending"
                                }
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
                                <strong>Ordered on:</strong>{""}
                                {new Date(
                                    order.createdAt
                                ).toLocaleDateString()}
                            </p>

                            {
                                order.status==="PLACED" &&(
                                  <button
                                    onClick={()=>
                                        handleCancelOrder(order._id)
                                    }
                                    style={{
                                        marginTop:"15px",
                                        padding:"10px 18px",
                                        border:"none",
                                        borderRadius:"10px",
                                        backgroundColor:"#ff4d4f",
                                        color:"white",
                                        cursor:"pointer",
                                        fontWeight:"bold"
                                    }}
                                  >
                                    Cancel Order
                                  </button>  
                                )
                            }

                        <div
                          style={{
                            marginTop:"20px"
                          }}
                        >
                            {
                                order.orderItems.filter((item)=>item.product).map((item)=>(
                                    <div 
                                      key={item._id}
                                      style={{
                                        display:"flex",
                                        alignItems:"center",
                                        gap:"15px",
                                        marginBottom:"15px",
                                        backgroundColor:"#f9f9f9",
                                        padding:"10px",
                                        borderRadius:"10px"
                                      }}
                                    >
                                        <img
                                          src={item.product.image}
                                          alt={item.product.name}
                                          style={{
                                            width:"70px",
                                            height:"70px",
                                            objectFit:"cover",
                                            borderRadius:"10px",

                                          }}
                                        />
                                        <div>
                                            <h4
                                              style={{
                                                marginBottom:"5px"
                                              }}
                                            >{item.product.name}</h4>
                                            <p>
                                                Qty:{item.qty}
                                            </p>
                                            <p>₹{item.price}</p>
                                        </div>
                                    </div>

                                )
                                )
                            }
                        </div>

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