import React, { useContext, useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { FaCartFlatbed } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import PdfOpenModal from '../BooksPdf/PdfOpenModal';
import axios from 'axios';
import Reviewgetform from '../../Review/ReviewTake/Reviewgetform';
import { useQuery } from '@tanstack/react-query';
import PSummer from './PSummer';
import Pspecifica from './Pspecifica';
import Pauthor from './Pauthor';
import { FaStar } from 'react-icons/fa';
import CustomerReview from '../../Review/CustomerReview';

const ProductsDetails = () => {
    const { user, producD, setProducD } = useContext(Zaitooncontext);
    const dataes = useLoaderData();
    const [modalOpen, setModalOpen] = useState(null)
    const [rating, setRating] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [reviewinfo, setReviewinfo] = useState()
    const [activeTab, setActiveTab] = useState('summary');
    const [redata, setRedata] = useState()
    console.log(redata)

    const handleAddCart = async (id, offerPrice) => {
        try {

            const response = await axios.get(`http://localhost:5000/products/${id}`)
            console.log(response?.data[0]);
            const email = user.email
            const name = response?.data[0]?.nameeng
            const image = response?.data[0]?.image
            const productPrice = response?.data[0]?.productPrice
            const category = response?.data[0]?.category
            const productCode = response?.data[0]?.productCode
            const authorName = response?.data[0]?.authorName
            const edition = response?.data[0]?.edition
            const offer = offerPrice
            const postDate = response?.data[0]?.postDate


            const cartProducts = {
                id,
                email,
                offer,
                name,
                image,
                productPrice,
                category,
                productCode,
                authorName,
                edition,
                postDate,
                rating
            }
            console.log(id)
            fetch(`http://localhost:5000/addedCart`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartProducts)
            })
                .then(res => res.json())
                .then(infoe => {
                    // console.log(infoe)
                    if (infoe.acknowledged) {
                        toast.success("Producte added to cart succesfully!!");
                        // navigate('/dashboard/allProducts')
                    } else {
                        toast.error("producte can't added please try again")
                    }
                })

        } catch (error) {
            console.log(error)
        }

    }



    const handleReview = (id, data) => {
        setReviewinfo(data)
        setShowModal(true)
    }





    useEffect(() => {
        dataes.map(async (info) => {
            const res = await axios.get(`http://localhost:5000/review/${info.productCode}`);
            console.log(res)
            setRedata(res.data)

        })
    }, [dataes])

    const totalRatings = redata?.reduce((sum, rinfo) => sum + rinfo.rating, 0);
    const averageRating = redata?.length ? (totalRatings / redata.length).toFixed(2) : 0;

    console.log("Average Rating:", averageRating);
    return (
        <div>
            {
                dataes?.map((data, i) => {

                    const offerPrice = data?.offerprice
                        ? Math.round(data.productPrice - (data.offerprice * data.productPrice) / 100)
                        : data.productPrice;
                    return (<div className="lg:flex text-black w-10/12 m-auto mt-12 min-h-screen">
                        <div key={i}>
                            <figure className="border border-spacing-2 shadow-md shadow-lime-400 border-emerald-400 p-5">
                                <img src={`http://localhost:5000/uploads/${data.image}`} alt="" className='lg:w-60' srcset="" />
                            </figure>
                        </div>
                        <div className="p-10 w-full">
                            <div>
                                <h1 className="font-semibold p-2">{data.namebn}</h1>

                                <div className="rating  rating-half p-2">
                                    {/* <input type="radio" name="rating-11" className="rating-hidden" /> */}
                                    {[...Array(10)].map((_, index) => {
                                        const half = index % 2 !== 0;
                                        const starValue = (index + 1) * 0.5;

                                        return (
                                            <input
                                                key={index}
                                                type="radio"
                                                name="rating"
                                                className={`mask mask-star-2 ${half ? 'mask-half-2' : 'mask-half-1'} bg-orange-400`}
                                                aria-label={`${starValue} star`}
                                                checked={rating === starValue}
                                                onChange={() => setRating(starValue)}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                            <hr className="bg-gray-300 h-1" />

                            <p className="p-2">{data.description}</p>

                            <hr className="bg-gray-300 h-1" />

                            <h1 className="flex justify-evently p-5">
                                {data?.offerprice ? (
                                    <>
                                        <p className='text-xl font-semibold text-gray-400 line-through' style={{ textDecorationColor: "red" }}>
                                            {data.productPrice}৳
                                        </p>
                                        <p className='text-2xl font-semibold text-red-400'>
                                            Tk {offerPrice}৳
                                        </p>
                                    </>
                                ) : (
                                    <p className='font-semibold text-gray-400'>{data.productPrice}৳</p>
                                )}
                            </h1>

                            <div className="flex justify-around p-2">
                                <button type="button" className="btn btn-outline btn-success shadow-md shadow-lime-400" onClick={() => handleAddCart(data?._id, offerPrice)}><FaCartFlatbed className='w-8' />Add to cart</button>
                                <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn btn-outline btn-success shadow-md shadow-lime-400">Some Read</button>
                            </div>

                            <div className='bg-green-200 p-5 mt-10'>

                                <h1 className='text-xl font-semibold mb-6'>Product Specification</h1>
                                <div className="flex gap-3 border-b pb-2 mb-4">
                                    <button
                                        onClick={() => setActiveTab('summary')}
                                        className={`pb-2 ${activeTab === 'summary' ? 'border-b-2 border-green-500 text-green-600 font-semibold' : 'text-gray-600'}`}
                                    >
                                        Summary
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('specification')}
                                        className={`pb-2 ${activeTab === 'specification' ? 'border-b-2 border-green-500 text-green-600 font-semibold' : 'text-gray-600'}`}
                                    >
                                        Specification
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('author')}
                                        className={`pb-2 ${activeTab === 'author' ? 'border-b-2 border-green-500 text-green-600 font-semibold' : 'text-gray-600'}`}
                                    >
                                        Author
                                    </button>
                                </div>

                                {/* Tab Content */}
                                <div className="text-gray-800 leading-relaxed">
                                    {activeTab === 'summary' && <PSummer data={data} />}
                                    {activeTab === 'specification' && <Pspecifica data={data} />}
                                    {activeTab === 'author' && <Pauthor data={data} />}
                                </div>
                            </div>


                            <div className='bg-green-200 p-5 mt-5'>

                                <h1 className='text-xl'>Review And Retings</h1>
                                <button className='btn btn-success btn-sm' onClick={() => handleReview(data?._id, data)}>
                                    review
                                </button>


                                <div className="rating  rating-half p-2">
                                    {/* <input type="radio" name="rating-11" className="rating-hidden" /> */}
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400 w-2" aria-label={`${averageRating} star`} />
                                    {/* <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="1 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="1.5 star" defaultChecked />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="2 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="2.5 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="3 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="3.5 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="4 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="4.5 star" />
                                    <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="5 star" /> */}
                                </div>
                                <p>Total Review: {redata?.length}</p> ||

                                <p>Total Rating: {totalRatings}</p>

                            </div>
                        </div>

                        {/* 

                        {
                            setProducD(data)
                        } */}
                    </div>)
                }
                )
            }


            <PdfOpenModal pdf={producD.pdf}>
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            </PdfOpenModal>





            {showModal && (
                <div className="modal modal-open ">

                    <div className="modal-box max-w-4xl bg-gre " style={{ backgroundColor: "#baefba" }}>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        {/* <CashOnpurch cartItems={modalData} /> */}

                        <Reviewgetform rdata={reviewinfo}></Reviewgetform>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ProductsDetails;