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

   return (
    <div style={{ color: "black", backgroundColor: "white", padding: "20px" }}>
      
      {/* 🔹 Search Input */}
      <input
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ padding: "8px", marginBottom: "10px", width: "200px" }}
      />

      <h2>Products</h2>

      {/* 🔹 UI states */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (
        products.map((p) => (
          <div key={p._id}>
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
          </div>
        ))
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
export default Home;