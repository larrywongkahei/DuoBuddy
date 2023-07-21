import './ProfileCss.css';
import { useState, useEffect } from 'react';

export default function Profile(){
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
