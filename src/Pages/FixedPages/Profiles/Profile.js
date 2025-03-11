import React, { useContext } from 'react';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';



const Profile = () => {
    const {user}=useContext(Zaitooncontext);

    return (
        <div className='w-10/12 m-auto min-h-screen'>
            <div className='flex align-middle justify-center m-10'>
                <figure><img src={user?.photoURL} alt="" className='rounded-md' /></figure>
            </div>
            <div >
                <p className='p-3 text-black font-semibold'>Name: {user?.displayName}</p>
                <p className='p-3 text-black font-semibold'>Email: {user?.email}</p>
                <p className='p-3 text-black font-semibold'>Account create date: {user?.metadata.creationTime}</p>
                <p className='p-3 text-black font-semibold'>Last Login Time and Date : {user?.metadata.lastSignInTime}</p>
            </div>
        </div>
    );
};

export default Profile;