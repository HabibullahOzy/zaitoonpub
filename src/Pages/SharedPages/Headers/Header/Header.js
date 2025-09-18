import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import img from "../../../../assets/zaitoonPublication.jpg"
import img1 from "../../../../assets/profile.png"
import { RiArrowLeftDoubleLine } from 'react-icons/ri';
import { BsSearch } from 'react-icons/bs';
import { TiShoppingCart } from 'react-icons/ti';
import { RiLogoutCircleFill } from 'react-icons/ri';
// import imgbang from "../../../../assets/bangladesh.png";
// import imgus from "../../../../assets/usa.png";
// import imgarab from "../../../../assets/flag.png";
import "./Header.css"
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import toast from 'react-hot-toast';
// import { reload } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import useAdmin from '../../../../hooks/adminHooks/useAdmin';
import useSuperAdmin from '../../../../hooks/superAdmin/superAdmin';
import { Drawer, DrawerHeader, DrawerItems } from 'flowbite-react';
import CartItem from '../../../FixedPages/CartItems/CartItem';



function debounce(func, wait) {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}


const fetchResults = async ({ queryKey }) => {
    const [_key, { searchTerm, category }] = queryKey;
    const { data } = await axios.get(`${process.env.REACT_APP_backendurl}/api/products`, {
        params: { search: searchTerm, category }
    });
    return data;
};




const Header = () => {
    const { setLoader, logOut, user, prices, ident, localDeviceId } = useContext(Zaitooncontext);
    // console.log(user)

    const [isOpen, setIsOpen] = useState(false);

    const queryClient = useQueryClient();


    const [isAdmin] = useAdmin(user?.email);
    const [isSuperAdmin] = useSuperAdmin(user?.email);


    const handlesignOut = () => {
        logOut()
            .then(() => {
                // console.log("User logout successfully")
                toast.error("Successfully LogOut")
                // setLoader(true)
                // window.location.reload()

                queryClient.clear();
            })
            .catch(() => { })
    }




    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };


    // searching functionality

    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [category, setCategory] = useState("");

    const debouncedSetSearch = useMemo(
        () => debounce((value) => setDebouncedSearch(value), 400),
        []
    );

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        debouncedSetSearch(value);
    };

    const { data, isFetching } = useQuery({
        queryKey: ["search", { searchTerm: debouncedSearch, category }],
        queryFn: fetchResults,
        enabled: debouncedSearch.length > 0 || category.length > 0,
    });





    const email = user?.email || localDeviceId()

    // console.log(email)
    // const { data: cartItems = [] } = useQuery({
    //     queryKey: ['cartItems'],
    //     queryFn: async () => {
    //         const res = await fetch(`${process.env.REACT_APP_backendurl}/cashOnpurc/${email}`);
    //         return await res.json();
    //     },
    // });




     const [scrolled, setScrolled] = useState(false);
    
      const handleScroll = () => {
        const offset = window.scrollY;
        setScrolled(offset > 50);
      };
    
      useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
      }, []);

    return (
        <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className=' head-color lg:px-36'>
            <div className="navbar">
                <div className="navbar-start">
                    <Link to={'/'} className="btn btn-circle"><img className=' w-20 rounded-full' src={img} alt=''></img></Link>
                    <h1 className='colortext px-2 font-bold sm:block hidden text-2xl'>ZAIT<span className='text-yellow-500'>OO</span>N PUBLICATION</h1>
                </div>




                {/* searching system */}

                <div className="navbar-center hidden lg:flex">

                    <div className="flex items-center bg-white border-2 border-green-300 rounded-full px-2 py-2 shadow-sm overflow-hidden">

                        {/* Category Tabs */}
                        <div className="flex items-center space-x-1 ml-2">
                            <button
                                onClick={() => setCategory('books')}
                                className={`px-4 py-1 rounded-full text-sm font-medium transition ${category === 'books'
                                    ? 'bg-green-400 text-white'
                                    : 'bg-transparent text-gray-600 hover:bg-blue-100'
                                    }`}
                            >
                                Books
                            </button>
                            <button
                                onClick={() => setCategory('superstore')}
                                className={`px-4 py-1 rounded-full text-sm font-medium transition ${category === 'superstore'
                                    ? 'bg-green-400 text-white'
                                    : 'bg-transparent text-gray-600 hover:bg-blue-100'
                                    }`}
                            >
                                Superstore
                            </button>
                        </div>

                        {/* Input field */}
                        <input
                            type="text"
                            placeholder="Search by Category, name, etc..."
                            className="flex-grow ml-4 bg-transparent outline-none rounded-full placeholder-gray-400 text-sm"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />

                        {/* Search icon */}
                        <div className="mr-2 text-blue-500">
                            {isFetching ? (
                                <svg
                                    className="w-5 h-5 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
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
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Results */}
                    {/* {debouncedSearch.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border border-t-0 shadow-md rounded-b-lg mt-1 max-h-64 overflow-y-auto z-10">
          {data?.length > 0 ? (
            data.map((item) => (
              <div
                key={item._id}
                className="p-3 hover:bg-blue-50 cursor-pointer transition-colors"
              >
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500">No results found.</p>
          )}
        </div>
      )} */}
                </div>




                <div className="navbar-end">

                    {/* search bar section */}

                    <div className='flex dropdown'>
                        <div tabIndex={2} role="button" >
                            <button className="btn btn-ghost btn-circle lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                        {/* <div tabIndex={2}>
                            <button className="btn btn-ghost btn-circle lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div> */}
                        {/* <div tabIndex={0} className="mt-20 z-[1200] card card-compact dropdown-content shadow" style={{ backgroundColor: 'rgb(186, 239, 186)' }}>
                            <div className="card-body">
                                <div className="flex items-center bg-white border-2 border-green-300 rounded-full px-2 py-2 shadow-sm overflow-hidden"> */}

                                    {/* Category Tabs */}
                                    {/* <div className="flex items-center space-x-1 ml-2">
                                        <button
                                            onClick={() => setCategory('books')}
                                            className={`px-4 py-1 rounded-full text-sm font-medium transition ${category === 'books'
                                                ? 'bg-green-400 text-white'
                                                : 'bg-transparent text-gray-600 hover:bg-blue-100'
                                                }`}
                                        >
                                            Books
                                        </button>
                                        <button
                                            onClick={() => setCategory('superstore')}
                                            className={`px-4 py-1 rounded-full text-sm font-medium transition ${category === 'superstore'
                                                ? 'bg-green-400 text-white'
                                                : 'bg-transparent text-gray-600 hover:bg-blue-100'
                                                }`}
                                        >
                                            Superstore
                                        </button>
                                    </div> */}

                                    {/* Input field */}
                                    {/* <input
                                        type="text"
                                        placeholder="Search by Category, name, etc..."
                                        className="flex-grow ml-4 bg-transparent outline-none rounded-full placeholder-gray-400 text-sm"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    /> */}

                                    {/* Search icon */}
                                    {/* <div className="mr-2 text-blue-500">
                                        {isFetching ? (
                                            <svg
                                                className="w-5 h-5 animate-spin"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                            >
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
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
                                                />
                                            </svg>
                                        )}
                                    </div> */}
                                {/* </div>
                            </div>
                        </div> */}
                    </div>
                    {/* language */}


                    {/* <label>{t("language")}: </label>
                    <select onChange={(e) => changeLanguage(e.target.value)} defaultValue={i18n.language}>
                        <option value="en">English</option>
                        <option value="bn">বাংলা</option>
                        <option value="ar">العربية</option>
                    </select> */}

                    {/* <div className="dropdown dropdown-end">
                        <div tabIndex={1} role="button" className="flex"><img src={imgus} className='w-5 '/> English</div>
                        <ul tabIndex={1} className="dropdown-content z-[1] w-28 p-2 shadow-sm mt-4 rounded" style={{ backgroundColor: 'rgb(186, 239, 186)' }}>
                            <li ><button className='flex'><img src={imgbang} alt='' className='w-5'/>Bangla</button></li>
                            <li ><button className='flex'><img src={imgarab} alt='' className='w-5'/>Arabic</button></li>
                        </ul>
                    </div> */}



                    <div className='p-5'>
                        {
                            user?.uid ? <Link onClick={handlesignOut} className='font-semibold flex text-white'><RiLogoutCircleFill className='text-green-700 text-xl' />Logout</Link> : <Link to={"/signIn"} className='font-semibold text-white'>👤Login</Link>
                        }
                    </div>


                    {/* cart section */}

                    <div className="flex space-x-5">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" >
                                <button onClick={() => setIsOpen(true)} className="indicator btn btn-ghost btn-circle">
                                    <TiShoppingCart className='text-2xl w-10 text-white' />
                                    <span className="badge badge-sm bg-green-700 text-white indicator-item">{ident}</span>
                                </button>
                            </div>
                            {/* <div tabIndex={0} className="mt-3 z-[1200] card card-compact dropdown-content w-52 shadow" style={{ backgroundColor: 'rgb(186, 239, 186)' }}>
                                <div className="card-body">
                                    <span className="font-bold text-white text-lg">{ident} Items</span>
                                    <span className="text-info">Subtotal: ৳ {prices}</span>
                                    <div className="card-actions">
                                        <Link to={'/cartItem'} className="btn btn-success btn-block">View cart</Link>
                                    </div>
                                </div>
                            </div> */}
                        </div>

                        {/* Profile section */}

                        <div className="dropdown dropdown-end">


                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-7 rounded-full bordered ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
                                    {
                                        user?.photoURL ? <img alt="Profile Picture" src={user.photoURL} /> : <img alt="Profile" src={img1} />
                                    }
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1200] p-2 shadow rounded-box w-52 text-black" style={{ backgroundColor: 'rgb(186, 239, 186)' }}>
                                {
                                    isAdmin && <li><Link to={"/dashboard"}>DashBoard</Link></li>

                                }
                                {
                                    isSuperAdmin && <li><Link to={"/dashboard"}>DashBoard</Link></li>
                                }

                                <li><Link to={`/myorder/${email}`}>My Order</Link></li>
                                <li><Link to={`/wishList/${user?.email}`}>Wish List</Link></li>
                                <li>
                                    <Link to={'/profile'} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a href='#'>Settings</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            </div>

            {/* cart drawar  */}

            <Drawer open={isOpen} onClose={() => setIsOpen(false)} position="right" className='sm:w-5/12 lg:w-4/12 md:w-4/12' style={{ backgroundColor: 'rgb(186, 239, 186)' }}>
                <DrawerHeader titleIcon={RiArrowLeftDoubleLine} title="Continue Shopping" />
                <DrawerItems >
                    <CartItem
                    // cartItems={cartItems}
                    ></CartItem>
                </DrawerItems>
            </Drawer>
        </div >

        </header>
    );
};

export default Header;