import { useParams, Link } from 'react-router-dom';
import './SearchResultCss.css';
import { useEffect, useState } from 'react';
import APIService from '../APIService';

export default function SearchResult() {

    const param = useParams();
    const dataToSearch = param.searchdata
    const [projectsToShow, setProjectToShow] = useState([])

    useEffect(() => {
        APIService.getProjectsBySearch(dataToSearch).then(data => setProjectToShow(data));
    }, [])

    console.log(projectsToShow)

    const projects = projectsToShow.map((each, index) => {
        return (
            <div key={index} className='searchResultProjects'>
                <Link to={`/post/${each.id}`} className='titleLink'>
                    <h1>
                        {each.title}
                    </h1>
                </Link>
                <div className='ResultDetails'>
                    <div className='ResultDetailLeft'>
                        <p>
                            Supports: {each.support}
                        </p>
                        <p>
                            Views: {each.views}
                        </p>
                    </div>
                    <div className='ResultDetailRight'>
                        <img src={each.createdBy?.avatarUrl} />
                        <p>
                            {each.createdBy?.name}
                        </p>
                        <p>
                            {each.createdDate}
                        </p>
                    </div>
                </div>
            </div>

        )
    })

    return (
        <div className="searchResultContainer">
            <h1 className="title">
                Search Results
            </h1>
            <input type="text" className="searchPageInput" />
            <h1 className='SearchResultTitle'>
                {projectsToShow.length} Search Results
            </h1>
            <div className="SearchResultDataContainer">
                <div className="eachResult">
                    {projects}
                </div>
            </div>
        </div>
    )
}