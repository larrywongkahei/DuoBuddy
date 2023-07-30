import Application from "./Application";

const Applicationpage : React.FC = () => {

    function getData(data:string){
        console.log(data);
    }

    return (
        <div>
        <button>
            Press to open
        </button>
        <Application getData={getData}/>
        </div>
    )
}

export default Applicationpage;