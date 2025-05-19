import { useQuery } from '@tanstack/react-query';
import React, { useState, useContext, useEffect } from 'react';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import CashOnpurch from '../Purchages/CashOnpurch';

const CartItem = () => {
    const { user, setPrices } = useContext(Zaitooncontext);
    const [quantities, setQuantities] = useState({});
    const [modalData, setModalData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const { data: cartItems = [], refetch } = useQuery({
        queryKey: ['cartItems'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/cashOnpurc/${user.email}`);
            const data = await res.json();
            return data;
        }
    });



    
    useEffect(() => {
        if (cartItems.length > 0) {
            const initialQuantities = {};
            cartItems.forEach(item => {
                initialQuantities[item._id] = 1;
            });
            setQuantities(initialQuantities);
        }
    }, [cartItems]);

    const subtotal = cartItems.reduce((acc, item) => {
        const quantity = quantities[item._id] || 1;
        const price = item.offer || item.productPrice;
        return acc + quantity * price;
    }, 0);

    useEffect(() => {
        setPrices(subtotal);
    }, [subtotal, setPrices]);

    const handleQuantityChange = (id, change) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max(1, (prev[id] || 1) + change)
        }));
    };

    const handleDelete = id => {
        fetch(`http://localhost:5000/cartItem/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success("Item deleted successfully");
                    refetch();
                }
            });
    };

    const openCashOnPurchase = () => {
        const withQuantities = cartItems.map(item => ({
            ...item,
            quantity: quantities[item._id] || 1,
             total: (item.offer || item.productPrice) * (quantities[item._id] || 1)
        }));
        setModalData(withQuantities);
        setShowModal(true)
        
    };

    return (
        <div className="overflow-x-auto text-black min-h-screen w-10/12 mx-auto pt-14" style={{ backgroundColor: "rgb(186, 239, 186)" }}>
            <h1 className=' text-center font-bold text-2xl'>Shopping Cart</h1>
            <div className="flex">
                <table className="table lg:w-2/3">
                    <thead className='text-black text-lg font-bold'>
                        <tr>
                            <th>#</th>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartItems.map((cartInfo, i) => {
                            const quantity = quantities[cartInfo._id] || 1;
                            const pricePerUnit = cartInfo.offer || cartInfo.productPrice;
                            return (
                                <tr key={cartInfo._id}>
                                    <td>{i + 1}</td>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img src={`http://localhost:5000/uploads/${cartInfo.image}`} alt="product" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold">{cartInfo.name}</div>
                                                <div className="text-sm opacity-50">৳ {pricePerUnit}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <button onClick={() => handleQuantityChange(cartInfo._id, -1)} className='btn btn-circle btn-xs btn-success text-white font-extrabold'>-</button>
                                        <span className='m-3'>{quantity}</span>
                                        <button onClick={() => handleQuantityChange(cartInfo._id, 1)} className='btn btn-circle btn-xs btn-success text-white font-extrabold'>+</button>
                                    </td>
                                    <td>৳ {pricePerUnit * quantity}</td>
                                    <td>
                                        <button className="btn btn-error btn-xs" onClick={() => handleDelete(cartInfo._id)}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className="border border-x-2 bg-green-200 rounded-lg m-auto w-96 p-5">
                    <h1 className="text-center">Pricing Summary</h1>
                    <table className="table">
                        <tr className="flex justify-between p-2"><p>Subtotal:</p><p>৳ {subtotal}</p></tr><hr className="border-black" />
                        <tr className="flex justify-between p-2"><p>Online Fee:</p> <p>৳ 40</p></tr><hr className="border-black" />
                        <tr className="flex justify-between p-2"><p>Total:</p> <p>৳ {subtotal + 40}</p></tr><hr className="border-black" />
                        <tr className="flex justify-between p-2"><p>Payable Total:</p> <p>৳ {subtotal + 40}</p></tr><hr className="border-black" />
                    </table>
                </div>
            </div>
            <div className="flex justify-end mt-10">
                <Link  className="btn btn-success btn-xs" onClick={openCashOnPurchase}>Cash On Purchase</Link>
            </div>

            {/* Modal */}
          
              {showModal && (
                <div className="modal modal-open ">
                   
                    <div className="modal-box max-w-4xl bg-gre " style={{backgroundColor:"#baefba"}}>
                         <div className="modal-action">
                            <button className="btn" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <CashOnpurch cartItems={modalData} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartItem;
