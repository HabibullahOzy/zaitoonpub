import React, { useContext, useEffect, useState } from 'react';
// import { FaShoppingCart } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import img from "../../../../assets/zaitoonPublication.jpg"
import useAdmin from '../../../../hooks/adminHooks/useAdmin';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import useSuperAdmin from '../../../../hooks/superAdmin/superAdmin';
import { ImMenu2 } from 'react-icons/im';
import { LiaFirstOrder } from "react-icons/lia";
import './DHeader.css';

import {
    Button,
    Drawer,
    DrawerHeader,
    DrawerItems,
    Sidebar,
    SidebarCollapse,
    SidebarItem,
    SidebarItemGroup,
    SidebarItems,
    TextInput,
} from "flowbite-react";
import {
    HiChartPie,
    HiClipboard,
    HiCollection,
    HiInformationCircle,
    HiOutlineMinusSm,
    HiOutlinePlusSm,
    HiSearch,
    HiShoppingBag,
    HiUsers,
} from "react-icons/hi";
import {
    MdRateReview
} from "react-icons/md"
import { AiFillProduct } from 'react-icons/ai';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { SiSetapp } from 'react-icons/si';
import { Link } from 'react-router-dom';

import { twMerge } from 'tailwind-merge';









const DHeader = () => {
    const { user } = useContext(Zaitooncontext);

    const [isAdmin] = useAdmin(user?.email);

    const [isSuperAdmin] = useSuperAdmin(user?.email);


    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => setIsOpen(false);



    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const bangladeshTime = new Date().toLocaleString('en-US', {
                timeZone: 'Asia/Dhaka',
                hour: '2-digit',
                minute: '2-digit',
                // second: '2-digit',
                hour12: true,
            });
            setTime(bangladeshTime);
        };

        updateTime(); // initial call
        const interval = setInterval(updateTime, 1000); // update every second

        return () => clearInterval(interval); // cleanup on unmount
    }, []);
    return (
        <div className=''>


            {/* // <div className="navbar w-11/12 m-auto text-black">
        //     <div className="navbar-start">
        //         <div className="dropdown">
        //             <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        //             </div>
        //             <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        //                 {
        //                     isAdmin && <>
        //                         <li><Link to={'/dashboard/addProducts'}>Add Products</Link></li>
        //                         <li><Link to={'/dashboard/allusers'}>All Users</Link></li>
        //                         <li><Link to={'/dashboard/allProducts'}>All Products</Link></li>
        //                         <li>
        //                             <a>Placed Order Summery</a>
        //                             <ul className="p-2" style={{ backgroundColor: "rgb(186, 239, 186)" }}>
        //                                 <li><Link to={'/dashboard/cashonplaced'}>CashOn Order</Link></li>
        //                                 <li><Link to={''}>Paid Order</Link></li>
        //                             </ul>
        //                         </li>
        //                     </>
        //                 }

        //                 <li>
        //                     <a>Parent</a>
        //                 </li>
        //                 <li><Link to={''}>About</Link></li>
        //             </ul>
        //         </div>
        //         <Link to={'/'} className="btn btn-circle"><img className=' w-20 rounded-full' src={img} alt=''></img></Link>
        //         <h1 className='colortext px-2 font-extrabold logowrihidden'>ZAIT<span className='text-yellow-300'>OO</span>N PUBLICATION</h1>
        //     </div>
        //     <div className="navbar-center hidden lg:flex">

        //         <ul className="menu menu-horizontal px-1">
        //             {
        //                 isAdmin && <>
        //                     <li><Link className='' to={'/dashboard/addProducts'}>Add Products</Link></li>
        //                     <li><Link to={'/dashboard/allProducts'}>All Products</Link></li>
        //                     <li>
        //                         <details>
        //                             <summary>Placed Order Summery</summary>
        //                             <ul className="p-2 z-[1]" style={{ backgroundColor: "rgb(186, 239, 186)" }}>
        //                                 <li><Link to={'/dashboard/cashonplaced'}>CashOn Order List</Link></li>
        //                                 <li><Link to={''}>Paid Order List</Link></li>
        //                                 <li><Link to={'/dashboard/pendingOrder'}>Pending Order List</Link></li>
        //                             </ul>
        //                         </details>
        //                     </li>
        //                 </>
        //             }
        //             {
        //                 isSuperAdmin && <>
        //                     <li><Link to={'/dashboard/allusers'}>All Users</Link></li>
        //                     <li><Link className='' to={'/dashboard/addProducts'}>Add Products</Link></li>
        //                     <li><Link to={'/dashboard/allProducts'}>All Products</Link></li>
        //                     <li>
        //                         <details>
        //                             <summary>Placed Order Summery</summary>
        //                             <ul className="p-2 z-[1]" style={{ backgroundColor: "rgb(186, 239, 186)" }}>
        //                                 <li><Link to={'/dashboard/cashonplaced'}>CashOn Order List</Link></li>
        //                                 <li><Link to={''}>Paid Order List</Link></li>
        //                                 <li><Link to={'/dashboard/pendingOrder'}>Pending Order List</Link></li>
        //                             </ul>
        //                         </details>
        //                     </li>
        //                 </>
        //             }

        //         </ul>
        //     </div>
        //     <div className="navbar-end">


        //         <p className='text-blue-600 font-bold'>{new Date().toLocaleString("en-US", {
        //             timeZone: "Asia/Dhaka",
        //             year: "numeric",
        //             month: "2-digit",
        //             day: "2-digit",

        //         })}, {` 🕒 ${time}`}</p>

        //     </div>
        // </div> */}

            <div className="flex min-h-10  justify-center">
                <button className='btn btn-success mt-10' onClick={() => setIsOpen(true)}><ImMenu2 className='w-10' /></button>
            </div>
            <Drawer backdrop={false} open={isOpen} onClose={handleClose} style={{ backgroundColor: "rgb(179, 255, 179)" }}>
                <DrawerHeader title="" titleIcon={() => <><Link to={'/'} className="btn btn-circle"><img className=' w-20 rounded-full' src={img} alt=''></img></Link>
                    <h1 className='colortext px-2 font-extrabold logowrihidden'>ZAIT<span className='text-yellow-300'>OO</span>N PUBLICATION</h1></>} />
                <DrawerItems>
                    <Sidebar
                        aria-label="Sidebar with multi-level dropdown example"
                        className="[&>div]:bg-transparent [&>div]:p-0"
                    >
                        <div className="flex h-full flex-col justify-between py-2">
                            <div>
                                <form className="pb-3 md:hidden">
                                    <TextInput icon={HiSearch} type="search" placeholder="Search" required size={32} />
                                </form>
                                <SidebarItems>
                                    <SidebarItemGroup>
                                        <Link to={'/dashboard'} className='flex items-center gap-2'><SidebarItem icon={HiChartPie}>Dashboard</SidebarItem></Link>
                                        {
                                            isAdmin && <>


                                                <SidebarCollapse icon={HiShoppingBag} label="Orders">
                                                    <Link to={'/dashboard/pendingOrder'}><SidebarItem>Pending Orders</SidebarItem></Link>
                                                    {/* <Link to={'/dashboard/cashonplaced'}><SidebarItem>COD Orders</SidebarItem></Link> */}
                                                    {/* <Link to={'/dashboard/paidorderplaced'}><SidebarItem href="#">Paid Orders</SidebarItem></Link> */}
                                                    <Link to={'/dashboard/confirmOrderlist'}><SidebarItem >Confirm Orders</SidebarItem></Link>
                                                    <Link to={'/dashboard/completelist'}><SidebarItem >Complete Orders</SidebarItem></Link>
                                                    <Link to={'/dashboard/cancelOrderlist'}><SidebarItem className='text-red-400'>Cancelled Orders</SidebarItem></Link>
                                                </SidebarCollapse>

                                                <SidebarCollapse
                                                    icon={AiFillProduct}
                                                    label="Products"
                                                    renderChevronIcon={(theme, open) => {
                                                        const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                                        return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? "on" : "off"])} />;
                                                    }}
                                                >
                                                    <Link className='' to={'/dashboard/addProducts'}><SidebarItem >Add Products</SidebarItem></Link>
                                                    <Link to={'/dashboard/allProducts'}><SidebarItem>All Products</SidebarItem></Link>
                                                    {/* <SidebarItem href="#">Refunds</SidebarItem>
                                            <SidebarItem href="#">Shipping</SidebarItem> */}
                                                </SidebarCollapse>


                                                <SidebarCollapse icon={SiSetapp} label="Setup menu">
                                                    <Link to={'/dashboard/categoryset'}><SidebarItem >
                                                        Category Setup
                                                    </SidebarItem></Link>
                                                </SidebarCollapse>

                                                <SidebarCollapse icon={BsFillMenuButtonWideFill} label="Web menu">
                                                    <Link to={'/dashboard/sliderimage'}>
                                                        <SidebarItem icon={BsFillMenuButtonWideFill}>
                                                            Slider Setup
                                                        </SidebarItem>
                                                    </Link>


                                                    <Link to={'/dashboard/marqsetup'}>
                                                        <SidebarItem icon={BsFillMenuButtonWideFill}>
                                                            Marq Setup
                                                        </SidebarItem>
                                                    </Link>
                                                </SidebarCollapse>


                                            </>
                                        }

                                        {
                                            isSuperAdmin &&
                                            <>

                                                <Link to={'/dashboard/allusers'}>
                                                    <SidebarItem icon={HiUsers}>Users list</SidebarItem>
                                                </Link>



                                                <SidebarCollapse icon={HiShoppingBag} label="Orders">
                                                    <Link to={'/dashboard/superadmin/pendingOrder'}><SidebarItem>Pending Orders</SidebarItem></Link>
                                                    {/* <Link to={'/dashboard/cashonplaced'}><SidebarItem>COD Orders</SidebarItem></Link> */}
                                                    {/* <Link to={'/dashboard/paidorderplaced'}><SidebarItem href="#">Paid Orders</SidebarItem></Link> */}
                                                    <Link to={'/dashboard/superadmin/confirmOrderlist'}><SidebarItem >Confirmed Orders</SidebarItem></Link>
                                                    <Link to={'/dashboard/superadmin/completelist'}><SidebarItem >Completed Orders</SidebarItem></Link>
                                                    <Link to={'/dashboard/superadmin/cancelOrderlist'}><SidebarItem className='text-red-400'>Cancelled Orders</SidebarItem></Link>
                                                </SidebarCollapse>

                                                <SidebarCollapse
                                                    icon={AiFillProduct}
                                                    label="Products"
                                                    renderChevronIcon={(theme, open) => {
                                                        const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;

                                                        return <IconComponent aria-hidden className={twMerge(theme.label.icon.open[open ? "on" : "off"])} />;
                                                    }}
                                                >
                                                    <Link className='' to={'/dashboard/superadmin/addProducts'}><SidebarItem >Add Products</SidebarItem></Link>
                                                    <Link to={'/dashboard/superadmin/allProducts'}><SidebarItem>All Products</SidebarItem></Link>
                                                    {/* <SidebarItem href="#">Refunds</SidebarItem>
                                            <SidebarItem href="#">Shipping</SidebarItem> */}
                                                </SidebarCollapse>



                                                <SidebarCollapse icon={SiSetapp} label="Setup menu">

                                                    <Link to={'/dashboard/superadmim/categoryset'}>
                                                        <SidebarItem >
                                                            Category Setup
                                                        </SidebarItem>
                                                    </Link>

                                                </SidebarCollapse>

                                                <SidebarCollapse icon={BsFillMenuButtonWideFill} label="Web menu">
                                                    <Link to={'/dashboard/superadmin/sliderimage'}>
                                                        <SidebarItem icon={BsFillMenuButtonWideFill}>
                                                            Slider Setup
                                                        </SidebarItem>
                                                    </Link>


                                                    <Link to={'/dashboard/marqsetup'}>
                                                        <SidebarItem icon={BsFillMenuButtonWideFill}>
                                                            Marq Setup
                                                        </SidebarItem>
                                                    </Link>

                                                </SidebarCollapse>
                                            </>
                                        }

                                    </SidebarItemGroup>



                                    <SidebarItemGroup>
                                        {
                                            isAdmin &&
                                            <>

                                                <SidebarCollapse icon={LiaFirstOrder} label="Oreders Report">
                                                    <Link to={'/dashboard/orderreport'}><SidebarItem >
                                                        Orders Report
                                                    </SidebarItem></Link>
                                                </SidebarCollapse>


                                                <SidebarCollapse icon={SiSetapp} label="Setup menu List">
                                                    <Link to={'/dashboard/allcategory'}><SidebarItem >
                                                        All Category
                                                    </SidebarItem></Link>
                                                </SidebarCollapse>



                                                <SidebarCollapse icon={BsFillMenuButtonWideFill} label="Web menu List">
                                                    <Link to={'/dashboard/smwebmenulist'}>
                                                        <SidebarItem icon={BsFillMenuButtonWideFill}>
                                                            Web menu List
                                                        </SidebarItem>
                                                    </Link>

                                                </SidebarCollapse>



                                                <SidebarCollapse icon={MdRateReview} label="Review List">
                                                    <Link to={'/dashboard/reviewlist'}>
                                                        <SidebarItem icon={MdRateReview}>
                                                            All Review
                                                        </SidebarItem>
                                                    </Link>
                                                </SidebarCollapse>
                                            </>
                                        }



                                        {
                                            isSuperAdmin &&
                                            <>

                                                <SidebarCollapse icon={LiaFirstOrder} label="Orders Report">
                                                    <Link to={'/dashboard/superadmin/orderreport'}><SidebarItem >
                                                        Orders Report
                                                    </SidebarItem></Link>
                                                </SidebarCollapse>


                                                <SidebarCollapse icon={SiSetapp} label="Setup menu List">
                                                    <Link to={'/dashboard/superadmin/allcategory'}><SidebarItem >
                                                        All Category
                                                    </SidebarItem></Link>
                                                </SidebarCollapse>



                                                <SidebarCollapse icon={BsFillMenuButtonWideFill} label="Web menu List">
                                                    <Link to={'/dashboard/superadmin/smwebmenulist'}>
                                                        <SidebarItem icon={BsFillMenuButtonWideFill}>
                                                            Web menu List
                                                        </SidebarItem>
                                                    </Link>
                                                </SidebarCollapse>



                                                <SidebarCollapse icon={MdRateReview} label="Review List">
                                                    <Link to={'/dashboard/superadmin/reviewlist'}>
                                                        <SidebarItem icon={BsFillMenuButtonWideFill}>
                                                            All Review
                                                        </SidebarItem>
                                                    </Link>
                                                </SidebarCollapse>

                                            </>

                                        }

                                        {/* <SidebarItem href="https://github.com/themesberg/flowbite-react/" icon={HiClipboard}>
                                            Docs
                                        </SidebarItem>
                                        <SidebarItem href="https://flowbite-react.com/" icon={HiCollection}>
                                            Components
                                        </SidebarItem>
                                        <SidebarItem href="https://github.com/themesberg/flowbite-react/issues" icon={HiInformationCircle}>
                                            Help
                                        </SidebarItem> */}
                                    </SidebarItemGroup>
                                </SidebarItems>
                            </div>
                        </div>
                    </Sidebar>
                </DrawerItems>
            </Drawer>


            <p className='text-blue-600 font-bold p-5'>{new Date().toLocaleString("en-US", {
                timeZone: "Asia/Dhaka",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",

            })}, {`🕒 ${time}`}</p>
        </div>
    );
};

export default DHeader;