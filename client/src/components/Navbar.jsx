import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white shadow-md px-6 py-4 flex justify-between items-center">
      {/* Logo */}
      <h1 className="text-xl font-bold text-blue-400">Smart Job AI</h1>

      {/* Links */}
      <div className="flex items-center gap-6">
        {token ? (
          <>
            {/* <Link
              to="/jobs"
              className="hover:text-blue-400 transition duration-200"
            >
              My Jobs
            </Link> */}

            <Link
              to="/dashboard"
              className="hover:text-blue-400 transition duration-200"
            >
              Dashboard
            </Link>
              
            <Link
              to="/saved-jobs"
              className=" text-pink-500 px-4 py-2 rounded"
            >
              Saved Jobs ❤️
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition duration-200"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="hover:text-blue-400 transition duration-200"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg transition duration-200"
            >
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
