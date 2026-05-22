import {Link} from "react-router-dom";
import {useEffect,useState} from "react";

function Navbar(){
    const [cartCount,setCartCount]=useState(0);
    useEffect(() => {
  const updateCartCount = () => {
    const count = localStorage.getItem("cartCount");

    setCartCount(count || 0);
  };

  updateCartCount();

  window.addEventListener("storage", updateCartCount);

  return () => {
    window.removeEventListener("storage", updateCartCount);
  };
}, []);
    return (
        <nav
          style={{
            backgroundColor:"white",
            padding:"18px 40px",
            display:"flex",
            justifyContent:"space-between",
            alignItems:"center",
            boxShadow:"0 2px 10px rgba(0,0,0,0.1)",
            position:"sticky",
            top:0,
            zIndex:1000
          }}
        >
            <Link 
              to="/"
              style={{
                color:"#222",
                textDecoration:"none",
                fontsize:"28px",
                fontweight:"bold",
                letterSpacing:"1px"
              }}
            >
              MyShop
            </Link>
          <div 
            style={{
                display:"flex",
                alignItems:"center",
                gap:"25px"
            }}
          >
            <Link
              to="/"
              style={{
                textDecoration:"none",
                color:"#333",
                fontSize:"16px",
                fontWeight:"500"
              }}
            >
                Home
              
            </Link>
              <Link 
              to="/cart"
              style={{
                backgroundColor:"#222",
                color:"white",
                textDecoration:"none",
                borderRadius:"8px",
                fontSize:"15px",
                fontWeight:"500",
                padding:"10px 18px",
                position:"relative",
              }}
            >
             🛒 Cart
             <span 
               style={{
                position:"absolute",
                top:"-8px",
                right:"-8px",
                backgroundColor:"red",
                color:"white",
                borderRadius:"50%",
                width:"22px",
                height:"22px",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                fontSize:"12px",
                fontWeight:"bold"
               }}
             >
                {cartCount}
             </span>
            </Link>  

          </div>
           

        </nav>
    );
}
export default Navbar;