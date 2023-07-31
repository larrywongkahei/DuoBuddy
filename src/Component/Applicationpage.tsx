import Application from "./Application";
import "./ApplicationpageCss.css"

import { useState } from "react";

const Applicationpage : React.FC = () => {

    const [showApplication, setShowApplication] = useState<Boolean>(false)

    function getData(data:string){
        setShowApplication(false)
        document.body.style.backgroundColor = "#F0EFEF"
        document.body.style.opacity = "1"
        const Navbar:HTMLElement = document.getElementById("NavBar") || new HTMLElement
        Navbar.style.pointerEvents = "auto";
        Navbar.style.opacity = "1"
    }

    function closeApplication(){
        setShowApplication(false)
        document.body.style.backgroundColor = "#F0EFEF"
        document.body.style.opacity = "1"
        const Navbar:HTMLElement = document.getElementById("NavBar") || new HTMLElement
        Navbar.style.pointerEvents = "auto";
        Navbar.style.opacity = "1"
    }

    return (
        <div className="container">
        <button onClick={() => {
            document.body.style.backgroundColor = "rgba(0,0,0,0.75)";
            const Navbar:HTMLElement = document.getElementById("NavBar") || new HTMLElement
            Navbar.style.pointerEvents = "none";
            setShowApplication(true)
            }}>
            Press to open
        </button>
        {showApplication &&
                        <div id='applicationConatiner'>
                            <div id='application'>
                                <Application getData={getData} closeApplication={closeApplication} />
                            </div>
                        </div>}        </div>
    )
}

export default Applicationpage;