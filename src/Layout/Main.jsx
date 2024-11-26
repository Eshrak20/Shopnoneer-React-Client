import { Outlet, useLocation } from "react-router-dom";
import Footer from "../Pages/Shared/Footer/Footer";
import Navbar from "../Pages/Shared/Navbar/Navbar";

const Main = () => {
  const location = useLocation();

  const noHeaderFooter =
    location.pathname.includes("login") || location.pathname.includes("signUp") ;
  return (
    <div>
      {noHeaderFooter || <Navbar></Navbar>}
      {/* <Navbar></Navbar> */}
      <div className="max-w-screen-2xl mx-auto">
        <Outlet></Outlet>
      </div>
      {/* <Footer></Footer> */}
      {noHeaderFooter || <Footer></Footer>}
    </div>
  );
};

export default Main;
