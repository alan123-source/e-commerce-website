import { useEffect,useState } from "react";
import API from "../api/axios";
import {Link} from "react-router-dom";
import {handleAddToCart} from "../utils/cart.js";

function Home(){
    const [products,setProducts]=useState([]);
    const [search,setSearch]=useState("");
    const [debouncedSearch,setDebouncedSearch]=useState("");
    const [loading,setLoading]=useState(false);
    const [selectedCategory,setSelectedCategory]=useState("All");
    //debounce logic//
    useEffect(()=>{
      const timer=setTimeout(()=>{
        setDebouncedSearch(search);
      },500);

      return ()=>clearTimeout(timer);
    },[search]);
    useEffect(() => {

      setLoading(true);
  API.get(`/products?keyword=${debouncedSearch}`)
    .then((res) => {
      console.log("FULL RESPONSE:", res.data);

      // SAFE check
      if (res.data && res.data.data) {
        setProducts(res.data.data);
      } else {
        
        setProducts([]);
      }
    })
    .catch((err) => console.log("ERROR:", err))
    .finally(()=>setLoading(false));

}, [debouncedSearch]);

const filteredProducts=
selectedCategory==="All"
?products
:products.filter(
  (product)=>
    product.category===selectedCategory
);

 
   

   return (
    <div style={{ 
      backgroundColor:"white",
      minHeight:"100vh",
      padding:"30px",
      fontFamily:"Arial"
     }}>
      
      {/* 🔹 Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ 
          padding:"12px",
          marginBottom:"30px",
          width:"300px",
          borderRadius:"30px",
          border:"1px solid #ccc",
          fontSize:"16px"
        }}
      />

      <h2 style={{
        marginTop:"30px",
        marginBottom:"20px",
        color:"#333"
      }}>Products</h2>

      <div
         style={{
          display:"flex",
          gap:"12px",
          flexWrap:"wrap",
          marginBottom:"30px"
         }}
      >
        {
          [
            "All",
            "Mobile",
            "Laptop",
            "Headphones",
            "Gaming",
            "Smartwatch",
            "Earbuds"
          ].map((category)=>(
            <button
              key={category}
              onClick={()=>
              setSelectedCategory(category)}
              style={{
                padding:"10px 18px",
                border:"none",
                borderRadius:"25px",
                cursor:"pointer",
                fontWeight:"600",
                
                background:
                selectedCategory===category
                ?"#667eea"
                :"#f5f5f5",
                color:
                selectedCategory===category
                ?"white"
                :"#333",
                transition:"0.2s"   }}
              >{category}
            </button>
          ))
        }
      </div>

      {/* 🔹 UI states */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (

        //category buttons//
        

      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
  {   filteredProducts.map((p) => (
    <Link
    key={p._id}
    to={`/products/${p._id}`}
      style={{
        textDecoration:"none",
        color:"inherit"
      }}
    >
    
   <div
      key={p._id}
      style={{
         backgroundColor: "white",
         borderRadius: "12px",
         padding: "15px",
         width: "230px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        transition: "0.3s"
      }}
    >
      <img
        src={p.image}
        alt={p.name}
        style={{
          width: "100%",
          height: "180px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      <h3>{p.name}</h3>

      <p style={{ fontWeight: "bold" }}>
        ₹{p.price}
      </p>

      <button
        onClick={(e)=>{
          //this prevents navigation to link//
          e.preventDefault();
          handleAddToCart(p._id)

        }}
        style={{
          backgroundColor: "#222",
          color: "white",
          padding: "10px",
          border: "none",
          borderRadius: "8px",
          width: "100%",
          cursor: "pointer",
          marginTop:"10px",
          fontSize:"14px"
        }}
      >
        Add to Cart
      </button>
    </div>
  </Link>
  ))}
</div>
 
       
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
export default Home;