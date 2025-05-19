import React, { useContext, useState } from 'react';
import { Table, TableBody, td, TableHead, th, TableRow } from "flowbite-react";
// import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import axios from 'axios';
import toast from 'react-hot-toast';


const CashonPlaced = () => {


    const { data: cashonprod = [], refetch } = useQuery({
        queryKey: ['cashonprod'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/cashonpurchage/cashOnpurchages');
            const data = await res.json()
            return data;

        }
    })



    const handleUpdateOrder =async (id) => {
       const response=await axios.put(`http://localhost:5000/orderStatus/${id}`)
       response?.statusText ? toast.success("Order Placed !!!") : toast.error("Order not placed, please try again")
    }

    console.log(cashonprod)

    return (
        <div className="" style={{ backgroundColor: "rgb(186, 239, 186)" }}>
            <div className="overflow-x-auto text-black min-h-screen pt-14">

                <h1 className=' text-center font-bold text-2xl'>Products List</h1>
                <table className="table overflow-x-auto table-zebra-zebra">
                    {/* head */}


                    <thead className='text-black text-lg font-bold'>
                        <tr>
                            <th></th>
                            <th>Product name</th>
                            <th>Product Code</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total Price</th>
                            <th className='table-pin-cols'>Customer Name</th>
                            <th>phone Number</th>
                            <th>alt:phone Number</th>
                            <th>Location</th>
                            <th>Status</th>

                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}

                        {
                            cashonprod?.map((cashdata, i) =>

                                cashdata?.productdata?.map((prodata, j) => <tr key={`${cashdata._id}-${j}`}>

                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={`http://localhost:5000/uploads/${prodata.image}`}
                                                    alt="Avatar" />
                                            </div>
                                            <span className='pl-1'>{prodata.name}</span>
                                        </div>
                                    </td>
                                    <td>{prodata?.productCode}</td>
                                    <td>{prodata?.category}</td>
                                    <td>{prodata.quantity}</td>
                                    <td>
                                        {prodata.offer}
                                    </td>
                                    <td>{`${prodata?.total}`}</td>
                                    <td>{cashdata.name}</td>
                                    <td>{cashdata.phonenumber}</td>
                                    <td>{cashdata.alphonenumber}</td>
                                    <td>{cashdata?.dlocation}<br />{cashdata.nationality}<br />{cashdata.city}<br />{cashdata.area}</td>

                                    <td>
                                        {
                                            cashdata?.status ? <p className='bg-green-300 text-white p-3 text-xl text-center rounded-md'>Order placed</p> : <button onClick={() => { handleUpdateOrder(cashdata._id) }} className="btn btn-sm font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                            Update
                                        </button>
                                        }
                                    </td>
                                </tr>)
                            )

                        }


                    </tbody>
                    {/* foot */}
                    {/* <tfoot>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Job</th>
                            <th>Favorite Color</th>
                            <th></th>
                        </tr>
                    </tfoot> */}
                </table>
            </div>
        </div>
    );
};

export default CashonPlaced;
