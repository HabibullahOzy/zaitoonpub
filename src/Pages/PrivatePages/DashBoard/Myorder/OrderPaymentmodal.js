import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';

const OrderPaymentmodal = ({ paydata }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    // const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    const reviewData = paydata;
    // console.log(reviewData)

    const onSubmit = async (data) => {
        // console.log(data, rating)
        const rname = data.rname
        const payMethod = data.payMethod
        const transactionId = data.transId
        const paymentDate = data.paymdate
        const amount = data.payamount
        const paydescr = data.paydescr
        const paymentData = {
            rname,
            payMethod,
            transactionId,
            paymentDate,
            amount,
            paydescr
        }

        const res = await axios.put(`${process.env.REACT_APP_backendurl}/orderPaymentdata/${paydata}`, paymentData)
        // console.log(res)
        res?.status ? toast.success('Payment Data Added Successfully') : toast.error('Something went wrong, please try again later');
        reset();


    };

    return (
        <form
  onSubmit={handleSubmit(onSubmit)}
  className="max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-2xl space-y-6"
>
  <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 flex">
    {/* 💸  */}
    <FcMoneyTransfer />Payment Data Submission Form
  </h2>

  {/* Name Field */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      Name <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      {...register("rname", { required: true })}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter your name"
    />
    {errors.rname && <p className="text-red-500 text-sm mt-1">Name is required</p>}
  </div>

  {/* Payment Method */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      Payment Method <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      {...register("payMethod", { required: true })}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="e.g., Bkash, Nagad, Rocket"
    />
    {errors.payMethod && <p className="text-red-500 text-sm mt-1">Payment method is required</p>}
  </div>

  {/* Transaction ID */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      Transaction ID <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      {...register("transId", { required: true })}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter transaction ID"
    />
    {errors.transId && <p className="text-red-500 text-sm mt-1">Transaction ID is required</p>}
  </div>

  {/* Payment Date with Calendar Picker */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      Payment Date <span className="text-red-500">*</span>
    </label>
    <input
      type="date"
      {...register("paymdate", { required: true })}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
    {errors.paymdate && <p className="text-red-500 text-sm mt-1">Date is required</p>}
  </div>

  {/* Amount */}
  <div>
    <label className="block text-gray-700 font-medium mb-1">
      Amount <span className="text-red-500">*</span>
    </label>
    <input
      type="number"
      step="0.01"
      {...register("payamount", { required: true })}
      className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      placeholder="Enter amount (e.g., 500.00)"
    />
    {errors.payamount && <p className="text-red-500 text-sm mt-1">Amount is required</p>}
  </div>

  {/* Submit Button */}
  <button
    type="submit"
    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition duration-300"
  >
    ✅ Submit Payment
  </button>
</form>
    );
};

export default OrderPaymentmodal;