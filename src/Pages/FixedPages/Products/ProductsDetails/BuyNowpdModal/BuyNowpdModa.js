import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Zaitooncontext } from '../../../../../SecureContext/ContextAuth';


const BuyNowpdModa = ({ dataes }) => {
    // const dataes =dataes
    const { user, localDeviceId } = useContext(Zaitooncontext);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const [quantity, setQuantity] = useState(1);
    const [subPrice, setSubPrice] = useState(0);
    const deliveryCharge = 150;
    const [totalPrice, setTotalPrice] = useState(0);

    const offerPrice = dataes?.offerprice
        ? Math.round(dataes?.productPrice - (dataes?.offerprice * dataes?.productPrice) / 100)
        : dataes?.productPrice;

    // Update subtotal and total price when quantity changes
    useEffect(() => {
        const subtotal = offerPrice * quantity;
        setSubPrice(subtotal);
        setTotalPrice(subtotal + deliveryCharge);
    }, [quantity, offerPrice]);

    const handleQuantityChange = (change) => {
        setQuantity((prev) => Math.max(1, prev + change));
    };

    const orderDate = new Date().toLocaleString("en-BD", {
        timeZone: "Asia/Dhaka",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const emaile = user?.email || localDeviceId()

    const orderConfirmation = async (data) => {


        const buynowdata = {
            name: data.name,
            email: emaile,
            phonenumber: data.phonenum,
            // alphonenumber: data.alphonenum,
            // nationality: data.nationality,
            // city: data.city,
            // area: data.area,
            dlocation: data.dlocation,
            ordnote: data.ordnote,
            totalPrice,
            productdata: [{
                ProductCode: dataes?.ProductCode,
                authorName: dataes?.authorName,
                category: dataes?.category,
                edition: dataes?.edition,
                image: dataes?.image,
                namearb: dataes?.namearb,
                nameeng: dataes?.nameeng,
                namebn: dataes?.namebn,
                offerprice: dataes?.offerprice,
                productPrice: dataes?.productPrice,
                offer: offerPrice,
                total: subPrice,
                quantity,
                _id: dataes?._id,
            }],
            orderDate,
            status: "pending",
        };


        try {
            const response = await axios.post(`${process.env.REACT_APP_backendurl}/purchage`, buynowdata);
            if (response?.data?.insertedId) {
                toast.success("Order Successfully Placed!!");
                navigate(`/myorder/${emaile}`);
            } else {
                toast.error("Order NOT Placed, Please Try again");
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="w-full min-h-screen px-4" style={{ backgroundColor: "#baefba" }}>
            <h1 className="text-center font-bold text-xl text-gray-800">অর্ডার করুন ~ ক্যাশ অন ডেলিভারিতে</h1>
            <hr className="border-2 border-gray-300 w-full mx-auto my-4" />

            <div className="max-w-full mx-auto">
                {/* Shipping Form */}
                <form onSubmit={handleSubmit(orderConfirmation)} className="bg-white p-6 shadow-md rounded-xl space-y-6">
                    <div className='flex justify-between'>
                        <div>
                            <img src={dataes?.image} className='w-20 avatar' alt="" />
                            <p className='text-black'>{dataes?.namebn}</p>
                        </div>
                        <div className="flex items-center justify-center gap-2">
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(-1)}
                                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                -
                            </button>
                            <span className="text-lg font-bold">{quantity}</span>
                            <button
                                type="button"
                                onClick={() => handleQuantityChange(1)}
                                className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                            >
                                +
                            </button>
                        </div>
                    </div>


                    {/* Order Summary */}
                    <div className="bg-white p-6 shadow-md rounded-xl h-fit">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>

                        <div className="space-y-4 text-gray-700 text-base">
                            <div className="flex justify-between">
                                <span>প্রতি পিস</span>
                                <span>{offerPrice}৳</span>
                            </div>
                            <div className="flex justify-between">
                                <span>পরিমাণ</span>
                                <span>{quantity}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>মোট</span>
                                <span>{subPrice}৳</span>
                            </div>
                            <div className="flex justify-between">
                                <span>ডেলিভারি চার্জ</span>
                                <span>{deliveryCharge}৳</span>
                            </div>
                            <hr className="my-4 border-gray-300" />
                            <div className="flex justify-between text-lg font-bold text-gray-800">
                                <span>সর্বমোট </span>
                                <span>{totalPrice}৳</span>
                            </div>
                        </div>

                        {/* <button
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
            onClick={handleSubmit(orderConfirmation)}
          >
            Proceed to Checkout
          </button> */}
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">নাম <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("name")} className="w-full input input-bordered" placeholder='আপনার নাম' />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">মোবাইল নাম্বার <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("phonenum")} className="w-full input input-bordered" placeholder='১১ ডিজিট মোবাইল নাম্বার' />
                    </div>
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Phone Number <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("alphonenum")} className="w-full input input-bordered" />
                    </div> */}

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ইমেইল</label>
                        <input required type="email" value={emaile} readOnly className="w-full input input-bordered" />
                    </div> */}
                    {/* 
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("nationality")} className="w-full input input-bordered" />
                    </div> */}
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("city")} className="w-full input input-bordered" />
                    </div> */}

                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Area <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("area")} className="w-full input input-bordered" />
                    </div> */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">ঠিকানা <span className='text-red-600'>*</span></label>
                        <textarea
                            required
                            {...register("dlocation")}
                            className="w-full input input-bordered h-24"
                            placeholder="আপনার সম্পূর্ণ ঠিকানা দিন"
                        ></textarea>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">অর্ডার নোট </label>
                        <textarea
                            {...register("ordnote")}
                            className="w-full input input-bordered h-24"
                            placeholder="বিশেষ কিছু বলতে চাইলে লিখুন"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-success w-full mt-4 text-white" >
                        অর্ডারটি নিশ্চিত করুন <span className=''>৳{totalPrice}</span>
                    </button>
                    <p>আমাদের একজন কাস্টমার প্রতিনিধি আপনাকে কল করে আবার কনফার্ম হবে</p>
                </form>


            </div>
        </div>


    );
};

export default BuyNowpdModa;



// <div className='w-full'>
//     <div className='' >
//         <h1 className='text-center font-bold text-xl m-10'>Shiping Address</h1>
//         <form onSubmit={handleSubmit(orderConfirmation)} className='pl-16'>

//             <div className="container ">
//                 <input required type="text" {...register("prodQnt", { required: true })} className="input"></input>
//                 <label className="label">Product Quantity</label>
//             </div>

//             <div className="container mt-8">
//                 <input required type="text" {...register("name", { required: true })} className="input"></input>
//                 <label className="label">Username</label>
//             </div>

//             <div className='lg:flex lg:gap-7'>
//                 <div className="container mt-8">
//                     <input required type="text" {...register("phonenum", { required: true })} className="input"></input>
//                     <label className="label">Phone Number</label>
//                 </div>


//                 <div className="container mt-8">
//                     <input required type="text" {...register("alphonenum", { required: true })} className="input"></input>
//                     <label className="label">Alternative Phone Number</label>
//                 </div>
//             </div>


//             <div className="container mt-8">
//                 <input required type="email" {...register("email", { required: true })} className="input" value={user.email}></input>
//                 <label className="label">email</label>
//             </div>

//             <div className='lg:flex lg:gap-7'>
//                 <div className="container mt-8">
//                     <input required type="text" {...register("nationality", { required: true })} className="input" ></input>
//                     <label className="label">Nationality</label>
//                 </div>

//                 <div className="container mt-8">
//                     <input required type="text" {...register("city", { required: true })} className="input" ></input>
//                     <label className="label">City</label>
//                 </div>
//             </div>

//             <div className="container mt-8">
//                 <input required type="text" {...register("area")} className="input" ></input>
//                 <label className="label">Area</label>
//             </div>

//             <div className="container mt-8 lg:tooltip tooltip-neutral" data-tip="বাসা/ফ্লাট নাম্বার, মহল্লা নাম, পরিচিত এলাকা উল্লেখ করুন">
//                 <textarea required type="text" {...register("dlocation", { required: true })} className="input h-11" ></textarea>
//                 <label className="label" >Address</label>
//             </div>

//             <div className="form-control mt-6">
//                 <button className="btn btn-success">Order Confirm</button>
//             </div>
//         </form>
//     </div>
// </div>