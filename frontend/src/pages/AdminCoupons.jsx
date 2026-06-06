import {useState,useEffect} from "react";
import API from "../api/axios";
import {toast} from "react-toastify"

function AdminCoupons(){

    const [coupons,setCoupons]=useState([]);

    const [couponCode,setCouponCode]=useState("");
    const [discountPercentage,setDiscountPercentage]=useState("");
    const [expiryDate,setExpiryDate]=useState("");
    
    useEffect(()=>{
    
        const fetchCoupons=async()=>{
            try{
               const token=localStorage.getItem("token");
                const res=await API.get(
                    "/coupons",
                   {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                   }
                )

                setCoupons(res.data);

            }catch(error){
                console.log(error)
            }
        }

        fetchCoupons();
    },[]);

    const handleCreateCoupon=async()=>{

        if(!couponCode||!discountPercentage||!expiryDate){
            toast.error("Please fill all fields");
            return;
        }

        try{
            const token=await localStorage.getItem("token");
            const res=await API.post(
               "/coupons",{
                code:couponCode,
                discountPercentage,
                expiryDate
               },{

                headers:{
                    Authorization:`Bearer ${token}`
                }

               }
            );

            setCoupons([
                res.data,
                ...coupons
            ]);

            setCouponCode("");
            setDiscountPercentage("");
            setExpiryDate("");
            toast.success("Created coupon successfully");
        

        }catch(error){
            console.log(error)
            toast.error(
                error.response?.data?.message||"Falied to create coupon"
            );
        }

    };

    const handleToggleCoupon=async(couponId)=>{

        try{
            const token=await localStorage.getItem("token");
            const res=await API.patch(
                `/coupons/${couponId}/toggle`,{},
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );
            setCoupons(coupons.map((coupon)=>
                coupon._id===couponId
                ?res.data
                :coupon
        
        ));

        }catch(error){
            console.log(error);
            toast.error("Failed to update coupon");
        }

    };

    const inputStyle={
        width:"90%",
        padding:"12px",
        border:"1px solid #d1d5db",
        borderRadius:"10px",
        fontSize:"15px",
        outline:"none"
    }

    return(
        <div
            style={{
                padding:"40px",
                maxWidth:"1200px",
                margin:"0 auto",
                minHeight:"100vh",
                backround:"linear-gradient(135deg,#f8fafc,#eef2ff)"
            }}
        >
            <h1
                style={{
                    marginBottom:"10px",
                    fontSize:"38px",
                    fontWeight:"800",
                    color:"#111827"
                }}
            >
                🎟Admin Coupons
            </h1>

            <div
                style={{
                    backgroundColor:"white",
                    padding:"25px",
                    borderRadius:"16px",
                    marginBottom:"30px",
                    boxShadow:"0 10px 30px rgba(0,0,0,0.08)",
                    border:"1px solid #e5e7eb"
                }}
            >
                <h2>Create Coupon</h2>
                <input 
                    type="text"
                    placeholder="Coupon Code"
                    value={couponCode}
                    onChange={(e)=>setCouponCode(e.target.value)}
                    style={inputStyle}
                />

                <br /><br />

                <input 
                   type="text"
                   placeholder="Discount percentage"
                   value={discountPercentage}
                   onChange={(e)=>setDiscountPercentage(e.target.value)}
                   style={inputStyle}
                />
                <br /><br />

                <input 
                   type="date"
                   placeholder="date"
                   value={expiryDate}
                   onChange={(e)=>setExpiryDate(e.target.value)}
                   style={inputStyle}
                />
                <br /><br />
                <button
                    onClick={handleCreateCoupon}
                    style={{
                        padding:"12px 20px",
                        border:"none",
                        borderRadius:"10px",
                        background:
                        "linear-gradient(135deg,#6366f1,#8b5cf6)",
                        color:"white",
                        fontWeight:"bold",
                        cursor:"pointer"
                    }}
                >
                     Create Button
                </button>
            </div>

            <div>
                <h2>
                    All coupons
                </h2>
                {
                    coupons.map((coupon) =>(
                        <div
                           key={coupon._id}
                           style={{
                               display:"flex",
                               justifyContent:"space-between",
                               alignItems:"center",
                               padding:"15px 0",
                               borderBottom:"1px solid #eee"
                           }}
                        
                        >
                            <div>
                                <strong
                                   style={{
                                    fontSize:"18px",
                                    color:"#4338ca",
                                    letterSpacing:"1px"
                                   }}
                                >
                                    {coupon.code}
                                </strong>
                                <p>
                                    Discount:{" "}
                                    {coupon.discountPercentage}%
                                </p>
                                <p>
                                    Expiry:{" "}
                                    {new Date(
                                        coupon.expiryDate
                                    ).toLocaleString()}
                                </p>
                                <div
                                    style={{
                                        marginTop:"8px"
                                    }}
                                >
                                    <span
                                        style={{
                                            padding:"6px 12px",
                                            borderRadius:"999px",
                                            fontWeight:"600",
                                            backgroundColor:
                                            coupon.isActive
                                            ? "#dcfce7"
                                            : "#fee2e2",
                                            color:
                                            coupon.isActive
                                            ? "#166534"
                                            : "#991b1b"
                                        }}
                                    >
                                        {
                                            coupon.isActive
                                            ? "Active"
                                            : "Inactive"
                                        }
                                    </span>
                                </div>
                            </div>
                            <button
                               onClick={()=>handleToggleCoupon(coupon._id)}
                               style={{
                                border:"none",
                                borderRadius:"10px",
                                padding:"10px 16px",
                                color:"white",
                                fontWeight:"bold",
                                cursor:"pointer",
                                background:coupon.isActive
                                ?"#ef4444"
                                :"#22c55e"
                               }}
                            >
                                {
                                    coupon.isActive
                                    ?"Deactivate"
                                    :"Activate"
                                }
                            </button>
                        </div>
                    ))
                }
            </div>

        </div>
    )


}
export default AdminCoupons;