import {loadStripe} from "@stripe/stripe-js";
import {Elements,CardElement,useStripe,useElements} from "@stripe/react-stripe-js";
import API from "../api/axios";
import {useParams,useNavigate} from "react-router-dom";
import{toast} from "react-toastify";

const stripePromise=loadStripe(
    import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

function CheckOutForm(){
 
    const stripe=useStripe();
    const elements=useElements();
    const {orderId}=useParams();
    const navigate=useNavigate();

    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
           
            const token=localStorage.getItem("token");
            const res=await API.post("/payment/create",{
                amount:500
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );

        console.log(res.data);
        const clientSecret=res.data.clientSecret;
       // console.log(clientSecret)

       const result=await stripe.confirmCardPayment(
        clientSecret,{
            payment_method:{
                card:elements.getElement(
                    CardElement
                )
            }
        }
       )

       if(result.error){
        console.log(result.error.message)
       }else{
        console.log("Payment Successfull");
        console.log(result.paymentIntent);
        console.log(orderId);
        await API.put(
            "/orders/pay",
            {
                orderId:orderId,
                paymentIntentId:
                result.paymentIntent.id
            },
            {
                headers:{
                    Authorization:`Bearer ${token}`
                }
            }
        );
        console.log("order marked paid");
        toast.success("payment Successfull");
        navigate("/my-orders");
       }


        }catch(error){
            console.log(error)
        }
    };

    return (
        <form 
        onSubmit={handleSubmit}
        style={{
            padding:"50px"
        }}
        >
            <h1>Payment Page</h1>
            <div
              style={{
                marginTop:"30px",
                backgrooundColor:"white",
                padding:"30px",
                borderRadius:"16px",
                maxWidth:"500px",
                boxShadow:"0 4px 12px rgba(0,0,0,0.1)"
              }}
            >
                <CardElement
                  options={{
                    disableLink:true,
                    style:{
                        base:{
                            fontSize:"16px"
                        }
                    }
                  }}
                />
                <button
                  type="submit"
                  style={{
                    marginTop:"25px",
                    width:"100%",
                    padding:"14px",
                    border:"none",
                    borderRadius:"12px",
                    background:"linear-gradient(to right,#667eea,#764ba2)",
                    color:"white",
                    fontWeight:"bold",
                    cursor:"pointer",
                    fontSize:"16px"
                  }}
                >
                    pay Now
                </button>
            </div>
        </form>
    )

}

function PaymentPage(){
    return (
        <Elements stripe={stripePromise}>
            <CheckOutForm />
        </Elements>
    );
}

export default PaymentPage;