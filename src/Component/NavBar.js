import { Link } from 'react-router-dom';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiOutlineLogin } from 'react-icons/hi';
import './NavBarCss.css';


export default function NavBar(){

    function logout(){
        sessionStorage.clear();
        window.location.href="http://localhost:3000/";
    }
    return (
        <div className='NavBarContainer'>
            <div className="Title">
                <Link className='navLink' to="/">MentorShip</Link>
            </div>
            {sessionStorage.getItem("avatar_url") === null ?
            <div className='topRightLinks'>
                <Link className='navLink' to="/login" ><HiOutlineLogin className="loginIcon"/></Link>
                <Link className="navLink" to="/explore">Explore</Link>
            </div>
            : <div className='topRightLinks'>
                <Link className="navLink" to="/profile"><img className="userAvatar" src={sessionStorage.getItem("avatar_url")} /></Link>
                <Link className="navLink" to="/explore">Explore</Link>
                <p className="navLink" onClick={logout}>LogOut</p>
                </div>}
        </div>
    )
}