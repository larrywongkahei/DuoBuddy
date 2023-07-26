import './SignupCss.css';
import { useState } from 'react';
import { ImLinkedin } from 'react-icons/im';
import { BsGithub } from 'react-icons/bs';
import { SiGmail } from 'react-icons/si';
import { useGoogleLogin } from '@react-oauth/google';
import { APIService } from '../APIService';

export default function Signup() {

    // Display name input data
    const [displayName, setDisplayName] = useState<string>("")

    // Display name input data handler
    function displayNameHandler(e:React.ChangeEvent<HTMLInputElement>) : void{
        setDisplayName(e.target.value)
    }


    // Email input data
    const [email, setEmail] = useState<string>("")

    // Email input data handler
    function emailHandler(e:React.ChangeEvent<HTMLInputElement>) : void{
        setEmail(e.target.value)
    }


    // Password input data
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState("")

    // Pass input data hanlder
    function passwordHandler(e:React.ChangeEvent<HTMLInputElement>) : void {
        setPassword(e.target.value)
    }

    function confirmPasswordHandler(e:React.ChangeEvent<HTMLInputElement>) : void {
        setConfirmPassword(e.target.value);
    }

    function loginWithGithub() : void{
        window.location.assign("https://mentorshipbackend-ceeb21a607e1.herokuapp.com/login/github")
    }

    function loginWithLinkedin():void{
        window.location.assign("https://mentorshipbackend-ceeb21a607e1.herokuapp.com/login/linkedin")
    }


    const loginWithGmail = useGoogleLogin({
        onSuccess: response => {
            APIService.FetchDataFromGoogle(response.access_token)
        }
    })

    // Signup submit button handler
    function submitButtonHandler(e:React.SyntheticEvent) : void{
        e.preventDefault()
        APIService.signup(displayName, email, password);
    }


    return (
        <div className="signUpContainer">
            <h1 className="welcomeText">
                Sign up with
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
                <input type="text" placeholder="Display name" value={displayName} onChange={displayNameHandler} />
                <input type="text" placeholder="Email" value={email} onChange={emailHandler} />
                <input type="password" placeholder="Password" value={password} onChange={passwordHandler}/>
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={confirmPasswordHandler}/>
                <div className="buttonContainer">
                    <button type="submit" onClick={submitButtonHandler}>Sign up</button>
                </div>
            </form>
        </div>
    )
}