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

const CartItem = () => {

  // console.log(cartItems)

  const { user, setPrices, prices, setIdent, localDeviceId } = useContext(Zaitooncontext);
  const [quantities, setQuantities] = useState({});
  const [modalData, setModalData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [paidmodalData, setPaidModalData] = useState([]);
  const [paidshowModal, setPaidShowModal] = useState(false);

  const navigate =useNavigate();

  const email =user?.email || localDeviceId()


     const { data: cartItems = [] , refetch } = useQuery({
        queryKey: ['cartItems'],
        queryFn: async () => {
          const res = await fetch(`${process.env.REACT_APP_backendurl}/cashOnpurc/${email}`);
          return await res.json();
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
  }, [cartItems]);

  const subtotal = cartItems.reduce((acc, item) => {
    const quantity = quantities[item._id] || 1;
    const price = item.offer || item.productPrice;
    return acc + quantity * price;
  }, 0);

  useEffect(() => {
    setPrices(subtotal + 150);
  }, [subtotal, setPrices]);

  const handleQuantityChange = (id, change) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + change),
    }));
  };




  const [openModal, setOpenModal] = useState(false);
   const [dataforWish, setdataforWish] = useState();

   const deleteOpenModal=(item)=>{
    setOpenModal(true)
    setdataforWish(item)
   }



  const handleDelete = id => {
    fetch(`${process.env.REACT_APP_backendurl}/cartItem/delete/${id}`, {
      method: 'DELETE',
    })
      .then(res => res.json())
      .then(data => {
        if (data.deletedCount > 0) {
          toast.success('Item deleted successfully');
          setOpenModal(false)
          refetch();
        }
      });
  };


   // Wish list section

    const addpdWishList = async (product) => {
        if (!user) {
            toast.error("Please login first to add to wishlist");
            return;
        }

        const wishlistItem = {
            email: user?.email,
            product
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_backendurl}/wishList`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(wishlistItem)
            });

            const data = await response.json();
            if (data.acknowledged) {
                toast.success("Product added to wishlist successfully");
                setOpenModal(false)
                navigate(`/wishList/${user?.email}`);
                // refetch();
            } else {
                toast.error("Failed to add product to wishlist");
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            toast.error("An error occurred while adding to wishlist");
        }
    }

  const openCashOnPurchase = () => {
    const withQuantities = cartItems.map(item => ({
      ...item,
      quantity: quantities[item._id] || 1,
      total: (item.offer || item.productPrice) * (quantities[item._id] || 1),
    }));
    setModalData(withQuantities);
    setShowModal(true);
  };

  const paidPurchages = () => {
    const withQuantities = cartItems.map(item => ({
      ...item,
      quantity: quantities[item._id] || 1,
      total: (item.offer || item.productPrice) * (quantities[item._id] || 1),
    }));
    setPaidModalData(withQuantities);
    setPaidShowModal(true);
  };



   

  return (
    <div
      className="min-h-screen pt-20 w-full mx-auto rounded-lg"
      
    >
      <h1 className="text-center text-3xl font-bold mb-6 text-green-900">🛒 Shopping Cart</h1>

      {/* <div className="flex flex-col lg:flex-row gap-6"> */}
      <div className="grid lg:flex-row gap-6">
        {/* Table Section */}
        <div className="flex-1 overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead className="bg-green-300 text-black text-md">
              <tr>
                <th className="p-3 text-left">Product</th>
                <th className="p-3">Quantity</th>
                {/* <th className="p-3">Price</th> */}
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems?.map((item, index) => {
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
                        <span>{quantity}</span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                        >
                          +
                        </button>
                      </div>
                    </td>
                    {/* <td className="p-3 text-center">৳ {price * quantity}</td> */}
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
            <div className="flex justify-between">
              <span>ডেলিভারি চার্জ:</span>
              <span>৳ 150</span>
            </div>
            <hr />
            <div className="flex justify-between font-semibold text-green-800">
              <span>সর্বমোট:</span>
              <span>৳ {subtotal + 150}</span>
            </div>
          </div>
          <div className="flex flex-col mt-6 gap-2">
            <button
              onClick={openCashOnPurchase}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              💵 অর্ডারটি নিশ্চিত করুন  ৳{prices}

            </button>
            {/* <button
              onClick={openCashOnPurchase}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded"
            >
              💵 Cash On Purchase
            </button> */}
            {/* <button
              onClick={paidPurchages}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded"
            >
              💳 Paid Purchase
            </button> */}
          </div>
        </div>
      </div>

      {/*অর্ডারটি নিশ্চিত করুন Modals */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 relative">
            <button className="absolute top-4 right-4 text-gray-700" onClick={() => setShowModal(false)}>✕</button>
            <CashOnpurch cartItems={modalData} price={prices} setShowModal={setShowModal} />
          </div>
        </div>
      )}

      {paidshowModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 relative">
            <button className="absolute top-4 right-4 text-gray-700" onClick={() => setPaidShowModal(false)}>✕</button>
            <PaidPurch cartpaidItems={paidmodalData} price={prices} />
          </div>
        </div>
      )}



      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-500 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">
              আপনি কি পছন্দের তালিকায় যুক্ত করতে চান?
            </h3>
            <div className="flex justify-center gap-4">
              <button color="failure" className='btn btn-sm bg-green-500 text-white' onClick={() => addpdWishList(dataforWish)}>
                {"Yes, sure"}
              </button>
              <button color="gray" className='btn btn-sm bg-red-500 text-white' onClick={() => handleDelete(dataforWish?._id)}>
                No, cancel
              </button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CartItem;

