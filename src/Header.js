import React from 'react'
import "./css/header.css"
import logo from './components/cloudlogo.png';
// import SearchIcon from '@mui/icons-material/Search';
// import SearchIcon from 'https://fontawesome.com/icons/magnifying-glass?f=classic&s=solid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faSliders } from '@fortawesome/free-solid-svg-icons';
// import { faGear } from '@fortawesome/free-solid-svg-icons';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
// import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { faGrip } from '@fortawesome/free-solid-svg-icons';
// import { AppsIcon } from '@mui/icons-material/Apps';
import AppsIcon from '@mui/icons-material/Apps';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'></link>
function Header({photoURL}) {
  return (
    <div class="header">
      {/* i am header */}
        <div className="header__logo">
            <img src={logo} alt="logo"></img>
            <span>Drive</span>
        </div>
        <div className='header__search'>
            {/* <SearchIcon/> */}
            {/* <i class="fa-solid fa-magnifying-glass"></i> */}
            {/* <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /> */}
            <FontAwesomeIcon icon={faMagnifyingGlass} />
            <input type="text" placeholder="Search in Drive"></input>
            <FontAwesomeIcon icon={faSliders} />
        </div>
        <div className='header__icons'>
          <span>
            <HelpOutlineIcon/>
            <SettingsOutlinedIcon/>
            {/* <FontAwesomeIcon icon={faGrip} /> */}
            {/* {AppsIcon} */}
            <AppsIcon/>
            <img src={photoURL}/>
            {/* <AccountCircleIcon src={photoURL}/> */}
          </span>
        </div>

    </div>
  )
}

export default Header
