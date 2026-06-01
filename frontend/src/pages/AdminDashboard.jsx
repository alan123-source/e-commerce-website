import {useState,useEffect} from "react";
import API from "../api/axios";

function AdminDashboard(){

    const [stats,setStats]=useState(null);
    useEffect(()=>{
        const fetchAnalytics=async()=>{
            try{

                const token=localStorage.getItem("token");
                const res=await API.get(
                    "/admin/analytics",
                    {
                        headers:{
                            Authorization:`Bearer ${token}`
                        }
                    }
                );
                setStats(res.data.data);

            }catch(error){
              console.log(error);
            }
        };
        fetchAnalytics();
    },[]);

    if(!stats){
        return <h2>Loading....</h2>
    }

}