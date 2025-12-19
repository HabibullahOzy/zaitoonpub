import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';


const BuyNowModal = ({ datas, deviceId }) => {
    const { user } = useContext(Zaitooncontext);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();

    const [quantity, setQuantity] = useState(1);
    const [subPrice, setSubPrice] = useState(0);
    const deliveryCharge = 150;
    const [totalPrice, setTotalPrice] = useState(0);


    const offerPrice = datas?.offerprice
        ? Math.round(datas?.productPrice - (datas?.offerprice * datas?.productPrice) / 100)
        : datas?.productPrice;

    // Update subtotal and total price when quantity changes
    useEffect(() => {
        const subtotal = offerPrice * quantity;
        setSubPrice(subtotal);
        setTotalPrice(subtotal + deliveryCharge);
    }, [quantity, offerPrice]);

    // const handleQuantityChange = (change) => {
    //     setQuantity((prev) => Math.max(1, prev + change));
    // };

    const handleQuantityChange = (change) => {
    setQuantity(prev => ({
      ...prev,
      ['']: Math.max(1, (prev || 1) + change),
    }));
  };

  // Handle manual input
  const handleQuantityInput = (value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      setQuantity(prev => ({
        ...prev, '': num,
      }));
    } else if (value === "") {
      // allow clearing input temporarily
      setQuantity(prev => ({
        ...prev,
      }));
    }
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

    const email =user?.email || deviceId

    const orderConfirmation = async (data) => {
        const buynowdata = {
            name: data.name,
            email: email,
            phonenumber: data.phonenum,
            // alphonenumber: data.alphonenum,
            nationality: data.nationality,
            city: data.city,
            area: data.area,
            dlocation: data.dlocation,
            totalPrice,
            productdata: [{
                ProductCode: datas?.ProductCode,
                authorName: datas?.authorName,
                category: datas?.category,
                edition: datas?.edition,
                image: datas?.image,
                namearb: datas?.namearb,
                nameeng: datas?.nameeng,
                namebn: datas?.namebn,
                offerprice: datas?.offerprice,
                // productPrice: datas?.productPrice,
                offer: offerPrice,
                total: subPrice,
                quantity,
                _id: datas?._id,
            }],
            orderDate,
            status: "pending",
        };

        try {
            const response = await axios.post(`${process.env.REACT_APP_backendurl}/purchage`, buynowdata);
            if (response?.data?.insertedId) {
                toast.success("Order Successfully Placed!!");
                navigate(`/myorder/${email}`);
                navigate('/')
            } else {
                toast.error("Order NOT Placed, Please Try again");
            }
        } catch (error) {
            console.error(error.message);
        }
    };


    return (
        <div className="w-full min-h-screen py-10 px-4" style={{ backgroundColor: "#baefba" }}>
            <h1 className="text-center font-bold text-3xl mb-10 text-gray-800">Shipping Address</h1>

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Shipping Form */}
                <form onSubmit={handleSubmit(orderConfirmation)} className="bg-white p-6 shadow-md rounded-xl space-y-6">
                    <div className="flex items-center justify-center gap-2">
                         <button
                          onClick={() => handleQuantityChange(-1)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          -
                        </button>

                        <input
                          type="number"
                          min="1"
                          value={quantity || 1}
                          onChange={(e) => handleQuantityInput(e.target.value)}
                          className="w-24 text-center rounded rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        <button
                          onClick={() => handleQuantityChange(1)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          +
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("name")} className="w-full input input-bordered" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("phonenum")} className="w-full input input-bordered" />
                    </div>
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Phone Number <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("alphonenum")} className="w-full input input-bordered" />
                    </div> */}

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input required type="email" value={user?.email} readOnly className="w-full input input-bordered" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nationality <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("nationality")} className="w-full input input-bordered" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("city")} className="w-full input input-bordered" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Area <span className='text-red-600'>*</span></label>
                        <input required type="text" {...register("area")} className="w-full input input-bordered" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Address <span className='text-red-600'>*</span></label>
                        <textarea
                            required
                            {...register("dlocation")}
                            className="w-full input input-bordered h-24"
                            placeholder="বাসা/ফ্লাট নাম্বার, মহল্লা নাম, পরিচিত এলাকা"
                        ></textarea>
                    </div>

                    <button type="submit" className="btn btn-success w-full mt-4 tooltip tooltip-open tooltip-success" data-tip="অর্ডারটি নিশ্চিত করুন" >Order Confirm {totalPrice}৳</button>
                </form>

                {/* Order Summary */}
                <div className="bg-white p-6 shadow-md rounded-xl h-fit">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>

                    <div className="space-y-4 text-gray-700 text-base">
                        <div className="flex justify-between">
                            <span>Unit Price</span>
                            <span>{offerPrice}৳</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Quantity</span>
                            <span>{quantity}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>{subPrice}৳</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Online Fee</span>
                            <span>{deliveryCharge}৳</span>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className="flex justify-between text-lg font-bold text-gray-800">
                            <span>Payable Total</span>
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
            </div>
        </div>

    );
};

export default BuyNowModal;


// <div className="w-full bg-gray-50 min-h-screen py-10 px-4">
//     <h1 className="text-center font-bold text-3xl mb-10 text-gray-800">Shipping Address</h1>

//     <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Shipping Form */}
//         <form onSubmit={handleSubmit(orderConfirmation)} className="bg-white p-6 shadow-md rounded-xl space-y-6">
//             <div className="flex items-center justify-center gap-2">
//                 <button
//                   onClick={() => handleQuantityChange(-1)}
//                   className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   -
//                 </button>
//                 <span>{quantities}</span>
//                 <button
//                   onClick={() => handleQuantityChange(1)}
//                   className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                 >
//                   +
//                 </button>
//               </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//                 <input required type="text" {...register("name")} className="w-full input input-bordered" />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
//                 <input required type="text" {...register("phonenum")} className="w-full input input-bordered" />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Phone Number</label>
//                 <input required type="text" {...register("alphonenum")} className="w-full input input-bordered" />
//             </div>


//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
//                 <input required type="email" value={user.email} {...register("email")} className="w-full input input-bordered" />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
//                 <input required type="text" {...register("nationality")} className="w-full input input-bordered" />
//             </div>
//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
//                 <input required type="text" {...register("city")} className="w-full input input-bordered" />
//             </div>


//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Area</label>
//                 <input required type="text" {...register("area")} className="w-full input input-bordered" />
//             </div>

//             <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
//                 <textarea
//                     required
//                     {...register("dlocation")}
//                     className="w-full input input-bordered h-24"
//                     placeholder="বাসা/ফ্লাট নাম্বার, মহল্লা নাম, পরিচিত এলাকা"
//                 ></textarea>
//             </div>

//             <button type="submit" className="btn btn-success w-full mt-4">Order Confirm</button>
//         </form>

//         {/* Order Summary */}
//         <div className="bg-white p-6 shadow-md rounded-xl h-fit">
//             <h2 className="text-2xl font-semibold text-gray-800 mb-6">Order Summary</h2>

//             <div className="space-y-4 text-gray-700 text-base">
//                 <div className="flex justify-between">
//                     <span>Subtotal</span>
//                     <span>{offerPrice}৳</span>
//                 </div>
//                 <div className="flex justify-between">
//   <span>Quantity</span>
//   <span className="text-green-600">- {quantities}৳</span>
// </div>
//                 <div className="flex justify-between">
//                     <span>Online Fee</span>
//                     <span>150</span>
//                 </div>

//                 <hr className="my-4 border-gray-300" />

//                 <div className="flex justify-between text-lg font-bold text-gray-800">
//                     <span>SubTotal</span>
//                     <span>{subPrice}৳</span>
//                 </div>

//                 <div className="flex justify-between text-lg font-bold text-gray-800">
//                     <span>Total</span>
//                     <span>{totalPrice}৳</span>
//                 </div>
//             </div>

//             <button
//                 className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition duration-300"
//             >
//                 Proceed to Checkout
//             </button>
//         </div>
//     </div>
// </div>