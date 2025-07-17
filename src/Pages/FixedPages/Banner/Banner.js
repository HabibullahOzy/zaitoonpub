import { Carousel } from 'flowbite-react';
import { BannerCollapseButton } from "flowbite-react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from 'react';
import img2 from "../../../assets/Play.jpg";
import img3 from "../../../assets/Nursery.jpg";
import img4 from "../../../assets/KG.jpg";
import img1 from "../../../assets/booksirize.jpg";
import img5 from "../../../assets/sisuWB.jpg";
import { useQuery } from '@tanstack/react-query';
import './Banner.css';

const Banner = () => {


     const { data: sliderdata = [], refetch } = useQuery({
        queryKey: ['sliderdata'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/webmenu/slider`);
            return res.json();
        }
    });

    return (
        <div>
            {/* <Carousel slideInterval={4000} slide="loop">

                <img src={img1} alt="..." className=' h-full' />
                <img src={img2} alt="..." className=' h-full' />
                <img src={img3} alt="..." className=' h-full' />
                <img src={img4} alt="..." className=' h-full' />
                <img src={img5} alt="..." className=' h-full' />
                
            </Carousel> */}
            {
            sliderdata.length > 0 ? (
                <div className="w-full banner">
                <Carousel slideInterval={4000} slide="loop">
                    {sliderdata.map((item, i) => (
                        <div key={i} className="flex items-center justify-center bg-gray-200">
                            <img
                                src={item?.image || img1}
                                alt={`Slide ${i + 1}`}
                                className="w-full h-full object-cover banner-image"
                            />
                        </div>
                    ))}
                </Carousel>
                </div>
            ) : (
                <div className="flex items-center justify-center h-full bg-gray-200">
                    <p className="text-gray-500">No banners available</p>
                </div>
            )
          }
        </div>
    );
};

export default Banner;
