import { useState } from "react";


const Application : React.FC = () => {

    const [dataToPass, setDataToPass] = useState<string>("");

    return (
        <form>
            <label>
                Input your experience
            </label>
        </form>
    )
}

export default Application;