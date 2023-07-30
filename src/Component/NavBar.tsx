import { Link } from 'react-router-dom';
import { HiOutlineLogin } from 'react-icons/hi';
import logo from '../logo.png';
import './NavBarCss.css';


export default function NavBar(){

    // Log out button, clear all session storage
    // I use session storage to prevent data lost when reload the page
    function logout(){
        sessionStorage.clear();
        window.location.href="https://larrywongkahei.github.io/DuoBuddy/";
    }
    return (
        <div className='NavBarContainer' id='NavBar'>
            <Link className='navLink' to="/">
            <div className="Title">
                <img src={logo} alt='logo' style={{width:"5rem", height:"4rem"}}/>
                <p>DuoBuddy</p>
            </div>
            </Link>
            {/* User Session Storage to check if the user has logged in */}
            {sessionStorage.length === 0 ?
            <div className='topRightLinks'>
                <Link className='navLink' to="/login" ><HiOutlineLogin className="loginIcon"/></Link>
                <Link className="navLink" to="/explore">Explore</Link>
            </div>
            : <div className='topRightLinks'>
                <Link className="navLink" to="/profile"><img className="userAvatar" src={sessionStorage?.getItem("avatar_url") || ""} alt='logo'/></Link>
                <Link className="navLink" to="/explore">Explore</Link>
                <p className="navLink" onClick={logout}>LogOut</p>
                </div>}
        </div>
    )
}