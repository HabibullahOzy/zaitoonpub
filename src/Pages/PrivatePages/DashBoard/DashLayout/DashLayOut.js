import React from 'react';
import DHeader from '../DashHeader/DHeader';
import { Outlet } from 'react-router-dom';

const DashLayOut = () => {
    return (
        <div className='flex'>
            <DHeader></DHeader>
            <Outlet></Outlet>
        </div>
    );
};

export default DashLayOut;