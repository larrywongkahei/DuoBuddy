import React, { useState } from 'react';
import './HomeCss.css';
import { AiFillInstagram } from 'react-icons/ai';
import { ImLinkedin } from 'react-icons/im';
import { SiGmail } from 'react-icons/si';
import { BsGithub } from 'react-icons/bs';
import { useNavigate } from "react-router-dom";
import logo from '../logo.png';

const Home:React.FC = ()  => {

    // Searchfield input
    const [input, setInput] = useState<string>("");
    const navigate = useNavigate();

    // Searchfield input handler
    function inputHandler(e:React.ChangeEvent<HTMLInputElement>) {
        setInput(e.target.value);
    };

    // Submit form button handler
    function handleSubmitForm(e:React.SyntheticEvent) {
        e.preventDefault();
        // /\s/g = all whitespace
        const cleanedSearchField = input.replace(/\s/g, "")
        if(cleanedSearchField.length === 0){
            alert("Seach could not be empty")
        }
        else{
            navigate(`/searchResult/${cleanedSearchField}`);
        }
    };

    function ToGithub(){
        return window.location.href = "https://github.com/larrywongkahei";
    }

    function ToInstagram(){
        return window.location.href = "https://www.instagram.com/heiyeungyeung520/";
    }

    function ToLinkedin(){
        return window.location.href = "https://www.linkedin.com/in/ka-hei-wong-429b66257/";
    }

    return (
        <div className="HomePageBody">
            <img src={logo} alt='logo' style={{width:"18rem", height:"14rem", marginBottom:"2rem"}}/>
            <h1 className="projectTitle" >Project Ideas</h1>
            <form className="titleSearch">
                <p className="searchLabel">Search</p>
                <input type="text" value={input} className="searchInput" onChange={inputHandler} placeholder="Input project name or tag"></input>
                <input type="submit" className="submitButton" onClick={handleSubmitForm} />
            </form>
            {/* <p className="exploreLabel"><Link to="/explore" className='exploreLink'>Explore</Link></p> */}
            <div className="contactMe">
                <BsGithub className="githubHome" onClick={ToGithub} style={{cursor:"pointer"}}/>
                <AiFillInstagram className="instagramHome" onClick={ToInstagram} style={{cursor:"pointer"}}/>
                <ImLinkedin className="linkedinHome" onClick={ToLinkedin} style={{cursor:"pointer"}}/>
                <a href='mailto:makemak123@gmail.com' className='emailLink'>
                <SiGmail className="emailHome"/>
                </a>
            </div>
        </div>
    );
};

export default Home;
