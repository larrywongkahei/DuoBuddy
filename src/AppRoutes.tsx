import Explore from "./Component/Explore";
import Home from "./Component/Home";
import Login from "./Component/Login";
import PostPage from "./Component/PostPage";
import Profile from "./Component/Profile";
import SearchResult from "./Component/SearchResult";
import ShowProject from "./Component/ShowProject";
import Signup from "./Component/Signup";
import ProfilePageView from "./Component/ProfilePageView";
import AllApplicant from "./Component/AllApplicant";
import { Navigate } from "react-router-dom";

export const AppRoutes = [
    {
        index: true,
        path:"/*",
        element: <Home />
    },
    {
        path:"*",
        element: <Navigate to="/" />
    },
    {
        path: "/profile",
        element: <Profile />
    },
    {
        path: "/explore",
        element: <Explore />
    },
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/searchResult/:searchdata",
        element: <SearchResult />
    },
    {
        path:"/signup",
        element:<Signup />
    },
    {
        path:"/idea/post",
        element:<PostPage />
    },
    {
        path:"/post/:id",
        element:<ShowProject />
    },
    {
        path:"/profile/:id",
        element:<ProfilePageView />
    },
    {
        path:"/applicants/:id",
        element:<AllApplicant />
    }

];