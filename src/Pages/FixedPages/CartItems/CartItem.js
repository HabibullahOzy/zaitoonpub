import { useQuery } from '@tanstack/react-query';
import React, { useState, useContext } from 'react';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import toast from 'react-hot-toast';

const CartItem = () => {

    const { user, prices, setPrices, setIdent, ident } = useContext(Zaitooncontext)
    const [count, setCount] = useState(1)

    console.log(ident)

    // const id = ident.id;

    // console.log(prices)
    // let prev = 0;
    // {
    //     setPrices(count*10.50) 
    // }

    // if(count=10){
    //     let free= setCount((prev)=>prev-1)
    //     return setPrices(free)
    // }

    const handleDelete = id => {
        console.log(id)
        fetch(`http://localhost:5000/cartItem/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success("Seller Delet successfully");
                    refetch();
                }
            })
    }





    const { data: cartItems = [], refetch } = useQuery({
        queryKey: ['cartItems'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/addedCart/${user.email}`);
            const data = await res.json()
            return data;

        }
    })

    console.log(cartItems)
    return (
        <div className="overflow-x-auto text-black min-h-screen w-10/12 mx-auto pt-14">
            <h1 className=' text-center font-bold text-2xl'>Your Cart Products List</h1>
            <div className="flex">

                <table className="table lg:w-2/3">
                    {/* head */}
                    <thead className='text-black text-lg font-bold '>
                        <tr>
                            <th>

                            </th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cartItems?.map((cartInfo, i) => <tr key={i}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={cartInfo.image}
                                                    alt="Avatar " />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{cartInfo.name}</div>
                                            <div className="text-sm opacity-50"><td>
                                                ৳ {
                                                    cartInfo?.offer ? (cartInfo.offer) : (cartInfo.productPrice)
                                                }

                                            </td></div>
                                        </div>
                                    </div>
                                </td>

                                <td>
                                    <button onClick={() => setCount((prev) => prev - 1)} className='btn btn-circle btn-xs btn-success text-white font-extrabold '> - </button> <span className='m-3'> {count} </span> <button onClick={() => setCount((prev) => prev + 1)} className='btn btn-circle btn-xs btn-success text-white font-extrabold '> + </button>
                                </td>
                                <td>
                                    ৳ {
                                        cartInfo?.offer ? (count * cartInfo.offer) : (count * cartInfo.productPrice)
                                    }

                                </td>

                                <th>
                                    <button className="btn btn-error btn-xs" onClick={() => handleDelete(cartInfo._id)}>Delete</button>
                                </th>

                                {
                                    cartInfo?.offer ? setPrices(count * cartInfo.offer) : setPrices(count * cartInfo.productPrice)
                                },
                                {
                                    setIdent(i + 1)
                                }
                            </tr>)


                        }
                    </tbody>
                    {/* foot */}

                </table>

                <div className="border border-x-2 bg-green-200 rounded-lg m-auto w-96 p-5">
                    <h1 className="text-center">Pricing Summery</h1>
                    <table className="table ">
                        <tr className="flex justify-between p-2"><p>Subtotal:</p><p>{prices}</p> </tr><hr className=" border-black" />

                        <tr className="flex justify-between p-2"><p>Online Fee:</p> <p>40</p></tr><hr className=" border-black" />

                        <tr className="flex justify-between p-2"><p>Total:</p> <p>{prices + 40}</p></tr><hr className=" border-black" />

                        <tr className="flex justify-between p-2"><p>Payable Total:</p> <p>{prices + 40}</p></tr><hr className=" border-black" />


                    </table>




                </div>


            </div>
            <tfoot className="flex justify-end">
                <tr className='mt-10'>


                    <th>
                        <button className="btn btn-success btn-xs">Go to Payment</button>
                    </th>
                    <th>
                        <button className="btn btn-success btn-xs">Cash On purchages</button>
                    </th>
                </tr>
            </tfoot>

        </div>
    );
};

export default CartItem;