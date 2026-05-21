import { useEffect,useState } from "react";
import API from "../api/axios";

function Home(){
    const [products,setProducts]=useState([]);
    const [search,setSearch]=useState("");
    const [debouncedSearch,setDebouncedSearch]=useState("");
    const [loading,setLoading]=useState(false);
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

  const handleAddToCart=async(productId)=>{

    try{
      
      const token=localStorage.getItem("token");
      const res=await API.post(
        "/cart/add",
        {
          productId,
          qty:1
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      console.log("cart updated:",res.data);
      alert("product added to cart");

    }catch(error){
      console.log(error);
      alert("please login first");
    }
  };
   

   return (
    <div style={{ 
      backgroundColor:"white",
      minHeight:"100vh",
      padding:"30px",
      fontFamly:"Arial"
     }}>
      
      {/* 🔹 Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ 
          padding:"12px",
          marginBotttom:"30px",
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

      {/* 🔹 UI states */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
      
      <div style={{ display: "flex", flexWrap: "wrap", gap: "25px" }}>
  {products.map((p) => (
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
        onClick={()=>handleAddToCart(p._id)}
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
  ))}
</div>
       
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
export default Home;