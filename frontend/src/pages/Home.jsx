import { useEffect,useState } from "react";
import API from "../api/axios";

function Home(){
    const [products,setProducts]=useState([]);
    const [search,setSearch]=useState("");
    useEffect(() => {
  API.get(`/products?keyword=${search}`)
    .then((res) => {
      console.log("FULL RESPONSE:", res.data);

      // SAFE check
      if (res.data && res.data.data) {
        setProducts(res.data.data);
      } else {
        console.log("Unexpected response format");
        setProducts([]);
      }
    })
    .catch((err) => console.log("ERROR:", err));
}, [search]);

   return (
  <div style={{ color: "black", backgroundColor: "white", padding: "20px" }} >
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      style={{padding:"8px",marginBottom:"10px",width:"200px"}}
    />
    <h2>Products</h2>

    {Array.isArray(products) && products.length > 0 ? (
  products.map((p) => (
    <div key={p._id}>
      <h3>{p.name}</h3>
      <p>₹{p.price}</p>
    </div>
  ))
) : (
  <p>Loading or No products...</p>
)}
  </div>
);
}
export default Home;