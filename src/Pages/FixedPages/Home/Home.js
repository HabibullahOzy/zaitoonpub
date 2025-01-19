import React from 'react';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';
import image from "../../../assets/website-under-construction.png";

const Home = () => {
    return (
        <div>
            
            <Banner></Banner>
            <div className=' bg-products'>
                <Products></Products>
            </div>

            
            <img src={image} alt='' className=' h-96 w-full'></img>
        </div>
    );
};

export default Home;