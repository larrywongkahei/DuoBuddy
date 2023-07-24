import './ShowProjectCss.css';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TbReload } from 'react-icons/tb'
import { User, Comment, Project } from "./Interface";
const APIService = require('../APIService');

const ShowProject:React.FC = () => {

    // To store all projects fetched from backend
    const [projectData, setProjectData] = useState<Project>();

    // To store commentBox input data
    const [commentBox, setCommentBox] = useState<string>("")

    // Commentbox input data handler
    function commentBoxTextHandler(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setCommentBox(e.target.value);
    }

    // Commentbox submit button handler
    function handleAddComment(e:React.SyntheticEvent) {
        e.preventDefault();
        APIService.commentProject(id, sessionStorage.getItem("userId"), commentBox);
        setCommentBox("")
    }


    // Get all param
    const param = useParams();

    // Get id from all param
    const id = param.id;

    // Create a useState to keep track of user press the reload button
    const [reload, setReload] = useState<Boolean>(false)


    // Keep track of the reload state, fetch data again if user press the reload button(Line 125)
    useEffect(() => {
        if (id) {
            APIService.getProjectById(id).then((data:Project) => setProjectData(data))
        }
    }, [reload])

    useEffect(() => {
        if (id) {
            addViewOrSetData(id);
        }
    }, [])

    // Function to check if the viewer are the creater, add view if not.
    async function addViewOrSetData(id:string) {
        const data = await APIService.getProjectById(id);
        if (data.createdBy?.name !== sessionStorage.getItem("name")) {
            // CommentProject would add a view if not passing in the content
            const responseToSet = await APIService.commentProject(id, null, null);
            const dataToSet = await responseToSet.json();
            setProjectData(dataToSet);
        } else {
            setProjectData(data)
        }
    }


    // Print content
    const contentToPrint = projectData?.content?.split("\n").map((each, index) => {
        return (
            <p key={index}>
                {each}
            </p>
        )
    })

    // Tags node
    const tags = projectData?.tags?.map((each, index) => {
        return (
            <div className='ContentTags' key={index}>
                <p className=''>
                    {each}
                </p>
            </div>

        )
    })

    // Comments node
    const comments = projectData?.comments?.map((each, index) => {
        return (
            <div className='eachComment' key={index}>
                <p className="commentText">
                    {each.content?.split("\n").map((e, index2) => {
                        return (
                            <p key={index2}>
                                {e}
                            </p>
                        )
                    })}
                </p>
                <div className='CommentRightDetail'>
                    <div>
                        <Link to={`/profile/${each?.createdBy?.id}`}>
                            <img src={each.createdBy?.avatarUrl} />
                        </Link>
                        <p>
                            <Link to={`/profile/${each?.createdBy?.id}`} style={{textDecoration:"none", color:"black"}}>
                                {each.createdBy?.name}
                            </Link>
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
        <div className='ProjectPageContainer'>
            <div className='ProjectPageHeader'>
                <h1 className='ProjectPageTitle'>
                    {projectData?.title}
                </h1>
                <div className='ProjectPageHeaderDetail'>
                    <p>
                        Posted: {projectData?.createdDate}
                    </p>
                    <p>
                        Supports: {projectData?.support}
                    </p>
                    <p>
                        Views: {projectData?.views}
                    </p>
                </div>
            </div>
            <div className='ContentContainer'>
                <div className='mainContent'>
                    {contentToPrint}
                </div>
                <div className='TagsContainer'>
                    {tags}
                </div>
                <div className='ProjectUserDetail'>
                    <img src={projectData?.createdBy?.avatarUrl} />
                    <p>
                        {projectData?.createdBy?.name}
                    </p>
                </div>
            </div>
            <div className='CommentSessionContainer'>
                <h1>
                    {projectData?.comments?.length} Comments
                </h1>
                <p>
                    <TbReload onClick={() => setReload(!reload)} />
                </p>
            </div>

            <div className='CommentContainer'>
                {comments}
                <div className='CommentBoxContainer'>
                    <p>
                        Comment
                    </p>
                    <textarea className='CommentBox' value={commentBox} onChange={commentBoxTextHandler} />
                    <input type='submit' onClick={handleAddComment} value="Submit" />
                </div>
            </div>
        </div>
    )
};

export default ShowProject;