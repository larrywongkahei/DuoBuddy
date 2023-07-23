import { useParams } from "react-router-dom"
import { useEffect } from "react";

export default function ProfilePageView(){
    const param = useParams();
    const id = param.id;
    return (
        <h1>
            this is profile viewing page + { id }
        </h1>
    )
}