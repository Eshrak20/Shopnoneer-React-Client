import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ResetPass from "../Pages/ResetPass/ResetPass";
import Detail from "../Pages/Detail/Detail";
import DetailsPropMain from "../Pages/DetailsProperty/DetailsPropMain/DetailsPropMain";
import ContactPage from "../Pages/ContactPage/ContactPage";
import FavouritePage from "../Pages/FavouritePage/FavouritePageMain/FavouritePageMain";
import Profile from "../Pages/Profile/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/resetPass",
        element: <ResetPass />,
      },

      {
        path:"/profile",
        element:<Profile/>,
      },
      {
        path: "/contact",
        element: <ContactPage/>,
      },
      {
        path: "/about",
        element: <ContactPage/>,
      },
      {
        path: "/detail/:housingId?",
        element: <Detail />,
      },
      {
        path: "/detailsPropMain/:id",
        element: <DetailsPropMain></DetailsPropMain>,
      },
      {
        path: "/favouritePage",
        element: <FavouritePage/>,
      },
    ],
  },
]);
