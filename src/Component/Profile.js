import './ProfileCss.css';
import { useState, useEffect } from 'react';
import APIService from '../APIService';

export default function Profile(){
    
    const [userData, setUserData] = useState({});

    useEffect(() => {
        APIService.fetchUser(sessionStorage.getItem("email")).then(data => setUserData(data))
    }, [])

    console.log(userData)

    return (
        <div>
            <div className='profilePictureContainer'>
                <img src={sessionStorage.getItem("avatar_url")} className='profilePicture'/>
                <div>
                    <p className='name'>{sessionStorage.getItem("name")}</p>
                </div>
            </div>
        </div>
    )
}
