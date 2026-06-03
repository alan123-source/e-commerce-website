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
                            width:"220px",
                            background:"white",
                            padding:"15px",
                            borderRadius:"12px",
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
                            <p>₹{p.price}</p>
                        </div>
                    ))
                }
            </div>
        </div>

    )
}

export default RecentlyViewedSection;