
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { FaCartFlatbed, FaHeartCirclePlus, FaRegEye } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Zaitooncontext } from '../../../../../SecureContext/ContextAuth';
import BuyNowModal from '../../../Purchages/InstantPurch/BuyNowModal';
import { FcViewDetails } from 'react-icons/fc';

const Play = ({productCategory}) => {

    const { user } = useContext(Zaitooncontext)
    const navigate = useNavigate();

    const { data: nursproduct = [], refetch } = useQuery({
        queryKey: ['nursproduct'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/categoryproducts/${productCategory?.categname}`);
            const data = await res.json();
            return data;
        }
    });





    const handleAddCart = async (id, offerPrice) => {
        const response = await axios.get(`${process.env.REACT_APP_backendurl}/products/${id}`);
        const product = response?.data[0];

        const cartProducts = {
            id,
            email: user.email,
            offer: offerPrice,
            name: product?.nameeng,
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
                } else {
                    toast.error("Your product can't be added, please try again");
                }
            });
    };




         // Buy Now Purchase Function

    const [showModal, setShowModal] = useState(false);
    const [buyNowProductId, setBuyNowProductId] = useState('');

    const openBuyNownPurchase = (product) => {
        if (!user) {
            toast.error("Please login first to buy now");
            return;
        }

        setShowModal(true);
        setBuyNowProductId(product);
    }


    const addWishList = async (product) => {
        if (!user) {
            toast.error("Please login first to add to wishlist");
            return;
        }

        const wishlistItem = {
            email: user?.email,
            product
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_backendurl}/wishList`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(wishlistItem)
            });

            const data = await response.json();
            if (data.acknowledged) {
                toast.success("Product added to wishlist successfully");
                navigate(`/wishList/${user.email}`);
                refetch();
            } else {
                toast.error("Failed to add product to wishlist");
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("An error occurred while adding to wishlist");
        }
    }
    return (
        <div>
            <h1 className='font-semibold text-2xl'>{productCategory?.categname}</h1>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 lg:gap-5 lg:gap-5 gap-2 py-6 mx-auto' style={{ color: "black" }}>
               
                {nursproduct?.map((product, i) => {
                    const offerPrice = product?.offerprice
                        ? Math.round(product.productPrice - (product.offerprice * product.productPrice) / 100)
                        : product.productPrice;

                    return (
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
                                                    <img src={product.image} alt="product" className="object-cover" />
                                                </Link>
                                            </figure>

                                            {/* Bottom Buttons */}
                                            <div className="flex">
                                                <Link
                                                            to={`/products/${product._id}`}
                                                            className="p-2 w-1/2 bg-green-100 text-green-600 flex items-center justify-center tooltip tooltip-success"
                                                            data-tip="View Details "
                                                        >
                                                            <FcViewDetails className="w-5 h-5" />View Details
                                                        </Link>

                                                <button
                                                    onClick={() => handleAddCart(product._id, offerPrice)}
                                                    className="p-2 w-1/2 bg-green-200 text-green-600 flex items-center justify-center tooltip tooltip-success"
                                                    data-tip="Add to Cart"
                                                >
                                                    <FaCartFlatbed className="w-8" />Add to Cart
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div className="card-body bg-[#baefba] relative overflow-hidden flex-grow flex flex-col justify-between">
                                                <div>
                                                    <p className="lg:text-center md:text-center text-start text-md font-bold">{product.namebn}</p>
                                                    <p className="lg:text-center md:text-center text-start text-lg">{product.category}</p>
                                                    <p className="lg:text-center md:text-center text-start text-sm">{product.subCategory}</p>
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
                                        {showModal && (
                                            <div className="modal modal-open">
                                                <div className="modal-box max-w-4xl bg-green-50" style={{ backgroundColor: "#baefba" }}>
                                                    <div className="modal-action">
                                                        <button className="btn" onClick={() => setShowModal(false)}>✕</button>
                                                    </div>
                                                    <BuyNowModal datas={buyNowProductId} />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                    );
                })}
            </div>
        </div>

    );
};

export default Play;