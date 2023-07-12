import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import NavBar from './Component/NavBar';
import React, { Component, useState, useEffect } from 'react';
import APIService from './APIService';



function App() {

  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    if(urlParam.has("code")){
      loginWithGithub(urlParam.get("code"));
    }else if (window.location.href.includes("#")){
      loginWithGoogle(window.location.href.split("=")[1].split("&")[0])
    }
    if(sessionStorage.length > 0){
      APIService.fetchUserOrCreateUser()
    }
}, [])

async function loginWithGithub(code){
  const response = await fetch(`http://localhost:8080/login/getAccessToken?code=${code}`)
  const data = await response.text();
  const accessToken = data.split("=")[1];
  create(accessToken);
}

console.log(sessionStorage)


async function loginWithGoogle(token){
  const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", 
  {
    method:"GET",
    headers:{"Authorization":"Bearer" + token}
  })
  const data = await response.json();
  console.log(data.email)
  sessionStorage.setItem("name", data.name);
  sessionStorage.setItem("avatar_url", "https://larrywongkahei.github.io/img/pixel_art.png");
  sessionStorage.setItem("email", data.email);
  const userExist = await APIService.fetchUserOrCreateUser()
  if(userExist === false){
    await APIService.createUser(data.name, null, data.locale, "https://larrywongkahei.github.io/img/pixel_art.png", data.email);
  }
  window.location.href = "http://localhost:3000"
}

async function create(accessToken){
  const response = await fetch("https://api.github.com/user", {headers:{Authorization:`Bearer ${accessToken}`}});
  const data = await response.json();
  sessionStorage.setItem("name", data.login);
  sessionStorage.setItem("bio", data.bio)
  sessionStorage.setItem("location", data.location)
  sessionStorage.setItem("avatar_url", data.avatar_url);
  sessionStorage.setItem("email", data.email);
  const userExist = await APIService.fetchUserOrCreateUser()
  if(userExist === false){
    await APIService.createUser(data.login, data.bio, data.location, data.avatar_url, data.email)
  }
  window.location.href = "http://localhost:3000";

}

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
