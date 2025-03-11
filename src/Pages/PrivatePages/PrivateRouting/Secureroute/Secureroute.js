import React, { useContext } from 'react';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { Navigate, useLocation } from 'react-router-dom';
import ClockLoader from 'react-spinners/ClockLoader'

const Secureroute = ({ children }) => {
    const { user, loader } = useContext(Zaitooncontext)
    let location = useLocation();


    if (loader) {
        return <div className='flex justify-center items-center min-h-screen'><ClockLoader color="yellow" size={100} /></div>
    }


    if (user) {
        return children;
    }
    return <Navigate to="/signIn" state={{ from: location }} replace></Navigate>

};

export default Secureroute;