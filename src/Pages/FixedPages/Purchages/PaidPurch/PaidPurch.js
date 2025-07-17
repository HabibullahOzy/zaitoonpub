import React, { useContext } from 'react';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import toast from 'react-hot-toast';

const PaidPurch = ({ cartpaidItems }) => {
    const { user, prices } = useContext(Zaitooncontext);
    const navigate = useNavigate()
    const dataes = cartpaidItems



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

    const handlePayment = async (data) => {
        try {
            const name = data.name;
            const email = data.email;
            const phonenumber = data.phonenum;
            const alphonenumber = data.alphonenum;
            const nationality = data.nationality;
            const city = data.city;
            const area = data.area;
            const dlocation = data.dlocation;

            const totalPrice = prices;
            const role = "paidPurchages";
            const status = "pending";
            const paymentData = {
                name,
                email,
                phonenumber,
                alphonenumber,
                nationality,
                city,
                area,
                dlocation,
                dataes,
                totalPrice,
                orderDate,
                role,
                status

            }
            const response = await axios.post(`${process.env.REACT_APP_backendurl}/api/payment/initiate`, paymentData);

            if (response.data.url) {
                window.location.href = response.data.url; // Redirect to SSLCOMMERZ
            }
        } catch (error) {
            console.error('Payment initiation failed:', error);
        }
    };
    // const orderConfirmation = async (data) => {

    //     console.log(data)

    //     const name = data.name;
    //     const email = data.email;
    //     const phonenumber = data.phonenum;
    //     const alphonenumber = data.alphonenum;
    //     const nationality = data.nationality;
    //     const city = data.city;
    //     const area = data.area;
    //     const dlocation = data.dlocation;
    //     // const productdata= dataes;
    //     const totalPrice =prices;
    //     const role = "cashOnpurchages";
    //     const status= "pending"
    //     // console.log(productdata)

    //     const cashOndata = {
    //         name,
    //         email,
    //         phonenumber,
    //         alphonenumber,
    //         nationality,
    //         city,
    //         area,
    //         dlocation,
    //         totalPrice,
    //         // productdata,
    //         orderDate,
    //         role,
    //         status
    //     }

    //     try {
    //         const response = await axios.post(`${process.env.REACT_APP_backendurl}/purchage`, cashOndata)

    //         if (response?.data?.insertedId) {
    //             toast.success("Order Successfully Placed!!");
    //             navigate(`/myorder/${user.email}`)
    //         } else {
    //             toast.error("Order NOT Placed, Please Try again")
    //         }

    //         console.log(response.data);
    //     }
    //     catch (error) {
    //         console.log(error.massage)
    //     }


    // }
    return (
        <div className='w-full'>
            <div className='' >
                <h1 className='text-center font-bold text-xl m-10'>Shiping Address for Paid Purchages</h1>
                <form onSubmit={handleSubmit(handlePayment)} className='pl-16'>
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
                        <button className="btn btn-success">Pay Now</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default PaidPurch;
