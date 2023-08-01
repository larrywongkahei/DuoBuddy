import "./AllApplicantCss.css"
import { useState, useEffect } from "react";
import { User } from "./Interface";
import { useParams } from "react-router-dom";
import { APIService } from "../APIService";
import { ImLinkedin } from 'react-icons/im';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';

const AllApplicant: React.FC= () => {

    const [userDatas, setUserDatas] = useState<User[]>();
    const params = useParams();
    const id = params.id;
    console.log(id)
    console.log(userDatas)


    const usersNode = userDatas?.map((each, index) => {

        return (
            <div className="eachApplicantProfileData" key={index}>
                    <img src={each?.avatarUrl} alt="logo" className="eachApplicantImage"/>
                <div className="eachApplicationContact">
                    <>
                    {Object.keys(each?.contact).includes('github') && <BsGithub className='chosenAddContactIcons' onClick={() => window.location.href = each?.contact['github'] || ""} />}
                    </>
                    <>
                    {Object.keys(each?.contact).includes('linkedin') && <ImLinkedin className='chosenAddContactIcons' onClick={() => window.location.href = each?.contact['linkedin'] || ""} />}
                    </>
                    <>
                    {Object.keys(each?.contact).includes('twitter') && <AiOutlineTwitter className='chosenAddContactIcons' onClick={() => window.location.href = each?.contact['twitter'] || ""} /> }
                    </>
                </div> 
                <div className="eachApplicationBio">
                <p className="eachApplicationBioP">
                    {each?.bio}
                    </p>
                </div>
                <button className="eachApplicationButton">
                    to profile
                </button>
            </div>
        )
    })

    useEffect(() => {
        if(id){
            APIService.getUsersByProjectIds(id).then((data:User[]) => setUserDatas(data));
        }
    },[])

    return (
        <div className="AllApplicantContainer">
            {usersNode}
        </div>
    )
}

export default AllApplicant;