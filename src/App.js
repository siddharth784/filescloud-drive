import Header from "./Header";
import Sidebar from "./Sidebar";
import Data from "./Data";
import logo from './components/cloudlogo.png';
import React, {useState} from "react";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

function App() {
  const [user,setUser] = useState(null);

  const auth = getAuth();
  const provider= new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      setUser(user)
    }).catch((error) => {
      console.log("authentication error");
    })
  };

  return (
    <>
    {
      user ? (
        <div className="App">
          <Header photoURL={user.photoURL}/>
          <div className="main">
            <Sidebar/>
            <Data/>
          </div>
        </div>
      ) : (
        <div className="loginWrap">
          <img src={logo} alt=""/>
          <button onClick={signIn}>Login to Google Drive Clone</button>
        </div>
      )
    }
    </>


    
    
  );
}

export default App;
