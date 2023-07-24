import './ExploreCss.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const APIService = require('../APIService');

const Explore:React.FC = ()  => {

    // Filter selection
    const [filter, setFilter] = useState<string>("");

    // To Store all projects data fetched from backend
    const [Projects, setProjects] = useState<project[]>([]);
    const navigate = useNavigate()

    interface User {
        id : string;
        name : string;
        bio : string;
        createdDate : string;
        contact : Record<string, string>;
        location : string;
        projects : string[];
        avatarUrl : string;
        email : string;
        password : string;
        phoneNumber : string;
    }

    interface Comment{
        id? : string;
        userId : string;
        createdDate : string;
        createdBy : User;
        userfulVotes : number;
        content : string;
    }

    interface project {
        id : string;
        title : string;
        userId : string;
        createdBy : User;
        createdDate : string;
        tags : string[];
        support : number;
        views : number;
        content : string;
        comments : Comment[];
    }

    useEffect(() => {
        // Fetch all project from backend
        APIService.getAllProject().then((data:project[]) => setProjects(data));
    }, [])

    // Function returning the largest number of the type in input project
    // Coded it in a function for better readibility
    function findMaxNumberFromType(projects:project[], type:string):number{
        let maxNumber = 0;
        switch (type) {
            case "Comments":
                for (var i = 0; i < projects.length; i++) {
                    if (projects[i].comments.length > maxNumber) {
                        maxNumber = projects[i].comments.length
                    }
                }
                return maxNumber
            case "Views":
                for (var i = 0; i < projects.length; i++) {
                    if (projects[i].views > maxNumber) {
                        maxNumber = projects[i].views
                    }
                }
                return maxNumber
        }
        return 0;
    }


    // Function returning a sorted array by input type
    // Coded it in a function to prevent hard code them for each type
    function returnArraySortedByType(projects:project[], type:string):project[] {
        const newArray:project[] = []
        let projectClone = [...projects];
        switch (type) {
            case "Comments":
                while (newArray.length != projects.length) {
                    let maxNumber = findMaxNumberFromType(projectClone, type)
                    // push project that comment length is same as the largest number
                    projectClone.filter(e => e.comments.length >= maxNumber).forEach(e => newArray.push(e))
                    // Filter out the array
                    projectClone = projectClone.filter(e => e.comments.length < maxNumber)
                }
                return newArray;
            case "Views":
                while (newArray.length != projects.length) {
                    let maxNumber = findMaxNumberFromType(projectClone, type)
                    // push project that views length is same as the largest number
                    projectClone.filter(e => e.views >= maxNumber).forEach(e => newArray.push(e))
                    // Filter out the array
                    projectClone = projectClone.filter(e => e.views < maxNumber)
                }
                return newArray;
        }
        return newArray;
    }

    // Selection filter handler
    function filterHandler(e:React.ChangeEvent<HTMLSelectElement>) {
        setFilter(e?.target?.value);
        switch (e?.target?.value) {
            case "Newest":
                APIService.getAllProject().then((data:project[]) => setProjects(data.reverse()));
                break;
            case "Comment":
                setProjects(returnArraySortedByType(Projects, "Comments"));
                break;
        }
    }

    // Post project button handler
    function postHandler() {
        if (sessionStorage.getItem("email")) {
            navigate("/idea/post")
        } else {
            alert("Sign in first")
        }

    }

    // All projects node
    const allProjects = Projects.map((each, index) => (
        <div key={index} className='eachProject'>
            <Link to={`/post/${each.id}`} className='titleLink'>
                <h1>
                    {each.title}
                </h1>
            </Link>
            <div className='detailForEachProject'>
                <div className='alltags'>
                    {each.tags.map((tag, index) => (
                        <div className='tags' key={index}>
                            <p className='tagContent'>
                                {tag}
                            </p>
                        </div>
                    ))}
                </div>
                <div className='rightDetail'>
                    <Link to={`/profile/${each.createdBy.id}`} >
                        <img src={each.createdBy?.avatarUrl} />
                    </Link>

                    <div className='createdUser'>
                        <Link to={`/profile/${each.createdBy.id}`} style={{ textDecoration: "none", color: "black" }}>
                            {each.createdBy?.name}
                        </Link>
                    </div>

                    <div className="votesOfProjects">
                        <p className='eachSmallDetail'>
                            Views {each.views}
                        </p>
                        <p className='eachSmallDetail'>
                            Supports {each.support}
                        </p>
                        <p className='eachSmallDetail'>
                            Comments {each.comments.length}
                        </p>
                    </div>
                </div>
            </div>



        </div >
    ))

    return (
        <div className="explorePage">
            <div className="exploreContainer">
                <div className="exploreTitleSession">
                    <h1 className="exploreTitle">
                        Top Project ideas
                    </h1>
                    <button className="postButton" onClick={postHandler}>
                        Post an idea
                    </button>
                </div>
                <div className="exploreFilter">
                    <p>
                        Filter by:
                    </p>
                    <select onChange={filterHandler}>
                        <option>Select</option>
                        <option>Newest</option>
                        <option>Comment</option>
                    </select>
                </div>
            </div>

            <hr />
            <div className='allProjectsContainer'>
                {allProjects}
            </div>
        </div>
    )
}

export default Explore