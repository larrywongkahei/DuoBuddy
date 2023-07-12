import './ShowProjectCss.css';
import APIService from '../APIService';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ShowProject() {
    const [projectData, setProjectData] = useState({});
    const [commentBox, setCommentBox] = useState("")
    const param = useParams();
    const id = param.id;
    useEffect(() => {
        if(id){
            APIService.getProjectById(id).then(data => setProjectData(data))
        }
    }, [])
    function commentBoxTextHandler(e) {
        setCommentBox(e.target.value);
    }

    function handleAddComment() {
        APIService.commentProject(id, commentBox);
        setCommentBox("")
        window.location.reload();
    }

    const contentToPrint = projectData?.content?.split("\n").map((each, index) => {
        return (
            <p key={index}>
                {each}
            </p>
        )
    })

    const tags = projectData?.tags?.map((each, index) => {
        return (
            <div className='ContentTags' key={index}>
                <p className=''>
                    {each}
                </p>
            </div>

        )
    })

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
            <h1>
                {projectData?.comments?.length} Comments
            </h1>
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