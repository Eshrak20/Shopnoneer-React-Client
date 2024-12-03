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
      <li className="">
        <Link
          to="/login"
          className={`nav-item text-${isFixed ? "black" : "white"}`}
        >
          Buy
        </Link>
      </li>
      <li className="">
        <Link
          to="/signUp"
          className={`nav-item text-${isFixed ? "black" : "white"}`}
        >
          Rent
        </Link>
      </li>
      <li className="">
        <Link
          to="/detail"
          className={`nav-item text-${isFixed ? "black" : "white"}`}
        >
          Properties
        </Link>
      </li>
      <li className="">
        <Link
          to="/resetPass"
          className={`nav-item text-${isFixed ? "black" : "white"}`}
        >
          Reset Password
        </Link>
      </li>
      <li className="">
        <Link
          to="/detailsPropMain/30"
          className={`nav-item text-${isFixed ? "black" : "white"}`}
        >
          New Development
        </Link>
      </li>
      <li className="">
        <Link
          to="/favouritePage"
          className={`nav-item text-${isFixed ? "black" : "white"}`}
        >
          Saved
        </Link>
      </li>
      <li className="">
        <Link
          to="/contact"
          className={`nav-item text-${isFixed ? "black" : "white"}`}
        >
          Contact
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
              ? "bg-base-100 max-w-screen-2xl  bg-opacity-20 fixed"
              : "bg-black max-w-screen-2xl  sticky top-0"
          } z-10 max-auto px-7`}
        >
          <div className="navbar-start">
            <div className="dropdown lg:hidden">
              <button tabIndex={0} className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                className="font-semibold menu menu-sm dropdown-content mt-3 w-52 p-2 shadow"
              >
                {navOptions}
              </ul>
            </div>
            <Link
              to="/"
              className={`font-bold text-2xl text-${
                isFixed ? "black" : "white"
              }`}
            >
              Shopnoneer
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="text-lg font-semibold menu-horizontal px-1">
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
                  className="menu menu-sm dropdown-content font-semibold bg-base-100 rounded-lg shadow-lg transition-transform duration-300 scale-95 opacity-0 transform-gpu origin-top-right mt-3 w-52 p-2 group-open:scale-100 group-open:opacity-100"
                >
                  <li className="nav-item">
                    <Link to="/profile" className="p-2 block">
                      Profile
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/settings" className="p-2 block">
                      Settings
                    </Link>
                  </li>
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
