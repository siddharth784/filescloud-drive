// import firebase from "firebase";
// import {firebase} from 'firebase/app';
// import 'firebase/storage' from firebase;  
import { initializeApp } from 'firebase/app';
// import { getFirestore } from 'firebase/firestore/lite';
import { getFirestore, Timestamp } from 'firebase/firestore';
import { doc, setDoc, addDoc, collection, onSnapshot } from 'firebase/firestore'
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAQqfiHGzwvtNT87YqYQIDjRvQ1v4v1Ww0",
    authDomain: "drive-clone-8e258.firebaseapp.com",
    projectId: "drive-clone-8e258",
    storageBucket: "drive-clone-8e258.appspot.com",
    messagingSenderId: "519727140261",
    appId: "1:519727140261:web:ac8fcae005ea32162dac4c"
  };

  const firebaseApp=initializeApp(firebaseConfig);

//   const db=firebaseApp.firestore();
  const db=getFirestore(firebaseApp);
  const storage=getStorage(firebaseApp);
//   const storageRef=ref(storage);
  const auth=getAuth(firebaseApp);
//   const provider=new auth.GoogleAuthProvider();
  const provider=GoogleAuthProvider;
  const currtime=Timestamp;
  export {firebaseApp,db,storage,doc,setDoc,addDoc,collection,onSnapshot,ref,uploadBytes,auth,provider,currtime}
//   export {db, storage, auth}