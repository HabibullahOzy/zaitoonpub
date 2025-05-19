import React, { useContext } from 'react';
import './CashOnpurch.css';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CashOnpurch = ({cartItems}) => {
    const { user } = useContext(Zaitooncontext);
    const navigate =useNavigate()
    const dataes = cartItems
    console.log(dataes)

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


    const orderConfirmation = async (data) => {

        console.log(data)

        const name = data.name;
        const email = data.email;
        const phonenumber = data.phonenum;
        const alphonenumber = data.alphonenum;
        const nationality = data.nationality;
        const city = data.city;
        const area = data.area;
        const dlocation = data.dlocation;
        const productdata= dataes;
        const role = "cashOnpurchages";
        // console.log(productdata)

        const cashOndata = {
            name,
            email,
            phonenumber,
            alphonenumber,
            nationality,
            city,
            area,
            dlocation,
            productdata,
            orderDate,
            role
        }

        try {
            const response = await axios.post("http://localhost:5000/purchage", cashOndata)

            if (response?.data?.insertedId) {
                toast.success("Order Successfully Placed!!");
                navigate(`/dashboard/myorder/${user.email}`)
            } else {
                toast.error("Order NOT Placed, Please Try again")
            }

            console.log(response.data);
        }
        catch (error) {
            console.log(error.massage)
        }


    }
    return (
        <div className='w-full'>
            <div className='' >
                <h1 className='text-center font-bold text-xl m-10'>Shiping Address for CashOn Purchages</h1>
                <form onSubmit={handleSubmit(orderConfirmation)} className='pl-16'>
                    <div className="container ">
                        <input required type="text" {...register("name", { required: true })} className="input"></input>
                        <label className="label">Username</label>
                    </div>

                    <div className='lg:flex lg:gap-7'>
                        <div className="container mt-8">
                            <input required type="text" {...register("phonenum", { required: true })} className="input"></input>
                            <label className="label">Phone Number</label>
                        </div>


                        <div className="container mt-8">
                            <input required type="text" {...register("alphonenum", { required: true })} className="input"></input>
                            <label className="label">Alternative Phone Number</label>
                        </div>
                    </div>


                    <div className="container mt-8">
                        <input required type="email" {...register("email", { required: true })} className="input" value={user.email}></input>
                        <label className="label">email</label>
                    </div>

                    <div className='lg:flex lg:gap-7'>
                        <div className="container mt-8">
                            <input required type="text" {...register("nationality", { required: true })} className="input" ></input>
                            <label className="label">Nationality</label>
                        </div>

                        <div className="container mt-8">
                            <input required type="text" {...register("city", { required: true })} className="input" ></input>
                            <label className="label">City</label>
                        </div>
                    </div>

                    <div className="container mt-8">
                        <input required type="text" {...register("area")} className="input" ></input>
                        <label className="label">Area</label>
                    </div>

                    <div className="container mt-8 lg:tooltip tooltip-neutral" data-tip="বাসা/ফ্লাট নাম্বার, মহল্লা নাম, পরিচিত এলাকা উল্লেখ করুন">
                        <textarea required type="text" {...register("dlocation", { required: true })} className="input h-11" ></textarea>
                        <label className="label" >Address</label>
                    </div>

                    <div className="form-control mt-6">
                        <button className="btn btn-success">Order Confirm</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CashOnpurch;