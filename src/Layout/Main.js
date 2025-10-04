import React from 'react';
import Header from '../Pages/SharedPages/Headers/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../Pages/SharedPages/Footer/Footer';
import SHeader from '../Pages/SharedPages/Headers/Header0/SHeader';
import { useQuery } from '@tanstack/react-query';
import "../App.css";

const Main = () => {
  const { data: marqdata = [], refetch } = useQuery({
    queryKey: ['marqdata'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/webmenu/marq`);
      return res.json();
    }
  });
  return (
    <div>
      <div className="overflow-hidden py-2 relative group w-[90%] mx-auto">
        <div className="flex gap-8 items-center whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused]">
          {Array.isArray(marqdata) && marqdata?.map((item, i) => (
            <div key={i} className="flex items-center gap-4 text-black text-md">
              <span>{item?.marqtext}</span>
              {item?.link === "" ? "," : <a
                href={item.link}
                className="bg-green-300 text-white px-2 rounded rounded-full hover:bg-green-500 transition duration-100"
                target="_blank"
                rel=""
              >
                Details
              </a>}
            </div>
          ))}
        </div>
      </div>
      <div>
        <Header></Header>
        <SHeader></SHeader>
      </div>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Main;