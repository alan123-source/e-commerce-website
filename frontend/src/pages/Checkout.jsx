import {useNavigate} from "react-router-dom";
import API from "../api/axios";
import {toast} from "react-toastify";
import {useEffect,useState} from "react";

function Checkout(){
    const navigate=useNavigate();
    const [fullName,setFullName]=useState("");
    const [address,setAddress]=useState("");
    const [city,setCity]=useState("");
    const [postalCode,setPostalCode]=useState("");
    const [cart,setCart]=useState(null);
    const [couponCode,setCouponCode]=useState("");
    const [discount,setDiscount]=useState(0);

    useEffect(()=>{
  
      const fetchCart=async()=>{
        try{

          const token=localStorage.getItem("token");
          const res=await API.get(
            "/cart",
            {
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          );
          setCart(res.data)

        }catch(error){
          console.log(error);

        }
      };
      fetchCart();
    },[]);


    const handleApplyCoupon=async()=>{

      try{

        const res=await API.post(
          "coupons/validate",{
            code:couponCode
          }
        );

        setDiscount(res.data.discountPercentage);
        toast.success(`${res.data.discountPercentage}% discount applied`);


      }catch(error){
        console.log(error);
        toast.error("Invalid Coupon")
      }

    }


     const handlePlaceOrder=async()=>{

      if(!fullName||!address||!city||!postalCode){
        toast.success("❌ Please fill all address fields",{
          style:{
            backgroundColor:"#ff4d4f",
            color:"white"
          }
        });

        return;
      }

       try{

        const token=localStorage.getItem("token");
        
        const res=await API.post(
          "/orders/from-cart",
          {fullName,
            address,
            city,
            postalCode,
            couponCode
          },
          {
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );
       
        const orderId=res.data._id;
       // toast.success(" 🎉 Order placed successfully");
        localStorage.setItem("cartCount",0);
        window.dispatchEvent(new Event("storage"));
        navigate(`/payment/${orderId}`);

       }catch(error){

        console.log(error);
        
        toast.success("❌ Failed to place order",{
          style:{
                   backgroundColor:"linear-gradient(to right, #4facfe, #00f2fe)",
                   color:"white"
                }
        });

       }  
    }

    const subtotal=cart?.items?.reduce(
      (acc,item)=>
        acc+item.product.price*item.qty,
      0
    ) || 0;

    const shipping=subtotal >1000 ? 0:100;
    const discountAmount=subtotal*(discount/100);
    const total=subtotal+shipping-discountAmount;

    return (
        <div
          style={{
            minHeight:"100vh",
            backgroundColor:"#f5f5f5",
            padding:"40px",
            fontFamiy:"Arial"
          }}
        >
            <h1 
              style={{
                marginBottom:"30px",
                color:"#222"
              }}
            >Checkout</h1>
            <div
              style={{
                display:"flex",
                gap:"30px",
                alignItems:"flex-start"
              }}
            >
                <div
                   style={{
                    flex:2,
                    backgroundColor:"white",
                    padding:"30px",
                    borderRadius:"15px",
                    boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                   }}
                >
                    <h2 style={{marginBottom:"20px"}}>Shipping Address</h2>
                    <input 
                       
                       type="text"
                       placeholder="Full Name"
                       value={fullName}
                       onChange={(e)=>setFullName(e.target.value)}
                       style={inputStyle}
                    />
                    <input 
                     type="text"
                     placeholder="Address"
                     value={address}
                     onChange={(e)=>setAddress(e.target.value)}
                     style={inputStyle}
                    />
                    <input 
                      type="text"
                      placeholder="city"
                      value={city}
                      onChange={(e)=>setCity(e.target.value)}
                      style={inputStyle}
                    />
                    <input 
                       type="text"
                       placeholder="Postal Code"
                       value={postalCode}
                       onChange={(e)=>setPostalCode(e.target.value)}
                       style={inputStyle}
                    />
                </div>
                <div 
                  style={{
                    flex:1,
                    backgroundColor:"white",
                    padding:"30px",
                    borderRadius:"15px",
                    boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                  }}
                >
                    <h2 style={{marginBottom:"20px"}}>Order Summary</h2>

                    <div
                      style={{
                        marginBottom:"20px"
                      }}
                    >
                      <input 
                        type="text"
                        value={couponCode}
                        onChange={(e)=>setCouponCode(e.target.value)}
                        style={{
                          width:"100%",
                          padding:"10px",
                          marginBottom:"10px"
                        }}
                      />
                      <button
                        onClick={handleApplyCoupon}
                        style={{
                          width:"100%",
                          padding:"10px",
                          curson:"pointer",
                          borderRadius:"20px"
                        }}
                      >
                        Apply Coupon
                      </button>

                    </div>

                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginBottom:"15px"
                    }}>
                        <span>Subtotal</span>
                        <span>₹{subtotal}</span>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginBottom:"15px"
                    }}>
                        <span>Shipping</span>
                        <span>
                          {shipping===0 ? "FREE":`₹${shipping}` }
                        </span>
                    </div>
                    <hr style={{marginBottom:"20px"}} />
                    <div
                       style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginBottom:"25px",
                        fontWeight:"bold",
                        fontSize:"20px"
                       }}
                    >{
                      discount>0 &&(
                        <div
                          style={{
                            display:"flex",
                            justifyContent:"space-between",
                            alignItems:"center",
                            marginBottom:"15px",
                            color:"green",
                            
                          }}
                        >
                          <span>Discount</span>
                          <span>-₹{discountAmount}</span>
                        </div>
                      )

                    }
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>
                    <button

                      onClick={handlePlaceOrder}
                      style={{
                        width:"100%",
                        padding:"14px",
                        border:"none",
                        borderRadius:"10px",
                        background:"#222",
                        color:"white",
                        fontSize:"16px",
                        fontWeight:"bold",
                        cursor:"pointer"
                      }}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

const inputStyle={
    width:"100%",
    padding:"14px",
    marginBottom:"18px",
    borderRadius:"10px",
    border:"1px solid #ccc",
    fontSize:"15px",
    boxSizing:"border-box"
}

export default Checkout;