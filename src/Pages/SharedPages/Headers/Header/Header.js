import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import img from "../../../../assets/zaitoonPublication.jpg"
import img1 from "../../../../assets/profile.png"
import { FaShoppingCart } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import imgbang from "../../../../assets/bangladesh.png";
import imgus from "../../../../assets/usa.png";
import imgarab from "../../../../assets/flag.png";
import "./Header.css"
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import toast from 'react-hot-toast';
import { reload } from 'firebase/auth';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { setLoader, logOut, user, prices, ident } = useContext(Zaitooncontext);
    console.log(user)


    const handlesignOut = () => {
        logOut()
            .then(() => {
                // console.log("User logout successfully")
                toast.error("Successfully LogOut")
                // setLoader(true)
                window.location.reload()
            })
            .catch(() => { })
    }




    const { t, i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };
    return (
        <div className=' head-color lg:px-36'>
            <div className="navbar">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li><Link to={'/'}>Home</Link></li>
                            <li>
                                <a>Parent</a>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </li>
                            <li><Link to={''}>About</Link></li>
                        </ul>
                    </div>
                    <Link to={'/'} className="btn btn-circle"><img className=' w-20 rounded-full' src={img} alt=''></img></Link>
                    <h1 className='colortext px-2 font-extrabold'>ZAIT<span className='text-yellow-300'>OO</span>N PUBLICATION</h1>
                </div>
                <div className="navbar-center hidden lg:flex">

                    <input className=' w-[500px] px-2 py-1 outline-offset-4 outline-sky-500 border border-none rounded-l-md' type='text' placeholder='Find your Products ......'></input>

                    <button className='p-2 px-4 bg-green-100 rounded-r-md'><BsSearch /></button>
                    {/* <ul className="menu menu-horizontal px-1">
                        <li><a>Item 1</a></li>
                        <li>
                            <details>
                                <summary>Parent</summary>
                                <ul className="p-2">
                                    <li><a>Submenu 1</a></li>
                                    <li><a>Submenu 2</a></li>
                                </ul>
                            </details>
                        </li>
                        <li><a>Item 3</a></li>
                    </ul> */}
                </div>
                <div className="navbar-end">

                    {/* search bar section */}

                    <div className='flex dropdown dropdown-end'>
                        <div tabIndex={2}>
                            <button className="btn btn-ghost btn-circle lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </button>
                        </div>
                        <ul tabIndex={2} className='dropdown-content'>
                            <li>
                                <div className="flex gap-5">
                                    <div className="form-control">
                                        <input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />
                                    </div>
                                </div>
                            </li>
                        </ul>
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

                    {/* cart section */}

                    <div className="flex space-x-5">
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                                <div className="indicator">
                                    <FaShoppingCart className='w-10' />
                                    <span className="badge badge-sm bg-green-700 text-white indicator-item">{ident}</span>
                                </div>
                            </div>
                            <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 shadow" style={{ backgroundColor: 'rgb(186, 239, 186)' }}>
                                <div className="card-body">
                                    <span className="font-bold text-white text-lg">{ident} Items</span>
                                    <span className="text-info">Subtotal: ৳ {prices}</span>
                                    <div className="card-actions">
                                        <Link to={'/cartItem'} className="btn btn-success btn-block">View cart</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Profile section */}

                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full bordered ring-primary ring-offset-base-100 rounded-full ring ring-offset-2">
                                    {
                                        user?.photoURL ? <img alt="Profile Picture" src={user.photoURL} /> : <img alt="Profile" src={img1} />
                                    }

                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52" style={{ backgroundColor: 'rgb(186, 239, 186)' }}>

                                <li><Link to={"/dashboard"}>DashBoard</Link></li>
                                <li><Link to={`/dashboard/myorder/${user?.email}`}>My Order</Link></li>
                                <li><Link to={'/dashboard'}>Wish List</Link></li>
                                <li>
                                    <Link to={'/profile'} className="justify-between">
                                        Profile
                                        <span className="badge">New</span>
                                    </Link>
                                </li>
                                <li><a href='#'>Settings</a></li>
                                {
                                    user?.uid ? <li><Link onClick={handlesignOut}>Logout</Link></li> : <li><Link to={"/signIn"}>Login</Link></li>
                                }


                            </ul>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Header;