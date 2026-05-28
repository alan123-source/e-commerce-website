import {useEffect,useState} from "react";
import {useParams,useNavigate} from "react-router-dom";
import API from "../api/axios";

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

    return(
        <div>
            <h1>Edit Products</h1>
        </div>
    );

}

export default EditProduct;

