import React from 'react';
import Header from '../Pages/SharedPages/Headers/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/SharedPages/Footer/Footer';

const Main = () => {
    return (
        <div>
            <marquee style={{Text:"red"}}>THIS SITE IS UNDER CONSTRUCTION 🚧</marquee>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;