import API from "../api/axios";
import {toast} from "react-toastify";

function ReviewList({reviews,
    productId,fetchProduct
}){

    const userId=localStorage.getItem("userId");
    const handleDeleteReview=async(reviewId)=>{
        try{
            
            const token=localStorage.getItem("token");
            await API.delete(
                `/products/${productId}/reviews/${reviewId}`,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            );

            toast.success("Review Deleted",{
                style:{
                    background:"linear-gradient(to right,#667eea,#764ba2)",
                    color:"white"
                }
            });
           
           await fetchProduct()
        }catch(error){
            console.log(error);
            toast.error(
                error.response?.data?.message
            );
        }
    };

    return(
        <div
           style={{
            marginTop:"50px",
            width:"100%",
            maxWidth:"750px"
           }}
        >
            <h2
               style={{
                marginBottom:"25px",
                fontSize:"28px",
                color:"#222"
               }}
            >
             Customer reviews
            </h2>
            {
                reviews.length >0 ?(

                    reviews.map((review)=>(
                        <div key={review._id}
                          style={{
                            backgroundColor:"white",
                            padding:"20px",
                            borderRadius:"16px",
                            marginBottom:"20px",
                            boxShadow:"0 4px 10px rgba(0,0,0,0.8)"
                          }}
                        >
                            <div
                              style={{
                                display:"flex",
                                justifyContent:"space-between",
                                alignItems:"center",
                                marginBottom:"14px"
                              }}
                            >
                               <div 
                                 style={{
                                    display:"flex",
                                    alignItems:"center",
                                    gap:"12px"
                                 }}
                               >
                                  <div
                                    style={{
                                        width:"45px",
                                        height:"45px",
                                        borderRadius:"50%",
                                        background:"linear-gradient(to right,#667eea,#764ba2)",
                                        color:"white",
                                        display:"flex",
                                        alignItems:"center",
                                        justifyContent:"center",
                                        fontWeight:"bold",
                                        fontSize:"18px"
                                    }}
                                  > {review.name.charAt(0)}
                                    </div>
                                   
                                    <h3
                                      style={{
                                        color:"#222"
                                      }}
                                    >{review.name}</h3>
                                  
                               </div>
                                <p 
                                   style={{
                                    color:"#f59e0b",
                                    fontWeight:"bold"
                                   }}
                                >{"⭐".repeat(
                                    review.rating
                                )}</p>
                            </div>
                            <p
                               style={{
                                color:"#444",
                                lineHeight:"1.6"
                               }}
                            >{review.comment}</p>

                            {
                                review.user===userId &&(
                                    <button
                                       onClick={()=>handleDeleteReview(review._id)}
                                       style={{
                                        marginTop:"14px",
                                        backgroundColor:"#ef4444",
                                        color:"white",
                                        border:"none",
                                        padding:"10px 14px",
                                        borderRadius:"10px",
                                        cursor:"pointer",
                                        fontWeight:"600"
                                       }}
                                    >
                                        Delete Review
                                    </button>
                                )
                            }

                            <p
                              style={{
                                marginTop:"12px",
                                fontSize:"13px",
                                color:"#888"
                              }}
                            >{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                    ))

                ):(
                      <p>No reviews Yet</p>
                )
            }
        </div>
    );
}

export default ReviewList;