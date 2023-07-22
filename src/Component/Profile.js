import './ProfileCss.css';
import { useState, useEffect } from 'react';
import APIService from '../APIService';
import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { GiConfirmed } from 'react-icons/'

export default function Profile() {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        APIService.fetchUser(sessionStorage.getItem("email")).then(data => setUserData(data))
    }, [])

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
                        <td>{userData?.Phonenumber ? <p>{userData?.Phonenumber}</p> : <input type='text' placeholder='Phone Number' className='detailValue' />}</td>
                    </tr>
                    <tr>
                        <td><MdLocationOn className='icons' /></td>
                        <td>{userData?.location ? <p>{userData?.location}</p> : <input type='text' placeholder='Location' className='detailValue' />}</td>
                    </tr>
                    {/* <p className='userPhoneNumber'><BsFillTelephoneFill className='phoneIcon'/>{userData?.Phonenumber ? <span>{userData?.Phonenumber}</span> : <input type='text' placeholder='Phone Number' />}</p> */}
                    {/* <p className='userEmail'><IoMdMail /><span>{userData?.email}</span></p> */}
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
