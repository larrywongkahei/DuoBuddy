﻿import './LoginCss.css';
import { Link } from 'react-router-dom';
import { ImLinkedin } from 'react-icons/im';
import { BsGithub } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { APIService } from '../APIService';


const Login:React.FC = () => {

    // Email input useState
    const [email, setEmail] = useState<string>("");

    // Pass input useState
    const [password, setPassword] = useState<string>("");

    // Email input handler
    function emailHandler(e:React.ChangeEvent<HTMLInputElement>):void {
        setEmail(e.target.value);
    };

    // Pass input handler
    function passwordHandler(e:React.ChangeEvent<HTMLInputElement>):void {
        setPassword(e.target.value);
    };

    // Submit button handler
    function submitLoginHandler(e:React.SyntheticEvent):void {
        e.preventDefault();
        if(email === "" || password === ""){
            alert("Please fill in all fields")
        }else{
            APIService.signin(email, password);
            setEmail('');
            setPassword('');
        }
    };


    function loginWithGithub(){
        window.location.assign("https://mentorshipbackend-ceeb21a607e1.herokuapp.com/login/github")
    }

    function loginWithLinkedin(){
        window.location.assign("https://mentorshipbackend-ceeb21a607e1.herokuapp.com/login/linkedin")
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
                <input type="email" placeholder="Email" value={email} onChange={emailHandler} />
                <input type="password" placeholder="Password" value={password} onChange={passwordHandler}/>
                <div className="buttonContainer">
                    <input type="submit" onClick={submitLoginHandler} value="Sign in"/>
                </div>
            </form>
            <p className="newHereText">New here? <span><Link to="/signup" className='signupLink'>Sign up</Link></span></p>
        </div>
    )
};

export default Login;