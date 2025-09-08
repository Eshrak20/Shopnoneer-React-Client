import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home/Home";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import ResetPass from "../Pages/ResetPass/ResetPass";
import Detail from "../Pages/Detail/Detail";
import DetailsPropMain from "../Pages/DetailsProperty/DetailsPropMain/DetailsPropMain";
import Profile from "../Pages/Profile/Profile";
import ProfileMain from "../Pages/Profile/ProfileMain";
import Contact from "../Pages/Contact/Contact";
import Favourite from "../Pages/Favourite/FavouriteMain/FavouriteMain";
import Faq from "../Pages/Faq/Faq";
import Error from "../Pages/Error/Error";
import LoadingLottie from "../../public/assets/loadingLottie/loadingLottie";
import LegalPage from "../Pages/LegalPage/LegalPage";
import ForgotPasswordForm from "../Pages/ForgotPass/ForgotPasswordForm";

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
        path: "/forgotPassForm",
        element: <ForgotPasswordForm />,
      },
      {
        path:"/profile",
        element:<Profile/>,
      },
      {
        path:"/profile-edit",
        element:<ProfileMain/>,
      },
      {
        path: "/contact",
        element: <Contact/>,
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
        element: <Favourite/>,
      },
      {
        path: "/faq",
        element: <Faq/>,
      },
      {
        path: "/legal",
        element: <LegalPage/>,
      },
      {
        path: "*", // This will match any undefined route
        element: <Error />, // Show the ErrorPage component
      },
      {
        path: "loadingLottie", // This will match any undefined route
        element: <LoadingLottie />, // Show the ErrorPage component
      },
    ],
  },
]);
