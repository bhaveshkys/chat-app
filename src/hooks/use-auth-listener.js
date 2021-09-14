import { useState,useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useAuthlistener(){
    const [user,setUser]=useState(null);
    const auth=getAuth();
    
    useEffect(()=>{
        console.log("authlistener")
        const listener=onAuthStateChanged(auth,(authuser)=>{
            if(authuser){
                setUser(authuser)
                console.log(authuser)
                
            }
            
        });
        return ()=>listener()
    },[user,auth]);
    return{user};
}