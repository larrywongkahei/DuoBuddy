import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import APIService from "../APIService";

export default function ProfilePageView(){
    const [userData, setUserData] = useState({})
    const param = useParams();
    const id = param.id;
    useEffect(() => {
        APIService.getUserById(id).then(data => setUserData(data))
    }, [])

    console.log(userData)
    return (
        <h1>
            this is profile viewing page + { id }
        </h1>
    )
}