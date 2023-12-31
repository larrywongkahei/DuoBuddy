import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from './Component/NavBar';
import { useEffect } from 'react';
import { AppRoutes } from './AppRoutes';
import { APIService } from './APIService';
import { User } from './Component/Interface';



const App:React.FC = () => {

  useEffect(() => {
    
    // get queryString (http://localhost:3000/login?id=1 to ?id=1)
    const queryString = window.location.search;

    // get params value from the queryString
    // urlParam.get("id") = 1
    const urlParam = new URLSearchParams(queryString);
    if(urlParam.has("userId")){
      APIService.getUserById(urlParam?.get('userId') || "").then((data:User) => {
        sessionStorage.setItem("name", data.name);
        sessionStorage.setItem("userId", data.id);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("avatar_url", data.avatarUrl);
        window.location.href = "https://larrywongkahei.github.io/DuoBuddy/";
      })
    }
  
}, [])

  return (
    <HashRouter>
    <NavBar />
    <Routes>
      {AppRoutes.map((route:any, index:number) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element}/>;
      })}
    </Routes>
  </HashRouter>
  );
}

export default App;
