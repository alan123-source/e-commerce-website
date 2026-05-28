import {useState} from "react";
import API from "../api/axios";
import {toast} from "react-toastify";

function AddProduct(){
    const [name,setName]=useState("");
    const [image,setImage]=useState("");
    const [price,setPrice]=useState("");
    const [stock,setStock]=useState("");
    const [category,setCategory]=useState("");
    const [description,setDescription]=useState("");

    const handleAddProduct=async(e)=>{
        e.preventDefault();

        try{

            const token=localStorage.getItem("token");
            const res=await API.post(
                "/products",
                {
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

            console.log(res.data);
            toast.success("Product Added",{
                style:{
                    backgroundColor:"#00d9ff",
                    color:"white"
                }
            })


        }catch(error){
            console.log(error);
        }
    };

    return (
        <div
          style={{
            minHeight:"100vh",
           backgroundColor:"#f5f5f5",
           display:"flex",
           justifyContent:"center",
           alignItems:"center",
           padding:"40px"
          }}
        >
            <form
              onSubmit={handleAddProduct}
              style={{
              backgroundColor:"white",
              padding:"35px",
              borderRadius:"15px",
              width:"400px",
              boxShadow:
                "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
                <h2
                  style={{
                    marginBottom:"25px"
                  }}
                >
                
                Add Product

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
                   placeholder="IMAGE URL"
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
                 style={inputStyle}
                />
                <button
                  type="submit"
                  style={{
                    width:"100%",
                    padding:"14px",
                    border:"none",
                    borderRadius:"10px",
                    backgroundColor:"#FF0000",
                    color:"white",
                    fontWeight:"bold",
                    cursor:"pointer"
                  }}
                >Add Product</button>
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
   boxSizing:"border-box"
};

export default AddProduct;