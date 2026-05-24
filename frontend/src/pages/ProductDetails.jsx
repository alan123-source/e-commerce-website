import {useEffect,useState} from "react";
import {useParams} from "react-router-dom";
import API from "../api/axios";
import {handleAddToCart} from "../utils/cart.js";

function ProductDetails(){

    const {id}=useParams();
    const [product,setProduct]=useState(null);

    useEffect(()=>{
        const fetchProduct=async()=>{
            try{
                const res=await API.get(`/products/${id}`);
                console.log(res.data);
                setProduct(res.data);
            }catch(error){
                console.log(error);
            }
        };
        fetchProduct();

    },[id]);

    if(!product){
        return <h2>Loading ....</h2>;
    }

    return (

        <div
          style={{
            padding:"50px",
            display:"flex",
            gap:"50px",
            backgroundColor:"#f5f5f5",
            minHeight:"100vh",
            alignItems:"center",
            justifyContent:"center"
          }}
        >
            <img 
               src={product.image}
               alt={product.name}
               style={{
                width:"420px",
                borderRadius:"20px",
                height:"420px",
                boxShadow:"0 6px 20px rgba(0,0,0,0.15)"
               }}
            />
            <div
              style={{
                backgroundColor:"white",
                padding:"40px",
                borderRadius:"20px",
                width:"450px",
                boxShadow:"0 6px 20px rgba(0,0,0,0.1)"
              }}
            >
                <h1
                 style={{
                    fontSize:"36px",
                    marginBottom:"15px",
                    color:"#222"
                 }}
                >{product.name}</h1>
                <h2
                  style={{
                    marginTop:"15px",
                    color:"#ff5e62"
                  }}
                > ₹{product.price}</h2>
                <p
                 style={{
                    marginTop:"10px",
                    color:product.stock > 0 ? "green":"red",
                    fontWeight:"bold"
                 }}
                >
                    {product.stock > 0
                    ? `In Stock (${product.stock})`
                    :"Out of stock"}
                </p>

                <p
                  style={{
                    maginTop:"20px",
                    color:"#555",
                    lineHeight:"1.6"
                  }}
                >{product.description}</p>
                <button
                  onClick={()=>handleAddToCart(product._id)}
                  style={{
                    marginTop:"30px",
                    backgroundColor:"#111",
                    color:"white",
                    padding:"16px 28px",
                    border:"none",
                    borderRadius:"12px",
                    cursor:"pointer",
                    fontWeight:"bold",
                    fontSize:"16px",
                    boxShadow:"0 4px 12px rgba(255,94,98,0.3)"
                  }}
                >Add To Cart</button>
            </div>

        </div>

    );

}

export default ProductDetails;