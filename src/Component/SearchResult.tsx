import { useParams, Link, useNavigate } from 'react-router-dom';
import './SearchResultCss.css';
import { useEffect, useState } from 'react';
import { User, Comment, Project } from "./Interface";
const APIService = require('../APIService');

const SearchResult:React.FC = () =>  {

    // To get all param
    const param = useParams();

    // To get dataToSearch param from all param
    const dataToSearch = param?.searchdata

    // To store all projects fetched from backend
    const [projectsToShow, setProjectToShow] = useState<Project[]>([])

    // Fetch projects data from backend
    useEffect(() => {
        APIService.getProjectsBySearch(dataToSearch).then((data:Project[]) => setProjectToShow(data));
    }, [])

    // Search field input
    const [searchField, setSearchField] = useState("")

    // Search field input handler
    function searchFieldHandler(e:React.ChangeEvent<HTMLInputElement>){
        setSearchField(e.target.value)
    }

    // Search field submit button handler
    function searchFieldSubmit(e:React.SyntheticEvent){
        e.preventDefault();
        // /\s/g = all whitespace
        const cleanedSearchField = searchField.replace(/\s/g, "")
        if(cleanedSearchField.length === 0){
            alert("Seach could not be empty")
        }
        else{
            window.location.pathname = `/searchResult/${cleanedSearchField}`;
        }
        setSearchField("")
    }

    // Project node
    const projects = projectsToShow.map((each, index) => {
        return (
            <div key={index} className='searchResultProjects'>
                <Link to={`/post/${each.id}`} className='titleLink'>
                    <h1>
                        {each.title}
                    </h1>
                </Link>
                <div className='ResultDetails'>
                    <div className='ResultDetailsTags'>
                        {each.tags.map((tag, index) => {
                            return (
                                <div className='ContentTags' key={index}>
                                <p className=''>
                                    {tag}
                                </p>
                            </div>
                            )
                        })}
                    </div>
                    <div className='ResultDetailRight'>
                        <Link to={`/profile/${each?.createdBy.id}`} >
                        <img src={each.createdBy?.avatarUrl} />
                        </Link>
                        <Link to={`/profile/${each?.createdBy.id}`} style={{textDecoration:"none", color:"black"}}>
                        <p>
                            {each.createdBy?.name}
                        </p>
                        </Link>
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
};

export default SearchResult;