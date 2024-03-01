import React, { useEffect, useState } from 'react'
import "./css/data.css"
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { InsertDriveFile } from '@mui/icons-material';
// import { db } from './firebase';
import {db,storage,doc,setDoc,addDoc,collection,onSnapshot,ref,uploadBytes,auth,provider} from './firebase';
import { getDownloadURL } from 'firebase/storage';

function Data() {
  // const [files, setFiles] = useState([]);

  // useEffect(() =>{
  //   collection(db,"myfiles").onSnapshot(snapshot=>{
  //     setFiles(snapshot.docs.map(doc=>({
  //       id: doc.id,
  //       data: doc.data
  //     })))
  //   })
  // })
  const [files, setFiles] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "myfiles"), (snapshot) => {
      setFiles(snapshot.docs.map(doc=>({
        id:doc.id,
        data:doc.data()
      })))
      console.log("i am don");
    });
    // deprecated way(as per yt vid):
    // collection(db,"myfiles").onSnapshot(snapshot => {
    //   setFiles(snapshot.docs.map(doc=>({
    //     id:doc.id,
    //     data:doc.data()
    //   })))
    // })
  }, [])
  return (
    <div className="data">
        <div className="data__header">
            <div className="data__headerLeft">
                <p>My Drive</p>
                <ArrowDropDown/>
                {/* </ArrowDropDownIcon> */}
            </div>
            <div className="data__headerRight">
              <FormatListBulletedIcon/>
              <InfoOutlinedIcon/>
            </div>
        </div>
        <div className="data__content">
          <div  className="data_grid">
            {
              files.map((file)=>{
                return <div className="data__file">
                          <InsertDriveFile/>
                          <p>{file.data.filename}</p>
                        </div>
              })
            }            
          </div>

          <div className="data__list">
            <div className="detailsRow">
              <p><b>Name <ArrowDropDown/></b></p>
              <p><b>Owner </b></p>
              <p><b>Last Modified </b></p>
              <p><b>File Size </b></p>
            </div>
            
            {
              files.map((file) => {
                return <div className="detailsRow">
                <a href={file.data.fileURL} target="_blank" rel="noreferrer"><InsertDriveFile/>{file.data.filename}</a>
                <p>Me</p>
                {/* <p>{new Date(file.data.timestamp)}</p> */}
                {/* <p>{file.data.size}</p> */}
                </div>
              })
            }
            
          </div>
        </div>
    </div>
  )
}

export default Data