import {Link} from "react-router-dom";
import {useEffect,useState} from "react";

function Navbar(){
    const [cartCount,setCartCount]=useState(0);
    const [token,setToken]=useState(
      localStorage.getItem("token")
    );
    const [role,setRole]=useState(
      localStorage.getItem("role")
    );
    const handleLogout=()=>{

      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("cartCount");
      localStorage.removeItem("userId");
      window.location.href="/login";

    };
    useEffect(() => {
  const updateCartCount = () => {
    const count = localStorage.getItem("cartCount");

    setCartCount(count || 0);
    setToken(
      localStorage.getItem("token")
    );
    setRole(
      localStorage.getItem("role")
    );
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
                color:"#444",
                fontSize:"16px",
                fontWeight:"600"
              }}
            >
                Home
              
            </Link>
              <Link 
              to="/cart"
              style={{
                backgroundColor:"#111",
                color:"white",
                textDecoration:"none",
                borderRadius:"12px",
                fontSize:"15px",
                fontWeight:"600",
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

               <Link
              to="/wishlist"
              style={{
                textDecoration:"none",
                color:"#333",
                fontWeight:"600"
                
              }}
             >
                ❤️ Wishlist

             </Link>

            {
              !token ?(
               <>
                 <Link
                   to="/login"
                   style={{
                    textDecoration:"none",
                    color:"#333",
                    fontWeight:"600",
                    fontSize:"15px"
                   }}
                 >
                  Login
                 </Link>

                 <Link
                   to="/register"
                   style={{
                    textDecoration:"none",
                    background:
                    "linear-gradient(to right, #ff9966, #ff5e62)",
                    color:"white",
                    padding:"12px 20px",
                    borderRadius:"12px",
                    fontWeight:"600",
                    boxShadow:"0 4px 10px rgba(255,94,98,0.3)"
                   }}
                 >
                   Register
                 </Link>
               </>

              ):(
                <>
                <Link
                 to="/my-orders"
                 style={{
                  textDecoration:"none",
                  color:"#333",
                  fontWeight:"600"
                 }}
                >
                  My Orders
                </Link>

                 {
                   role==="admin"&&(
                    <>
                      <Link
                       style={{
                        textDecoration:"none",
                        color:"#222",
                        fontWeight:"600"
                       }}
                        to="/admin/dashboard"
                      >
                        Admin Dashboard
                      </Link>
                      <Link
                        to="/admin/orders"
                        style={{
                          textDecoration:"none",
                          color:"#333",
                          fontWeight:"600"
                        }}
                      >Admin Orders</Link>
                      <Link 
                        to="/admin/products"
                        style={{
                          textDecoration:"none",
                          color:"#333",
                          fontWeight:"600"
                        }}
                      >
                        Admin Products
                      </Link>
                      <Link
                        to="/admin/add-product"
                        style={{
                          textDecoration:"none",
                          color:"#333",
                          fontWeight:"600"
                        }}
                      >Add Product</Link>
                    </>
                   )
                 }

                <button
                 onClick={handleLogout}
                 style={{
                  backgroundColor:"#ff4d4f",
                  color:"white",
                  border:"none",
                  padding:"12px 20px",
                  borderRadius:"12px",
                  cursor:"pointer",
                  fontWeight:"600",
                  boxShadow:"0 4px 10px rgba(255,77,79,0.3)"
                 }}
                >
                  Logout
                </button>
              </>
              )
            } 

          </div>
           

        </nav>
    );
}
export default Navbar;