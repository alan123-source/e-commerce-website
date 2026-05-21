import {useEffect,useState} from "react";
import API from "../api/axios";

function Cart(){
    const [cart,setCart]=useState(null);
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
                console.log(res.data);
                setCart(res.data);

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

        }catch(error){
             console.log(error)
        }
    };

    const totalPrice=cart?.items?.reduce(
        (acc,item)=>acc+item.product.price*item.qty,0
    );

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
                            obectFit:"cover",
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
                        <p style={{color:"#555"}}>
                            Qty:{item.qty}
                        </p>
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
            <h2 style={{marginBottom:"15px"}}>Cart Summary</h2>
            <p style={{marginBottom:"10px"}}>
                Total Items:{cart?.items?.length}
            </p>
            <h3 style={{marginBottom:"20px"}}>
                Total Price:₹{totalPrice}
            </h3>
            <button
              style={{
                backgroundColor:"#222",
                color:"white",
                padding:"12px",
                border:"none",
                borderRadius:"8px",
                width:"100%",
                cursor:"pointer",
                fontSize:"16px"
              }}
            >
                Proceed to Checkout
            </button>
        </div>

       </div>
    );
}
export default Cart;
