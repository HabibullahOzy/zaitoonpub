import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { motion } from "framer-motion";
import { ImBooks } from 'react-icons/im';
import SkeltonLoader from '../../../SkeltonLoader/SkeltonLoader';
import { Link } from 'react-router-dom';
import { FcViewDetails } from 'react-icons/fc';
import { FaCartFlatbed } from 'react-icons/fa6';
const Stationary = () => {
const { user, localDeviceId } = useContext(Zaitooncontext);
    // const navigate = useNavigate();

    const queryClient = useQueryClient();

    const { data: allstationary = [] } = useQuery({
        queryKey: ['allstationary'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/categoryproducts/stationery`);
            const data = await res.json();
            return data;
        }
    });


    const allproducts = Array.isArray(allstationary)
        ? allstationary.filter(stationary => stationary?.state === '' || stationary?.state === 'Available')
        : [];
   

    const handleAddCart = async (id, offerPrice) => {
        const response = await axios.get(`${process.env.REACT_APP_backendurl}/products/${id}`);
        const product = response?.data[0];

        const cartProducts = {
            id,
            email: user?.email || localDeviceId(),
            offer: offerPrice,
            nameeng: product?.nameeng,
            namebn: product?.namebn,
            namearb: product?.namearb,
            image: product?.image,
            productPrice: product?.productPrice,
            category: product?.category,
            ProductCode: product?.ProductCode,
            authorName: product?.authorName,
            edition: product?.edition,
            postDate: product?.postDate
        };

        fetch(`${process.env.REACT_APP_backendurl}/addedCart`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cartProducts)
        })
            .then(res => res.json())
            .then(infoe => {
                if (infoe.acknowledged) {
                    toast.success("Your Product added successfully");
                    queryClient.clear();
                    // refetch()
                } else {
                    toast.error("Your product can't be added, please try again");
                }
            });
    };



    const email = user?.email || localDeviceId();

    //  Access queryClient
    //   const queryClient = useQueryClient();

    const { data: cartItems = [] } = useQuery({
        queryKey: ['cartItems', email],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/cashOnpurc/${email}`);
            return res.json();
        },
    });

    const cartMatch = cartItems?.map(cartit => cartit.ProductCode)

     const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            // Simulate fetch delay
            const timer = setTimeout(() => setLoading(false), 2000);
            return () => clearTimeout(timer);
        }, []);
    return (
       <div className='lg:w-10/12 md:w-10/12 w-full p-2 mx-auto py-6'>

            <div className=" text-center mb-12">
                <motion.h2 className="text-3xl md:text-3xl font-semibold flex justify-center text-black" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} >
                    <ImBooks className='text-yellow-300 mr-2' /> All Stationery Item </motion.h2>
                <motion.p className="mt-3 text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} > Stay tuned for our Stationery Item and releases </motion.p>

                {/* <p className='text-end text-black font-semibold'>সকল বই সমূহ</p> */}
                <hr className='border-2 text-green-300 ' />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-6 md:gap-6' style={{ color: "black" }}>
                {allproducts?.slice() // make a copy
                    .sort((a, b) => {
                        // If ProductCode is a number
                        // return Number(a.ProductCode) - Number(b.ProductCode);

                        // If ProductCode is a string
                        return a.ProductCode.localeCompare(b.ProductCode);
                    }).map((product, i) => {
                        const offerPrice = product?.offerprice
                            ? Math.round(product?.productPrice - (product?.offerprice * product?.productPrice) / 100)
                            : product?.productPrice;

                        return (
                            <div key={i}>
                                {
                                    loading ?
                                        <SkeltonLoader></SkeltonLoader>
                                        :

                                        <div key={i} className="flex flex-col h-full">

                                            <div className="relative group card hover:shadow-md hover:shadow-lime-400 overflow-hidden flex flex-col h-full">
                                                {/* --- keep everything inside same as you provided --- */}
                                                {/* Example badge */}
                                                {product?.offerprice && (
                                                    <span className="example">{product?.offerprice}%</span>
                                                )}

                                                {/* Product image */}
                                                <figure>
                                                    <Link to={`/products/${product?._id}`}>
                                                        <img src={product.image} alt="product" className="object-cover transform hover:scale-110 transition duration-500" />
                                                    </Link>
                                                </figure>

                                                {/* Bottom Buttons */}
                                                <div className="flex">

                                                    <Link
                                                        to={`/products/${product._id}`}
                                                        className="p-2 w-1/2 bg-green-100 text-green-500 flex items-center justify-center tooltip tooltip-success"
                                                        data-tip="View Details"
                                                    >
                                                        <FcViewDetails className="w-5 h-5" />View Details
                                                    </Link>
                                                    {/* <button
                                                    onClick={() => openBuyNownPurchase(product)}
                                                    className="p-4 w-1/2 bg-green-100 text-green-500 flex items-center justify-center tooltip tooltip-success"
                                                    data-tip="Buy Now এখনই কিনুন"
                                                >
                                                    <FaShoppingBag className="w-10" />
                                                </button> */}

                                                    {/* <button
                                                    onClick={() => addWishList(product)}
                                                    className="p-4 w-1/2 bg-green-50 text-green-500 flex items-center justify-center tooltip tooltip-success"
                                                    data-tip="Wish list"
                                                >
                                                    <FaHeartCirclePlus className="w-10" />
                                                </button> */}

                                                    {/* <a
                                                    href="https://wa.me/message/PARTY6QIOII2E1"
                                                    target="_blank"
                                                    className="p-4 w-1/2 bg-green-300 text-green-700 flex items-center justify-center tooltip tooltip-success"
                                                    data-tip="Buy with WhatsApp"
                                                >
                                                    <img src={img} className="w-5" />
                                                </a> */}

                                                    {cartMatch?.some(c => c === product.ProductCode) ? (
                                                        <p className="p-2 w-1/2 bg-green-200 text-green-600 flex items-center justify-center font-semibold">
                                                            Added
                                                        </p>
                                                    ) : (
                                                        <button
                                                            onClick={() => handleAddCart(product._id, offerPrice)}
                                                            className="p-2 w-1/2 bg-green-200 text-green-600 flex items-center justify-center tooltip tooltip-success"
                                                            data-tip="Add to Cart"
                                                        >
                                                            <FaCartFlatbed className="w-8" /> Add to Cart
                                                        </button>
                                                    )}


                                                </div>

                                                {/* Product Info */}
                                                <div className="lg:card-body md:card-body sm:pt-5 bg-[#baefba] relative overflow-hidden flex-grow flex flex-col justify-between">
                                                    <div>
                                                        <p className="text-center text-md font-bold">{product.namebn}</p>
                                                        <p className="text-center text-lg">{product.category}</p>
                                                        {/* <p className="text-center text-lg">{product.ProductCode}</p> */}
                                                        <p className="text-center text-sm">{product.subCategory}</p>
                                                    </div>

                                                    <div className="flex justify-center items-center gap-2 mt-2">
                                                        {product?.offerprice ? (
                                                            <>
                                                                <p className="text-xl font-semibold text-gray-400 line-through" style={{ textDecorationColor: "red" }}>
                                                                    {product.productPrice}৳
                                                                </p>
                                                                <p className="text-2xl font-semibold text-red-400">{offerPrice}৳</p>
                                                            </>
                                                        ) : (
                                                            <p className="text-xl font-semibold text-green-600">{product.productPrice} ৳</p>
                                                        )}
                                                    </div>

                                                    {/* Hover Buttons Over Image */}
                                                    {/* <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black/0 group-hover:bg-black/10 transition-all duration-500">
                                                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 translate-y-6 group-hover:translate-y-0 transition-all duration-600 ease-out">
                                                        <Link
                                                            to={`/products/${product._id}`}
                                                            className="bg-white/80 hover:bg-white text-black p-3 rounded-full shadow-md scale-90 group-hover:scale-100 transition-transform duration-700 tooltip tooltip-success"
                                                            data-tip="View Details "
                                                        >
                                                            <FcViewDetails className="w-5 h-5" />
                                                        </Link>
                                                    </div>
                                                </div> */}
                                                </div>
                                            </div>

                                            {/* Modal */}
                                            {/* {showModal && (
                                            <div className="modal modal-open">
                                                <div className="modal-box max-w-4xl bg-green-50" style={{ backgroundColor: "#baefba" }}>
                                                    <div className="modal-action">
                                                        <button className="btn" onClick={() => setShowModal(false)}>✕</button>
                                                    </div>
                                                    <BuyNowModal datas={buyNowProductId} deviceId={localDeviceId()} />
                                                </div>
                                            </div>
                                        )} */}
                                        </div>

                                }
                            </div>



                        )
                    }
                    )}
            </div>
        </div>
    );
};

export default Stationary;