import Application from "./Application";

import { useState } from "react";

const Applicationpage : React.FC = () => {

    const [showApplication, setShowApplication] = useState<Boolean>(false)

    function getData(data:string){
        setShowApplication(false)
        document.body.style.backgroundColor = "#F0EFEF"
        const Navbar:HTMLElement = document.getElementById("NavBar") || new HTMLElement
        Navbar.style.pointerEvents = "auto";
        Navbar.style.opacity = "1"
    }

    function closeApplication(){
        setShowApplication(false)
        document.body.style.backgroundColor = "#F0EFEF"
        const Navbar:HTMLElement = document.getElementById("NavBar") || new HTMLElement
        Navbar.style.pointerEvents = "auto";
        Navbar.style.opacity = "1"
    }

    return (
        <div>
        <button onClick={() => {
            document.body.style.backgroundColor = "#8a7f7f"
            const Navbar:HTMLElement = document.getElementById("NavBar") || new HTMLElement
            Navbar.style.pointerEvents = "none";
            Navbar.style.opacity = "0.4"
            setShowApplication(true)
            }}>
            Press to open
        </button>
        {showApplication &&
        <Application getData={getData} closeApplication={closeApplication}/> }
        </div>
    )
}

export default Applicationpage;