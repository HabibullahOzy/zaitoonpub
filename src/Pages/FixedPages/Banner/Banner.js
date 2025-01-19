import { Carousel } from 'flowbite-react';
import React from 'react';
import img2 from "../../../assets/zaitoonPublication.jpg";
import img3 from "../../../assets/zaitonbanner.jpg";
import img4 from "../../../assets/book.jpg";
import img1 from "../../../assets/booksirize.jpg";
import img5 from "../../../assets/adv5.jpg";

const Banner = () => {
    return (
            <div className="h-56 mx-auto sm:h-64 xl:h-80 2xl:h-96">
                <Carousel slideInterval={4000} slide="loop">
                    
                    <img src={img1} alt="..." className=' h-full' />
                    <img src={img2} alt="..." className=' h-full'/>
                    <img src={img3} alt="..." className=' h-full'/>
                    <img src={img5} alt="..." className=' h-full'/>
                    <img src={img4} alt="..." className=' h-full'/>
                </Carousel>
            </div>
    );
};

export default Banner;