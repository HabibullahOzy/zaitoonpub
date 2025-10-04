import React, { useEffect, useState } from 'react';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';
// import CustomerReview from '../Review/CustomerReview';
// import Openinganimation from '../../OpeningAnimation/Openinganimation';
import Category from '../Products/Category/Category';
import { RiWhatsappFill } from 'react-icons/ri';
import ImportantVideo from '../VideoShow/ImportantVideo';
import CommingSoon from '../Products/Upcomming/CommingSoon';
import img from '../../../assets/booksirize.jpg'
import './Home.css';

// import image from "../../../assets/website-under-construction.png";

const videoData = [
  {
    src: "https://www.youtube.com/watch?v=-M6t0oP5ZDc",
    thumbnail: img,
    title: "Intro Video"
  }
];



const Home = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 500); // Delay for animation
        return () => clearTimeout(timer);
    }, []);
    return (

        <div className='bg-image'>

            <Banner></Banner>
            <div className=' bg-products'>

                <Products></Products>
            </div>

            <div>
                <CommingSoon></CommingSoon>
            </div>

            <div className="w-10/12 mx-auto pt-10">
                <ImportantVideo vidSrc={videoData} ></ImportantVideo>
            </div>

            {/* <CustomerReview></CustomerReview> */}
            <Category></Category>

            {/* <div
                className={`fixed z-[1000] bottom-[30%] right-0 p-3 transition-transform duration-500 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-28'
                    }`}
            >
                <a
                    href="https://wa.me/message/PARTY6QIOII2E1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group"
                >
                    <RiWhatsappFill className="text-[#2da922] text-6xl mx-4 transition-transform transform group-hover:scale-110 group-hover:shadow-2xl" />
                </a>
            </div> */}

            <div
                className="fixed bottom-[50px] right-0 z-[100] group "
                style={{ transform: "translateX(100%)", animation: "slideIn 1s forwards" }}
            >
                <a
                    href="https://wa.me/message/PARTY6QIOII2E1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex justify-end items-center p-3"
                >
                    <div className="transition-transform duration-300 ease-in-out group-hover:scale-110 group-hover:animate-bounce">
                        <RiWhatsappFill className="text-[#2da922] text-6xl drop-shadow-lg  border-green-500 " />
                    </div>
                </a>
            </div>
        </div>
    );
};

export default Home;