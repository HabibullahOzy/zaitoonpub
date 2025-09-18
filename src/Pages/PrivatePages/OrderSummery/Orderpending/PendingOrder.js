import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { BiSolidOffer } from 'react-icons/bi';
import { FaTrashAlt } from 'react-icons/fa';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { HiOutlineTag } from 'react-icons/hi';

const PendingOrder = () => {

  const {user}= useContext(Zaitooncontext)

  // const [openModalId, setOpenModalId] = useState(null);
  // const [status, setStatus] = useState('');



  const { data: cashonprod = [], refetch } = useQuery({
    queryKey: ['cashonprod'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/caspurchage/pending`);
      return res.json();
    }
  });

  const handleConfirmOrder = async (id) => {
    const response = await axios.put(`${process.env.REACT_APP_backendurl}/orderconfirmtatus/${id}`);
    // console.log(response)
    response?.status
      ? toast.success("Confirm Order Placed!")
      : toast.error("Order not confirm, please try again");
    refetch();
  };


  const handleUpdateOrder = async (id) => {
    const response = await axios.put(`${process.env.REACT_APP_backendurl}/orderStatus/${id}`);
    // console.log(response)
    response?.status
      ? toast.success("Paid Order Placed!")
      : toast.error("Order not placed, please try again");
    refetch();
  };



  const handleUpdateCODOrder = async (id) => {
    const response = await axios.put(`${process.env.REACT_APP_backendurl}/orderCODStatus/${id}`);
    // console.log(response)
    response?.status
      ? toast.success("COD Order Placed!")
      : toast.error("Order not placed, please try again");
    refetch();
  };

  const handleCancelOrder = async (id) => {
    const response = await axios.put(`${process.env.REACT_APP_backendurl}/ordercanceltatus/${id}`);
    response?.status
      ? toast.success("Order Cancel!")
      : toast.error("Please try again");
    refetch();
  };




  // offer set start
  const [openoffermodal, setOpenoffermodal] = useState(false);
  const [orderoffer, setOrderoffer] = useState();


  const handlesetpenoffer = (id) => {
    setOpenoffermodal(true)
    // console.log(id)
    setOrderoffer(id)

  }

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const offerCr = user?.email
    const offer = data.offerord
    const paymentData = {
      offerCr,
      offer
    }
    // console.log(paymentData)

    const res = await axios.put(`${process.env.REACT_APP_backendurl}/orderoffer/${orderoffer}`, paymentData)
    // console.log(res)
    res?.status ? toast.success('Offer Data Added Successfully') : toast.error('Something went wrong, please try again later');
    reset();
    setOpenoffermodal(false)
    toast.success('Offer Set Successfully')
  }
  // offer set end




  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(cashonprod.length / itemsPerPage);

  const paginatedData = cashonprod.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen pt-14 px-2 md:px-4 text-black overflow-x-auto">
      <h1 className="text-center text-2xl font-bold mb-6">Pending Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 border-collapse divide-y divide-gray-200">
          <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700">
            <tr>
              <th className="border px-2 py-2">SL</th>
              <th className="border px-2 py-2">Order Id</th>
              <th className="border px-2 py-2">Product</th>
              <th className="border px-2 py-2">Code</th>
              <th className="border px-2 py-2">Category</th>
              <th className="border px-2 py-2">Qty</th>
              <th className="border px-2 py-2">Price</th>
              <th className="border px-2 py-2">Total</th>
              <th className="border px-2 py-2">Payable Total</th>
              <th className="border px-2 py-2">Customer</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">Phone</th>
              <th className="border px-2 py-2">Order Note</th>
              <th className="border px-2 py-2">Location</th>
              <th className="border px-2 py-2">Pay Method</th>
              <th className="border px-2 py-2">Pay Amount</th>
              <th className="border px-2 py-2">Transaction ID</th>
              <th className="border px-2 py-2">Pay Date</th>
              {/* <th className="border px-2 py-2">Order Status</th> */}
              <th className="border px-2 py-2">Status</th>
              {/* <th className="border px-2 py-2"></th> */}
              <th className="border px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {paginatedData.map((cashdata, i) =>
              cashdata?.productdata?.map((prodata, j) => (
                <tr key={`${cashdata._id}-${j}`} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td className="border px-2 py-1">{cashdata?.orderId}</td>
                  <td className="border px-2 py-1 flex items-center gap-2">
                    <img src={prodata.image} alt="Product" className="h-10 w-10 rounded object-cover" />
                    <span>{prodata.nameeng}</span>
                  </td>
                  <td className="border px-2 py-1">{prodata?.ProductCode}</td>
                  <td className="border px-2 py-1">{prodata?.category}</td>
                  <td className="border px-2 py-1">{prodata.quantity}</td>
                  <td className="border px-2 py-1">{prodata.offer}</td>
                  <td className="border px-2 py-1">{prodata?.total}</td>
                  <td className="border px-2 py-1">{cashdata?.totalPrice}</td>
                  <td className="border px-2 py-1">{cashdata.name}</td>
                  <td className="border px-2 py-1 break-all">{cashdata.email}</td>
                  <td className="border px-2 py-1">{cashdata.phonenumber}</td>
                  <td className="border px-2 py-1">{cashdata?.ornote}</td>
                  <td className="border px-2 py-1 whitespace-pre-line">
                    {cashdata?.dlocation}
                  </td>
                  <td className="border px-2 py-1">{cashdata?.payMethod}</td>
                  <td className="border px-2 py-1">{cashdata?.amount}</td>
                  <td className="border px-2 py-1 break-all">{cashdata?.transactionId}</td>
                  <td className="border px-2 py-1">{cashdata?.paymentDate}</td>
                  {/* <td className="border px-2 py-1">{cashdata?.role}</td> */}
                  <td className="border px-2 py-1 relative">
                    {cashdata?.status === 'pending' ? (
                      <div className="flex items-center gap-2">

                        <button
                          onClick={() => {
                            handleConfirmOrder(cashdata?._id);
                          }}
                          className="bg-green-600 btn-sm btn text-white px-3 py-1 rounded text-sm"
                        >
                          Confirm
                        </button>



                        <button
                          onClick={() => handlesetpenoffer(cashdata?._id)}
                          className=" text-red-400 px-1 tooltip tooltip-success tooltip-top"
                          data-tip="Set Offer"
                        >
                          <BiSolidOffer className='text-2xl' />
                        </button>


                        {/* <button
                          onClick={() => {
                            handleUpdateOrder(cashdata._id);
                          }}
                          className="bg-green-400 btn-sm btn text-white px-3 py-1 rounded text-sm"
                          disabled
                        >
                          Paid
                        </button>

                        <button
                          onClick={() => {
                            handleUpdateCODOrder(cashdata._id);
                          }}
                          className="bg-gray-300 text-white px-3 py-1 rounded text-sm"
                          disabled 
                        >
                          COD
                        </button> */}
                      </div>
                    ) : (
                      <span className="bg-green-400 text-white py-1 px-2 rounded text-xs">
                        Order Placed
                      </span>
                    )}
                  </td>
                  <td className="border px-2 py-1">
                    <button
                      onClick={() => handleCancelOrder(cashdata?._id)}
                      className="btn btn-error btn-xs text-white"
                    >
                      cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            className="btn btn-sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <TbPlayerTrackPrevFilled /> Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : ''}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <TbPlayerTrackNextFilled />
          </button>
        </div>
      )}





      <Modal show={openoffermodal} size="md" onClose={() => setOpenoffermodal(false)} popup>
              <ModalHeader />
              <ModalBody>
                <div className="text-center">
                  <HiOutlineTag className="mx-auto mb-4 h-14 w-14 text-green-500" />
                  <h3 className="mb-5 text-lg font-semibold text-black">
                    Set offers for this order
                  </h3>
      
                    <form onSubmit={handleSubmit(onSubmit)}>
                  {/* Input field */}
                  <input
                    type="number"
                    placeholder="Offer %"
                    {...register("offerord", { required: true, min: 1, max: 100 })}
                    className="w-full p-2 border text-black border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-green-400 outline-none mb-2"
                  />
      
                  {errors.offerord && (
                    <p className="text-red-500 text-sm mb-3">Offer must be between 1% and 100%</p>
                  )}
      
                  {/* Buttons */}
                  <div className="flex justify-center gap-4">
                    <button
                      type="button"
                      className="btn btn-sm bg-gray-400 text-white px-4 py-2 rounded-md"
                      onClick={() => setOpenoffermodal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-sm bg-green-500 text-white px-4 py-2 rounded-md"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                </div>
              </ModalBody>
            </Modal>

    </div>
  );
};

export default PendingOrder;
