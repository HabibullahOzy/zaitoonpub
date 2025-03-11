import React from 'react';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';
import CustomerReview from '../Review/CustomerReview';
// import image from "../../../assets/website-under-construction.png";

const Home = () => {
    return (
        <div className='bg-image'>
            
            <Banner></Banner>
            <div className=' bg-products'>
                <Products></Products>
            </div>

            {/* <img src={image} alt='' className=' h-96 w-full'></img> */}

            <CustomerReview></CustomerReview>
        </div>
    );
};

export default Home;