import Header from "./Header";
import Sidebar from "./Sidebar";
import Data from "./Data";
import logo from './components/cloudlogo.png';
import React, {useState} from "react";
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider } from "firebase/auth";

var userid=null, userName=null;
function App() {
  const [user,setUser] = useState(null);

  const auth = getAuth();
  const provider= new GoogleAuthProvider();
  const signIn = () => {
    signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      userid= user.uid; //unique and consistent for a certain google a/c
      // console.log("user id is "+userid);
      userName=user.displayName;
      setUser(user)
    }).catch((error) => {
      console.log("authentication error");
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      // const email = error.customData.email;
      // The AuthCredential type that was used.
      // const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode+":"+errorMessage);
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
        <div className="loginWrap" onClick={signIn}>
          <img src={logo} alt=""/>
          <button>Login to Google Drive Clone</button>
        </div>
      )
    }
    </>


    
    
  );
}

export default App;
export {userid, userName};
