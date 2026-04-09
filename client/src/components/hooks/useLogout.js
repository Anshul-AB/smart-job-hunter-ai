// src/hooks/useLogout.js
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice.js";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    document.cookie = "token=; Max-Age=0; path=/";

    dispatch(logout());

    navigate("/login", { replace: true });
  };

  return handleLogout;
};

export default useLogout;