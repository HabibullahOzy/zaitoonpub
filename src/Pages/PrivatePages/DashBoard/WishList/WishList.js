import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { FaTrashAlt } from 'react-icons/fa';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { reload } from 'firebase/auth';

const WishList = () => {
    const { user } = useContext(Zaitooncontext);
    const wishdatas = useLoaderData();
    // console.log(wishdatas);

    const [showModal, setShowModal] = useState(false);




    const handleAddCart = async (informat, offerPrice) => {

        // console.log(informat);
        const cartProducts = {
            id: informat?._id,
            email: informat?.email,
            offer: offerPrice,
            name: informat?.product?.nameeng,
            image: informat?.product?.image,
            productPrice: informat?.product?.productPrice,
            category: informat?.product?.category,
            ProductCode: informat?.product?.ProductCode,
            authorName: informat?.product?.authorName,
            edition: informat?.product?.edition,
            postDate: informat?.product?.postDate
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
                } else {
                    toast.error("Your product can't be added, please try again");
                }
            });
    };


    // handle Delete from wish list


    const handlewishDelete = async (id) => {
        const res = await axios.delete(`${process.env.REACT_APP_backendurl}/wishList/delete/${id}`);
        if (res.data.deletedCount > 0) {
            toast.success("Item deleted successfully");
            // Optionally, you can refetch the wish list data here
            // window.location.reload();
        } else {
            toast.error("Failed to delete item");
        }
    }




    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const totalPages = Math.ceil(wishdatas.length / itemsPerPage);

    const paginatedData = wishdatas.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    // console.log(paginatedData)

    const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    return (
        <div className="text-black min-h-screen pt-14 px-4 md:px-8" style={{ backgroundColor: "rgb(186, 239, 186)" }}>
            <h1 className="text-center font-bold text-2xl mb-6">Products List</h1>

            <div className="overflow-x-auto w-full">
                <table className="table w-full table-zebra text-[15px] md:text-[17px]">
                    <thead className="text-black text-lg font-bold">
                        <tr>
                            <th>SL</th>
                            <th>Product Name</th>
                            <th>Details</th>
                            <th>Product Code</th>
                            <th>Category</th>
                            <th>Edition</th>
                            <th>Author</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody className='text-stone-700'>
                        {paginatedData?.map((informat, i) => {
                            const offerPrice = informat?.product?.offerprice
                                ? Math.round(informat?.product?.productPrice - (informat?.product?.offerprice * informat?.product?.productPrice) / 100)
                                : informat?.product?.productPrice;
                            return (
                                <tr key={`${informat._id}-${i}`} className='text-slate-600'>
                                    <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                    <td>
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                            <figure className="avatar mask mask-squircle h-12 w-12">
                                                <img src={informat?.product?.image} alt="Avatar" />
                                            </figure>
                                            <div className="flex flex-col">
                                                <span className="font-medium break-words max-w-[150px] sm:max-w-[200px]">{informat?.product?.nameeng}</span>
                                                <span className="text-sm text-gray-600">TK {informat?.product?.productPrice}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="whitespace-normal break-words max-w-xs">
                                        Offer: {
                                            informat?.product?.offerprice ? offerPrice : "%"
                                        }
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Number Of pages: {informat?.product?.numberOfpage}</span>
                                    </td>
                                    <td className="break-words max-w-[100px]">{informat?.product?.ProductCode}</td>
                                    <td>{informat?.product?.category}</td>
                                    <td>{informat?.product?.edition}</td>
                                    <td className="whitespace-normal break-words max-w-[150px]">
                                        {informat?.product?.authorName}
                                    </td>
                                    <td>
                                        <div className="flex justify-between gap-1">
                                            <button
                                                onClick={() => handleAddCart(informat, offerPrice)}
                                                className="btn btn-success btn-xs text-white"
                                            >
                                                Add to Cart
                                            </button>

                                            <button className="btn btn-error btn-xs" onClick={() => handlewishDelete(informat?._id)}> <FaTrashAlt className='text-xl text-red-950' /> Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        }

                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
                <div className="flex flex-wrap justify-center mt-6 gap-2">
                    <button
                        className="btn btn-sm"
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        Prev
                    </button>
                    {[...Array(totalPages)].map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToPage(index + 1)}
                            className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : ''}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                    <button
                        className="btn btn-sm"
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl w-full" style={{ backgroundColor: "#baefba" }}>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        {/* <OrderPaymentmodal paydata={orderPaymeData} /> */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default WishList;
