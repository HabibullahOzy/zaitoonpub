import React, { useContext, useEffect, useState } from "react";
import './DashBoard.css';
import axios from "axios";
import { Link } from "react-router-dom";
import { Zaitooncontext } from "../../../../SecureContext/ContextAuth";

import OrderSchart from "./OrderSummarychart/OrderSchart";
import OnlyOrderCou from "./OrderSummarychart/OnlyOrderCou/OnlyOrderCou";
import { BarChart2, CheckCircle, ShoppingCart, Users } from "lucide-react";
import Visitorshow from "./VisitorSummery/Visitorshow";
import useAdmin from "../../../../hooks/adminHooks/useAdmin";
import useSuperAdmin from "../../../../hooks/superAdmin/superAdmin";


// Sample data: dates & order quantity (dates in YYYY-MM-DD format)
// const allData = [
//     { date: "2025-04-28", quantity: 3 },
//     { date: "2025-04-30", quantity: 2 },
//     { date: "2025-05-01", quantity: 7 },
//     { date: "2025-05-02", quantity: 4 },
//     { date: "2025-05-05", quantity: 500 },
//     { date: "2025-05-10", quantity: 5 },
//     { date: "2025-05-20", quantity: 8 },
//     { date: "2025-05-25", quantity: 3 },
//     { date: "2025-06-01", quantity: 10 },
//     { date: "2025-06-05", quantity: 2 },
//     { date: "2025-06-15", quantity: 100 },
// ];

// function getDaysInMonth(year, month) {
//     return new Date(year, month + 1, 0).getDate();
// }




const DashBody = () => {

    const { user, trendType, trend } = useContext(Zaitooncontext)

    // Start with May 2025 for example
    const [year, setYear] = useState(2025);
    const [month, setMonth] = useState(4); // May (0-based index)
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });
    const [countallProd, setCountallProd] = useState(0)
    const [isAdmin] = useAdmin(user?.email)
    const [isSuperAdmin] = useSuperAdmin(user?.email)



    // for only users

    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/allusers`)
                .then((res) => {
                    const allusers = res.data

                    const end = allusers.length;
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setCount(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);


    //   for only users

    // Total pending Order


    const [viewPending, setViewPending] = useState(0)


    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/caspurchage/pending`)
                .then((res) => {
                    const allpending = res.data

                    const end = allpending.length;
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setViewPending(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);


    // Completed Orders

    const [viewComplete, setViewComplete] = useState(0)



    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/caspurchage/complete`)
                .then((res) => {
                    const allcomplete = res.data

                    setViewtotalsels(res?.data.reduce((total, order) => total + order.totalPrice, 0));

                    const end = allcomplete.length;
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setViewComplete(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);



    //ViewConfirm Orders

    const [viewConfirm, setViewConfirm] = useState(0)


    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/caspurchage/confirm`)
                .then((res) => {
                    const allcomplete = res.data


                    const end = allcomplete.length;
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setViewConfirm(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);



    //ViewCancel Orders

    const [viewCancel, setViewCancel] = useState(0)


    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/caspurchage/cancel`)
                .then((res) => {
                    const allcomplete = res.data


                    const end = allcomplete.length;
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setViewCancel(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);


    // Total products show

    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/allProducts`)
                .then((res) => {
                    const allproducts = res.data


                    const end = allproducts.length;
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setCountallProd(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);

    // Total products count end

    // Total Sales

    const [viewtotalsels, setViewtotalsels] = useState(0)

    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/caspurchage/complete`)
                .then((res) => {
                    const allcomplete = res.data




                    const end = res?.data.reduce((total, order) => total + order.totalPrice, 0)
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setViewtotalsels(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);


    const [institutCount, setInstitutCount] = useState(0);

    useEffect(() => {
        let start = 0;
        let timer;

        axios
            .get(`${process.env.REACT_APP_backendurl}/institutorder`)
            .then((res) => {
                // ✅ count only pending orders
                const pendingTotal = res.data.filter(
                    (order) => order.status === "pending"
                ).length;

                const duration = 800;
                const incrementTime = 20;
                const step = Math.ceil(pendingTotal / (duration / incrementTime));

                timer = setInterval(() => {
                    start += step;
                    if (start >= pendingTotal) {
                        start = pendingTotal;
                        clearInterval(timer);
                    }
                    setInstitutCount(start);
                }, incrementTime);
            })
            .catch((err) => {
                console.error(err);
            });

        return () => clearInterval(timer);
    }, []);


    return (
        <div className="min-h-screen w-10/12 mx-auto overflow-x-auto">


            <div className="w-11/12 mx-auto py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">



                {
                    isAdmin && <>
                        {/* Pending Orders */}
                        <Link to={'/dashboard/pendingOrder'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400">+8%</div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{viewPending.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Pending Orders</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>


                        {/* Confirme Orders */}
                        <Link to={'/dashboard/confirmOrderlist'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400">+8%</div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{viewConfirm.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Confirmed Orders</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>



                        {/* Complete Orders */}
                        <Link to={'/dashboard/completelist'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400">+8%</div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{viewComplete.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Completed Orders</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>


                        {/* Cancel Orders */}
                        <Link to={'/dashboard/cancelOrderlist'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400">+8%</div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{viewCancel.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Canceled Orders</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>



                        {/* Institutional Orders Request */}
                        <Link to={'/dashboard/institutionalorder'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400"></div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{institutCount.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Institutional Order Request</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>


                        {/* Total Sales */}
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
                            <div className="flex items-center justify-between">
                                <div className="p-3 bg-white/20 rounded-xl text-green-300">
                                    <ShoppingCart size={24} />
                                </div>
                                <div className="text-sm font-semibold text-red-400"></div>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-3xl font-bold text-green-300">৳{viewtotalsels}</h2>
                                <p className="text-black mt-1 font-semibold">Total Sales</p>
                            </div>
                            <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                <div className="w-2 bg-green-500 rounded animate-bounce h-6"></div>
                                <div className="w-2 bg-green-400 rounded animate-pulse h-8"></div>
                                <div className="w-2 bg-green-500 rounded animate-bounce h-5"></div>
                                <div className="w-2 bg-green-400 rounded animate-pulse h-9"></div>
                                <div className="w-2 bg-green-500 rounded animate-bounce h-7"></div>
                            </div>
                            {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                        </div>



                        {/* Total Users */}
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                            {/* Top Row */}
                            <div className="flex items-center justify-between">
                                <div className="p-3 bg-white/20 rounded-xl text-white">
                                    <Users size={24} />
                                </div>
                                <div className="text-sm font-semibold text-green-400">+12%</div>
                            </div>

                            {/* Metric */}
                            <div className="mt-6">
                                <h2 className="text-3xl font-bold text-white">{count.toLocaleString()}</h2>
                                <p className="text-black font-semibold mt-1">Total Users</p>
                            </div>

                            {/* Trend Bar */}
                            <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                <div className="w-2 bg-green-400 rounded animate-pulse h-5"></div>
                                <div className="w-2 bg-green-500 rounded animate-bounce h-7"></div>
                                <div className="w-2 bg-green-400 rounded animate-pulse h-6"></div>
                                <div className="w-2 bg-green-500 rounded animate-bounce h-9"></div>
                                <div className="w-2 bg-green-400 rounded animate-pulse h-8"></div>
                            </div>

                            {/* Footer */}
                            {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                        </div>




                        {/* Total Products */}
                        <Link to={'/dashboard/allProducts'} >
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-green-300">
                                        <BarChart2 size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400"></div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-green-300">{countallProd.toLocaleString()}</h2>
                                    <p className="text-black mt-1 font-semibold">Total Products</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end">
                                    <div className="w-2 bg-green-500 rounded animate-bounce h-9"></div>
                                    <div className="w-2 bg-green-400 rounded animate-pulse h-7"></div>
                                    <div className="w-2 bg-green-500 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-400 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-500 rounded animate-bounce h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>
                    </>
                }





                {
                    isSuperAdmin && <>
                        <Link to={'/dashboard/superadmin/pendingOrder'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400">+8%</div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{viewPending.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Pending Orders</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>


                        {/* Confirme Orders */}
                        <Link to={'/dashboard/superadmin/confirmOrderlist'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400">+8%</div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{viewConfirm.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Confirmed Orders</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>



                        {/* Complete Orders */}
                        <Link to={'/dashboard/superadmin/completelist'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400">+8%</div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{viewComplete.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Completed Orders</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>


                        {/* Cancel Orders */}
                        <Link to={'/dashboard/superadmin/cancelOrderlist'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400">+8%</div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{viewCancel.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Canceled Orders</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>


                         {/* Institutional Orders Request */}
                        <Link to={'/dashboard/superadmin/institutionalorder'}>
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardbg">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-white">
                                        <CheckCircle size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400"></div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-white">{institutCount.toLocaleString()}</h2>
                                    <p className="text-black font-semibold mt-1">Institutional Order Request</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-9"></div>
                                    <div className="w-2 bg-green-700 rounded animate-bounce h-7"></div>
                                    <div className="w-2 bg-green-300 rounded animate-pulse h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>


                        {/* Total Sales */}
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
                            <div className="flex items-center justify-between">
                                <div className="p-3 bg-white/20 rounded-xl text-green-300">
                                    <ShoppingCart size={24} />
                                </div>
                                <div className="text-sm font-semibold text-red-400"></div>
                            </div>
                            <div className="mt-6">
                                <h2 className="text-3xl font-bold text-green-300">৳{viewtotalsels}</h2>
                                <p className="text-black mt-1 font-semibold">Total Sales</p>
                            </div>
                            <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                <div className="w-2 bg-green-500 rounded animate-bounce h-6"></div>
                                <div className="w-2 bg-green-400 rounded animate-pulse h-8"></div>
                                <div className="w-2 bg-green-500 rounded animate-bounce h-5"></div>
                                <div className="w-2 bg-green-400 rounded animate-pulse h-9"></div>
                                <div className="w-2 bg-green-500 rounded animate-bounce h-7"></div>
                            </div>
                            {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                        </div>



                        {/* Total Users */}
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 cardb">
                            {/* Top Row */}
                            <div className="flex items-center justify-between">
                                <div className="p-3 bg-white/20 rounded-xl text-white">
                                    <Users size={24} />
                                </div>
                                <div className="text-sm font-semibold text-green-400">+12%</div>
                            </div>

                            {/* Metric */}
                            <div className="mt-6">
                                <h2 className="text-3xl font-bold text-white">{count.toLocaleString()}</h2>
                                <p className="text-black font-semibold mt-1">Total Users</p>
                            </div>

                            {/* Trend Bar */}
                            <div className="mt-4 flex gap-1 h-10 items-end justify-end">
                                <div className="w-2 bg-green-400 rounded animate-pulse h-5"></div>
                                <div className="w-2 bg-green-500 rounded animate-bounce h-7"></div>
                                <div className="w-2 bg-green-400 rounded animate-pulse h-6"></div>
                                <div className="w-2 bg-green-500 rounded animate-bounce h-9"></div>
                                <div className="w-2 bg-green-400 rounded animate-pulse h-8"></div>
                            </div>

                            {/* Footer */}
                            {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                        </div>




                        {/* Total Products */}
                        <Link to={'/dashboard/superadmin/allProducts'} >
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl shadow-xl p-6 flex flex-col justify-between transform transition-all duration-300 hover:scale-105">
                                <div className="flex items-center justify-between">
                                    <div className="p-3 bg-white/20 rounded-xl text-green-300">
                                        <BarChart2 size={24} />
                                    </div>
                                    <div className="text-sm font-semibold text-green-400"></div>
                                </div>
                                <div className="mt-6">
                                    <h2 className="text-3xl font-bold text-green-300">{countallProd.toLocaleString()}</h2>
                                    <p className="text-black mt-1 font-semibold">Total Products</p>
                                </div>
                                <div className="mt-4 flex gap-1 h-10 items-end">
                                    <div className="w-2 bg-green-500 rounded animate-bounce h-9"></div>
                                    <div className="w-2 bg-green-400 rounded animate-pulse h-7"></div>
                                    <div className="w-2 bg-green-500 rounded animate-bounce h-6"></div>
                                    <div className="w-2 bg-green-400 rounded animate-pulse h-8"></div>
                                    <div className="w-2 bg-green-500 rounded animate-bounce h-5"></div>
                                </div>
                                {/* <div className="mt-2 border-t border-white/20 pt-2 text-xs text-green-200">
          Last 24 hours
        </div> */}
                            </div>
                        </Link>

                        {/* tota products show end */}
                    </>
                }

            </div>


            <div className="flex">
                <div className=" overflow-x-auto">
                    <OrderSchart></OrderSchart>
                </div>


            </div>

            <div>
                <OnlyOrderCou></OnlyOrderCou>
            </div>


            <div>
                <Visitorshow></Visitorshow>
            </div>
            {/* order gant chart end */}



        </div>
    );
};



export default DashBody;
