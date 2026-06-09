import {useState} from "react";
import API from "../api/axios";
import {toast} from "react-toastify";

function ReviewForm({id,reviews}){
    const [rating,setRating]=useState("");
    const [comment,setComment]=useState("");
    const token=localStorage.getItem("token");
    const userId=localStorage.getItem("userId");

    const alreadyReviewed=reviews?.find(
      (review)=>
        review.user===userId
    )
    
    const handleReviewSubmit=async(e)=>{
      e.preventDefault();
      try{

        const token=localStorage.getItem("token");
        await API.post(`/products/${id}/reviews`,{
          rating,
          comment
        },
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }
      );

      toast.success("Review Added",{
        style:{
          background:"linear-gradient(to right, #4facfe, #00f2fe)",
          color:"white"
        }
      });
       

      }catch(error){
        console.log(error);
        toast.error(error.response?.data?.message,{
          style:{
            background:"linear-gradient(to right, #ff9966, #ff5e62)",
            color:"white"
          }
        });
      }
    };

    return (
        <div
         style={{
          marginTop:"50px",
          backgroundColor:"white",
          padding:"25px",
          borderRadius:"18px",
          boxShadow:"0 4px 12px rgba(0,0,0,.08)",
          maxWidth:"750px",
          width:"100%"
          
         }}
        >
            <h2
              style={{
                marginBottom:"10px",
                color:"#222",
                fontSize:"28px"
              }}
            >Add Review</h2>
            <p
               style={{
                color:"#666",
                marginBottom:"10px",
                fontSize:"14px"
               }}
            >
              Share your experience about this product
            </p>
            {
              token?(
                alreadyReviewed?(

                  <p
                    style={{
                      color:"#666",
                      fontSize:"15px"
                    }}
                  >You already reviewed this product</p>

                ):(
           <form
              onSubmit={handleReviewSubmit}
              style={{
                display:"flex",
                flexDirection:"column",
                gap:"15px",
                width:"100%"
              }}
            >
                <select
                  value={rating}
                  onChange={(e)=>setRating(e.target.value)}
                  required
                  style={{
                    padding:"12px",
                    borderRadius:"12px",
                    border:"1px solid #d1d5db",
                    fontSize:"15px",
                    outline:"none",
                    boxSizing:"border-box"
                  }}
                >
                    <option value="">
                        Select Rating
                    </option>
                    <option value="1">
                        1-Poor
                    </option >
                    <option value="2">
                        2-Fair
                    </option>
                    <option value="3">
                        3-Good
                    </option>
                    <option value="4">
                        4-Very Good
                    </option>
                    <option value="5">
                        5-Excellent
                    </option>
                </select>
                <textarea
                  placeholder="Write Your Review"
                  value={comment}
                  onChange={(e)=>
                    setComment(
                        e.target.value
                    )
                  }
                  required
                  style={{
                    padding:"12px",
                    borderRadius:"10px",
                    border:"1px solid #d1d5db",
                    height:"120px",
                    resize:"none",
                    fontSize:"15px",
                    outline:"none",
                    boxSizing:"border-box"
                  }}
                />

                <button
                  type="submit"
                  style={{
                    padding:"14px",
                    border:"none",
                    borderRadius:"10px",
                    backgroundColor:"#222",
                    color:"white",
                    fontWeight:"bold",
                    cursor:"pointer",
                    fontSize:"15px",
                    marginTop:"20px",
                    boxSizing:"border-box"
                  }}
                >
                  Submit Review
                </button>
            </form>
                )
          
              ):(
                 <p
                   style={{
                    color:"#666",
                    fontSize:"15px"
                   }}
                 >
                  Please login to write a review
                 </p>
              )
        }
     </div>
    )
}

export default ReviewForm; 