﻿import './ExploreCss.css';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Project } from './Interface';
import { APIService } from '../APIService';

const Explore:React.FC = ()  => {

    // Filter selection
    const [filter, setFilter] = useState<string>("");

    // To Store all projects data fetched from backend
    const [Projects, setProjects] = useState<Project[]>([]);
    const navigate = useNavigate()

    useEffect(() => {
        // Fetch all project from backend
        APIService.getAllProject().then((data:Project[]) => setProjects(data));
    }, [])

    // Function returning the largest number of the type in input project
    // Coded it in a function for better readibility
    function findMaxNumberFromType(projects:Project[], type:string):number{
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
                for (var x = 0; x < projects.length; x++) {
                    if (projects[x].views > maxNumber) {
                        maxNumber = projects[x].views
                    }
                }
                return maxNumber
        }
        return 0;
    }


    // Function returning a sorted array by input type
    // Coded it in a function to prevent hard code them for each type
    function returnArraySortedByType(projects:Project[], type:string):Project[] {
        const newArray:Project[] = []
        let projectClone = [...projects];
        switch (type) {
            case "Comments":
                while (newArray.length !== projects.length) {
                    let maxNumber = findMaxNumberFromType(projectClone, type)
                    // push project that comment length is same as the largest number
                    projectClone.filter(e => e.comments.length >= maxNumber).forEach(e => newArray.push(e))
                    // Filter out the array
                    projectClone = projectClone.filter(e => e.comments.length < maxNumber)
                }
                return newArray;
            case "Views":
                while (newArray.length !== projects.length) {
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
                APIService.getAllProject().then((data:Project[]) => setProjects(data.reverse()));
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
                        <img src={each.createdBy?.avatarUrl} alt='logo'/>
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