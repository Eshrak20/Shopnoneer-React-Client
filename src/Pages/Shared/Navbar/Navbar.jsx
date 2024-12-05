import { Link, useLocation } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import "./Navbar.css"; // Import external CSS file for custom styles

const Navbar = ({ visible }) => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const dropdownRef = useRef(null);

  const fixedRoutes = ["/", "/home", "/about"];
  const isFixed = fixedRoutes.includes(location.pathname);

  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Log out error:", error);
    }
  };

  const navOptions = (
    <>
      {/* main part */}
      <li>
        <Link
          to="/detail"
          className={`nav-item   lg:text-2xl text-${
            isFixed ? "gray-800" : "gray-100"
          }`}
        >
          Properties
        </Link>
      </li>

      <li>
        <Link
          to="/contact"
          className={`nav-item   lg:text-2xl text-${
            isFixed ? "gray-800" : "gray-100"
          }`}
        >
          Contact
        </Link>
      </li>

      <li>
        <Link
          to="/favouritePage"
          className={`nav-item   lg:text-2xl text-${
            isFixed ? "gray-800" : "gray-100"
          }`}
        >
          Saved
        </Link>
      </li>
    </>
  );

  return (
    <>
      {visible ? (
        <div
          className={`navbar ${
            isFixed
              ? "lg:bg-base-100 lg:max-w-screen-2xl lg:bg-opacity-35 lg:fixed "
              : "bg-black max-w-screen-2xl sticky top-0"
          } z-10 max-auto px-7`}
        >
          <div className="navbar-start">
            <div
              className={`font-bold text-3xl dropdown  lg:hidden text-${
                isFixed ? "black" : "white"
              }`}
            >
              <button tabIndex={0} className="mr-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="font-semibold menu menu-sm dropdown-content mt-3 w-52 shadow"
              >
                <div className={`bg-${isFixed ? "white" : "black"}`}>
                  {navOptions}
                </div>
              </ul>
            </div>
            <Link
              to="/"
              className={`flex bg-transparent items-center  font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r ${
                isFixed
                  ? "from-gray-800 via-gray-800 to-gray-800"
                  : "from-lime-200 via-lime-200 to-lime-200"
              }`}
            >
              <div className="flex items-center space-x-2 lg:space-x-4">
                <img
                  src="/final-removebg-preview.png"
                  alt="Shopnoneer Logo"
                  className="w-24 sm:w-32  lg:w-24 h-auto hidden lg:flex"
                />
                <span className="text-2xl lg:text-3xl font-semibold">
                  Shopnoneer
                </span>
              </div>
            </Link>
          </div>
          <div className="navbar-center  lg:flex">
            <ul className="hidden lg:flex text-lg font-semibold menu-horizontal px-1">
              {navOptions}
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-36 rounded-full">
                    <img src={user.profilePicture} alt="Profile" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content font-semibold bg-base-100 rounded-lg shadow-lg transition-transform duration-300 scale-95 opacity-0 transform-gpu origin-top-right mt-3 w-52 p-2 group-open:scale-100 group-open:opacity-100 z-10"
                >
                  <Link to="#" className="p-2 block">
                    Profile
                  </Link>
                  <Link to="/signUp" className={` p-2 block `}>
                    Sign Up
                  </Link>

                  <Link to="/login" className={`p-2 block `}>
                    Login
                  </Link>

                  <Link to="/resetPass" className={`p-2 block `}>
                    Reset Password
                  </Link>
                  <li>
                    <Link
                      to="/login"
                      className="bg-red-600 text-white w-full p-2 rounded-lg shadow-md transition-all duration-200 hover:bg-red-700"
                      onClick={handleLogOut}
                    >
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="btn bg-teal-500 text-white hover:bg-teal-600 transition duration-300 shadow-lg"
              >
                Log In
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;