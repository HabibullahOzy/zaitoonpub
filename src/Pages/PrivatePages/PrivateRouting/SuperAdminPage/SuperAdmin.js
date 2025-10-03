import React, { useContext } from 'react';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import ClockLoader from 'react-spinners/ClockLoader';
import useSuperAdmin from '../../../../hooks/superAdmin/superAdmin';
import { Navigate, useLocation } from 'react-router-dom';

const SuperAdmin = ({children}) => {
    const {user, loader}=useContext(Zaitooncontext)
    const [isSuperAdmin, adminLoading]=useSuperAdmin(user?.email)

    let location =useLocation();


    if(loader || adminLoading){
        return <div className='flex justify-center align-middle'><ClockLoader color="yellow" size={100} /></div>
    }

    if(user && isSuperAdmin){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default SuperAdmin;