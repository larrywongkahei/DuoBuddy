import './ShowProjectCss.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { TbReload } from 'react-icons/tb'
import { Project } from "./Interface";
import { APIService } from '../APIService';
import Application from "./Application";

const ShowProject: React.FC = () => {

    // To store all projects fetched from backend
    const [projectData, setProjectData] = useState<Project>();

    const [apply, setApply] = useState(false);

    const userIdInApplications: Boolean = projectData?.applications[sessionStorage.getItem("userId") || ""] !== undefined

    // console.log(Object.keys(projectData?.applications))
    // console.log(sessionStorage.getItem("userId")? in projectData?.applications)

    // To store commentBox input data
    const [commentBox, setCommentBox] = useState<string>("")

    const nav = useNavigate();

    // Commentbox input data handler
    function commentBoxTextHandler(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setCommentBox(e.target.value);
    }

    // Commentbox submit button handler
    function handleAddComment(e: React.SyntheticEvent) {
        e.preventDefault();
        if (sessionStorage.length > 0) {
            APIService.commentProject(id || "", sessionStorage?.getItem("userId") || "", commentBox);
            setCommentBox("");
        } else {
            alert("Log in first");
            setCommentBox("");
        }

    }

    async function deleteProject(e: React.MouseEvent) {
        e.preventDefault();
        if (window.confirm("Delete this post?")) {
            await APIService.deleteProject(projectData?.id || "");
            nav("/explore");
        }
    }


    // Get all param
    const param = useParams();

    // Get id from all param
    const id = param.id;

    // Create a useState to keep track of user press the reload button
    const [reload, setReload] = useState<Boolean>(false)

    // To track if show application form or not
    const [showApplication, setShowApplication] = useState<Boolean>(false)



    // Keep track of the reload state, fetch data again if user press the reload button(Line 125)
    useEffect(() => {
        if (id) {
            APIService.getProjectById(id).then((data: Project) => setProjectData(data))
        }
    }, [reload])

    useEffect(() => {
        if (id) {
            addViewOrSetData(id);
        }
    }, [])

    // window.onclick = (e: MouseEvent) => {
    //     const applicationContainer: HTMLElement = document.getElementById("application") || new HTMLElement
    //     if (e.target !== applicationContainer) {
    //         setShowApplication(false)
    //     }
    // }

    console.log(showApplication)

    // function to show application and modify css
    function openApplicationAndModifyCss() {
        if (sessionStorage.length > 0) {
            setShowApplication(true)
            document.body.style.backgroundColor = "#8a7f7f"
            document.body.style.opacity = "0.4"
            document.body.style.overflow = "hidden"
            const Navbar: HTMLElement = document.getElementById("NavBar") || new HTMLElement
            const applicationContainer: HTMLElement = document.getElementById("application") || new HTMLElement
            applicationContainer.style.opacity = "1"
            applicationContainer.style.backgroundColor = "#F0EFEF"
            Navbar.style.pointerEvents = "none";

        } else {
            alert("Login First");
        }
    }

    // function to deal with css background
    function redoCSS() {
        document.body.style.backgroundColor = "#F0EFEF"
        document.body.style.opacity = "1"
        const Navbar: HTMLElement = document.getElementById("NavBar") || new HTMLElement
        Navbar.style.pointerEvents = "auto";
    }

    // function to get data from application page child element
    function getData(data: string) {
        setShowApplication(false);
        redoCSS();
        applyToBuildProjectTogether(data)
    }

    // function called when user press on the cancel button
    function closeApplication() {
        setShowApplication(false);
        redoCSS();
    }


    async function applyToBuildProjectTogether(data: string) {
        const userId: string = sessionStorage.getItem("userId") || "";
        const applyBio: Record<string, string> = {}
        applyBio[userId] = data;
        console.log(applyBio);
        await APIService.applyToBuildProject(id || "", applyBio).then(response => response.json()).then(data => console.log(data))
        setApply(true);

    }

    // Function to check if the viewer are the creater, add view if not.
    async function addViewOrSetData(id: string) {
        const data = await APIService.getProjectById(id);
        if (data.createdBy?.name !== sessionStorage.getItem("name")) {
            const responseToSet = await APIService.addView(id);
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
                            <img src={each.createdBy?.avatarUrl} alt='logo' />
                        </Link>
                        <p>
                            <Link to={`/profile/${each?.createdBy?.id}`} style={{ textDecoration: "none", color: "black" }}>
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
        <div className='ProjectPageContainer' id='ProjectPage'>
            <div className='ProjectPageHeader'>
                <div className='TitleAndApplyButton'>
                    <h1 className='ProjectPageTitle'>
                        {projectData?.title}
                    </h1>
                    {showApplication &&
                        <div id='applicationConatiner'>
                            <div id='application'>
                                <Application getData={getData} closeApplication={closeApplication} />
                            </div>
                        </div>}
                    {
                        projectData?.createdBy?.name === sessionStorage?.getItem("name") ?
                            <button onClick={deleteProject}>
                                Close this post
                            </button>
                            :
                            <>
                                {userIdInApplications || apply ?
                                    <button>
                                        Applied
                                    </button> : <button onClick={openApplicationAndModifyCss}>
                                        Apply to build project together
                                    </button>
                                }
                            </>
                    }
                </div>


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
                    <Link to={`/profile/${projectData?.createdBy?.id}`} >
                        <img src={projectData?.createdBy?.avatarUrl} alt='logo' />
                    </Link>
                    <p>
                        <Link to={`/profile/${projectData?.createdBy?.id}`} style={{ textDecoration: "none", color: "black" }}>
                            {projectData?.createdBy?.name}
                        </Link>
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