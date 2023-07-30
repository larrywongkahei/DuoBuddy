import { useState } from "react";


const Application : React.FC = () => {

    const [dataToPass, setDataToPass] = useState<string>("");

    function dataToPassHandler(e:React.ChangeEvent<HTMLInputElement>){
        setDataToPass(e.target.value)
    }

    function handleSubmitHandler(e:React.MouseEvent){
        e.preventDefault();
        console.log(dataToPass);
    }

    return (
        <form>
            <label>
                Input your experience
            </label>
            <input type="text" value={dataToPass} onChange={dataToPassHandler} />
            <input type="submit" value="submit" onClick={handleSubmitHandler}/>
        </form>
    )
}

export default Application;