import './ExploreCss.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIService from '../APIService';

export default function Explore() {

    const [filter, setFilter] = useState("");
    const [Projects, setProjects] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        APIService.getAllProject().then(data => setProjects(data));
    }, [])

    function findMaxNumberFromType(projects, type){
        let maxNumber = 0;
        switch (type){
            case "Comments":
                for(var i = 0; i < projects.length; i++){
                    if(projects[i].comments.length > maxNumber){
                        maxNumber = projects[i].comments.length
                    }
                }
                return maxNumber
        }
    }

    function returnArraySortedByType(projects, type){
        const newArray = []
        let projectClone = [...projects];
        switch (type){
            case "Comments":
                while(newArray.length != projects.length){
                    let maxNumber = findMaxNumberFromType(projectClone, type)
                    // push project that comment length is same as the largest number
                    projectClone.filter(e => e.comments.length >= maxNumber).forEach(e => newArray.push(e))
                    // Filter out the array
                    projectClone = projectClone.filter(e => e.comments.length < maxNumber)
                }
                return newArray;
        }
    }

    
    function filterHandler(e) {
        setFilter(e.target.value);
        switch (e.target.value){
            case "Newest":
                APIService.getAllProject().then(data => setProjects(data.reverse()));
                break;
            case "Comment":
                setProjects(returnArraySortedByType(Projects, "Comments"));
                break;
        }
    }

    function postHandler(e) {
        if (sessionStorage.getItem("email")) {
            navigate("/idea/post")
        } else {
            alert("Sign in first")
        }

    }

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
                    <img src={each.createdBy?.avatarUrl}/>
                    <div className='createdUser'>
                        {each.createdBy?.name}
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



        </div>
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