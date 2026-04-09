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
    <div className="flex gap-4">
      {token ? (
        <>
          <Link to="/jobs">My Jobs</Link>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </div>
  );
};

export default Navbar;