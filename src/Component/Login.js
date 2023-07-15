import './LoginCss.css';
import { Link } from 'react-router-dom';
import { ImLinkedin } from 'react-icons/im';
import { BsGithub } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import APIService from '../APIService';


export default function Login() {

    // Email input useState
    const [email, setEmail] = useState("");

    // Pass input useState
    const [password, setPassword] = useState("");

    // Email input handler
    function emailHandler(e) {
        setEmail(e.target.value);
    };

    // Pass input handler
    function passwordHandler(e) {
        setPassword(e.target.value);
    };

    // Submit button handler
    function submitLoginHandler(e) {
        e.preventDefault();
        setEmail('');
        setPassword('');
        APIService.signin(email, password);
    };


    function loginWithGithub(){
        window.location.assign("http://localhost:8080/login/github")
    }

    function loginWithLinkedin(){
        window.location.assign("http://localhost:8080/login/linkedin")
    }


    // function from react-oauth google for OAuth google
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
                <ImLinkedin className="linkedin" onClick={loginWithLinkedin} style={{cursor:"pointer"}}/>
                <BsGithub className="github" onClick={loginWithGithub} style={{cursor:"pointer"}}/>
                <SiGmail className="email" onClick={() => loginWithGmail()} style={{cursor:"pointer"}}/>
            </div>
            <h2 className="wordBetweenLine">
                OR
            </h2>
            <form className="form">
                <input type="text" placeholder="Email" value={email} onChange={emailHandler} />
                <input type="text" placeholder="Password" value={password} onChange={passwordHandler}/>
                <div className="buttonContainer">
                    <button type="submit" onClick={submitLoginHandler}>Sign in</button>
                </div>
            </form>
            <p className="newHereText">New here? <span><Link to="/signup" className='signupLink'>Sign up</Link></span></p>
        </div>
    )
}