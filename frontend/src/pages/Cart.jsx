import {useEffect,useState} from "react";
import API from "../api/axios";
import {useNavigate} from "react-router-dom";

function Cart(){
    const [cart,setCart]=useState(null);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchCart=async()=>{
            try{
                const token=localStorage.getItem("token");
                const res=await API.get("/cart",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
                    
                );
                
                setCart(res.data);
                localStorage.setItem("cartCount",res.data.items.length);

            }catch(error){
                console.log(error);
            }
        };
        fetchCart();
    },[]);
   
    const handleRemove=async(productId)=>{
        try{
           
            const token=localStorage.getItem("token");
            await API.delete(`/cart/${productId}`,{
         
                headers:{
                    Authorization:`Bearer ${token}`
                }

            });
            setCart((prev)=>({
               
                ...prev,
                items:prev.items.filter(
                    (item)=>item.product._id!==productId)
            }));
             localStorage.setItem("cartCount",cart.items.length-1);
             window.dispatchEvent(new Event("storage"));

        }catch(error){
             console.log(error)
        }
    };

    const updateQty=async(productId,newQty)=>{

        try{
            if(newQty<1) return;
            const token=localStorage.getItem("token");
            const res=await API.put(`/cart/${productId}`,
                {
                    qty:newQty
                },
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            setCart(res.data);
        }catch(error){
          console.log(error);
        }
    };

    const totalPrice=cart?.items?.reduce(
        (acc,item)=>acc+item.product.price*item.qty,0
    );

    const shipping=totalPrice>1000? 0:100;
    const grandTotal=totalPrice+shipping;

    return (
       <div style={{
        backgroundColor:"#f5f5f5",
        minHeight:"100vh",
        padding:"30px",
        fontFamily:"Arial"
        
        }}>
        <h1
         style={{
            marginBottom:"30px",
            color:"#222"
         }}
        >My Cart</h1>
        {
            cart?.items?.length>0?(
                cart.items.map((item)=>(
                    
                    <div key={item.product._id}
                    style={{
                      backgroundColor:"white",
                      borderRadius:"12px",
                      padding:"15px",
                      marginBottom:"20px",
                      display:"flex",
                      alignItems:"center",
                      justifyContent:"space-between",
                      boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                    }}>
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          style={{
                            width:"120px",
                            height:"100px",
                            objectFit:"cover",
                            borderRadius:"10px"
                          }}
                        />
                        <div style={{flex:1,marginLeft:"20px"}}>
                        <h3 style={{marginBottom:"10px",color:"#222"}}>
                            {item.product.name}
                        </h3>
                        <p style={{fontWeight:"bold",marginBottom:"5px"}}>
                            ₹{item.product.price}
                        </p>
                        <div 
                           style={{
                            display:"flex",
                            alignItems:"center",
                            gap:"15px",
                            marginTop:"10px"
                           }}
                        >
                            <button
                               onClick={()=>
                                updateQty(
                                    
                                    item.product._id,
                                    item.qty-1

                                )}
                                style={{
                                    width:"35px",
                                    height:"35px",
                                    border:"none",
                                    borderRadius:"8px",
                                    cursor:"pointer",
                                    fontSize:"18px",
                                    backgroundColor:"#ddd"
                                }}
                            >
                                -
                            </button>

                            <span
                              style={{
                                fontWeight:"bold",
                                fontSize:"18px"
                              }}
                            >
                                {item.qty}
                            </span>

                            <button
                              onClick={()=>
                                updateQty(
                                    item.product._id,
                                    item.qty+1
                                )
                              }
                              style={{
                                width:"35px",
                                height:"35px",
                                border:"none",
                                borderRadius:"8px",
                                cursor:"pointer",
                                fontSize:"18px",
                                backgroundColor:"#111",
                                color:"white"
                              }}
                            >+</button>
                        </div>


                       </div>
                       <button onClick={
                        ()=>handleRemove(item.product._id)
                       }
                         style={{
                            backgroundColor:"#ff4d4f",
                            color:"white",
                            border:"none",
                            padding:"10px 15px",
                            borderRadius:"8px",
                            cursor:"pointer"
                        }}
                       >
                        Remove
                       </button>
                    
                    </div>
                    

                ))
            ):(
                <p>Cart is empty</p>
            )
        }
        <div
          style={{
             backgroundColor:"white",
             padding:"20px",
             borderRadius:"12px",
             boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
             marginTop:"30px"
          }}
        >
            <h2
              style={{
                marginBottom:"20px",
                color:"#222"
              }}
            >Cart Summary</h2>
            <div
              style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"12px"
              }}
            >

            <span>Items</span>
            <span>{cart?.items?.length}</span>
                
            </div>

            <div
              style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"12px"
              }}
            >
                <span>Subtotal</span>
                <span>₹{totalPrice}</span>
            </div>

            <div
               style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"20px"
               }}
            >
                <span>Shipping </span>
                <span>
                    {shipping===0? " FREE":`₹${shipping}`}
                </span>
            </div>
            <hr style={{marginBottom:"20px"}}/>

            <div
              style={{
                display:"flex",
                justifyContent:"space-between",
                marginBottom:"25px",
                fontWeight:"bold",
                fontSize:"20px"
              }}
            >
                <span>Total</span>
                <span>₹{grandTotal}</span>
            </div>
            <button
              onClick={()=>navigate("/checkout")}
              style={{
                background:"#222",
                color:"white",
                padding:"14px",
                border:"none",
                borderRadius:"10px",
                width:"100%",
                cursor:"pointer",
                fontSize:"16px",
                fontWeight:"bold"
              }}
            >
                Proceed to Checkout
            </button>
          
        </div>

       </div>
    );
}
export default Cart;
