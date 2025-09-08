import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signUp") || location.pathname.includes("resetPass") || location.pathname.includes("forgotPassForm") || location.pathname.includes("profile") || location.pathname.includes("loadingLottie");  
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      <div className="">
        <Outlet></Outlet>
      </div>
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
