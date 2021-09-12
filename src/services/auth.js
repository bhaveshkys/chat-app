import { getAuth, signInWithRedirect,GoogleAuthProvider } from "firebase/auth"
const auth=getAuth();
const socialMediaAuth=(provider)=>{
    
    signInWithRedirect(auth, provider)
    .then((result) => {
        console.log(result);
    // The signed-in user info.
    return result
    
    // ...
    }).catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = GoogleAuthProvider.credentialFromError(error);
    });

}
export default socialMediaAuth;