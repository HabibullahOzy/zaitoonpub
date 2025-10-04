import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from "../../../../assets/zaitoonPublication.jpg";
import img1 from "../../../../assets/profile.png";
import { RiArrowLeftDoubleLine, RiLogoutCircleFill } from "react-icons/ri";
import { TiShoppingCart } from "react-icons/ti";
import "./Header.css";
import { Zaitooncontext } from "../../../../SecureContext/ContextAuth";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAdmin from "../../../../hooks/adminHooks/useAdmin";
import useSuperAdmin from "../../../../hooks/superAdmin/superAdmin";
import { Drawer, DrawerHeader, DrawerItems } from "flowbite-react";
import CartItem from "../../../FixedPages/CartItems/CartItem";
import TranslateLang from "../../LangTranslate/TranslateLang";

const Header = () => {
    const { logOut, user, prices, ident, localDeviceId } =
        useContext(Zaitooncontext);

    const queryClient = useQueryClient();
    const [isOpen, setIsOpen] = useState(false);

    const [isAdmin] = useAdmin(user?.email);
    const [isSuperAdmin] = useSuperAdmin(user?.email);

    const handlesignOut = () => {
        logOut()
            .then(() => {
                toast.error("Successfully LogOut");
                queryClient.clear();
            })
            .catch(() => { });
    };

    const { t, i18n } = useTranslation();
    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    //  search + filter states
    const [searchTerm, setSearchTerm] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [filteredData, setFilteredData] = useState([]);
    const [mobileOpen, setMobileOpen] = useState(false);

    //  fetch products
    const { data: allproducts = [] } = useQuery({
        queryKey: ["allproducts"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.REACT_APP_backendurl}/allProducts`
            );
            return res.json();
        },
    });

    //  search filter logic
    useEffect(() => {
        if (!allproducts.length) return;

        setIsFetching(true);
        const delay = setTimeout(() => {
            const lower = searchTerm.toLowerCase();

            const results = (allproducts || []).filter((item) => {
                const namebn = item.namebn?.toLowerCase() || "";
                const nameeng = item.nameeng?.toLowerCase() || "";
                const namearb = item.namearb?.toLowerCase() || "";
                const author = item.authorName?.toLowerCase() || "";
                const categoryText = item.category?.toLowerCase() || "";
                const productCode = item.ProductCode?.toLowerCase() || "";
                const language = item.language?.toLowerCase() || "";

                return (
                    namebn.includes(lower) ||
                    nameeng.includes(lower) ||
                    namearb.includes(lower) ||
                    author.includes(lower) ||
                    categoryText.includes(lower) ||
                    productCode.includes(lower) ||
                    language.includes(lower)
                );
            });

            setFilteredData(results);
            setIsFetching(false);
        }, 400);

        return () => clearTimeout(delay);
    }, [searchTerm, allproducts]);

    // sticky header
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const email = user?.email || localDeviceId();

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
            <div className="head-color lg:px-36">
                <div className="navbar">
                    <div className="navbar-start">
                        <Link to={"/"} className="btn btn-circle">
                            <img className="w-20 rounded-full" src={img} alt="" />
                        </Link>
                        <h1 className="colortext px-2 font-bold sm:block hidden text-2xl">
                            ZAIT<span className="text-yellow-500">OO</span>N PUBLICATION
                        </h1>






                        {/* search system */}

                        {/* Mobile / Small screen */}
                        <div className="flex lg:hidden px-5">
                            {/* Only icon when closed */}
                            {!mobileOpen && (
                                <button
                                    onClick={() => setMobileOpen(true)}
                                    className="p-2 rounded-full bg-green-100 text-green-600"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z" />
                                    </svg>
                                </button>
                            )}

                            {/* Expanded input when open */}
                            {mobileOpen && (
                                <div className="absolute top-36 left-0 right-0 bg-white border-2 border-green-300 rounded-xl p-2 shadow-md z-20">
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            placeholder="Search products by name, author, category..."
                                            className="flex-grow bg-transparent rounded-full border-none outline-none text-sm"
                                            value={searchTerm}
                                            autoFocus
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button onClick={() => setMobileOpen(false)} className="text-red-500 font-bold">✕</button>
                                    </div>

                                    {/* Dropdown */}
                                    {searchTerm.length > 0 && (
                                        <div className="mt-2 overflow-y-auto">
                                            {filteredData.length > 0 ? (
                                                filteredData.map((item) => (
                                                    <Link
                                                        key={item._id}
                                                        to={`/products/${item._id}`}
                                                        className="flex items-center gap-3 p-2 hover:bg-blue-50 rounded cursor-pointer"
                                                        onClick={() => {
                                                            setSearchTerm("");
                                                            setMobileOpen(false);
                                                        }}
                                                    >
                                                        <img src={item.image || "/placeholder.png"} alt={item.nameeng} className="w-10 h-10 object-cover rounded" />
                                                        <div className="flex flex-col">
                                                            <p className="font-medium text-gray-800 text-sm">{item.nameeng}</p>
                                                            <span className="text-green-600 font-bold text-xs">৳{item.productPrice || "N/A"}</span>
                                                        </div>
                                                    </Link>
                                                ))
                                            ) : (
                                                <p className="p-3 text-gray-500">No results found.</p>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* search system */}
                    {/* Desktop / Large screen */}
                    <div className="navbar-center hidden lg:flex relative w-[450px]">
                        <div className="flex items-center bg-white border-2 border-green-300 rounded-full px-3 py-2 shadow-sm overflow-hidden w-full relative">
                            <input
                                type="text"
                                placeholder="Search products by name, author, category..."
                                className="flex-grow bg-transparent border border-green-300 outline-none rounded-full placeholder-gray-600 text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />

                            {/* Search icon / loader */}
                            <div className="ml-2 text-green-500">
                                {isFetching ? (
                                    <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z" />
                                    </svg>
                                )}
                            </div>
                        </div>

                        {/* Dropdown */}
                        {searchTerm.length > 0 && (
                            <div className="absolute top-14 left-0 right-0 bg-white border border-t-0 shadow-md rounded-b-lg mt-1 max-h-72 overflow-y-auto z-10">
                                {filteredData.length > 0 ? (
                                    filteredData.map((item) => (
                                        <Link
                                            key={item._id}
                                            to={`/products/${item._id}`}
                                            className="flex items-center gap-3 p-3 hover:bg-blue-50 cursor-pointer transition-colors"
                                            onClick={() => setSearchTerm("")}
                                        >
                                            <img src={item.image || "/placeholder.png"} alt={item.nameeng} className="w-12 h-12 object-cover rounded" />
                                            <div className="flex flex-col">
                                                <p className="font-semibold text-gray-800 text-sm">{item.nameeng}</p>
                                                <p className="text-xs text-gray-500 truncate">{item.description?.slice(0, 50) || "No description"}.....</p>
                                                <span className="text-green-600 font-bold text-sm">৳{item.productPrice || "N/A"}</span>
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="p-4 text-gray-500">No results found.</p>
                                )}
                            </div>
                        )}
                    </div>



                    {/* Search System End */}

                    {/* right side (cart, profile, login) */}
                    <div className="navbar-end">
                        <div>
                            <Link to={"/filterproducts"} className="font-semibold text-white p-2 rounded-full hover:bg-green-200 mx-1">
                                Products
                            </Link>
                        </div>



                        {/* cart */}
                        <div className="flex space-x-5">
                            <div className="dropdown dropdown-end">
                                <button
                                    onClick={() => setIsOpen(true)}
                                    className="indicator btn btn-ghost btn-circle"
                                >
                                    <TiShoppingCart className="text-2xl w-10 text-white" />
                                    <span className="badge badge-sm bg-green-700 text-white indicator-item">
                                        {ident}
                                    </span>
                                </button>
                            </div>

                            {/* Profile */}
                            <div className="dropdown dropdown-end">
                                <div
                                    tabIndex={0}
                                    role="button"
                                    className="btn btn-ghost btn-circle avatar"
                                >
                                    <div className="w-7 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                        {user?.photoURL ? (
                                            <img alt="Profile Picture" src={user.photoURL} />
                                        ) : (
                                            <img alt="Profile" src={img1} />
                                        )}
                                    </div>
                                </div>
                                <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content mt-3 z-[1200] p-2 shadow rounded-box w-52 text-black"
                                    style={{ backgroundColor: "rgb(186, 239, 186)" }}
                                >
                                    {isAdmin && <li><Link to={"/dashboard"}>Dashboard</Link></li>}
                                    {isSuperAdmin && <li><Link to={"/dashboard"}>Dashboard</Link></li>}
                                    <li><Link to={`/myorder/${email}`}>My Order</Link></li>
                                    <li><Link to={`/wishList/${user?.email}`}>Wish List</Link></li>
                                    <li>
                                        <Link to={"/profile"} className="justify-between">
                                            Profile
                                            <span className="badge">New</span>
                                        </Link>
                                    </li>
                                    <li><a href="#">Settings</a></li>
                                    <div className="p-5">
                                        {user?.uid ? (
                                            <Link
                                                onClick={handlesignOut}
                                                className="font-semibold flex text-black"
                                            >
                                                <RiLogoutCircleFill className="text-green-700 text-xl" />
                                                Logout
                                            </Link>
                                        ) : (
                                            <Link to={"/signIn"} className="font-semibold text-black">
                                                👤Login
                                            </Link>
                                        )}
                                    </div>

                                    <li>
                                        {/* <TranslateLang /> */}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* cart drawer */}
                <Drawer
                    open={isOpen}
                    onClose={() => setIsOpen(false)}
                    position="right"
                    className="sm:w-5/12 lg:w-4/12 md:w-4/12"
                    style={{ backgroundColor: "rgb(186, 239, 186)" }}
                >
                    <DrawerHeader
                        titleIcon={RiArrowLeftDoubleLine}
                        title="Continue Shopping"
                    />
                    <DrawerItems>
                        <CartItem />
                    </DrawerItems>
                </Drawer>
            </div>
        </header>
    );
};

export default Header;
