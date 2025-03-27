import React, { useState, useContext } from 'react';
import "./Products.css";
import { FaRegEye } from 'react-icons/fa';
import { FaCartFlatbed } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';

const Products = () => {
    const { user, setOffer, offer, cartdataset, setCartdataset } = useContext(Zaitooncontext);
    const navigate = useNavigate()


    console.log(cartdataset)
    const { data: allproducts = [], refetch } = useQuery({
        queryKey: ['allproducts'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allProducts');
            const data = await res.json()
            return data;

        }
    })



    // console.log(cartdataset)


    // console.log(users)

    const offerCalculate = (offp, pri) => {
        const offprice = (offp * pri) / 100
        const finalOffer = pri - offprice

        setOffer(finalOffer)
        // console.log(finalOffer);
    }

    const handleAddCart = (id) => {
        console.log(id)
        const email = user.email
        const name = cartdataset.name
        const image = cartdataset.img
        const productPrice = cartdataset.productPrice
        const catagory_id = cartdataset.catagory_id

        const cartProducts = {
            id,
            email,
            offer,
            name,
            image,
            productPrice,
            catagory_id
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
                    toast.success("Your Producte added succesfully");
                    // navigate('/dashboard/allProducts')
                } else {
                    toast.error("your producte can't added please try again")
                }
            })


    }

    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-10/12 py-6 mx-auto' style={{ color: "black" }}>


            {
                allproducts?.map(dataes => <div key={dataes._id} className="card glass">


                    {
                        dataes?.offers ? <span className=" example">{dataes.offers}%</span> : ""
                    }
                    <figure>

                        <Link to={`/products/${dataes._id}`}>

                            <img
                                src={dataes.img}
                                alt="car!" />

                        </Link>
                    </figure>


                    <div className="flex">
                        <button onClick={() => handleAddCart(dataes._id)} className="p-4 w-1/2 bg-green-200"><FaCartFlatbed className='w-8' /></button>

                        <Link to={`/products/${dataes._id}`} className="p-4 w-1/2 bg-green-300"><FaRegEye className=' justify-center w-8' /></Link>
                    </div>
                    <div className="card-body">
                        <p>{dataes.name}</p>

                        <h2 className="card-title"> الحروف العربية</h2>
                        <p>PLAY | الحضانة</p>

                        <div className="flex">

                            {
                                dataes?.offers ? <p className=' text-xl font-semibold text-gray-400' style={{ textDecoration: "line-through", textDecorationColor: "red" }}>{dataes.productPrice}৳</p> : ""
                            }


                            {
                                dataes?.offers ? <p className='text-2xl font-semibold text-red-400'>{offer}৳</p> : <p className=' font-semibold text-gray-400' >{dataes.productPrice}৳</p>
                            }


                        </div>

                    </div>

                    {
                        dataes?.offers ? offerCalculate(dataes.offers, dataes.productPrice) : ""
                    },
                    {
                        dataes?._id ? setCartdataset(dataes) : ""
                    }

                </div>
                )
            }




            {/* <div className="card glass">
                <span className=" example">00%</span>

                <figure>
                    <Link to={'/book1v1'}>
                        <img
                            src={imgbook}
                            alt="car!" />
                    </Link>
                </figure>

                <div className="flex">
                    {
                        users?.map(datas => <button key={datas._id} onClick={handleAddCart(datas._id)} className="p-4 w-1/2 bg-green-200"><FaCartFlatbed className='w-8' /></button>)
                    }

                    <Link to={'/book1v1'} className="p-4 w-1/2 bg-green-300"><FaRegEye className=' justify-center w-8' /></Link>
                </div>
                <div className="card-body">
                    <p>سلسلة الزيتون العربية للجميع - ١</p>

                    <h2 className="card-title"> الحروف العربية</h2>
                    <p>PLAY | الحضانة</p>

                    <div>
                        <p className=' font-semibold text-gray-400'>350.00৳</p>
                    </div>

                </div>
            </div>


            <div className="card glass">
                <span className=" example">00%</span>
                <Link to={'/abook2'}>
                    <figure>
                        <img
                            src={imgbook2}
                            alt="car!" />
                    </figure>
                </Link>

                <div className="flex ">
                    <Link to={''} className="w-1/2 p-4 bg-green-200"><FaCartFlatbed className='w-8' /></Link>
                    <Link to={'/abook2'} className="w-1/2 p-4 bg-green-300"><FaRegEye className=' justify-center w-8' /></Link>
                </div>
                <div className="card-body">
                    <p>سلسلة الزيتون العربية للجميع - ٢</p>
                    <h2 className="card-title"> الحروف العربية </h2>
                    <p>NURSERY | الروضة</p>
                    <p className='font-semibold text-gray-400'>350.00৳</p>
                </div>
            </div>



            <div className="card glass">
                <span className=" example">00%</span>
                <Link to={'/book3'}>
                    <figure>
                        <img
                            src={imgbook3}
                            alt="car!" />
                    </figure>
                </Link>

                <div className="flex">
                    <Link to={''} className="p-4 w-1/2 bg-green-200"><FaCartFlatbed className='w-8' /></Link>
                    <Link to={'/book3'} className="p-4 w-1/2 bg-green-300"><FaRegEye className=' justify-center w-8' /></Link>
                </div>
                <div className="card-body">
                    <p>سلسلة الزيتون العربية للجميع - ٣</p>
                    <h2 className="card-title">  الكلمات العربية </h2>
                    <p>KG | التمهيدي</p>
                    <p className='font-semibold text-gray-400'>450.00৳</p>
                </div>
            </div>


            <div className="card glass">
                <span className=" example">00%</span>
                <Link to={'/book4'}>
                    <figure>
                        <img
                            src={imgbook4}
                            alt="car!" />
                    </figure>
                </Link>

                <div className="flex">
                    <Link to={''} className="p-4 w-1/2 bg-green-200"><FaCartFlatbed className='w-8' /></Link>
                    <Link to={'/book4'} className="p-4 w-1/2 bg-green-300"><FaRegEye className=' justify-center w-8' /></Link>
                </div>
                <div className="card-body">

                    <h2 className="card-title">Muslim RhYmEs</h2>
                    <p className='font-semibold text-gray-400'>150.00৳</p>

                </div>
            </div>




            <div className="card glass">
                <span className=" example">00%</span>
                <Link to={'/book5'}>
                    <figure>
                        <img
                            src={imgbook5}
                            alt="car!" />
                    </figure>
                </Link>

                <div className="">
                    <button className="p-4 w-1/2 bg-green-200"><FaCartFlatbed className='w-8' /></button>
                    <Link to={'/book5'}><button className="p-4 w-1/2 bg-green-300"><FaRegEye className=' justify-center w-8' /></button></Link>
                </div>
                <div className="card-body">

                    <h2 className="card-title">Bangla Rhymes</h2>
                    <p className=' font-semibold text-gray-400'>200.00৳</p>

                </div>
            </div> */}


        </div>
    );
};

export default Products;