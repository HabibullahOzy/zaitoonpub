import React from 'react';
import "./Products.css";
import { FaRegEye } from 'react-icons/fa';
import imgbook from "../../../assets/book.jpg";
import imgbook2 from "../../../assets/book2.jpg";
import imgbook3 from "../../../assets/book3.jpg"
import imgbook4 from "../../../assets/zaitbook3.png"
import imgbook5 from "../../../assets/upcom1.jpg"
import { FaCartFlatbed } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Products = () => {
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 w-10/12 py-6 mx-auto'>
            <div className="card glass">
                <Link to={'/book1v1'}>
                    <figure>
                        <img
                            src={imgbook}
                            alt="car!" />
                    </figure>
                </Link>

                <div className="flex">
                    <Link to={''} className="p-4 w-1/2 bg-green-200"><FaCartFlatbed className='w-8' /></Link>
                    <Link to={'/book1v1'} className="p-4 w-1/2 bg-green-300"><FaRegEye className=' justify-center w-8' /></Link>
                </div>
                <div className="card-body">
                    <p>سلسلة الزيتون العربية للجميع - ١</p>

                    <h2 className="card-title"> الحروف العربية</h2>
                    <p>PLAY | الحضانة</p>

                    <p className=' font-semibold text-gray-400'>350.00৳</p>

                </div>
            </div>


            <div className="card glass">
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
                <figure>
                    <img
                        src={imgbook5}
                        alt="car!" />
                </figure>

                <div className="">
                    <button className="p-4 w-1/2 bg-green-200"><FaCartFlatbed className='w-8' /></button>
                    <button className="p-4 w-1/2 bg-green-300"><FaRegEye className=' justify-center w-8' /></button>
                </div>
                <div className="card-body">

                    <h2 className="card-title">Upcoming</h2>
                    <p>How to Add your cart at your cartlist?</p>

                </div>
            </div>


        </div>
    );
};

export default Products;