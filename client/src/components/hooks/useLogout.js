import { useNavigate } from "react-router-dom";

const useLogout = () => {
    const navigate = useNavigate();

    return () => {
        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        navigate("/login");
    };
};

export default useLogout