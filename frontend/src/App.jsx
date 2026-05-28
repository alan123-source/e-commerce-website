 import {Routes,Route}  from "react-router-dom";
 
 import Home from "./pages/Home";
 import Cart from "./pages/Cart";
 import Navbar from "./components/Navbar";
 import Login from "./pages/Login";
 import Register from "./pages/Register";
 import ProtectedRoute from "./components/ProtectedRoute";
 import ProductDetails from "./pages/ProductDetails";
 import Checkout from "./pages/Checkout";
 import  MyOrders from "./pages/MyOrders";
 import AdminOrders from "./pages/AdminOrders";
 import AdminProducts from "./pages/AdminProducts";
 import AddProduct from "./pages/AddProduct";
 import EditProduct from "./pages/EditProduct";

 function App(){
  return (
    <>
      <Navbar />
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/products/:id" element={<ProductDetails />}/>
        <Route path="/checkout" element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }/>
        <Route path="/my-orders" element={
          <ProtectedRoute><MyOrders/></ProtectedRoute>
        } />
        <Route path="/admin/orders" element={<AdminOrders/>} />
        <Route path="/admin/products" element={<AdminProducts/>}/>
        <Route path="/admin/add-product" element={<AddProduct />}/>
        <Route path="/admin/edit-product/:id" element={<EditProduct />}/>

    </Routes>
    </>
    
  );
 }
 export default App;