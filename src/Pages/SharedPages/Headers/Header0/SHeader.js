import React, { useEffect, useState } from 'react';
import img1 from '../../../../assets/headerimg.png'
import './SHeader.css';

const SHeader = () => {

  //   const [scrolled, setScrolled] = useState(false);

  // const handleScroll = () => {
  //   const offset = window.scrollY;
  //   setScrolled(offset > 50);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);


    return (
        //  <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="container">
       <img src={img1} alt="Zaitoon Logo" className="h-[80px]" />
       
       
        {/* <h1>My Website</h1>
        <nav>
          <a href="#home">Home</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav> */}
      </div>
    // </header>
    );
};

export default SHeader;