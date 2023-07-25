import "./PostPageCss.css"
import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Project } from './Interface';
import { APIService } from '../APIService';

const PostPage:React.FC = () => {
    const navigate = useNavigate();

    // To track which part user in, to light up the border
    const [Sequence, setSequence] = useState<number>(1);

// Title

    // Title input data
    const [title, setTitle] = useState<string>("")

    // Title input handler
    function titleHandler(e:React.ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

// Introduction 

    // Introduction input data
    const [introduction, setIntroduction] = useState<string>("")

    // Introduction input handler
    function introductionHandler(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setIntroduction(e.target.value)
    }

// Detail

    // Detail input data
    const [detailOfIdea, setDetailOfIdea] = useState<string>("")

    // Detail input handler
    function detailOfIdeaHandler(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setDetailOfIdea(e.target.value)
    }

// Inspiration

    // Inspiration input data
    const [inspiration, setInspiration] = useState<string>("")

    // Inspiration input handler
    function inspirationHandler(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setInspiration(e.target.value)
    }


// Ending

    // Ending input data
    const [ending, setEnding] = useState<string>("")


    // Ending input handler
    function endingHandler(e:React.ChangeEvent<HTMLTextAreaElement>) {
        setEnding(e.target.value)
    }

// Tags

    // Tags input data
    const [showTags, setShowTags] = useState<string>("")

    // Tag input handler
    function tagshandler(e:React.ChangeEvent<HTMLInputElement>) {
        setShowTags(e.target.value)
    }

    // Tags added array
    const [tags, setTags] = useState<string[]>([])

    // Add tag button handler
    function addTagButton() {
        if (showTags !== "") {
            let newList = [...tags]
            newList.push(showTags)
            setShowTags("")
            setTags(newList);
        }
    }




    // All tags node
    const allTags = tags.map((each, index) => (
        <div className="tag" key={index}>
            <p className="tagContent">
                {each}
            </p>
        </div>
    ))


    // Post data button handler
    async function submitButtonHandler() {
        if (title !== "" && detailOfIdea !== "") {
            const payload:Record<string, string | string[] | null> = {
                "title": title,
                "userId": sessionStorage.getItem("userId"),
                "content": `${introduction} \n ${detailOfIdea} \n ${inspiration} \n ${ending}`,
                "tags": tags
            }
            await APIService.createProject(payload).then((data:Project) => {
                APIService.updateUser(sessionStorage?.getItem("userId"), "projects", data.id)
                navigate(`/post/${data.id}`)
            })


        }
        else {
            alert("title or detail of idea could not be null")
        }

    }

    return (
        <div className="postPageContainer">
            <div className="introductionContainer">
                <div className="introContainer">
                    <h1>
                        Post an idea
                    </h1>
                </div>
                <div className="container1">
                    <div className="instructionOfExplanationContainer">
                        <h1>
                            Intro
                        </h1>
                    </div>
                    <div className="explanationContainer">
                        <h1>
                            How to post a good idea
                        </h1>
                        <p>
                            By posting a good idea, you could find a good mentor and help!
                        </p>
                        <p>
                            Steps
                        </p>
                        <ul>
                            <li>
                                Give a title for your idea
                            </li>
                            <li>
                                Briefly introduce youself(Make it straight to the point)
                            </li>
                            <li>
                                Introduce your idea in more detail
                            </li>
                            <li>
                                Explain what inspire you to have this idea
                            </li>
                            <li>
                                Ending
                            </li>
                            <li>
                                Add tags
                            </li>
                        </ul>
                        <p className="askReady">
                            Ready To Rock?
                        </p>
                    </div>
                </div>
                <div className="firstContent">
                    <div className="instructionOfContent1Container">
                        <h1>
                            1
                        </h1>
                    </div>

                    <div className="content1Container">
                        <h1>
                            Input your title
                        </h1>
                        <p>
                            Be sure to create an eyecatching title but related to the project
                        </p>
                        <div className="inputAndButton">
                            <input type="text" placeholder="e.g.EasyMoney auto trading AI" onChange={titleHandler} value={title} />
                            {Sequence === 1 ?
                                <button className="nextButton" onClick={() => {
                                    if (title !== "") { setSequence(2) }
                                    else {
                                        alert("Title could not be empty")
                                    }
                                }}>
                                    Next
                                </button> : null}
                        </div>
                    </div>
                </div>
                <div className="secondContent">
                    <div className="instructionOfIntroduceYourselfContainer">
                        <h1>
                            2
                        </h1>
                    </div>
                    <div className={Sequence >= 2 ? "introduceYourselfContainer" : "nonClickableIntroduceYourselfContainer"}>
                        <h1>
                            Briefly introduce youself
                        </h1>
                        <p>
                            Let's keep it short and straight to the point here
                        </p>
                        <div className="inputAndButton">
                            <textarea value={introduction} onChange={introductionHandler} />
                            {Sequence === 2 ?
                                <button className="nextButton" onClick={() => setSequence(3)}>
                                    Next
                                </button> : null}
                        </div>
                    </div>
                </div>
                <div className="thirdContent">
                    <div className="instructionOfIdeaDetailContainer">
                        <h1>
                            3
                        </h1>
                    </div>
                    <div className={Sequence >= 3 ? "ideaDetailContainer" : "nonClickableIdeaDetailContainer"}>
                        <h1>
                            Provide more detail of your idea
                        </h1>
                        <p>
                            Give as much detail as you could. E.g. Requirement and Goals
                        </p>
                        <div className="inputAndButton">
                            <textarea value={detailOfIdea} onChange={detailOfIdeaHandler} />
                            {Sequence === 3 ?
                                <button className="nextButton" onClick={() => {
                                    if (detailOfIdea !== "") { setSequence(4) }
                                    else {
                                        alert("Detail of idea could not be empty")
                                    }
                                }}>
                                    Next
                                </button> : null}
                        </div>
                    </div>
                </div>
                <div className="fourthContent">
                    <div className="instructionOfExplainIdea">
                        <h1>
                            4
                        </h1>
                    </div>
                    <div className={Sequence >= 4 ? "explainInspiration" : "nonClickableExplainInspiration"}>
                        <h1>
                            Explain what inspire you to this idea
                        </h1>
                        <p>
                            Here is the important part, an eye catching title and a perfect explaination could get you a good mentor and partner..
                        </p>
                        <div className="inputAndButton">
                            <textarea value={inspiration} onChange={inspirationHandler} />
                            {Sequence === 4 ?
                                <button className="nextButton" onClick={() => setSequence(5)}>
                                    Next
                                </button> : null}
                        </div>
                    </div>
                </div>
                <div className="fifthContent">
                    <div className="instructionOfOthers">
                        <h1>
                            5
                        </h1>
                    </div>
                    <div className={Sequence >= 5 ? "others" : "nonClickableOthers"}>
                        <h1>
                            Ending
                        </h1>
                        <p>
                            Others (Use it to thank anyone, show your expection or point out what type of partner you are looking for)
                        </p>
                        <div className="inputAndButton">
                            <textarea value={ending} onChange={endingHandler} />
                            {Sequence === 5 ?
                                <button className="nextButton" onClick={() => setSequence(6)}>
                                    Next
                                </button> : null}
                        </div>

                    </div>
                </div>
                <div className="sixthContent">
                    <div className="instructionOfTags">
                        <h1>6</h1>
                    </div>
                    <div className={Sequence >= 6 ? "tagsContainer" : "nonClickableTagsContainer"}>
                        <h1>
                            Add tags
                        </h1>
                        <p>
                            Add tags like programming language or tools to increase searchability
                        </p>
                        <div className="tagsBox">
                            {allTags}
                        </div>
                        <div className="addTagsContainer">
                            <input type="text" className="tagsInput" placeholder="Input tags" value={showTags} onChange={tagshandler} />
                            <button onClick={addTagButton}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <button className="nextPage" onClick={submitButtonHandler}>
                <p className={Sequence === 5 ? "nextLink" : "nonCLickableNextLink"}>
                    Next page
                </p>
            </button>
        </div>
    )
};

export default PostPage;