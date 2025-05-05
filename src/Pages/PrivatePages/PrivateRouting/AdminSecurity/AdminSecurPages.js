import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import useAdmin from '../../../../hooks/adminHooks/useAdmin';
import ClockLoader from 'react-spinners/ClockLoader';

const AdminSecurPages = ({children}) => {
    const {user, loader}=useContext(Zaitooncontext)
    const [isAdmin, adminLoading]=useAdmin(user?.email)
    console.log(isAdmin)
    let location =useLocation();


    if(loader || adminLoading){
        return <div className='flex justify-center align-middle'><ClockLoader color="yellow" size={100} /></div>
    }

    if(user && isAdmin){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminSecurPages;