import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { ImLinkedin } from 'react-icons/im';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { User, Comment, Project } from "./Interface";
const APIService = require("../APIService");

export default function ProfilePageView(){
    const [userData, setUserData] = useState<User>()
    const param = useParams();
    const id = param.id;
    useEffect(() => {
        APIService.getUserById(id).then((data:User) => setUserData(data))
    }, [])
    console.log(userData)

    return (
        <div className='profileContainer'>
        <div className='profilePictureContainer'>
            <img src={userData?.avatarUrl || ""} className='profilePicture' />
            <p className='name'>{userData?.name}</p>
            <table>
                <tr>
                    <td><IoMdMail className='profileIcons' /></td>
                    <td><a href={`mailto:${userData?.email}`} className='clickableContact'><p>{userData?.email}</p></a></td>
                </tr>
                <tr>
                    <td><MdLocationOn className='profileIcons' /></td>
                    <td>{userData?.location ? <a href={`https://www.google.com/maps/search/?api=1&query=${userData?.location}`} className='clickableContact'><p>{userData?.location.replace(/["]/g, "")}</p></a> : <div></div>}</td>
                </tr>
                <tr>
                    <td><BsFillTelephoneFill className='profileIcons' /></td>
                    {/* remove all the double quote with  (/["]/g, "")*/}
                    <td>{userData?.phoneNumber ? <p>{userData?.phoneNumber.replace(/["]/g, "")}</p> : <p>No contact</p>}</td>
                </tr>
            </table>
            <div className='contactIconsContainer'>
                {Object.keys(userData?.contact || {}).includes('github') ? <BsGithub className='chosenAddContactIcons' onClick={() => window.location.href = userData?.contact['github'] || ""}/> : null}
                {Object.keys(userData?.contact || {}).includes('linkedin') ? <ImLinkedin className='chosenAddContactIcons' onClick={() => window.location.href = userData?.contact['linkedin'] || ""}/> : null}
                {Object.keys(userData?.contact || {}).includes('twitter') ? <AiOutlineTwitter className='chosenAddContactIcons' onClick={() => window.location.href = userData?.contact['twitter'] || ""}/> : null}
            </div>
        </div>
        <div className='profileDataContainer'>
            <div>
                <p>
                    Bio
                </p>
                {userData?.bio ? 
                <div className='bio'>{userData?.bio.replace(/["]/g, "")}</div> : <p>No bio</p> }
        </div>
    </div>
    </div>)}