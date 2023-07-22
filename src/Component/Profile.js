import './ProfileCss.css';
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

    function phoneNumberHandler(e){
        setPhoneNumber(e.target.value);
    }

    function locationHandler(e){
        setLocation(e.target.value);
    }

    console.log(userData)

    return (
        <div className='profileContainer'>
            <div className='profilePictureContainer'>
                <img src={sessionStorage.getItem("avatar_url")} className='profilePicture' />
                <p className='name'>{sessionStorage.getItem("name")}</p>
                <table className=''>
                    <tr>
                        <td><IoMdMail className='icons' /></td>
                        <td><p>{userData?.email}</p></td>
                    </tr>
                    <tr>
                        <td><BsFillTelephoneFill className='icons' /></td>
                        <td>{userData?.Phonenumber ? <p>{userData?.Phonenumber}</p> : <div className='inputDetail'><input type='text' placeholder='Phone Number' className='detailValue' value={phoneNumber} onChange={phoneNumberHandler}/><GiConfirmed className={phoneNumber ? "tick" : "untouchableTick"}/></div>}</td>
                    </tr>
                    <tr>
                        <td><MdLocationOn className='icons' /></td>
                        <td>{userData?.location ? <p>{userData?.location}</p> : <div><input type='text' placeholder='Location' className='detailValue' value={location} onChange={locationHandler}/><GiConfirmed className={location ? "tick" : "untouchableTick"}/></div>}</td>
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
