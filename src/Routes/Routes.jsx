import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Properties from "../Pages/Properties/Properties/Properties";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ResetPass from "../Pages/ResetPass/ResetPass";
import Detail from "../Pages/Detail/Detail";
import DetailsPropMain from "../Pages/DetailsProperty/DetailsPropMain/DetailsPropMain";
import ContactPage from "../Pages/ContactPage/ContactPage";

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
        path: "properties",
        element: <Properties />,
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
        path: "/contact",
        element: <ContactPage/>,
      },
      {
        path: "/resetPass",
        element: <ResetPass />,
      },
      {
        path: "/detail/:housingId?",
        element: <Detail />,
      },
      {
        path: "/detailsPropMain/:id",
        element: <DetailsPropMain></DetailsPropMain>,
      },
    ],
  },
]);
