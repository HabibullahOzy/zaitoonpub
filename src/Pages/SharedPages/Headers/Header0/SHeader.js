import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import img1 from "../../../../assets/headerimg.png";
import "./SHeader.css";
import { IoIosHeartEmpty } from "react-icons/io";
import { Zaitooncontext } from "../../../../SecureContext/ContextAuth";

const SHeader = () => {
  const { user, identWish } = useContext(Zaitooncontext)
  // const [mobileSubOpen, setMobileSubOpen] = useState(false);
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

    const categories = Array.isArray(allcategory) ? allcategory : [];
    console.log(categories)

    return categories?.flatMap((category) => {
      if (!category?.subcategories) return [];

      const subs = category.subcategories
        .split(",")
        .map(s => s.trim())
        .filter(s => s !== "" && s !== "stationery");

      return subs.map((sub, i) => (
        <li key={`${category._id}-${i}`}>
          <Link
            to={`/subcategoryproducts/${sub}`}
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
      <div className="shadow-1 shadow-lime-600">
        <div className="" style={{ background: `linear-gradient(to left, rgb(25, 79, 25), rgb(168, 255, 168))` }}>
          <div className="w-10/12 mx-auto px-4 flex items-center justify-between">

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
                  <li className=""><Link to="/">হোম</Link></li>
                  <li><Link to="/filterproducts">বই</Link></li>

                  {/* MOBILE SUBMENU */}
                  {/* <li className="relative">
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
                  </li> */}

                  <li className="relative group">

                    {/* MENU BUTTON */}
                    <Link to={'/subcategoryproducts'} className="flex items-center gap-1 cursor-pointer pb-1 hover:text-green-600 transition-colors">
                      শ্রেণি ভিত্তিক বই
                      <span className=" transition-transform group-hover:rotate-180">
                        ▼
                      </span>
                    </Link>

                    {/* DROPDOWN */}
                    <div
                      className="absolute left-0 top-full mt-2 w-[260px] bg-white border border-gray-200 shadow-xl rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 ease-out z-50"
                    >
                      <ul className="grid grid-cols-1 gap-x-2 gap-y-1 p-3 text-[14px] text-gray-700">
                        {renderSubcategories()}
                      </ul>
                    </div>

                  </li>

                  <li><Link to="/stationary">ষ্টেশনারী</Link></li>
                  <li><Link to="/institutionalorder">প্রাতিষ্ঠানিক অর্ডার</Link></li>
                </ul>
              </div>
            </div>

            {/* DESKTOP MENU */}

            {/* DESKTOP MENU */}
            <nav className="hidden lg:flex justify-between items-center w-full">

              {/* LEFT MENU */}
              <ul className="flex items-center gap-6 text-black text-[17px]">

                {/* HOME */}
                <li>
                  <NavLink to="/" end>
                    {({ isActive }) => (
                      <span className="relative pb-1 cursor-pointer hover:text-green-600">
                        হোম
                        {isActive && (
                          <span className="absolute left-0 -bottom-[3px] w-full h-[3px] bg-green-600"></span>
                        )}
                      </span>
                    )}
                  </NavLink>
                </li>

                {/* BOOK */}
                <li>
                  <NavLink to="/filterproducts">
                    {({ isActive }) => (
                      <span className="relative pb-1 cursor-pointer hover:text-green-600">
                        বই
                        {isActive && (
                          <span className="absolute left-0 -bottom-[3px] w-full h-[3px] bg-green-600"></span>
                        )}
                      </span>
                    )}
                  </NavLink>
                </li>

                {/* <li className="relative" ref={menuRef}>
                  <span
                    onClick={() => setOpen(!open)}
                    className="cursor-pointer hover:text-green-600 select-none linkbehave"
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
                </li> */}




                {/* DESKTOP DROPDOWN */}
                <li className="relative group">

                  {/* MENU BUTTON */}
                  <Link to={'/subcategoryproducts'} className="flex items-center gap-1 cursor-pointer pb-1 hover:text-green-600 transition-colors">
                    শ্রেণি ভিত্তিক বই
                    <span className=" transition-transform group-hover:rotate-180">
                      ▼
                    </span>
                  </Link>

                  {/* DROPDOWN */}
                  <div
                    className="absolute left-0 top-full mt-2 w-[460px] bg-white border border-gray-200 shadow-xl rounded-md opacity-0 invisible group-hover:visible group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 ease-out z-50"
                  >
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-2 p-4 text-[14px] text-gray-700">
                      {renderSubcategories()}
                    </ul>
                  </div>

                </li>

                {/* STATIONARY */}
                <li>
                  <NavLink to="/stationary">
                    {({ isActive }) => (
                      <span className="relative pb-1 cursor-pointer hover:text-green-600">
                        স্টেশনারী
                        {isActive && (
                          <span className="absolute left-0 -bottom-[3px] w-full h-[3px] bg-green-600"></span>
                        )}
                      </span>
                    )}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/institutionalorder">
                    {({ isActive }) => (
                      <span className="relative pb-1 cursor-pointer hover:text-green-600">
                        প্রাতিষ্ঠানিক অর্ডার
                        {isActive && (
                          <span className="absolute left-0 -bottom-[3px] w-full h-[3px] bg-green-600"></span>
                        )}
                      </span>
                    )}
                  </NavLink>
                </li>

              </ul>

              {/* RIGHT MENU */}
              <ul className="flex items-center gap-6">

                <li>
                  <button className="indicator btn btn-ghost btn-circle">
                    <Link to={`/wishList/${user?.email}`}>
                      <IoIosHeartEmpty className="text-2xl text-white" />
                    </Link>
                    <span className="badge badge-sm bg-green-700 text-white indicator-item">
                      {identWish || 0}
                    </span>
                  </button>
                </li>

                <li>
                  <Link to="/ordertrack" className="hover:text-green-600">
                    অর্ডার ট্র্যাক করুন
                  </Link>
                </li>

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
