import React from 'react';
import DHeader from '../DashHeader/DHeader';
import { Outlet } from 'react-router-dom';

const DashLayOut = () => {
    return (
        <div className=''>
            <DHeader></DHeader>
            <div className='w-11/12 mx-auto'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashLayOut;