/* eslint-disable */
import React, { useState, useEffect} from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useWindowWidth } from '@react-hook/window-size'

import decode from 'jwt-decode'
import * as actionType from '../../actions/constants';

import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';

import UserCard from '../UserCard/UserCard';
import Leventis from '../Leventis/Leventis';


const Nav = () => {

  const width = useWindowWidth()
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const { profiles  } = useSelector((state) => state.profiles);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [openUserCard, setOpenUserCard] = useState(false)
  const closeToggle =() => setOpenUserCard(false)
  const [profile, setProfile] = useState({})


  useEffect(() => {
    for (let i = 0; i < profiles.length; i++) {
      if(profiles[i]?.email === user?.result?.email) {
        setProfile(profiles[i])
      }
    }
  },[profiles])

  
  const logout = () => {
    dispatch({ type: actionType.LOGOUT });
    setOpenUserCard(false)

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
      // eslint-disable-next-line
  }, [location]);

  // const lang = navigator.language
  // console.log(lang)

return (
<>
  <div id="google_translate_element"></div>
  <nav  className="nav">
  <div className="wrapper">
    <div className="logo"><Link to="/"><Leventis /></Link></div>
    <input type="radio" name="slider" id="menu-btn" />
    <input type="radio" name="slider" id="close-btn" />
    <ul className="nav-links">
      <label htmlFor="close-btn" className="btn close-btn"><CloseIcon /></label>
      <li><Link to="/" onClick={() => {window.location.href="/"}}>Home</Link></li>

      <li>
        <Link to="#" className="desktop-item">About</Link>
        <input type="checkbox" id="showDrop1" />
        <label htmlFor="showDrop1" className="mobile-item">About +</label>
        <ul className="drop-menu">
          <li><Link to="/about" onClick={width < 957 ? () => {window.location.href="/about"} : null} >Overview</Link></li>
          <li><Link to="/council" onClick={width < 957 ? () => {window.location.href="/council"} : null} >Council Members</Link></li>
        </ul>
      </li>

      <li>
      <Link to="#" className="desktop-item">Publication</Link>
        <input type="checkbox" id="showDrop3" />
        <label htmlFor="showDrop3" className="mobile-item">Publication +</label>
        <ul className="drop-menu">
            <li><Link to="/publications" onClick={width < 957 ? () => {window.location.href="/publications"} : null } >All Publications</Link></li>
            <li><Link to="/regions" onClick={width < 957 ? () => {window.location.href="#"} : null } >Publications by Region</Link></li>
            <li><Link to="/instruction-to-authors" onClick={width < 957 ? () => {window.location.href="#"} : null } >Instruction to Authors</Link></li>
            <li><Link to="/fulltext" onClick={width < 957 ? () => {window.location.href="/fulltext"} : null } >Accessing full texts</Link></li>
        </ul>
      </li>

      <li><Link to="/news" onClick={width < 957 ? () => {window.location.href="/news"} : null } >News</Link></li>
      <li>
  <Link to="/membership">
    Join WAOS
  </Link>
</li>
      {(user && user?.result?.role === 'admin') && (
        <li>
        <Link to="#" className="desktop-item">Admin</Link>
          <input type="checkbox" id="showDrop4" />
          <label htmlFor="showDrop4" className="mobile-item">Admin +</label>
          <ul className="drop-menu">
              <li><Link to="/database" onClick={width < 957 ? () => {window.location.href="/publications"} : null } >Manage users</Link></li>
              <li><Link to="/moderator" onClick={width < 957 ? () => {window.location.href="#"} : null } >Manage articles</Link></li>
          </ul>
        </li>
      )}

      <li><Link to="/contact" onClick={width < 957 ? () => {window.location.href="/contact"} : null }>Contact</Link></li>

        {user?.result ? ( 
            <li>
                <Avatar style={{marginTop: '14px', cursor: 'pointer'}} onClick={() => setOpenUserCard((prevState) => !prevState)} alt={profile?.name} src={profile?.profilePicture ? profile?.profilePicture :"https://i.postimg.cc/W4z4Xtck/avatar.png"} />
            </li>
            ) :
            (
              <li><Link to="/auth" onClick={() =>{window.location.href="/auth"}} style={{backgroundColor: '#E75A2F', color: 'white'}} >Login</Link></li>
            )}

    </ul>

    {/* <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars" /></label> */}
    <label htmlFor="menu-btn" className="btn menu-btn"><i style={{paddingRight: '10px', color: 'black'}} className="fas fa-bars" /></label>
  </div>
</nav>

{openUserCard && (
        <UserCard profile={profile} logout={logout} setOpenUserCard={setOpenUserCard} closeToggle={closeToggle} />
    )}

</>

    )
}

export default Nav
