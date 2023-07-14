import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import NavBar from './Component/NavBar';
import { useEffect } from 'react';
import APIService from './APIService';



function App() {

  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    if(urlParam.has("code") & window.location.pathname === "/github"){
      APIService.FetchDataFromGithub(urlParam.get("code"));
    }
    else if(urlParam.has("code") & window.location.pathname === "/linkedin"){
      APIService.FetchDataFromLinkedin(urlParam.get("code"));
    }
}, [])

  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      {AppRoutes.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element}/>;
      })}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
