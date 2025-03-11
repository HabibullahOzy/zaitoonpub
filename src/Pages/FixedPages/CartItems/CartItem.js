import React, { useState } from 'react';

const CartItem = () => {
    const [count, setCount] = useState(1)
const [prices, setPrices]=useState(0)
    console.log(prices)
    // let prev = 0;
    // {
    //     setPrices(count*10.50) 
    // }

    // if(count=10){
    //     let free= setCount((prev)=>prev-1)
    //     return setPrices(free)
    // }
  
    
    return (
        <div className="overflow-x-auto text-black min-h-screen pt-14">

            <h1 className=' text-center font-bold text-2xl'>Your Cart Products List</h1>
            <table className="table">
                {/* head */}
                <thead className='text-black text-lg font-bold'>
                    <tr>
                        <th>

                        </th>
                        <th>Product Name</th>
                        <th>Details</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>
                            1
                        </th>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Hart Hagerty</div>
                                    <div className="text-sm opacity-50">United States</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            Zemlak, Daniel and Leannon
                            <br />
                            <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                        </td>
                        <td>
                            <button onClick={() => setCount((prev)=>prev-1)} className='btn btn-circle btn-xs btn-success text-white font-extrabold '> - </button> <span className='m-3'> {count} </span> <button onClick={() => setCount((prev)=>prev+1)} className='btn btn-circle btn-xs btn-success text-white font-extrabold '> + </button>
                        </td>
                        <td>
                            ৳ {prices}
                        </td>
                        <th>
                            <button className="btn btn-primary btn-xs">Update</button>
                        </th>
                        <th>
                            <button className="btn btn-error btn-xs">Delete</button>
                        </th>

                       
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>
                            2
                        </th>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Brice Swyre</div>
                                    <div className="text-sm opacity-50">China</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            Carroll Group
                            <br />
                            <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                        </td>
                        <td>Red</td>
                        <th>
                            <button className="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th>
                            3
                        </th>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Marjy Ferencz</div>
                                    <div className="text-sm opacity-50">Russia</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            Rowe-Schoen
                            <br />
                            <span className="badge badge-ghost badge-sm">Office Assistant I</span>
                        </td>
                        <td>Crimson</td>
                        <th>
                            <button className="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                    {/* row 4 */}
                    <tr>
                        <th>
                            4
                        </th>
                        <td>
                            <div className="flex items-center gap-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle h-12 w-12">
                                        <img
                                            src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                            alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">Yancy Tear</div>
                                    <div className="text-sm opacity-50">Brazil</div>
                                </div>
                            </div>
                        </td>
                        <td>
                            Wyman-Ledner
                            <br />
                            <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
                        </td>
                        <td>Indigo</td>
                        <th>
                            <button className="btn btn-ghost btn-xs">details</button>
                        </th>
                    </tr>
                </tbody>
                {/* foot */}
                <tfoot >
                        <tr className='mt-10'>

                            
                        <th>
                            <button className="btn btn-success btn-xs">Go to Payment</button>
                        </th>
                        <th>
                            <button className="btn btn-success btn-xs">Cash On purchages</button>
                        </th>
                        </tr>
                    </tfoot>
            </table>
        </div>
    );
};

export default CartItem;