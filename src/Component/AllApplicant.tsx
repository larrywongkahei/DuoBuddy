import "./AllApplicantCss.css"
import { useState } from "react";
/*  Bio, project count, name, email, location, phonenumber, contacts */
let bio = "fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk fasfh asjehfaljksefjkah lsejkfh asljkehf askjlehf akjlshef lakshefajklshefjaks ehfljak shefjk";
let projectCount = 3;
let name = "wong ka hei";
let email = "makemak123@sww.com";
let location = "Glasgow";
let phoneNumber = "32311232";
let contact = ["fasefasef", "fasefaesfa"]
const AllApplicant: React.FC = () => {

    const [userDatas]
    return (
        <div className="AllApplicantContainer">
            <div className="eachApplicantProfileData">
                <div className="eachApplicantImage">
                    <img src="fasefaesf" />
                </div>
                <div className="eachApplicationContact">
                    {contact}
                </div>
                <div className="eachApplicationBio">
                <p className="eachApplicationBioP">
                    {bio}
                    </p>
                </div>
                <button className="eachApplicationButton">
                    to profile
                </button>
            </div>
        </div>
    )
}

export default AllApplicant;