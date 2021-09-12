import { Switch } from 'antd';
import 'antd/dist/antd.css';
import axios from "axios";
import { getAuth, signOut } from "@firebase/auth";
import {ChatEngine} from "react-chat-engine"
import UserContext from "../context/user";
import { useContext, useEffect, useRef,useState } from "react";
import { useHistory } from "react-router-dom";
//import "../App.css"
//#726dfe
function Chat(props){
    const auth=getAuth();

    const {user}=useContext(UserContext);
    const [ loading, setLoading ] = useState(true)
    const didMountRef=useRef(false);
    const history = useHistory();
   
    async function handlelogout(event){
        
        signOut(auth)
        history.push("/login")
    }
    async function getFile(url){
        let res = await fetch(url);
        let data= await res.blob();
        return new File([data],"pfp.jpg",{type:"image/jpeg"});
    }
    useEffect(()=>{
        if(didMountRef.current){
            if(!user||user==null){
                history.push("/login")
                return
            }
    
            axios.get(
                "https://api.chatengine.io/users/me/",
                {headers:{
                    "project-id": 'c32d4ac2-e73a-40f4-ae49-929e0569380c',
                    "user-name": user.email,
                    "user-secret": user.uid
                }
                }
            ).then(()=>setLoading(false))
            .catch(e=>{
                let formdata= new FormData()
                formdata.append('email',user.email)
                formdata.append('username',user.email)
                formdata.append('secret',user.uid)
                getFile(user.photoURL).then(avatar=>{
                    formdata.append('avatar', avatar, avatar.name)
                    axios.post(
                        'https://api.chatengine.io/users/',
                        formdata,
                        {headers:{"private-key":'4e27b367-cfbc-4f09-a9d7-805c6d301a70'}}
                    )
                    .then(()=> setLoading(false))
                    .catch(e=>{console.log('e',e.response)})
                })
                
            })
        } else{
            didMountRef.current=true
            if(!user||user==null){
                history.push("/login")
                return
            }
        }
       
    },[user,history])
    

    if (!user) return <div />
    return(
        <>
        
        
        <div className="chats-page">
        <nav className=" border-t-0 border-b-2 border-gray-700 shadow-lg">
			<div className="max-w-6xl mx-auto px-4">
				<div className="flex justify-between">
					<div className="flex space-x-7">
						<div>
							
							<a href="#" className="flex items-center py-4 px-2">
							<svg width="54" height="54" viewBox="0 0 54 54"version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"  x="0px" y="0px"  viewBox="0 0 122.88 86.411" enable-background="new 0 0 122.88 86.411" ><g><path fill-rule="evenodd" clip-rule="evenodd" d="M83.298,8.182h25.469c7.763,0,14.113,6.351,14.113,14.113v24.907 c0,7.761-6.352,14.113-14.113,14.113H97.802c1.569,6.206,3.469,11.781,9.272,16.929c-11.098-2.838-19.664-8.576-25.952-16.929 h-1.895c-0.737,0-1.509-0.058-2.303-0.168c4.193-3.396,7.106-7.659,7.106-12.275V38.493c0.926,0.644,2.051,1.021,3.264,1.021 c3.164,0,5.73-2.566,5.73-5.729s-2.566-5.729-5.73-5.729c-1.213,0-2.338,0.377-3.264,1.02V13.535 C84.031,11.683,83.774,9.888,83.298,8.182L83.298,8.182z M57.055,28.881c-3.201,0-5.796,2.596-5.796,5.796s2.596,5.796,5.796,5.796 c3.2,0,5.796-2.596,5.796-5.796S60.255,28.881,57.055,28.881L57.055,28.881z M21.488,28.881c-3.201,0-5.796,2.596-5.796,5.796 s2.596,5.796,5.796,5.796s5.796-2.596,5.796-5.796S24.689,28.881,21.488,28.881L21.488,28.881z M39.271,28.881 c-3.201,0-5.796,2.596-5.796,5.796s2.595,5.796,5.796,5.796s5.796-2.596,5.796-5.796S42.472,28.881,39.271,28.881L39.271,28.881z M59,3.572H19.542c-8.785,0-15.971,7.187-15.971,15.971v28.184c0,8.783,7.188,15.971,15.971,15.971h12.407 c-1.775,7.022-3.924,13.332-10.493,19.156c12.558-3.211,22.252-9.704,29.367-19.156h2.145c8.783,0,22.002-7.187,22.002-15.971 V19.542C74.971,10.759,67.784,3.572,59,3.572L59,3.572z M19.542,0H59h0.005v0.014c5.386,0.002,10.27,2.193,13.8,5.724l-0.008,0.007 c3.536,3.539,5.731,8.422,5.732,13.796h0.014v0.002h-0.014v28.184h0.014v0.003h-0.014c-0.002,5.746-3.994,10.752-9.312,14.248 c-4.952,3.256-11.205,5.277-16.247,5.277v0.015h-0.002v-0.015h-0.404c-3.562,4.436-7.696,8.225-12.43,11.333 c-5.235,3.438-11.157,6.028-17.799,7.727l-0.003-0.012c-1.25,0.315-2.628-0.06-3.541-1.091c-1.302-1.472-1.165-3.721,0.307-5.023 c2.896-2.567,4.816-5.239,6.207-8.041c0.774-1.559,1.398-3.188,1.939-4.878h-7.702h-0.005v-0.015 c-5.384-0.001-10.269-2.193-13.799-5.723c-3.531-3.531-5.724-8.417-5.725-13.804H0v-0.002h0.014V19.542H0v-0.005h0.014 C0.015,14.263,2.126,9.466,5.541,5.952c0.062-0.073,0.127-0.145,0.196-0.214c3.531-3.531,8.417-5.724,13.804-5.725V0H19.542 L19.542,0z M105.57,28.056c-3.163,0-5.729,2.566-5.729,5.729s2.566,5.729,5.729,5.729c3.164,0,5.73-2.566,5.73-5.729 S108.734,28.056,105.57,28.056L105.57,28.056z"/></g></svg>

                            </a>
						</div>
						
					</div>
					<div className="hidden md:flex items-center space-x-3 ">
                    <button onClick={handlelogout}  className=" butt text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Signout</button>
                    <Switch onChange={props.changetheme}/>
					</div>
                    <div className="md:hidden flex items-center">
                    <button onClick={handlelogout}  className=" text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0">Signout</button>
                    <Switch onChange={props.changetheme}/>
					</div>
                   
            
					
				</div>
			</div>
            <div className="hidden mobile-menu">
				<ul className="">
					<li className="active"><a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
					<li><a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
					<li><a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
					<li><a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
				</ul>
			</div>
            
				
			
			
			
		</nav>
            <ChatEngine
                height="calc(97vh - 64px)"
                projectID="c32d4ac2-e73a-40f4-ae49-929e0569380c"
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
        </>
    )
}

export default Chat;