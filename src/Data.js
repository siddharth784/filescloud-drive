import React, { useEffect, useState } from 'react'
import "./css/data.css"
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { InsertDriveFile } from '@mui/icons-material';
// import { db } from './firebase';
import {db,storage,doc,setDoc,addDoc,collection,onSnapshot,ref,uploadBytes,auth,provider} from './firebase';
import { getDownloadURL } from 'firebase/storage';
import { userid, userName } from './App';

function Data() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, userid), (snapshot) => {
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
                  return <a href={file.data.fileURL} target='_blank' rel='noreferror'>
                          <div className="data__file">
                            <InsertDriveFile/>
                            <p>{file.data.filename}</p>
                          </div>
                        </a>
                })
              }            
            </div>

            <table className="data__list" style={{width: '100%', maxWidth: '1173px'}}>
              <thead className="detailsRow">
                {/* <p><b>Name <ArrowDropDown/></b></p> */}
                <th>
                  <p style={{textAlign: 'left'}}><b>Name </b></p>
                </th>
                <th>
                  <p><b>Owner </b></p>
                </th>
                {/* <p><b>Last Modified </b></p> */}
                <th>
                  <p><b>File Size </b></p>
                </th>
              </thead>
              
              {
                files.map((file) => {
                  return <tr className="detailsRow">
                  <td><a href={file.data.fileURL} target="_blank" rel="noreferror"><InsertDriveFile/>{file.data.filename}</a></td>
                  <td>
                    <p>{userName}</p>
                  </td>
                  {/* <p></p> */}
                  {/* <p></p> */}
                  {/* <p>{new Date(file.data.timestamp)}</p> */}
                  <td>
                    <p>{file.data.size}</p>
                  </td>
                  </tr>
                })
              }
              
            </table>
        </div>
    </div>
  )
}

export default Data