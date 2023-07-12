import './LoginCss.css';
import { Link } from 'react-router-dom';
import { ImLinkedin } from 'react-icons/im';
import { BsGithub } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import APIService from '../APIService';


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function usernameHandler(e) {
        setUsername(e.target.value);
    };

    function passwordHandler(e) {
        setPassword(e.target.value);
    };

    function submitButtonHandler(e) {
        e.preventDefault();
        setUsername('');
        setPassword('');
    };


    function loginWithGithub(){
        window.location.assign("http://localhost:8080/login/github")
    }

    const loginWithGmail = useGoogleLogin({
        onSuccess: response => {
            APIService.FetchDataFromGoogle(response.access_token)
        }
    })


    return (
        <div className="loginContainer">
            <h1 className="welcomeText">
                Welcome
            </h1>
            <div className="icons">
                <ImLinkedin className="linkedin" />
                <BsGithub className="github" onClick={loginWithGithub}/>
                <SiGmail className="email" onClick={() => loginWithGmail()}/>
            </div>
            <h2 className="wordBetweenLine">
                OR
            </h2>
            <form className="form">
                <input type="text" placeholder="Username" value={username} onChange={usernameHandler} />
                <input type="text" placeholder="Password" value={password} onChange={passwordHandler}/>
                <div className="buttonContainer">
                    <button type="submit" onClick={submitButtonHandler}>Sign in</button>
                </div>
            </form>
            <p className="newHereText">New here? <span><Link to="/signup" className='signupLink'>Sign up</Link></span></p>
        </div>
    )
}