import {useEffect,useState} from "react";
import API from "../api/axios";
import {Link} from "react-router-dom";

function AdminProducts(){
     const [products,setProducts]=useState([]);
    useEffect(()=>{
    const fetchProducts=async()=>{
       

        try{
            
            const res=await API.get("/products");
            setProducts(res.data.data||res.data);
        }catch(error){
            console.log(error)
        }
    }

    fetchProducts();
    },[]);

    const handleDelete=async(productId)=>{
        try{
            const token=localStorage.getItem("token");
            const confirmDelete=window.confirm("Delete this product ?");
            if (!confirmDelete){
                return;
            }
            await API.delete(
                `/products/${productId}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            setProducts(
                products.filter((product)=>
                  product._id!=productId
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
            fontFamily:"Arial",
            maxWidth:"1200px",
            margin:"0 auto"
          }}
        >
            <h1
               style={{
                marginBottom:"30px"
               }}
            >
                Admin Products
            </h1>
            <Link
               to="/admin/add-product"
               style={{
                textDecoration:"none",
                backgroundColor:"#333",
                fontWeight:"600"
               }}
            >
              <button
                style={{
                    padding:"14px 20px",
                    border:"none",
                    borderRadius:"12px",
                    backgroundColor:"#333333",
                    color:"white",
                    cursor:"pointer",
                    fontWeight:"bold",
                    marginBottom:"25px"
                }}
              >
                ➕ Create Product
              </button>
            </Link>
            <div
               style={{
                display:"flex",
                flexWrap:"wrap",
                gap:"20px",
                justifyContent:"flex-start",
                alignItems:"flex-start"

               }}
            >
                {
                    products.map((product)=>(
                        <div
                         key={product._id}
                         style={{
                            width:"250px",
                            backgroundColor:"white",
                            padding:"16px",
                            borderRadius:"15px",
                            boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                         }}
                        >
                            <img 
                              src={product.image}
                              alt={product.name}
                              style={{
                                width:"100%",
                                height:"170px",
                                objectFit:"cover",
                                borderRadius:"10px",
                                marginBottom:"15px"
                              }}
                            />
                            <h3
                              style={{
                                marginBotttom:"10px"
                              }}
                            >{product.name}</h3>
                            <p
                             style={{
                                marginBottom:"10px"
                             }}
                            >₹{product.price}</p>
                            <p
                              style={{
                                marginBottom:"15px"
                              }}
                            >Stock:{product.stock}</p>
                            <Link
                              to={`/admin/edit-product/${product._id}`}
                              style={{
                                display:"block",
                                textDecoration:"none",
                                marginBottom:"14px"
                              }}
                            >
                             <button
                                style={{
                                      width:"100%",
                                      padding:"12px",
                                      border:"none",
                                      borderRadius:"10px",
                                      backgroundColor:"#4facfe",
                                      color:"white",
                                      cursor:"pointer",
                                      fontWeight:"bold"
                                }}
                             >
                                Edit Product
                             </button>
                            </Link>

                            <button
                             onClick={()=>
                                handleDelete(product._id)
                             }
                             style={{
                                width:"100%",
                                padding:"12px",
                                border:"none",
                                borderRadius:"10px",
                                backgroundColor:"#ff4d4f",
                                color:"white",
                                cursor:"pointer",
                                fontWeight:"bold"
                             }}
                            >Delete Product</button>
                        </div>
                    ))
                }
            </div>
        </div>
    );

}

export default AdminProducts;
