import { getAuth, signInWithRedirect,GoogleAuthProvider } from "firebase/auth"
const auth=getAuth();
const socialMediaAuth=(provider)=>{
    
    signInWithRedirect(auth, provider)
    .then((result) => {
    // The signed-in user info.
    console.log("result",result)    
    return result
    
    // ...
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error code",errorCode)
    console.log("error message",errorMessage)
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    });

}
export default socialMediaAuth;