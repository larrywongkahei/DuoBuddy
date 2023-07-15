import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import NavBar from './Component/NavBar';
import { useEffect } from 'react';
import APIService from './APIService';



function App() {

  
  useEffect(() => {
    // get queryString (http://localhost:3000/login?id=1 to ?id=1)
    const queryString = window.location.search;

    // get params value from the queryString
    // urlParam.get("id") = 1
    const urlParam = new URLSearchParams(queryString);
    
    // check if urlParam has code param for github oauth login
    if(urlParam.has("code") & window.location.pathname === "/github"){
      APIService.FetchDataFromGithub(urlParam.get("code"));
    }

    // check if urlParam has code param for linkedin oauth login
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
