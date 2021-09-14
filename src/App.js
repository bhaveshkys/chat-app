//import './App.css';
import {Helmet} from "react-helmet"

import { BrowserRouter as Router, Switch, Route,useHistory } from "react-router-dom";
import {lazy, Suspense, useState } from 'react';
import * as ROUTES from './constants/routes';
import UserContext from './context/user';
import useAuthlistener from './hooks/use-auth-listener';
const Login = lazy(()=>import("./pages/login"));
const Chat=lazy(()=>import("./pages/chat"));
const Not_Found = lazy(()=>import("./pages/not_found"));


function App() { 
  const [style,setStyle]=useState("light")
  function onChange(checked) {
    if(checked){
      setStyle("dark")
    }else if(!checked){
      setStyle("light")
    }
  }
  const{user}=useAuthlistener();
  return (
    <>
    {(style=="dark")&& <Helmet>
    <style type="text/css">{`#ce-feed-container{background-color:#404757!important}#ce-feed-container::-webkit-scrollbar{background-color:#404757}#ce-feed-container::-webkit-scrollbar-thumb{background-color:#4e5566}.ce-chat-list::-webkit-scrollbar{background-color:#404757}.ce-chat-list::-webkit-scrollbar-thumb{background-color:#4e5566}.ce-feed-container-top{background-color:#404757!important}.ce-chat-title-container{background-color:#404757!important}.ce-chat-title{background-color:#404757!important}.ce-chat-feed-container{background-color:#404757!important}.ce-my-message-bubble{background-color:#726dfe!important}.ce-their-message-bubble{background-color:#535a6d!important;color:#fff!important}.ql-editor{background-color:#4e5566!important;border-color:#404757;border-radius:12px;overflow-y:hidden;width:750px}.ce-chats-container{background-color:#404757!important;border-radius:0!important}body{background-color:#404757!important}.ce-chat-card.false{background-color:#535a6d!important;border-radius:12px;margin-bottom:5px!important;margin-right:5px!important}.ce-chat-form-container{background-color:#404757!important;color:#fff!important}.ce-active-chat-card{background-color:#726dfe!important}#toolbar{background-color:#404757!important}#msg-form-container{background-color:transparent!important}.ql-snow{border:0!important}.ce-chat-list{overflow-y:auto}.ce-settings{background-color:#404757!important}.ce-input{color:#fff;background-color:#4e5566}.ce-person-title-container{color:#fff;background-color:#4e5566!important}.ce-person-text{color:#fff!important}.ce-photo-title-container{color:#fff;background-color:#4e5566!important}.ce-chat-settings-container~div>div{border-top:1px solid transparent!important}.ce-chat-settings-container~div{border-top:1px solid transparent!important}.ql-stroke{stroke:#fff!important}.ql-fill{fill:#fff!important}.anticon-paper-clip{color:#fff!important}.ce-chat-title-text{color:#fff!important}.ce-their-message-sender{color:rgb(255 255 255 / 36%)!important}.ce-message-date-text{color:rgb(255 255 255 / 36%)!important}.ce-chat-list-mobile-option{background-color:#404757!important}.ce-chat-settings-mobile-option{background-color:#404757!important}`}</style>
    
    </Helmet>}
    {(style=="light")&& <Helmet>
      <style type="text/css">{`.butt{color:#000;border-color:#000}`}</style>
    </Helmet>}
      <UserContext.Provider value={{user}}>
        <Router>
          <Suspense fallback={<p>LOADING</p>}>
            <Switch>
              <Route path={ROUTES.LOGIN} component={Login} exact/>
              <Route  path={ROUTES.CHAT}  render={(props)=>(
                <Chat {...props} changetheme={theme=> onChange(theme)}/>
              )} exact/>
              <Route component={Not_Found}/>
            </Switch>
          </Suspense>
        </Router>
        
      </UserContext.Provider>
    </>
  );
}

export default App;
