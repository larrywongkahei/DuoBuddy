import './ShowProjectCss.css';
import APIService from '../APIService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TbReload } from 'react-icons/tb'

export default function ShowProject() {

    // To store all projects fetched from backend
    const [projectData, setProjectData] = useState({});

    // To store commentBox input data
    const [commentBox, setCommentBox] = useState("")

    // Commentbox input data handler
    function commentBoxTextHandler(e) {
        setCommentBox(e.target.value);
    }

    // Commentbox submit button handler
    function handleAddComment(e) {
        e.preventDefault();
        APIService.commentProject(id, commentBox);
        setCommentBox("")
    }


    // Get all param
    const param = useParams();

    // Get id from all param
    const id = param.id;

    // Create a useState to keep track of user press the reload button
    const [reload, setReload] = useState(false)


    // Keep track of the reload state, fetch data again if user press the reload button(Line 125)
    useEffect(() => {
        if (id) {
            APIService.getProjectById(id).then(data => {
                checkAndAddView(data);
                setProjectData(data);
            })
        }
    }, [reload])

    // Function to check if the viewer are the creater, add view if not.
    async function checkAndAddView(data){
        if (data.createdBy?.name !== sessionStorage.getItem("name")){
            // CommentProject would add a view if not passing in the content
            await APIService.commentProject(id)
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
        <div className='ProjectPageContainer'>
            <div className='ProjectPageHeader'>
                <h1 className='ProjectPageTitle'>
                    {projectData.title}
                </h1>
                <div className='ProjectPageHeaderDetail'>
                    <p>
                        Posted: {projectData.createdDate}
                    </p>
                    <p>
                        Supports: {projectData.support}
                    </p>
                    <p>
                        Views: {projectData.views}
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
                    <img src={projectData.createdBy?.avatarUrl} />
                    <p>
                        {projectData.createdBy?.name}
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
}