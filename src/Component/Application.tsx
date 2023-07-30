import { useState } from "react";
import './Application.css';
import { MdOutlineCancel } from "react-icons/md"

interface functionToPass {
    getData(data:string) : void
    closeApplication() :void
}
const Application : React.FC<functionToPass> = ({getData, closeApplication}) => {

    const [dataToPass, setDataToPass] = useState<string>("");

    function dataToPassHandler(e:React.ChangeEvent<HTMLTextAreaElement>){
        setDataToPass(e.target.value)
    }

    function handleSubmitHandler(e:React.MouseEvent){
        e.preventDefault();
        getData(dataToPass)

            }

    return (
        <div className="applicationContainer">
            <form className="applicationForm">
                <MdOutlineCancel className="cancelButton" onClick={closeApplication}/>
                <label className="label">
                    Input your experience
                </label>
                <textarea value={dataToPass} onChange={dataToPassHandler} className="ApplicationDataInput"/>
                <input type="submit" value="submit" onClick={handleSubmitHandler}/>
            </form>
        </div>
    )
}

export default Application;