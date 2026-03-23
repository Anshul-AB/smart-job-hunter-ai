import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../../utils/serviceHelper';

const PrivateRoute = ({ element }) => {
    const token = getToken();

    return !token ? <Navigate to="/login" replace /> : element;
};

export default PrivateRoute;
