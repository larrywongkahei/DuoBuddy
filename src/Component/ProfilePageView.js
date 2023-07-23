import { useParams } from "react-router-dom"
import { useEffect } from "react";
import APIService from "../APIService";

export default function ProfilePageView(){
    useEffect(() => {
        
    }, [])
    const param = useParams();
    const id = param.id;
    return (
        <h1>
            this is profile viewing page + { id }
        </h1>
    )
}