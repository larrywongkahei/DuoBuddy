import { useParams, Link, useNavigate } from 'react-router-dom';
import './SearchResultCss.css';
import { useEffect, useState } from 'react';
import APIService from '../APIService';

export default function SearchResult() {

    const param = useParams();
    const dataToSearch = param.searchdata
    const [searchField, setSearchField] = useState("")
    const [projectsToShow, setProjectToShow] = useState([])
    const navigate = useNavigate();

    function searchFieldHandler(e){
        setSearchField(e.target.value)
    }

    function searchFieldSubmit(e){
        e.preventDefault();
        window.location.pathname = `/searchResult/${searchField}`;
        setSearchField("")
    }

    useEffect(() => {
        APIService.getProjectsBySearch(dataToSearch).then(data => setProjectToShow(data));
    }, [])


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
            <form>
                <input type="text" className="searchPageInput" value={searchField} onChange={searchFieldHandler}/>
                <input type='submit' style={{display:"none"}} onClick={searchFieldSubmit}/>
            </form>
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