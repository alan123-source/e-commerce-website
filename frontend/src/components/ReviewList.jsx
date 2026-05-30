function ReviewList({reviews}){
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
                                <h3
                                 style={{
                                    color:"#222"
                                 }}
                                >{review.name}</h3>
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