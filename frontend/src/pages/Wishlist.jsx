import { useEffect,useState } from "react";

import API from "../api/axios";

import { Link } from "react-router-dom";

function Wishlist(){

   const [wishlist,setWishlist] = useState([]);

   const [loading,setLoading] = useState(true);

   useEffect(()=>{

      const fetchWishlist = async()=>{

         try{

            const token = localStorage.getItem("token");

            const res = await API.get(
               "/wishlist",
               {
                  headers:{
                     Authorization:`Bearer ${token}`
                  }
               }
            );

            setWishlist(res.data.wishlist);

         }catch(error){

            console.log(error);

         }finally{

            setLoading(false);

         }

      };

      fetchWishlist();

   },[]);

   const removeFromWishlist = async(productId)=>{

      try{

         const token = localStorage.getItem("token");

         await API.post(
            `/wishlist/${productId}`,
            {},
            {
               headers:{
                  Authorization:`Bearer ${token}`
               }
            }
         );

         setWishlist(
            wishlist.filter(
               (item)=>item._id !== productId
            )
         );

      }catch(error){

         console.log(error);

      }

   };

   if(loading){
      return <p>Loading...</p>
   }

   return(

      <div
         style={{
            padding:"30px"
         }}
      >

         <h1
            style={{
               marginBottom:"30px"
            }}
         >
            ❤️ My Wishlist
         </h1>

         {
            wishlist.length===0 ? (

               <p>Your wishlist is empty</p>

            ) : (

               <div
                  style={{
                     display:"flex",
                     flexWrap:"wrap",
                     gap:"25px"
                  }}
               >

                  {
                     wishlist.map((p)=>(

                        <div
                           key={p._id}
                           style={{
                              width:"230px",
                              background:"white",
                              borderRadius:"12px",
                              padding:"15px",
                              boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                           }}
                        >

                           <Link
                              to={`/products/${p._id}`}
                              style={{
                                 textDecoration:"none",
                                 color:"inherit"
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

                              <p>₹{p.price}</p>

                           </Link>

                           <button
                              onClick={()=>
                                 removeFromWishlist(p._id)
                              }

                              style={{
                                 marginTop:"10px",
                                 width:"100%",
                                 padding:"10px",
                                 border:"none",
                                 borderRadius:"8px",
                                 background:"#222",
                                 color:"white",
                                 cursor:"pointer"
                              }}
                           >
                              Remove
                           </button>

                        </div>

                     ))
                  }

               </div>

            )
         }

      </div>

   );

}

export default Wishlist;