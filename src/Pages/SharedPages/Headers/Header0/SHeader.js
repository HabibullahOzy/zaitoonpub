import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import img1 from "../../../../assets/headerimg.png";
import "./SHeader.css";

const SHeader = () => {
  const [mobileSubOpen, setMobileSubOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  const { data: allcategory = [], isLoading } = useQuery({
    queryKey: ["allcategory"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/category`);
      return res.json();
    },
  });

  const renderSubcategories = () => {
    if (isLoading) {
      return <li className="text-center py-2">Loading...</li>;
    }

    return allcategory.flatMap((category) => {
      const subs = category?.subcategories?.split(",").map((s) => s.trim());
      return subs?.map((sub, i) => (
        <li key={`${category._id}-${i}`}>
          <Link
            to={`/filterproducts?category=${encodeURIComponent(sub)}`}
            className="block px-3 py-2 rounded hover:bg-green-100"
          >
            {sub}
          </Link>
        </li>
      ));
    });
  };



  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <header className="w-full">
      {/* NAVBAR */}
      <div className="shadow-sm shadow-lime-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">

            {/* MOBILE MENU */}
            <div className="lg:hidden">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost text-2xl">
                  ☰
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-50 p-2 shadow bg-white rounded-box w-56 relative text-black"
                >
                  <li><Link to="/">হোম</Link></li>
                  <li><Link to="/filterproducts">বই</Link></li>

                  {/* MOBILE SUBMENU */}
                  <li className="relative">
                    <button
                      onClick={() => setMobileSubOpen(!mobileSubOpen)}
                      className="flex justify-between w-full"
                    >
                      শ্রেণি ভিত্তিক বই
                      <span>›</span>
                    </button>

                    <ul
                      className={`absolute top-2 top-full bg-green-200 shadow-lg rounded-box p-2 transition-all duration-300 z-20 text-black
                      ${mobileSubOpen
                          ? "opacity-100 translate-x-0"
                          : "opacity-0 translate-x-4 pointer-events-none"}`}
                    >
                      {renderSubcategories()}
                    </ul>
                  </li>

                  <li><Link to="/">ষ্টেশনারী</Link></li>
                </ul>
              </div>
            </div>

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex text-center">
              <ul className="menu menu-horizontal gap-2 text-black">
                <li><Link to="/" className="hover:text-green-600">হোম</Link></li>

                <li>
                  <Link to="/filterproducts" className="rounded-full hover:bg-green-200">
                    বই
                  </Link>
                </li>


                {/* DESKTOP DROPDOWN */}
                <li className="relative" ref={menuRef}>
                  <span
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer hover:text-green-600 select-none "
                  >
                    শ্রেণি ভিত্তিক বই <span className={`transition ${open ? "rotate-180" : ""}`}>▼</span>
                  </span>

                  {open && (
                    <ul
                      className="absolute top-full left-0 mt-2 w-60 bg-white shadow-lg rounded-box p-2
      transition-all duration-200 z-50"
                    >
                      {renderSubcategories()}
                    </ul>
                  )}
                </li>


                {/* DESKTOP DROPDOWN
                <li className="relative group">
                  <span className="cursor-pointer hover:text-green-600">
                    শ্রেণি ভিত্তিক বই
                  </span>

                  <ul className="absolute top-full left-0 mt-2 w-60 bg-white shadow-lg rounded-box p-2
                    opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                    transition-all duration-300 z-50">
                    {renderSubcategories()}
                  </ul>
                </li> */}

                <li><Link to="/" className="hover:text-green-600">ষ্টেশনারী</Link></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* LOGO */}
      <div className="flex justify-center py-4">
        <img src={img1} alt="Logo" className="h-16 md:h-20 object-contain" />
      </div>
    </header>
  );
};

export default SHeader;
