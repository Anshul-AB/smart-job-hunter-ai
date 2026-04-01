import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../../utils/serviceHelper';

const PrivateRoute = () => {
    const token = getToken();
    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;