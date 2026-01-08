import React, { useContext } from 'react';
import './CashOnpurch.css';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';

const CashOnpurch = ({ cartItems, setShowModal }) => {
  const { user, prices, localDeviceId } = useContext(Zaitooncontext);
  const navigate = useNavigate()
  const dataes = cartItems



  const { register, handleSubmit, formState: { errors } } = useForm();

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


    const name = data.name;
    const email = emaile;
    const phonenumber = data.phonenum;
    // const alphonenumber = data.alphonenum;
    // const nationality = data.nationality;
    // const city = data.city;
    const ordnote = data.ornote;
    const dlocation = data.dlocation;
    const productdata = dataes;
    const totalPrice = prices;
    // const role = "cashOnpurchages";
    const status = "pending"

    const cashOndata = {
      name,
      email,
      phonenumber,
      // alphonenumber,
      // nationality,
      // city,
      // area,
      dlocation,
      ordnote,
      totalPrice,
      productdata,
      orderDate,
      // role,
      status
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_backendurl}/purchage`, cashOndata)

      if (response?.data?.insertedId) {
        toast.success("Order Successfully Placed!!");
        setShowModal(false)

         // 🚀 clear modal
        setShowModal(false);

        //  Clear cart from backend
      await axios.delete(
        `${process.env.REACT_APP_backendurl}/cart/clear/${email}`
      );

        navigate(`/myorder/${emaile}`)
        // 🚀 instantly refresh cart
        QueryClient.invalidateQueries(["cartItems", email]);

      } else {
        toast.error("Order NOT Placed, Please Try again")
      }

    }
    catch (error) {
      console.error(error.massage)
    }


  }
  return (
    <div className="w-full bg-[#baefba]">
      <h1 className="text-center font-bold text-xl text-gray-800">অর্ডার করুন ~ ক্যাশ অন ডেলিভারিতে</h1>
      <hr className="border-2 border-gray-300 w-full mx-auto my-4" />
      <div className="max-w-5xl mx-auto">
        <form
          onSubmit={handleSubmit(orderConfirmation)}
          className=" p-6 rounded-xl shadow-lg grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              নাম <span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              {...register("name")}
              className="w-full input border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder='আপনার নাম'
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              মোবাইল নাম্বার <span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              {...register("phonenum")}
              className="w-full border input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder='১১ ডিজিট মোবাইল নাম্বার'
            />
          </div>

          {/* Alt Phone */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Alternative Phone Number <span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              {...register("alphonenum")}
              className="w-full border input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div> */}

          {/* Email */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={emaile}
              readOnly
              className="w-full input bg-gray-100 border rounded-lg px-3 py-2 text-gray-600"
            />
          </div> */}

          {/* Nationality */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nationality <span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              {...register("nationality")}
              className="w-full border input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div> */}

          {/* City */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              {...register("city")}
              className="w-full border input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div> */}

          {/* Area */}
          {/* <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Area <span className="text-red-600">*</span>
            </label>
            <input
              required
              type="text"
              {...register("area")}
              className="w-full border input rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div> */}

          {/* Full Address */}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ঠিকানা <span className="text-red-600">*</span>
            </label>
            <textarea
              required
              {...register("dlocation")}
              className="w-full border input rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="আপনার বাসার সম্পূর্ণ ঠিকানা দিন"
            ></textarea>
          </div>



          {/* Full Address */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              অর্ডার নোট
            </label>
            <textarea
              {...register("ornote")}
              className="w-full border input rounded-lg px-3 py-2 h-24 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="বিশেষ কিছু বলতে চাইলে লিখুন............"
            ></textarea>
          </div>

          {/* Submit button full width below the form */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white text-lg font-semibold py-3 rounded-lg transition-all duration-300"
            >
              অর্ডার কনফার্ম করুন ৳{prices}
            </button>
            <p className='text-center text-gray-500 p-3'>আমাদের একজন কাস্টমার প্রতিনিধি আপনাকে কল করে আবার কনফার্ম হবে</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CashOnpurch;