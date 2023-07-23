import AddTag from "./Component/AddTag";
import Explore from "./Component/Explore";
import Home from "./Component/Home";
import Login from "./Component/Login";
import PostPage from "./Component/PostPage";
import Profile from "./Component/Profile";
import SearchResult from "./Component/SearchResult";
import ShowProject from "./Component/ShowProject";
import Signup from "./Component/Signup";
import ProfilePageView from "./Component/ProfilePageView"

const AppRoutes = [
    {
        index: true,
        element: <Home />
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
        path:"/idea/post/addtag",
        element:<AddTag />
    },
    {
        path:"/post/:id",
        element:<ShowProject />
    },
    {
        path:"/profile/:id",
        element:<ProfilePageView />
    },

];

export default AppRoutes;
