import API from "../api/axios.js";
import {toast} from "react-toastify";

export  const handleAddToCart=async(productId)=>{

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
      //alert("product added to cart");//
      toast.success("🛒 Product addded to cart");
      
      const currentCount=Number(localStorage.getItem("cartCount"))||0;
      localStorage.setItem(
        "cartCount",
        currentCount+1
    );
      window.dispatchEvent(new Event("storage"));

    }catch(error){
      console.log(error);
     // alert("please login first");//
     toast.success("❌ Please Login First",{
        style:{
            background:"#ff4d4f",
            color:"white"
        }
     });
    }
  };