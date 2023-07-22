﻿import './ProfileCss.css';
import { useState, useEffect } from 'react';
import APIService from '../APIService';
import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { GiConfirmed } from 'react-icons/gi'

export default function Profile() {

    const [userData, setUserData] = useState({});
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");

    useEffect(() => {
        APIService.fetchUser(sessionStorage.getItem("email")).then(data => setUserData(data))
    }, [])

    function updateData(param, data) {
        APIService.updateUser(sessionStorage.getItem('userId'), param, data);
        window.location.reload();
    }

    function phoneNumberHandler(e) {
        setPhoneNumber(e.target.value);
    }

    function locationHandler(e) {
        setLocation(e.target.value);
    }

    return (
        <div className='profileContainer'>
            <div className='profilePictureContainer'>
                <img src={sessionStorage.getItem("avatar_url")} className='profilePicture' />
                <p className='name'>{sessionStorage.getItem("name")}</p>
                <table className=''>
                    <tr>
                        <td><IoMdMail className='profileIcons' /></td>
                        <td><a href={`mailto:${sessionStorage.getItem("email")}`} className='clickableContact'><p>{userData?.email}</p></a></td>
                    </tr>
                    <tr>
                        <td><MdLocationOn className='profileIcons' /></td>
                        <td>{userData?.location ? <a href={`https://www.google.com/maps/search/?api=1&query=${userData.location}`} className='clickableContact'><p>{userData?.location.replace(/["]/g, "")}</p></a> : <div><input type='text' placeholder='Location' className='detailValue' value={location} onChange={locationHandler} /><GiConfirmed className={location ? "tick" : "untouchableTick"} onClick={() => updateData('location', location)} /></div>}</td>
                    </tr>
                    <tr>
                        <td><BsFillTelephoneFill className='profileIcons' /></td>
                        {/* remove all the double quote with  (/["]/g, "")*/}
                        <td>{userData?.phoneNumber ? <p>{userData?.phoneNumber.replace(/["]/g, "")}</p> : <div className='inputDetail'><input type='text' placeholder='Phone Number' className='detailValue' value={phoneNumber} onChange={phoneNumberHandler} /><GiConfirmed className={phoneNumber ? "tick" : "untouchableTick"} onClick={() => updateData("phonenumber", phoneNumber)} /></div>}</td>
                    </tr>
                </table>
            </div>
            <div className='profileDataContainer'>
                <p>
                    {userData.bio}
                </p>
            </div>
        </div>
    )
}
