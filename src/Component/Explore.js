import './ExploreCss.css';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import APIService from '../APIService';

export default function Explore() {

    const [selected, setSelected] = useState("");
    const [Projects, setProjects] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        APIService.getAllProject().then(data => setProjects(data));
    }, [])

    function selectionHandler(e) {
        setSelected(e.target.value);
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
            <h1 className='titleLinkProject'>
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
                    <select onChange={selectionHandler}>
                        <option>fasef</option>
                        <option>asefasef</option>
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