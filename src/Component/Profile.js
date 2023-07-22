import './ProfileCss.css';
import { useState, useEffect } from 'react';
import APIService from '../APIService';
import { BsFillTelephoneFill } from 'react-icons/bs'
import { IoMdMail } from 'react-icons/io'
import { MdLocationOn } from 'react-icons/md'
import { GiConfirmed } from 'react-icons/gi'
import { ImLinkedin } from 'react-icons/im';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';

export default function Profile() {

    const [userData, setUserData] = useState({});
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [showBioContainer, setShowBioContainer] = useState(false);
    const [showAddContact, setShowAddContact] = useState(false);
    const [chosenContact, setChosenContact] = useState("");
    const [contactURL, setContactURL] = useState("");

    useEffect(() => {
        APIService.fetchUser(sessionStorage.getItem("email")).then(data => setUserData(data))
    }, [])

    console.log(userData.contact)

    function updateContactButton(e){
        e.preventDefault();
        const contactClone = {...userData.contact};
        if (!Object.keys(contactClone).includes(chosenContact)){
            contactClone[chosenContact] = contactURL;
        }
        console.log(contactClone)
        APIService.updateUser(sessionStorage.getItem("userId"), 'contact', contactClone);
        window.location.reload();
    }

    function contactURLHandler(e){
        setContactURL(e.target.value);
    }

    function chosenContactHandler(option){
        setChosenContact(option);
    }

    function showAddContactHandler(){
        setShowAddContact(!showAddContact)
    }

    function bioHandler(e){
        setBio(e.target.value)
    }

    function showBioContainerHandler(){
        setShowBioContainer(!showBioContainer)
    }

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
    function submitForm(e) {
        e.preventDefault();
        APIService.updateUser(sessionStorage.getItem('userId'), 'bio', bio);
        window.location.reload();
    }

    return (
        <div className='profileContainer'>
            <div className='profilePictureContainer'>
                <img src={sessionStorage.getItem("avatar_url")} className='profilePicture' />
                <p className='name'>{sessionStorage.getItem("name")}</p>
                <table>
                    <tr>
                        <td><IoMdMail className='profileIcons' /></td>
                        <td><a href={`mailto:${sessionStorage.getItem("email")}`} className='clickableContact'><p>{userData?.email}</p></a></td>
                    </tr>
                    <tr>
                        <td><MdLocationOn className='profileIcons' /></td>
                        <td>{userData?.location ? <a href={`https://www.google.com/maps/search/?api=1&query=${userData?.location}`} className='clickableContact'><p>{userData?.location.replace(/["]/g, "")}</p></a> : <div><input type='text' placeholder='Location' className='detailValue' value={location} onChange={locationHandler} /><GiConfirmed className={location ? "tick" : "untouchableTick"} onClick={() => updateData('location', location)} /></div>}</td>
                    </tr>
                    <tr>
                        <td><BsFillTelephoneFill className='profileIcons' /></td>
                        {/* remove all the double quote with  (/["]/g, "")*/}
                        <td>{userData?.phoneNumber ? <p>{userData?.phoneNumber?.replace(/["]/g, "")}</p> : <div className='inputDetail'><input type='text' placeholder='Phone Number' className='detailValue' value={phoneNumber} onChange={phoneNumberHandler} /><GiConfirmed className={phoneNumber ? "tick" : "untouchableTick"} onClick={() => updateData("phonenumber", phoneNumber)} /></div>}</td>
                    </tr>
                </table>
                <div>
                    {userData?.contact && Object.keys(userData.contact).length < 3 && !showAddContact ? <button onClick={showAddContactHandler}>Add Contact</button> : null}
                    {showAddContact ? 
                    <div>
                        <div className='contactIconsContainer'>
                            <BsGithub className={chosenContact === 'github' ? "chosenAddContactIcons" : "addContactIcons"} onClick={() => chosenContactHandler('github')}/>
                            <ImLinkedin className={chosenContact === 'linkedin' ? "chosenAddContactIcons" : "addContactIcons"} onClick={() => chosenContactHandler('linkedin')}/>
                            <AiOutlineTwitter className={chosenContact === 'twitter' ? "chosenAddContactIcons" : "addContactIcons"} onClick={() => chosenContactHandler('twitter')}/>
                        </div>   
                        <form>
                        <input type='text' placeholder='Your URL' className={chosenContact === "" ? 'contactURL' : 'inputableContactURL'}value={contactURL} onChange={contactURLHandler}/>
                        <input type='submit' style={{display:'none'}} onClick={updateContactButton}/>
                        </form>
                    </div> : null
 
                }
                </div>
            </div>
            <div className='profileDataContainer'>
                <div>
                    <p>
                        Bio
                    </p>
                    {userData.bio ? <div className='bio'>{userData.bio.replace(/["]/g, "")}</div> : 
                    <div>
                    {showBioContainer?  
                        <form>
                            <textarea className='bioTextarea' onChange={bioHandler} value={bio}/>
                            <input type='submit' onClick={submitForm}/>
                        </form> : <button onClick={showBioContainerHandler}>Add Bio</button> }
                        </div>
                        }
                </div>
            </div>
        </div>
    )
}
