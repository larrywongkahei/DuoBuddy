import Application from "./Application";

import { useState } from "react";

const Applicationpage : React.FC = () => {

    const [showApplication, setShowApplication] = useState<Boolean>(false)

    function getData(data:string){
        console.log(data);
    }

    return (
        <div>
        <button onClick={() => setShowApplication(true)}>
            Press to open
        </button>
        {showApplication &&
        <Application getData={getData}/> }
        </div>
    )
}

export default Applicationpage;