import './SignupCss.css';
import { useState } from 'react';
import { ImLinkedin } from 'react-icons/im';
import { BsGithub } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { useGoogleLogin } from '@react-oauth/google';
import APIService from '../APIService';

export default function Signup() {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    function displayNameHandler(e) {
        setDisplayName(e.target.value)
    }

    function emailHandler(e) {
        setEmail(e.target.value)
    }

    function passwordHandler(e) {
        setPassword(e.target.value)
    }

    function loginWithGithub(){
        window.location.assign("http://localhost:8080/login/github")
    }

    const loginWithGmail = useGoogleLogin({
        onSuccess: response => {
            APIService.FetchDataFromGoogle(response.access_token)
        }
    })

    function submitButtonHandler(e){

    }


    return (
        <div className="signUpContainer">
            <h1 className="welcomeText">
                Sign up with
            </h1>
            <div className="icons">
                <ImLinkedin className="linkedin" />
                <BsGithub className="github" onClick={loginWithGithub} style={{cursor:"pointer"}}/>
                <SiGmail className="email" onClick={() => loginWithGmail()} style={{cursor:"pointer"}}/>
            </div>
            <h2 className="wordBetweenLine">
                OR
            </h2>
            <form className="form">
                <input type="text" placeholder="Display name" value={displayName} onChange={displayNameHandler} />
                <input type="text" placeholder="Email" value={email} onChange={emailHandler} />
                <input type="text" placeholder="Password" value={password} onChange={passwordHandler}/>
                <div className="buttonContainer">
                    <button type="submit" onClick={submitButtonHandler}>Sign up</button>
                </div>
            </form>
        </div>
    )
}