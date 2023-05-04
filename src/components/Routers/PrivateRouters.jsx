import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../Provider/Authprovider';

const PrivateRouters = ({children}) => {
    const {user, loader} = useContext(AuthContext);
    if(loader){
        return <div>Hello I'm here</div>
    }
    if(user){
        return children
    }
    return (
        <Navigate to="/login"></Navigate>
    );
};

export default PrivateRouters;