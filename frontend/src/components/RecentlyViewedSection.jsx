function RecentlyViewedSection({recentlyViewed}){
 
    if(recentlyViewed.length===0){
        return null;
    }

    return (

        <div
          style={{
            marginTop:"40px"
          }}
        >
            <h2
              style={{
                marginBottom:"20px"
              }}
            >👀 Recently Viewed</h2>
            <div
              style={{
                display:"flex",
                gap:"20px",
                flexWrap:"wrap",
                marginBottom:"20px"
              }}
            >
                {
                    recentlyViewed.map((p,index)=>(
                        
                        <div
                          key={`${p._id}-${index}`}
                          style={{
                            width:"120px",
                            background:"white",
                            padding:"10px",
                            borderRadius:"10px",
                            boxShadow:"0 3px 8px rgba(0,0,0,0.1)"
                          }}
                        >
                            <img 
                               src={p.image}
                               alt={p.name}
                               style={{
                                width:"100%",
                                height:"100px",
                                objectFit:"cover",
                                borderRadius:"8px"
                               }}
                            />
                            <h3
                              style={{
                                fontSize:"16px",
                                margin:"10px 0 5px"
                              }}
                            >{p.name}</h3>
                            <p
                              style={{
                                fontSize:"14px"
                              }}
                            >₹{p.price}</p>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default RecentlyViewedSection;