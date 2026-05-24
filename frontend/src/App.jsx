 import {Routes,Route}  from "react-router-dom";
 
 import Home from "./pages/Home";
 import Cart from "./pages/Cart";
 import Navbar from "./components/Navbar";
 import Login from "./pages/Login";
 import Register from "./pages/Register";
 import ProtectedRoute from "./components/ProtectedRoute";
 import ProductDetails from "./pages/ProductDetails";
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
    </Routes>
    </>
    
  );
 }
 export default App;