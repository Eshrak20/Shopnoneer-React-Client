import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const FacebookLogin = () => {
  const { facebookAuth, loading } = useContext(AuthContext);

  return (
    <div className="mb-5">
      <div className="text-center">
        <button
          onClick={facebookAuth}
          disabled={loading}
          className={`btn btn-primary ${loading ? "loading" : ""}`}
          style={{ backgroundColor: "#1877F2", borderColor: "#1877F2" }} // Facebook blue
        >
          <span className="text-white">
            {loading ? "Signing in..." : "Continue with Facebook"}
          </span>
        </button>
      </div>
    </div>
  );
};

export default FacebookLogin;
