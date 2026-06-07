import {useState,useEffect} from "react";
import API from "../api/axios";
import {useNavigate} from "react-router-dom";

function AdminDashboard(){

    const [stats,setStats]=useState(null);
    const [lowStockProducts,setLowStockProducts]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchAnalytics=async()=>{
            try{

                const token=localStorage.getItem("token");
                const res=await API.get(
                    "/admin/analytics",
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );
                setStats(res.data.data);

            }catch(error){
              console.log(error);
            }
        };
        fetchAnalytics();
    },[]);

    

   useEffect(()=>{

    const lowStockRes=async()=>{
          try{
             const token=localStorage.getItem("token");
             const res=await API.get(
                "/admin/low-stock",{
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
             )
             setLowStockProducts(res.data);
          }catch(error){

            console.log(error)

          }

           
    }

     lowStockRes();

   },[]);

   if(!stats){
        return <h2>Loading....</h2>
    }
     
    return (
        <div
           style={{
            padding:"40px",
            backgroundColor:"#f5f5f5",
            minHeight:"100vh"
           }}
        >
            <h1
              style={{
                marginBottom:"30px"
              }}
            >Admin DashBoard</h1>
            <div 

            style={{
                display:"grid",
                gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",
                gap:"20px",
                marginBottom:"40px"
            }}
              
            >
                <div
                   style={{
                        backgroundColor:"white",
                        padding:"25px",
                        borderRadius:"18px",
                        boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
              }}
                >
                    <h3
                      style={{
                        color:"#666"
                      }}
                    >Total Products</h3>
                    <h1
                      style={{
                        marginTop:"10px"
                      }}
                    >{stats.totalProducts}</h1>
                    
                </div>
                <div
                    style={{
                        backgroundColor:"white",
                        padding:"25px",
                        borderRadius:"18px",
                        boxShadow:
                        "0 4px 10px rgba(0,0,0,0.1)"
                    }}
                    >

                    <h3
                        style={{
                            color:"#666"
                        }}
                    >
                        Total Users
                    </h3>

                    <h1
                        style={{
                            marginTop:"10px"
                        }}
                    >
                        {stats.totalUsers}
                    </h1>

                </div>

                <div
                    style={{
                        backgroundColor:"white",
                        padding:"25px",
                        borderRadius:"18px",
                        boxShadow:
                        "0 4px 10px rgba(0,0,0,0.1)"
                    }}
                    >

                    <h3
                        style={{
                            color:"#666"
                        }}
                    >
                        Total Orders
                    </h3>

                    <h1
                        style={{
                            marginTop:"10px"
                        }}
                    >
                        {stats.totalOrders}
                    </h1>

                    </div>
                    <div
                        style={{
                            backgroundColor:"white",
                            padding:"25px",
                            borderRadius:"18px",
                            boxShadow:
                            "0 4px 10px rgba(0,0,0,0.1)"
                        }}
                        >

                        <h3
                            style={{
                                color:"#666"
                            }}
                        >
                            Total Revenue
                        </h3>

                        <h1
                            style={{
                                marginTop:"10px"
                            }}
                        >
                            {stats.totalRevenue}
                        </h1>

                        </div>
            </div>
            <div
                style={{
                    marginBottom:"40px"
                }}
            >
                <h2
                  style={{
                    marginBottom:"20px"
                  }}
                >Managment</h2>
                <button
                    onClick={()=>navigate("/admin/coupons")}
                    style={{
                        padding:"14px 24px",
                        border:"none",
                        borderRadius:"12px",
                        backgroundColor:"#222",
                        color:"white",
                        fontWeight:"bold",
                        cursor:"pointer"
                    }}
                >
                    Manage Coupons
                </button>
            </div>

            <div
              style={{
                marginTop:"40px"
              }}
            >
                <h2
                 style={{
                    marginBottom:"20px"
                 }}
                > 🔥 Top Selling Products</h2>
                {
                    stats.topProduct.map((product)=>(
                        <div
                          key={product._id}
                          style={{
                            backgroundColor:"white",
                            padding:"20px",
                            borderRadius:"16px",
                            marginBottom:"15px",
                            boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                          }}
                        >
                            <h3>{product.name}</h3>
                            <p>
                                Sold:
                                {product.soldCount}
                            </p>
                            <p>
                                Stock:
                                {product.stock}
                            </p>
                        </div>
                    ))
                }
            </div>

            <div>
                <h2>⚠ Low Stock Products</h2>
                {
                    lowStockProducts.length >0 ?(

                        lowStockProducts.map((product)=>(
                            <div
                                key={product._id}
                                style={{
                                    backgroundColor:"white",
                                    padding:"20px",
                                    borderRadius:"16px",
                                    marginBottom:"15px",
                                    boxShadow:"0 4px 10px rgba(0,0,0,0.1)",
                                    display:"flex",
                                    justifyContent:"space-between",
                                    alignItems:"center"
                                }}
                            >
                                <div>
                                   <h3>{product.name}</h3> 

                                </div>
                                <span
                                   style={{
                                    backgroundColor:"#fee2e2",
                                    color:"#991b1b",
                                    padding:"8px 14px",
                                    borderRadius:"20px",
                                    fontWeight:"bold"
                                   }}
                                >Stock:{product.stock}</span>
                            </div>
                            
                        ))


                    ):(
                        <div
                           style={{
                            backgroundColor:"white",
                            padding:"20px",
                            borderRadius:"16px"
                           }}
                        >
                            ✅ No low stock products
                        </div>
                    )
                }
            </div>

            
        </div>
    )
}

export default AdminDashboard;