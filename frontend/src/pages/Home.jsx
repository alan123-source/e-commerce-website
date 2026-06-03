import { useEffect,useState } from "react";
import API from "../api/axios";
import {Link} from "react-router-dom";
import {handleAddToCart} from "../utils/cart.js";
import {toast} from "react-toastify";
import RecentlyViewedSection from "../components/RecentlyViewedSection";
function Home(){
    const [products,setProducts]=useState([]);
    const [search,setSearch]=useState("");
    const [debouncedSearch,setDebouncedSearch]=useState("");
    const [loading,setLoading]=useState(false);
    const [selectedCategory,setSelectedCategory]=useState("All");
    const [sortOption,setSortOption]=useState("");
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const [recommended,setRecommended]=useState([]);
     const [recommendationType,setRecommendationType]=useState("");
     const [wishlist,setWishlist]=useState([]);
     const [recentlyViewed,setRecentlyViewed]=useState([]);



    //debounce logic//
    useEffect(()=>{
      const timer=setTimeout(()=>{
        setDebouncedSearch(search);
      },500);

      return ()=>clearTimeout(timer);
    },[search]);
    useEffect(() => {

          const fetchRecommendations=async()=>{
        console.log("fetch recomendation started");
        try{

          const token=localStorage.getItem("token");
          if(!token){
            console.log("token",token);
            return ;
          }
          console.log("calling recommendation api")
          const res=await API.get(
            "/recommendations",{
              headers:{
                Authorization:`Bearer ${token}`
              }
            }
          );
        //  console.log(res.data);
        console.log("FULL RECOMMENDATION RESPONSE:",res.data);

      console.log("DATA:",res.data.data);

      console.log("TYPE:",typeof res.data.data);

        console.log("IS ARRAY:",Array.isArray(res.data.data));
          setRecommended(res.data.data);
          console.log(res.data.type);
          setRecommendationType(res.data.type);

        }catch(error){
          
          console.log("RECOMMENDATION ERROR:",error);

           console.log("ERROR RESPONSE:",error.response);

        console.log("ERROR DATA:",error.response?.data);

        }
      }
      setLoading(true);
      fetchRecommendations();
      
  API.get(`/products?keyword=${debouncedSearch}&page=${currentPage}`)
    .then((res) => {
      console.log("FULL RESPONSE:", res.data);

      // SAFE check
      if (res.data && res.data.data) {
        setProducts(res.data.data);
        setTotalPages(res.data.pagination.pages)
      } else {
        
        setProducts([]);
      }
    })
    .catch((err) => console.log("ERROR:", err))
    .finally(()=>setLoading(false));

}, [debouncedSearch,currentPage]);

useEffect(()=>{
   //fetch wishlist//
          const fetchWishlist=async()=>{
               try{
                

                const token=localStorage.getItem("token");
                if(!token){
                  return;
                }
                const res=await API.get(
                    "/wishlist",{
                      headers:{
                        Authorization:`Bearer ${token}`
                      }
                    }
                  );
                setWishlist(res.data.wishlist.map((p)=>p._id.toString()));
              
               }catch(error){
                console.log(error);
               }
          }

          fetchWishlist();
},[]);

useEffect(()=>{
   const fetchRecentlyViewed=async()=>{

    try{
    //  console.log("running fetchrecently viewed");
      const token=localStorage.getItem("token");
      if(!token){
        return;
      }
      const res=await API.get(
        "/recently-viewed",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );
      setRecentlyViewed(res.data.recentlyViewed);
      //console.log(setRecentlyViewed);
      //console.log("completed fetch recently");

    }catch(error){
      console.log(error)
    }

   }
   fetchRecentlyViewed();
},[]);

const filteredProducts= [...products]
.filter(
  (product)=>
    selectedCategory==="All"
         ||
        product.category===selectedCategory
).sort((a,b)=>{
   if(sortOption==="low-high"){
    return a.price-b.price
   }

   if(sortOption==="high-low"){
    return b.price-a.price;
   }
   return 0;
});

const handleWishlistToggle=async(productId)=>{
  try{
    const token=await localStorage.getItem("token");
    if(!token){
     // alert("please login first");
     toast.error("please login first",{
      style:{
        background:"red",
        color:"white"
      }
     })
      return;
    }
    const res=await API.post(
      `/wishlist/${productId}`,{},
      {
        headers:{
        Authorization:`Bearer ${token}`
        }
      }
    );
     setWishlist(res.data.wishlist.map(
      (id)=>id.toString()
     ));

  }catch(error){
    console.log(error);
  }
}

 
   

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
      {
        recommended.length >0 &&(
          <>
             <h2>{
               
               recommendationType==="cold-start"?"🔥 Trending Products"
               :"🔥 Recommended For You"

              }</h2>
             <div
                style={{
                  display:"flex",
                  gap:"25px",
                  flexWrap:"wrap",
                  marginBottom:"40px"
                }}
             >
              {
                recommended.map((p)=>(
                  
                  <Link
                    key={p._id}
                    to={`/products/${p._id}`}
                    style={{
                      textDecoration:"none",
                      color:"inherit"
                    }}
                  >
                    <div
                      style={{
                        background:"white",
                        borderRadius:"12px",
                        padding:"15px",
                        width:"230px",
                        boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                      }}
                    >
                      <img 
                        src={p.image}
                        alt={p.name}
                        style={{
                          width:"100%",
                          height:"180px",
                          objectFit:"cover",
                          borderRadius:"10px"
                        }}
                      />
                      <h3>{p.name}</h3>
                      <p
                        style={{
                          fontWeight:"bold"
                        }}
                      >₹{p.price}</p>
                    </div>
                  
                  </Link>
                ))
               }
             </div>
          </>
        )
      }

      
      <RecentlyViewedSection recentlyViewed={recentlyViewed} />

  
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

      <select
        value={sortOption}
        onChange={(e)=>setSortOption(e.target.value)}
        style={{
          padding:"12px 16px",
          borderRadius:"12px",
          border:"1px solid #d1d5db",
          marginBottom:"25px",
          cursor:"pointer",
          fontSize:"15px",
          fontWeight:"500",
          backgroundColor:"white",
          color:"#333",
          outline:"none",
          boxShadow:"0 2px 6px rgba(0,0,0,0.08)",
          transition:"0.2s",
          minWidth:"220px"
        }}
      >

        <option value="">
          Sort  by
        </option>
        <option value="low-high">
          Price:Low to High
        </option>

        <option value="high-low">
          Price:High to Low
        </option>
      </select>

      {/* 🔹 UI states */}
      {loading ? (
        <p>Loading...</p>
      ) : products.length > 0 ? (

      
        
      <>
      
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
      <button
         onClick={(e)=>{
          e.preventDefault();
          handleWishlistToggle(p._id);
         }}

         style={{
          border:"none",
          background:"transparent",
          cursor:"pointer",
          fontSize:"24px",
          float:"right"
         }}
      >
        {
          wishlist.includes(p._id.toString())?"❤️":
          "🤍"
        }
      </button>

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
 
 <div
   style={{
    display:"flex",
    gap:"10px",
    marginTop:"30px",
    flexWrap:"wrap"
   }}
 >
  {
    [...Array(totalPages)].map((_,index)=>(
      <button
        key={index}
        onClick={()=>
          setCurrentPage(index+1)
        }

        style={
          {
            padding:"10px 16px",
            border:"none",
            borderRadius:"8px",
            cursor:"pointer",
            background:
               currentPage===index+1
               ?"#222"
               :"#e5e7eb",
            color:
              currentPage===index+1
              ?"white"
              :"#333",
              fontWeight:"600"
          }
        }
      >
        {index+1}
      </button>
    ))
  }

 </div>

    </>
 
       
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
export default Home;