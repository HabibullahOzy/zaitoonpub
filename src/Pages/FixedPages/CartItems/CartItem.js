import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState, useContext, useEffect } from 'react';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import CashOnpurch from '../Purchages/CashOnpurch';
import { FaTrashAlt } from 'react-icons/fa';
import PaidPurch from '../Purchages/PaidPurch/PaidPurch';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';

const CartItem = () => {
  const { user, setPrices, prices, setIdent, localDeviceId } = useContext(Zaitooncontext);
  const [quantities, setQuantities] = useState({});
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paidmodalData, setPaidModalData] = useState([]);
  const [paidshowModal, setPaidShowModal] = useState(false);

  const navigate = useNavigate();
  const email = user?.email || localDeviceId();

  //  Access queryClient
  const queryClient = useQueryClient();

  const { data: cartItems = [], refetch } = useQuery({
    queryKey: ['cartItems', email],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/cashOnpurc/${email}`);
      return res.json();
    },
  });

  useEffect(() => {
    if (cartItems.length > 0) {
      setIdent(cartItems.length);
      const initialQuantities = {};
      cartItems.forEach(item => {
        initialQuantities[item._id] = 1;
      });
      setQuantities(initialQuantities);
    }
  }, [cartItems, setIdent]);

  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = quantities[item._id] || 1;
    const price = item.offer || item.productPrice;
    return acc + quantity * price;
  }, 0);

  useEffect(() => {
    setPrices(subtotal);
  }, [subtotal, setPrices]);

  // const handleQuantityChange = (id, change) => {
  //   setQuantities(prev => ({
  //     ...prev,
  //     [id]: Math.max(1, (prev[id] || 1) + change),
  //   }));
  // };


  const handleQuantityChange = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };

  // Handle manual input
  const handleQuantityInput = (id, value) => {
    const num = parseInt(value, 10);
    if (!isNaN(num) && num > 0) {
      setQuantities(prev => ({
        ...prev,
        [id]: num,
      }));
    } else if (value === "") {
      // allow clearing input temporarily
      setQuantities(prev => ({
        ...prev,
        [id]: "",
      }));
    }
  };


  const [openModal, setOpenModal] = useState(false);
  const [dataforWish, setdataforWish] = useState();

  const deleteOpenModal = (item) => {
    setOpenModal(true);
    setdataforWish(item);
  };

  //  DELETE with invalidateQueries
  const handleDelete = id => {
    fetch(`${process.env.REACT_APP_backendurl}/cartItem/delete/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success('Item deleted successfully');
          setOpenModal(false);
          queryClient.invalidateQueries(['cartItems', email]); // refresh cache
        }
      });
  };

  //  Wishlist (same logic: refresh cache if needed)
  const addpdWishList = async (product) => {
    if (!user) {
      toast.error("Please login first to add to wishlist");
      return;
    }

    const wishlistItem = {
      email: user?.email,
      product,
    };

    try {
      const response = await fetch(`${process.env.REACT_APP_backendurl}/wishList`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(wishlistItem),
      });

      const data = await response.json();
      if (data.acknowledged) {
        toast.success("Product added to wishlist successfully");
        setOpenModal(false);

        await axios.delete(
          `${process.env.REACT_APP_backendurl}/cartItem/delete/${product._id}`
        );
        refetch()
        navigate(`/wishList/${user?.email}`);
      } else {
        toast.error("Failed to add product to wishlist");
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("An error occurred while adding to wishlist");
    }
  };

  const openCashOnPurchase = () => {
    const withQuantities = cartItems.map(item => ({
      ...item,
      quantity: quantities[item._id] || 1,
      total: (item.offer || item.productPrice) * (quantities[item._id] || 1),
    }));
    setModalData(withQuantities);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen pt-20 w-full mx-auto rounded-lg">
      <h1 className="text-center text-3xl font-bold mb-6 text-green-900">🛒 Shopping Cart</h1>

      <div className="grid lg:flex-row gap-6">
        {/* Table Section */}
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-green-300 text-black text-md">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3">Quantity</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item) => {
                const quantity = quantities[item._id] || 1;
                const price = item.offer || item.productPrice;
                return (
                  <tr key={item._id} className="border-b hover:bg-green-100">
                    <td className="p-3 flex items-center gap-4">
                      <img src={item?.image} className="h-12 w-12 object-cover rounded" alt="product" />
                      <div>
                        <div className="font-bold">{item?.namebn}</div>
                        <div className="text-sm text-gray-600">৳ {price}</div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          -
                        </button>

                        <input
                          type="number"
                          min="1"
                          value={quantities[item._id] || 1}
                          onChange={(e) => handleQuantityInput(item._id, e.target.value)}
                          className="w-24 text-center rounded rounded-full focus:outline-none focus:ring-2 focus:ring-green-400"
                        />

                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => deleteOpenModal(item)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Summary Section */}
        <div className="w-full lg:w-full bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-center text-green-700 mb-4">🧾 Pricing Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>মোট:</span>
              <span>৳ {subtotal}</span>
            </div>
            {/* <div className="flex justify-between">
              <span>ডেলিভারি চার্জ:</span>
              <span>৳ 150</span>
            </div> */}
            <hr />
            <div className="flex justify-between font-semibold text-green-800">
              <span>সর্বমোট:</span>
              <span>৳ {subtotal}</span>
            </div>
          </div>
          <div className="flex flex-col mt-6 gap-2">
            <button
              onClick={openCashOnPurchase}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              💵 অর্ডারটি নিশ্চিত করুন  ৳{prices}
            </button>
          </div>
        </div>
      </div>

      {/* Cash on Purchase Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 relative">
            <button className="absolute top-4 right-4 text-gray-700" onClick={() => setShowModal(false)}>✕</button>
            <CashOnpurch cartItems={modalData} price={prices} setShowModal={setShowModal} />
          </div>
        </div>
      )}




      {/* Delete Confirmation Modal */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500" />
            <h3 className="mb-5 text-lg font-normal text-black">
              যেকোন মুহূর্তে স্টক শেষ হয়ে গেলে পরবর্তীতে পণ্যটি না-ও পেতে পারেন।
              আপনি কি নিশ্চিতভাবে পণ্যটি কার্ট থেকে মুছে ফেলতে চান?
            </h3>
            <div className="flex justify-center gap-4">
              <button className='btn btn-sm bg-green-500 text-white' onClick={() => setOpenModal(false)}>
                না
              </button>
              <button className='btn btn-sm bg-red-500 text-white' onClick={() => handleDelete(dataforWish?._id)}>
                হাঁ
              </button>
            </div>
            {user?.email && (
              <button
                className='btn btn-sm bg-yellow-100 text-green-700 mt-3'
                onClick={() => addpdWishList(dataforWish)}
              >
                পছন্দের তালিকায় রাখুন
              </button>
            )}
          </div>
        </ModalBody>
      </Modal>





      {/* Paid Purchase Modal */}
      {paidshowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 relative">
            <button className="absolute top-4 right-4 text-gray-700" onClick={() => setPaidShowModal(false)}>✕</button>
            <PaidPurch cartpaidItems={paidmodalData} price={prices} />
          </div>
        </div>
      )}


    </div>
  );
};

export default CartItem;

