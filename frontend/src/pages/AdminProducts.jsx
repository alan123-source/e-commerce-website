import {useEffect,useState} from "react";
import API from "../api/axios";

function AdminProducts(){
     const [products,setProducts]=useState([]);
    useEffect(()=>{
    const fetchProducts=async()=>{
       

        try{
            
            const res=await API.get("/products");
            console.log(res.data);
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
        <div>
            <h1>
                Admin Products
            </h1>
            <div>
                {
                    products.map((product)=>(
                        <div
                         key={product._id}
                         style={{
                            backgroundColor:"white",
                            padding:"20px",
                            borderRadius:"15px",
                            boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                         }}
                        >
                            <img 
                              src={product.image}
                              alt={product.name}
                              style={{
                                width:"100%",
                                height:"200px",
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
