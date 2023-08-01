import "./AllApplicantCss.css"
import { useState, useEffect } from "react";
import { User } from "./Interface";
import { useParams } from "react-router-dom";
import { APIService } from "../APIService";
import { ImLinkedin } from 'react-icons/im';
import { AiOutlineTwitter } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
/*  Bio, project count, name, email, location, phonenumber, contacts */
let bio = "fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk";
let projectCount = 3;
let name = "wong ka hei";
let email = "makemak123@sww.com";
let location = "Glasgow";
let phoneNumber = "32311232";
let contact = ["fasefasef", "fasefaesfa"]
const AllApplicant: React.FC= () => {

    const [userDatas, setUserDatas] = useState<User[]>();
    const params = useParams();
    const id = params.id;

    const Contacts = userDatas?.map((each, index) => {
            return (
                <div key={index}>
                    <>
                    {Object.keys(each?.contact || {}).includes('github') ? <BsGithub className='chosenAddContactIcons' onClick={() => window.location.href = each?.contact['github'] || ""} /> : null}
                    </>
                    <>
                    {Object.keys(each?.contact || {}).includes('linkedin') ? <ImLinkedin className='chosenAddContactIcons' onClick={() => window.location.href = each?.contact['linkedin'] || ""} /> : null}
                    </>
                    <>
                    {Object.keys(each?.contact || {}).includes('twitter') ? <AiOutlineTwitter className='chosenAddContactIcons' onClick={() => window.location.href = each?.contact['twitter'] || ""} /> : null}
                    </>
                </div>
            )
        })
    const usersNode = userDatas?.map((each, index) => {
        return (
            <div className="eachApplicantProfileData" key={index}>
                <div className="eachApplicantImage">
                    <img src={each.avatarUrl} alt="logo"/>
                </div>
                <div className="eachApplicationContact">
                    {Contacts}
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