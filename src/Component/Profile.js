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

    // Store userData fetched from backend
    const [userData, setUserData] = useState({});

    // Store input value if user doesn't already have one
    const [phoneNumber, setPhoneNumber] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");

    // Buttons to keep track of users action
    const [showBioContainer, setShowBioContainer] = useState(false);
    const [showAddContact, setShowAddContact] = useState(false);

    // keep track of user's choice of adding contact
    const [chosenContact, setChosenContact] = useState("");

    // User input contact url
    const [contactURL, setContactURL] = useState("");

    useEffect(() => {
        APIService.fetchUser(sessionStorage.getItem("email")).then(data => setUserData(data))
    }, [])

    // Button handler for input contact update button
    async function updateContactButton(e) {
        e.preventDefault();
        const dataToUpdate = {};
        dataToUpdate[chosenContact] = contactURL;
        await APIService.updateUser(sessionStorage.getItem("userId"), 'contact', dataToUpdate);
        window.location.reload();
    }



    // Set user's choice for contant
    function chosenContactHandler(option) {
        setChosenContact(option);
    }

    // keep track of user action Add Contact
    function showAddContactHandler() {
        setShowAddContact(!showAddContact)
    }

    // set input data
    function bioHandler(e) {
        setBio(e.target.value)
    }
    function phoneNumberHandler(e) {
        setPhoneNumber(e.target.value);
    }
    function locationHandler(e) {
        setLocation(e.target.value);
    }
    function contactURLHandler(e) {
        setContactURL(e.target.value);
    }

    // keep track of user action Add Bio
    function showBioContainerHandler() {
        setShowBioContainer(!showBioContainer)
    }

    // Update data function
    function updateData(param, data) {
        APIService.updateUser(sessionStorage.getItem('userId'), param, data);
        window.location.reload();
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
                <div className='contactIconsContainer'>
                    {Object.keys(userData.contact || {}).includes('github') ? <BsGithub className='chosenAddContactIcons' onClick={() => window.location.href = userData?.contact['github']} /> : null}
                    {Object.keys(userData.contact || {}).includes('linkedin') ? <ImLinkedin className='chosenAddContactIcons' onClick={() => window.location.href = userData?.contact['linkedin']} /> : null}
                    {Object.keys(userData.contact || {}).includes('twitter') ? <AiOutlineTwitter className='chosenAddContactIcons' onClick={() => window.location.href = userData?.contact['twitter']} /> : null}
                </div>
                <div>
                    {Object.keys(userData.contact || {}).length < 3 && !showAddContact ? <button onClick={showAddContactHandler}>Add Contact</button> : null}
                    {showAddContact ?
                        <div>
                            <div className='contactIconsContainer'>
                                <BsGithub className={chosenContact === 'github' ? "chosenAddContactIcons" : "addContactIcons"} onClick={() => chosenContactHandler('github')} />
                                <ImLinkedin className={chosenContact === 'linkedin' ? "chosenAddContactIcons" : "addContactIcons"} onClick={() => chosenContactHandler('linkedin')} />
                                <AiOutlineTwitter className={chosenContact === 'twitter' ? "chosenAddContactIcons" : "addContactIcons"} onClick={() => chosenContactHandler('twitter')} />
                            </div>
                            <form>
                                <input type='text' placeholder='Your URL' className={chosenContact === "" ? 'contactURL' : 'inputableContactURL'} value={contactURL} onChange={contactURLHandler} />
                                <input type='submit' style={{ display: 'none' }} onClick={updateContactButton} />
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
                            {showBioContainer ?
                                <form>
                                    <textarea className='bioTextarea' onChange={bioHandler} value={bio} />
                                    <input type='submit' onClick={submitForm} />
                                </form> : <button onClick={showBioContainerHandler}>Add Bio</button>}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
