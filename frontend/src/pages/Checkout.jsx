function Checkout(){
    return (
        <div
          style={{
            minHeight:"100vh",
            backgroundColor:"#f5f5f5",
            padding:"40px",
            fontFamiy:"Arial"
          }}
        >
            <h1 
              style={{
                marginBottom:"30px",
                color:"#222"
              }}
            >Checkout</h1>
            <div
              style={{
                display:"flex",
                gap:"30px",
                alignItems:"flex-start"
              }}
            >
                <div
                   style={{
                    flex:2,
                    backgroundColor:"white",
                    padding:"30px",
                    borderRadius:"15px",
                    boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                   }}
                >
                    <h2 style={{marginBottom:"20px"}}>Shipping Address</h2>
                    <input 
                       type="text"
                       placeholder="Full Name"
                       style={inputStyle}
                    />
                    <input 
                     type="text"
                     placeholder="Address"
                     style={inputStyle}
                    />
                    <input 
                      type="text"
                      placeholder="city"
                      style={inputStyle}
                    />
                    <input 
                       type="text"
                       placeholder="Postal Code"
                       style={inputStyle}
                    />
                </div>
                <div 
                  style={{
                    flex:1,
                    backgroundColor:"white",
                    padding:"30px",
                    borderRadius:"15px",
                    boxShadow:"0 4px 10px rgba(0,0,0,0.1)"
                  }}
                >
                    <h2 style={{marginBottom:"20px"}}>Order Summary</h2>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginBottom:"15px"
                    }}>
                        <span>Subtotal</span>
                        <span>₹5000</span>
                    </div>
                    <div style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginBottom:"15px"
                    }}>
                        <span>Shipping</span>
                        <span>FREE</span>
                    </div>
                    <hr style={{marginBottom:"20px"}} />
                    <div
                       style={{
                        display:"flex",
                        justifyContent:"space-between",
                        marginBottom:"25px",
                        fontWeight:"bold",
                        fontSize:"20px"
                       }}
                    >
                        <span>Total</span>
                        <span>₹5000</span>
                    </div>
                    <button
                      style={{
                        width:"100%",
                        padding:"14px",
                        border:"none",
                        borderRadius:"10px",
                        background:"#222",
                        color:"white",
                        fontSize:"16px",
                        fontWeight:"bold",
                        cursor:"pointer"
                      }}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

const inputStyle={
    width:"100%",
    padding:"14px",
    marginBottom:"18px",
    borderRadius:"10px",
    border:"1px solid #ccc",
    fontSize:"15px",
    boxSizing:"border-box"
}

export default Checkout;