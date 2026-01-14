import React, { useState } from "react";
import { motion } from "framer-motion";
import { IoBookSharp } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";


const CommingSoon = () => {

    const { data: allproducts = [], refetch } = useQuery({
        queryKey: ['allproducts'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/allProducts`);
            const data = await res.json();
            return data;
        }
    });

    const books =Array.isArray(allproducts) ? allproducts.filter(book => book.state === 'Coming Soon' || book.state === 'Preorder') : [];


    return (
        <section className="w-10/12 mx-auto py-16 text-gray-800">
            <div className=" text-center mb-12">
                <motion.h2 className="text-3xl md:text-3xl font-semibold flex justify-center" initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} >
                    <IoBookSharp className="text-yellow-300 mr-2" /> Upcoming Books </motion.h2>
                <motion.p className="mt-3 text-gray-600" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} > Stay tuned for our latest publications and releases </motion.p>

                <p className='text-end text-black font-semibold'>শীঘ্রই আসছে</p>
                <hr className='border-2 text-green-300 ' />
            </div>
            {
                books.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl"> {books.map((book, idx) => (
                        <motion.div key={idx} className="bg-white rounded-2xl shadow-lg overflow-hidden border hover:shadow-2xl transition duration-300" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.2, duration: 0.6 }} whileHover={{ scale: 1.03 }} >
                            {
                                book?.state === 'Preorder' ?
                                    <div className="relative w-full overflow-hidden tooltip tooltip-top" data-tip="Click to Preorder">
                                        <Link to={`/products/${book._id}`} className="cursor-pointer block relative">
                                            <img
                                                src={book.image}
                                                alt={book.title}
                                                className="transform hover:scale-110 transition duration-500 w-full"
                                            />
                                            <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full">
                                                {book.state}
                                            </span>
                                        </Link>
                                    </div> : <Link to={`/products/${book._id}`}><div className="relative w-full overflow-hidden">
                                        <img src={book.image} alt={book.title}
                                            className=" transform hover:scale-110 transition duration-500" />
                                        <span className="absolute top-3 left-3 bg-yellow-500 text-white text-xs px-3 py-1 rounded-full"> {book.state} </span>
                                    </div></Link>
                            }
                            {
                                book?.state === 'Preorder' ? <Link to={`/products/${book._id}`} className="cursor-pointer">
                                    <div className="p-5 text-center bg-[#baefba]">
                                        <h3 className="text-lg font-semibold mb-1">{book.namebn}</h3>
                                        <p className="text-sm text-gray-500 mb-2">by {book.authorName}</p>
                                        <p className="text-gray-600 text-sm line-clamp-3"> {book.description?.slice(0, 40)}...... </p>
                                        <div className="mt-4 text-sm text-gray-700"> 📅 Release Date: <b>{book.postDate}</b>
                                        </div>
                                    </div>
                                </Link> : <div className="p-5 text-center bg-[#baefba]">
                                    <h3 className="text-lg font-semibold mb-1">{book.namebn}</h3>
                                    <p className="text-sm text-gray-500 mb-2">by {book.authorName}</p>
                                    <p className="text-gray-600 text-sm line-clamp-3"> {book.description?.slice(0, 40)}...... </p>
                                    <div className="mt-4 text-sm text-gray-700"> 📅 Release Date: <b>{book.postDate}</b>
                                    </div>
                                </div>
                            }
                        </motion.div>
                    ))}
                    </div>) : <div className="text-center text-gray-500">No upcoming books at the moment. Please check back later!</div>
            }
        </section>
    );
};

export default CommingSoon;