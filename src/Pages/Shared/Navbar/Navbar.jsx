import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import "./Navbar.css"; // Import external CSS file for custom styles
import ContactInfo from "../../../Components/ContactInfo/ContactInfo";

const Navbar = ({ visible }) => {
  const { user, logOut } = useContext(AuthContext);
  const location = useLocation();
  const fixedRoutes = ["/", "/home", "/about"];
  const isFixed = fixedRoutes.includes(location.pathname);
  const [image, setImage] = useState(null);
  const [avImage, setAvImage] = useState(null);
  const [googlePic, setGooglePic] = useState(null);

  useEffect(() => {
    const savedImage = localStorage.getItem("updated_profile_photo"); // Instant updated pic
    const avatarImage = localStorage.getItem("user_profile_pic");     
    const googlePic = localStorage.getItem("user_google_pic");
    console.log(googlePic);
    

    if (savedImage && savedImage !== "null") {
      setImage(savedImage);
    }
    if (avatarImage && avatarImage !== "null") {
      setAvImage(avatarImage);
    }
    if (googlePic && googlePic !== "null") {
      setGooglePic(googlePic);
    }
  }, []);
  const handleLogOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.error("Log out error:", error);
    }
  };

  const getProfilePhotoUrl = (profilePhoto) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (!profilePhoto || profilePhoto === "null") {
      return;
    }
    return `${apiUrl}/storage/${profilePhoto}`;
  };

  const navOptions = (
    <>
      <li>
        <Link
          to="/"
          className={`nav-item mt-2 text-gray-800 md:text-lg 2xl:text-2xl lg:text-white ${
            location.pathname === "/" ? "active" : ""
          }`}
        >
          হোম
        </Link>
      </li>
      <li>
        <Link
          to="/detail"
          className={`nav-item mt-2 text-gray-800 md:text-lg 2xl:text-2xl lg:text-white ${
            location.pathname === "/detail" ||
            location.pathname.startsWith("/detailsPropMain/")
              ? "active"
              : ""
          }`}
        >
          অ্যাপার্টমেন্ট
        </Link>
      </li>

      <li>
        <Link
          to="/favouritePage"
          className={`nav-item mt-2 text-gray-800 md:text-lg 2xl:text-2xl lg:text-white ${
            location.pathname === "/favouritePage" ? "active" : ""
          }`}
        >
          পছন্দনীয়
        </Link>
      </li>
      <li>
        <Link
          to="/faq"
          className={`nav-item mt-2 text-gray-800 md:text-lg 2xl:text-2xl lg:text-white ${
            location.pathname === "/faq" ? "active" : ""
          }`}
        >
          সচরাচর প্রশ্ন
        </Link>
      </li>
      <li>
        <Link
          to="/contact"
          className={`nav-item mt-2  text-gray-800 md:text-lg 2xl:text-2xl lg:text-white ${
            location.pathname === "/contact" ? "active" : ""
          }`}
        >
          যোগাযোগ
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
              ? "bg-black bg-opacity-60 lg:max-w-screen-4xl lg:fixed"
              : "bg-black max-w-screen-2xl sticky top-0"
          } z-10 max-auto px-7 transition-all duration-300 ease-in-out`}
        >
          <div className="navbar-start" style={{ height: "60px" }}>
            {" "}
            {/* Set a fixed height */}
            <div className={`font-bold text-3xl dropdown lg:hidden `}>
              <button tabIndex={0} className="mr-5 text-white">
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
                className="menu w-44 p-2 menu-sm dropdown-content font-semibold bg-base-100 rounded-lg shadow-lg transition-transform duration-300 z-20"
              >
                <div>{navOptions}</div>
              </ul>
            </div>
            <Link
              to="/"
              className={`flex bg-transparent items-center font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r ${
                isFixed
                  ? "from-gray-100 via-gray-100 to-gray-100"
                  : "from-lime-100 via-lime-100 to-lime-100"
              }`}
            >
              <div className="flex items-center">
                <img
                  src="/final-removebg-preview.png"
                  alt="স্বপ্ননীড় Logo"
                  className="w-28 h-auto hidden lg:flex"
                />
                <span className="text-2xl lg:text-3xl font-semibold">
                  স্বপ্ননীড়
                </span>
              </div>
            </Link>
          </div>

          <div className="navbar-center lg:flex">
            <ul className="hidden lg:flex text-lg font-semibold menu-horizontal px-1">
              {navOptions}
            </ul>
          </div>

          <div className="navbar-end">
            {/* Contact Info Section */}
            <ContactInfo />
            {user ? (
              <div className="dropdown dropdown-end">
                <div tabIndex={0} className="avatar">
                  <div className="w-8 lg:w-14 rounded-full">
                    <img
                      src={
                        image
                          ? getProfilePhotoUrl(image)
                          : getProfilePhotoUrl(avImage) ||
                            googlePic
                      }
                      alt="Profile pic"
                    />
                  </div>
                </div>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content font-semibold bg-base-100 rounded-lg shadow-lg transition-transform duration-300 scale-95 opacity-0 transform-gpu origin-top-right mt-3 w-52 p-2 group-open:scale-100 group-open:opacity-100 z-10"
                >
                  <Link
                    to="/profile"
                    className={`nav-link ${
                      location.pathname === "/profile" ? "nav-link-active" : ""
                    }`}
                  >
                    প্রোফাইল
                  </Link>
                  <Link
                    to="/resetPass"
                    className={`nav-link ${
                      location.pathname === "/resetPass"
                        ? "nav-link-active"
                        : ""
                    }`}
                  >
                    পাসওয়ার্ড পুনরায় সেট করুন
                  </Link>
                  <Link
                    to="/"
                    className="nav-link-logout"
                    onClick={handleLogOut}
                  >
                    লগ আউট
                  </Link>
                </ul>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-4 py-2 text-xs lg:text-base rounded-md bg-teal-600 text-gray-100 hover:bg-teal-700 transition duration-300 shadow-lg"
              >
                লগ ইন
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Navbar;
