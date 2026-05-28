import {useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import API from "../api/axios";
import {toast} from "react-toastify";

function EditProduct(){
    const {id}=useParams();
    const navigate=useNavigate();
    const [name,setName]=useState("");
    const [image,setImage]=useState("");
    const [price,setPrice]=useState("");
    const [stock,setStock]=useState("");
    const [category,setCategory]=useState("");
    const [description,setDescription]=useState("");

    useEffect(()=>{
        const fetchProduct=async()=>{
            try{

                const res=await API.get(
                    `products/${id}`
                );
                console.log(res.data);
                const product=res.data.data||res.data;
                setName(product.name);
                setImage(product.image);
                setPrice(product.price);
                setStock(product.stock);
                setCategory(product.category);
                setDescription(product.description);

            }catch(error){
                console.log(error)
            }
        };
        fetchProduct();
    },[id]);

    const handleUpdateProduct=async(e)=>{
        e.preventDefault();
        try{

            const token=localStorage.getItem("token");
        await API.put(`/products/${id}`,{

            name,
            image,
            price,
            stock,
            category,
            description
        },
      {
        headers:{
            Authorization:`Bearer ${token}`
        }
      }
    );

    toast.success("Product Updated",{
        style:{
            backgroundColor:"linear-gradient(to right, #4facfe, #00f2fe)",
            color:"white"
        }
    });
        navigate("/admin/products");

        }catch(error){
            console.log(error)
        }
    }

    return(
        <div
          style={{
            minHeight:"100vh",
            backgroundColor:"#eef2f7",
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
            padding:"40px"
          }}
        >
            <form

              onSubmit={handleUpdateProduct}
               style={{
                backgroundColor:"white",
                padding:"35px",
                borderRadius:"20px",
                width:"400px",
                boxShadow:"0 8px 24px rgba(0,0,0,0.12)"
               }}
            >
                <h2
                   style={{
                    marginBottom:"25px",
                    textAlign:"center",
                    fontSize:"32px",
                    color:"#222"
                   }}
                >
                    Edit Product
                </h2>
                <input 
                   type="text"
                   placeholder="Product Name"
                   value={name}
                   onChange={(e)=>setName(e.target.value)}
                   style={inputStyle}
                />
                <input 
                  type="text"
                  placeholder="Image URL"
                  value={image}
                  onChange={(e)=>setImage(e.target.value)}
                  style={inputStyle}

                />
                <input
                  type="number"
                  placeholder="Price"
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                  style={inputStyle}
                />
                <input 
                  type="number"
                  placeholder="Stock"
                  value={stock}
                  onChange={(e)=>setStock(e.target.value)}
                  style={inputStyle}

                />
                <input 
                 type="text"
                 placeholder="Category"
                 value={category}
                 onChange={(e)=>setCategory(e.target.value)}
                 style={inputStyle}
                />
                <textarea 
                   placeholder="Description"
                   value={description}
                   onChange={(e)=>setDescription(e.target.value)}
                   style={{
                    ...inputStyle,
                    height:"120px",
                    reSize:"none"
                   }}
                />
                <button
                   type="submit"
                   style={{
                    width:"100%",
                    padding:"14px",
                    border:"none",
                    borderRadius:"12px",
                    background:"linear-gradient(to right, #4facfe, #00f2fe)",
                    color:"white",
                    fontWeight:"bold",
                    cursor:"pointer",
                    fontSize:"16px"
                   }}
                >
                    Update Product
                </button>
            </form>
        </div>
    );

}

const inputStyle={
    width:"100%",
    padding:"12px",
    marginBottom:"15px",
    borderRadius:"10px",
    border:"1px solid #ccc",
    boxSizing:"border-box",
    fontSize:"15px"
}

export default EditProduct;

