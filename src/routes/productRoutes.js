import express from "express";
import { CreateProduct,getProducts,getProductById,updateProduct,deleteProduct} from "../controllers/productController.js";
import { protect,admin} from "../middleware/authmiddleware.js";

const router=express.Router();

//public routes//
router.get("/",getProducts);
router.get("/:id",getProductById);

//protected route admin only//
router.post("/",protect,admin,CreateProduct);
router.put("/:id",protect,admin,updateProduct);
router.delete("/:id",protect,admin,deleteProduct);

export default router;

/*the flow is from protect->admin->controler
no token blocked by protect token but not admin 
blocked by admin
admin allowd to create product*/
