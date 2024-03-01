import React, { useEffect, useState } from 'react';
import "./css/sidebar.css";
import AddIcon from '@mui/icons-material/Add';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudQueueIcon from '@mui/icons-material/CloudQueue';
import { Modal } from '@mui/material';
import {db,storage,doc,setDoc,addDoc,collection,onSnapshot,ref,uploadBytes,auth,provider} from './firebase';
import {getDownloadURL} from "firebase/storage"
// import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

function Sidebar() {
  const [open,setOpen]=useState(false);
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState([]);
  const handleClose=()=>{
    setOpen(false);
  }
  const handleOpen=()=>{
    setOpen(true);
  }
  const handleChange=(e)=>{
    if(e.target.files[0])
    {
      setFile(e.target.files[0]);
      // console.log(e.target.files[0]);
    }
  }
  // storage.ref
  const handleUpload=(e)=>{
    e.preventDefault();
    setUploading(true);
    const storageRef=ref(storage);
    const spaceRef=ref(storage, `files/${file.name}`);

    
    uploadBytes(spaceRef,file).then((snapshot) => {
      // spaceRef.putFile(file).then((snapshot) =>{
      console.log('Uploaded a raw string!');
      getDownloadURL(spaceRef).then(url=>{
        // const docRef = setDoc(doc(db, "myfiles"), {

        addDoc(collection(db, "myfiles"), { //https://www.youtube.com/watch?v=v_hR4K4auoQ&list=LL&index=3&t=690s&pp=gAQBiAQB https://firebase.google.com/docs/firestore/manage-data/structure-data https://firebase.google.com/docs/firestore/data-model
          filename:file.name,
          fileURL:url,
          // timestamp: db.Timestamp().fromDate(new Date())
          // timestamp: ServerValue.TIMESTAMP
          // size:snapshot._delegate.bytesTransferred()
          // size: file.data().storage
        });
        // console.log("Document written with ID: ", docRef.id);
        setUploading(false);
        setFile(null);
        setOpen(false);
      })
      ref(storageRef.child)
    });
  }


  return (
        
    <>
    <Modal open={open} onClose={handleClose}>
      <div className="modal_pop">
        <form>
          <div className="modalHeading">
            <h3>Select file you want to upload</h3>
          </div>

          <div className="modalBody">
            {
              uploading ? (<p className="uploading">Uploading...</p>) : (
            <>
              <input type="file" onChange={handleChange}/>
              <input type="submit" className="post_submit" onClick={handleUpload}/>
            </>)
            }
          </div>
        </form>
      </div>
    </Modal>

    <div className='sidebar'>
        <div className="sidebar_btn">
            <button onClick={handleOpen}>
                {/* <img src="" alt=""></img> */}
                <AddIcon/>
                <span>New</span>
            </button>
        </div>

        <div className="sidebar_options">
          <div className="sidebar_option sidebar_option-active">
            <MobileScreenShareIcon/>  
            <span>My Drive</span>
          </div>
          <div className="sidebar_option">
            <DevicesIcon/>
            <span>Computers</span>
          </div>
          <div className="sidebar_option">
            <PeopleAltIcon/>
            <span>Shared with me</span>
          </div>
          <div className="sidebar_option">
            <AccessTimeIcon/>
            <span>Recent</span>
          </div>
          <div className="sidebar_option">
            <StarOutlineIcon/>
            <span>Starred</span>
          </div>
          <div className="sidebar_option">
            <DeleteOutlineIcon/>
            <span>Trash</span>
          </div>
          <hr></hr>
          <div className="sidebar_option">
            <CloudQueueIcon/>
            <span>Storage</span>
          </div>
          <div className="progress_bar">
            <progress size="tiny" value="45" max="100"/>
            <span>6.45 GB of 15 GB used</span>
          </div>
        </div>
    </div>

    </>
  )
}

export default Sidebar