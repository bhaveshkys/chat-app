import { useState,useEffect, useContext } from "react";
import FirebaseContext from "../context/firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function useAuthlistener(){
    const [user,setUser]=useState(null);
    const {firebase}=useContext(FirebaseContext);
    const auth=getAuth();
    
    useEffect(()=>{
        const listener=onAuthStateChanged(auth,(authuser)=>{
            if(authuser){
                setUser(authuser)
                
            }
            else{
                setUser(null);
            }
        });
        return ()=>listener()
    },[user]);
    return{user};
}