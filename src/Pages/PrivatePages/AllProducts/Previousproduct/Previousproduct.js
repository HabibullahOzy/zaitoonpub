import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";
import { ImBooks } from 'react-icons/im';
import SkeltonLoader from '../../../SkeltonLoader/SkeltonLoader';
import { Link } from 'react-router-dom';
import { FcViewDetails } from 'react-icons/fc';

const Previousproduct = () => {

     const queryClient = useQueryClient();

    const { data: allprevbooks = [], refetch } = useQuery({
        queryKey: ['allbooks'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/allProducts`);
            const data = await res.json();
            return data;
        }
    });


const allprevproducts = (allprevbooks).filter(book => book?.state === 'Previous' || book?.state === '');


const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate fetch delay
        const timer = setTimeout(() => setLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className='lg:w-10/12 md:w-10/12 w-full p-2 mx-auto py-6'>
            {/* <div className=' mb-6'>
                <h1 className=' text-black font-semibold text-3xl mt-10 flex justify-center'><ImBooks className='text-yellow-600 mr-2'/>All Books</h1>
                <p className='text-end text-black font-semibold'>সকল বই সমূহ</p>
                <hr className='border-2 text-green-300 ' />
            </div> */}

            <div className=" text-center mb-12">
                <motion.h2 className="text-3xl md:text-3xl font-semibold flex justify-center text-black" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} >
                    <ImBooks className='text-yellow-300 mr-2'/> Previous Books </motion.h2>
                {/* <motion.p className="mt-3 text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} > Stay tuned for our books and releases </motion.p> */}

                {/* <p className='text-end text-black font-semibold'>সকল বই সমূহ</p> */}
                <hr className='border-2 text-green-300 ' />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 lg:gap-6 md:gap-6' style={{ color: "black" }}>
                {allprevproducts?.slice() // make a copy
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

                                                {/* <button
                                                    onClick={() => handleAddCart(product._id, offerPrice)}
                                                    className="p-2 w-1/2 bg-green-200 text-green-600 flex items-center justify-center tooltip tooltip-success"
                                                    data-tip="Add to Cart"
                                                >
                                                    <FaCartFlatbed className="w-8" />Add to Cart
                                                </button> */}
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

                                            </div>
                                        </div>

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

export default Previousproduct;