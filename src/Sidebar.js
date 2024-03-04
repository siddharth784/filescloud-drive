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
import { Modal, Fade, Grow, Slide, Zoom } from '@mui/material';
import {firebaseApp,currtime,db,storage,doc,setDoc,addDoc,collection,onSnapshot,ref,uploadBytes,auth,provider} from './firebase';
import {getDownloadURL} from "firebase/storage"
import { userid } from './App';
import { SnapshotMetadata, serverTimestamp } from 'firebase/firestore';

function formatFileSize(fileSizeInBytes) {
  if (fileSizeInBytes < 1024) {
    return fileSizeInBytes + ' bytes';
  } else if (fileSizeInBytes < 1024 * 1024) {
    return (fileSizeInBytes / 1024).toFixed(2) + ' KB';
  } else if (fileSizeInBytes < 1024 * 1024 * 1024) {
    return (fileSizeInBytes / (1024 * 1024)).toFixed(2) + ' MB';
  } else {
    return (fileSizeInBytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  }
}

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
  const handleChange=(e)=>{ //for if the selected/browsed file is changed again before clicking upload
    if(e.target.files[0])
    {
      setFile(e.target.files[0]);
    }
  }

  const handleUpload=(e)=>{
    e.preventDefault();
    setUploading(true);
    const spaceRef=ref(storage, `files/${file.name}`);
    
    uploadBytes(spaceRef,file).then((snapshot) => {
      // spaceRef.putFile(file).then((snapshot) =>{
      console.log('Uploaded a raw string!');
      getDownloadURL(spaceRef).then(url=>{
        // const docRef = setDoc(doc(db, "myfiles"), {

        addDoc(collection(db, userid), { //https://www.youtube.com/watch?v=v_hR4K4auoQ&list=LL&index=3&t=690s&pp=gAQBiAQB https://firebase.google.com/docs/firestore/manage-data/structure-data https://firebase.google.com/docs/firestore/data-model
          filename:file.name,
          fileURL:url,
          // timestamp: db.Timestamp().fromDate(new Date())
          // timestamp: ServerValue.TIMESTAMP
          // size:snapshot._delegate.bytesTransferred()
          // size: file.data().storage
          size: formatFileSize(file.size),
          // uploadTime: firebaseApp.Timestamp.now()
        });
        // console.log("Document written with ID: ", docRef.id);
        setUploading(false);
        setFile(null);
        setOpen(false);
      })
    });
  }


  return (   
    <>
    <Modal open={open} onClose={handleClose}>
      <Zoom in={open}>
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
      </Zoom>
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