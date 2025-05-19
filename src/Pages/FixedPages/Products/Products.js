import React, { useContext } from 'react';
import "./Products.css";
import { FaRegEye } from 'react-icons/fa';
import { FaCartFlatbed } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import axios from 'axios';

const Products = () => {
    const { user } = useContext(Zaitooncontext);

    const { data: allproducts = [], refetch } = useQuery({
        queryKey: ['allproducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allProducts');
            const data = await res.json();
            return data;
        }
    });

    const handleAddCart = async (id, offerPrice) => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        const product = response?.data[0];

        const cartProducts = {
            id,
            email: user.email,
            offer: offerPrice,
            name: product?.nameeng,
            image: product?.image,
            productPrice: product?.productPrice,
            category: product?.category,
            productCode: product?.productCode,
            authorName: product?.authorName,
            edition: product?.edition,
            postDate: product?.postDate
        };

        fetch(`http://localhost:5000/addedCart`, {
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

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5 w-10/12 py-6 mx-auto' style={{ color: "black" }}>
            {allproducts?.map((product, i) => {
                const offerPrice = product?.offerprice
                    ? Math.round(product.productPrice - (product.offerprice * product.productPrice) / 100)
                    : product.productPrice;

                return (
                    <div key={i} className="card hover:shadow-md hover:shadow-lime-400">
                        {product?.offerprice && <span className="example">{product.offerprice}%</span>}
                        
                        <figure>
                            <Link to={`/products/${product._id}`}>
                                <img src={`http://localhost:5000/uploads/${product.image}`} alt="product" />
                            </Link>
                        </figure>

                        <div className="flex">
                            <button
                                onClick={() => handleAddCart(product._id, offerPrice)}
                                className="p-4 w-1/2 bg-green-200"
                            >
                                <FaCartFlatbed className='w-8' />
                            </button>
                            <Link to={`/products/${product._id}`} className="p-4 w-1/2 bg-green-300">
                                <FaRegEye className='justify-center w-8' />
                            </Link>
                        </div>

                        <div className="card-body bg-[#baefba]">
                            <p>{product.namebn}</p>
                            <p>{product.category} | الحضانة</p>

                            <div className="flex">
                                {product?.offerprice ? (
                                    <>
                                        <p className='text-xl font-semibold text-gray-400 line-through' style={{ textDecorationColor: "red" }}>
                                            {product.productPrice}৳
                                        </p>
                                        <p className='text-2xl font-semibold text-red-400'>
                                            {offerPrice}৳
                                        </p>
                                    </>
                                ) : (
                                    <p className='font-semibold text-gray-400'>{product.productPrice}৳</p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Products;
