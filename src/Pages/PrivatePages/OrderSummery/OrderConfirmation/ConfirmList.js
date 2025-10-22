import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import CODInvoice from '../CashonPlaced/CODInvoice';
import OrderPaymentmodal from '../../DashBoard/Myorder/OrderPaymentmodal';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import { FcMoneyTransfer } from 'react-icons/fc';
import { BiSolidOffer } from 'react-icons/bi';
import { Modal, ModalBody, ModalHeader } from 'flowbite-react';
import { HiOutlineTag } from 'react-icons/hi';
import { useForm } from 'react-hook-form';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';

const ConfirmList = () => {

  const { user } = useContext(Zaitooncontext)


  const { data: confirmprod = [], refetch } = useQuery({
    queryKey: ['confirmprod'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/caspurchage/confirm`);
      return res.json();
    }
  });

  // const handleUpdateOrder = async (id) => {
  //   const response = await axios.put(`${process.env.REACT_APP_backendurl}/orderStatus/${id}`);
  //   response?.statusText
  //     ? toast.success("Order Placed !!!")
  //     : toast.error("Order not placed, please try again");
  //   refetch();
  // };
  const [showCODInvoice, setShowCODInvoice] = useState(false);
  const [invoiceCODData, setInvoiceCODData] = useState(null);

  const handleOrderInvoice = async (data) => {
    setShowCODInvoice(true);
    setInvoiceCODData(data)
  };

  const handleOrderComplete = async (id) => {
    const response = await axios.put(`${process.env.REACT_APP_backendurl}/ordercompletetatus/${id}`);
   
    response?.status
      ? toast.success("Complete Order Placed!")
      : toast.error("Order not placed, please try again");
    refetch();
  };


  // Offer set start

  const [showPaymodal, setShowPaymodal] = useState(false);
  const [orderPaymentData, setOrderPaymentData] = useState();

  const handleOrderpayment = (id) => {
    setShowPaymodal(true)
    
    setOrderPaymentData(id)
  }



  const [openoffermodal, setOpenoffermodal] = useState(false);
  const [orderoffer, setOrderoffer] = useState();


  const handlesetoffer = (id) => {
    setOpenoffermodal(true)
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

    const res = await axios.put(`${process.env.REACT_APP_backendurl}/orderoffer/${orderoffer}`, paymentData)
    
    res?.status ? toast.success('Offer Data Added Successfully') : toast.error('Something went wrong, please try again later');
    reset();
    setOpenoffermodal(false)
    toast.success('Offer Set Successfully')
  }


  // offer set end






  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(confirmprod.length / itemsPerPage);

  const paginatedData = confirmprod.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };



  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <div
      style={{ backgroundColor: "rgb(186, 239, 186)" }}
      className="overflow-x-auto text-black min-h-screen pt-14 px-4"
    >
      <h1 className="text-center font-bold text-2xl mb-6">Confirm Orders</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700">
            <tr>
              <th className="border px-1 py-2">SL</th>
              <th className="border px-1 py-2">Order Id</th>
              <th className="border px-1 py-2">Customer</th>
              <th className="border px-1 py-2">Email</th>
              <th className="border px-1 py-2">Phone</th>
              <th className="border px-1 py-2">Location</th>
              <th className="border px-1 py-2">Order Note</th>
              <th className="border px-1 py-2">SubTotal</th>
              <th className="border px-1 py-2">Offer</th>
              <th className="border px-1 py-2">PayTotal</th>
              <th className="border px-1 py-2">Pay Method</th>
              <th className="border px-1 py-2">Pay Amount</th>
              <th className="border px-1 py-2">Transaction ID</th>
              <th className="border px-1 py-2">Pay Date</th>
              <th className="border px-1 py-2">Pay Note</th>
              <th className="border px-1 py-2">Updated</th>
              <th className="border px-1 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((cashdata, i) => {
              const isExpanded = expandedRow === cashdata._id;
              // calculate offer price if needed
              const ordoffer = cashdata?.totalPrice - 150;
              const offerperc = Number(cashdata?.offer) || 0;
              const offerPrice = cashdata?.offer
                ? Math.round(ordoffer - (offerperc * ordoffer) / 100) + 150
                : cashdata?.totalPrice;
              return (
                <React.Fragment key={cashdata._id}>
                  {/* Parent Row */}
                  <tr
                    className="text-black hover:bg-gray-50 cursor-pointer"
                    onClick={() =>
                      setExpandedRow(isExpanded ? null : cashdata._id)
                    }
                  >
                    <td className="border py-1 text-center">
                      {(currentPage - 1) * itemsPerPage + i + 1}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.orderId}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.name}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.email}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.phonenumber}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.dlocation}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.ordnote}
                    </td>
                    <td className="border py-1 text-center">
                      {ordoffer}
                    </td>
                    <td className="border py-1 text-red-500 text-center">
                      {cashdata?.offer}
                    </td>
                    <td className="border py-1 text-center">
                      {offerPrice}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.payMethod}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.amount}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.transactionId}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.paymentDate}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.paidnote}
                    </td>
                    <td className="border py-1 text-center">
                      {cashdata?.updatedAt}
                    </td>
                    <td className="border py-1 text-center">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => handleOrderComplete(cashdata?._id)}
                          className="btn btn-sm font-medium btn-success text-white"
                        >
                          Complete
                        </button>

                        <button
                          onClick={() => handleOrderpayment(cashdata?._id)}
                          className="text-white pl-1 tooltip tooltip-success tooltip-top"
                          data-tip="Payment Data"
                        >
                          <FcMoneyTransfer className="text-2xl" />
                        </button>

                        <button
                          onClick={() => handlesetoffer(cashdata?._id)}
                          className=" text-red-400 px-1 tooltip tooltip-success tooltip-top"
                          data-tip="Set Offer"
                        >
                          <BiSolidOffer className="text-2xl" />
                        </button>

                        <button
                          onClick={() => handleOrderInvoice(cashdata)}
                          className="font-medium text-yellow-500 hover:underline tooltip tooltip-success tooltip-top"
                          data-tip="Invoice"
                        >
                          <FaFileInvoiceDollar className="text-2xl" />
                        </button>
                      </div>
                    </td>
                  </tr>

                  {/* Nested Row (Products Table) */}
                  {isExpanded && (
                    <tr>
                      <td colSpan="9" className="p-2 bg-green-50">
                        <div className="overflow-x-auto">
                          <table className="table w-full text-sm">
                            <thead className="bg-green-100 text-black">
                              <tr>
                                <th className="border px-1 py-1">SL</th>
                                <th className="border px-1 py-1">Image</th>
                                <th className="border px-1 py-1">Product</th>
                                <th className="border px-1 py-1">Code</th>
                                <th className="border px-1 py-1">Category</th>
                                <th className="border px-1 py-2 text-center">Sub Category</th>
                                <th className="border px-1 py-2 text-center">authorName</th>
                                <th className="border px-1 py-2 text-center">edition</th>
                                <th className="border px-1 py-1">Qty</th>
                                <th className="border px-1 py-1">Price</th>
                                <th className="border px-1 py-1">Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {cashdata?.productdata?.map((prodata, j) => (
                                <tr key={prodata._id} className="hover:bg-gray-50">
                                  <td className="border px-2 py-1 text-center">
                                    {j + 1}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    <div className="avatar">
                                      <div className="mask mask-squircle h-12 w-12">
                                        <img
                                          src={prodata.image}
                                          alt={prodata.name}
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    {prodata.namebn || prodata.nameeng}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    {prodata.ProductCode}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    {prodata.category}
                                  </td>
                                  <td className="border px-2 py-1 text-center">{prodata?.subcategory}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.authorName}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.edition}</td>
                                  <td className="border px-2 py-1 text-center">
                                    {prodata.quantity}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    {prodata.productPrice}
                                  </td>
                                  <td className="border px-2 py-1 text-center">
                                    {prodata.total}
                                  </td>

                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="btn btn-sm"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index + 1)}
              className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : ""
                }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="btn btn-sm"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}



      {
        showCODInvoice && (
          <div className="modal modal-open">
            <div className="modal-box max-w-4xl w-full" style={{ backgroundColor: "#baefba" }}>
              <div className="modal-action">
                <button className="btn" onClick={() => setShowCODInvoice(false)}>✕</button>
              </div>
              <CODInvoice codInvdata={invoiceCODData} />
            </div>
          </div>
        )
      }


      {/* Set Offer Modal */}

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





      {/*Order Payment confermation Modal */}
      {
        showPaymodal && (
          <div className="modal modal-open">
            <div className="modal-box w-full" style={{ backgroundColor: "#baefba" }}>
              <div className="modal-action">
                <button className="p-2 rounded-[100%] bg-green-400 hover:bg-green-600" onClick={() => setShowPaymodal(false)}>✕</button>
              </div>
              <OrderPaymentmodal paydata={orderPaymentData} />
            </div>
          </div>
        )
      }
    </div>

    // <div style={{ backgroundColor: "rgb(186, 239, 186)" }} className="overflow-x-auto text-black min-h-screen pt-14 px-4">
    //   <h1 className="text-center font-bold text-2xl mb-6">Confirm Orders</h1>

    //   <div className="overflow-x-auto">
    //     <table className="table w-full">
    //       <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700  overflow-x-auto">
    //         <tr>
    //           <th className="border px-2 py-2">SL</th>
    //           <th className="border px-2 py-2">Order Id</th>
    //           <th className="border px-2 py-2">Product</th>
    //           <th className="border px-2 py-2">Code</th>
    //           <th className="border px-2 py-2">Category</th>
    //           <th className="border px-2 py-2">Qty</th>
    //           <th className="border px-2 py-2">Price</th>
    //           <th className="border px-2 py-2">Total</th>
    //           <th className="border px-2 py-2">SubTotal</th>
    //           <th className="border px-2 py-2">PayTotal</th>
    //           <th className="border px-2 py-2">Offer</th>
    //           <th className="border px-2 py-2">Customer</th>
    //           <th className="border px-2 py-2">Email</th>
    //           <th className="border px-2 py-2">Phone</th>
    //           {/* <th className="border px-2 py-2">Alt Phone</th> */}
    //           <th className="border px-2 py-2">Location</th>
    //           <th className="border px-2 py-2">Pay Method</th>
    //           <th className="border px-2 py-2">Pay Amount</th>
    //           <th className="border px-2 py-2">Transaction ID</th>
    //           <th className="border px-2 py-2">Pay Date</th>
    //           {/* <th className="border px-2 py-2">Order Status</th> */}
    //           {/* <th className="border px-2 py-2">Status</th> */}
    //           <th className="border px-2 py-2 text-center">Action</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {paginatedData.map((cashdata, i) => (
    //           cashdata?.productdata?.map((prodata, j) => {
    //             // calculate offer price if needed
    //             const ordoffer = cashdata?.totalPrice - 150;
    //             const offerperc = Number(cashdata?.offer) || 0;
    //             const offerPrice = cashdata?.offer
    //               ? Math.round(ordoffer - (offerperc * ordoffer) / 100) + 150
    //               : cashdata?.totalPrice;

    //             return (
    //               <tr key={`${cashdata._id}-${j}`} className="text-black hover:bg-gray-50">
    //                 <td className="border px-2 py-1 text-center">{(currentPage - 1) * itemsPerPage + i + 1}</td>
    //                 <td className="border px-2 py-1 text-center">{cashdata?.orderId}</td>
    //                 <td className="border px-2 py-1 text-center">
    //                   <div className="flex items-center gap-2">
    //                     <div className="avatar">
    //                       <div className="mask mask-squircle h-12 w-12">
    //                         <img src={prodata.image} alt="Product" />
    //                       </div>
    //                     </div>
    //                     <span>{prodata.name}</span>
    //                   </div>
    //                 </td>
    //                 <td className="border px-2 py-1 text-center">{prodata?.ProductCode}</td>
    //                 <td className="border px-2 py-1 text-center">{prodata?.category}</td>
    //                 <td className="border px-2 py-1 text-center">{prodata.quantity}</td>
    //                 <td className="border px-2 py-1 text-center">{prodata?.offer}</td>
    //                 <td className="border px-2 py-1 text-center">{prodata?.total}</td>
    //                 <td className="border px-2 py-1 text-center">{ordoffer}</td>
    //                 <td className="border px-2 py-1 text-center">{offerPrice}</td>
    //                 {
    //                   cashdata?.offer ? (
    //                     <td className="border px-2 py-1 text-center text-red-500 font-semibold">{cashdata?.offer}%</td>
    //                   ) : (
    //                     <td className="border px-2 py-1 text-center">-</td>
    //                   )
    //                 }
    //                 <td className="border px-2 py-1 text-center">{cashdata.name}</td>
    //                 <td className="border px-2 py-1 text-center">{cashdata.email}</td>
    //                 <td className="border px-2 py-1 text-center">{cashdata.phonenumber}</td>
    //                 {/* <td>{cashdata.alphonenumber}</td> */}
    //                 <td className="border px-2 py-1  text-center">
    //                   {cashdata?.dlocation},<br />

    //                 </td>
    //                 <td className="border px-2 py-1 text-center">{cashdata?.payMethod}</td>
    //                 <td className="border px-2 py-1 text-center">{cashdata?.amount}</td>
    //                 <td className="border px-2 py-1 text-center">{cashdata?.transactionId}</td>
    //                 <td className="border px-2 py-1 text-center">{cashdata?.paymentDate}</td>
    //                 {/* <td className="">{cashdata?.role}</td> */}
    //                 {/* <td>
    //                 {cashdata?.status==='confirm' ? (
    //                   <p className="bg-green-300 text-white p-2 text-center rounded-md">
    //                     Order Placed
    //                   </p>
    //                 ) : (
    //                   // <button
    //                   //   onClick={() => handleUpdateOrder(cashdata._id)}
    //                   //   className="btn btn-sm font-medium btn-success text-white hover:underline"
    //                   // >
    //                   //   CODpayment
    //                   // </button>
    //                   ""
    //                 )}
    //               </td> */}
    //                 <td className="border px-2 py-1 text-center">

    //                   <div className='flex gap-2'>
    //                     <button onClick={() => handleOrderComplete(cashdata?._id)} className="btn btn-sm font-medium btn-success text-white hover:underline">
    //                       Complete
    //                     </button>

    //                     <button
    //                       onClick={() => handleOrderpayment(cashdata?._id)}
    //                       className="text-white pl-1 tooltip tooltip-success tooltip-top"
    //                       data-tip="Payment Data"
    //                     >
    //                       <FcMoneyTransfer className='text-2xl' />
    //                     </button>


    //                     <button
    //                       onClick={() => handlesetoffer(cashdata?._id)}
    //                       className=" text-red-400 px-1 tooltip tooltip-success tooltip-top"
    //                       data-tip="Set Offer"
    //                     >
    //                       <BiSolidOffer className='text-2xl' />
    //                     </button>

    //                     <button onClick={() => handleOrderInvoice(cashdata)} className="font-medium  text-yellow-500 hover:underline tooltip tooltip-success tooltip-top" data-tip="Invoice">
    //                       <FaFileInvoiceDollar className='text-2xl' />
    //                     </button>
    //                   </div>

    //                 </td>
    //               </tr>
    //             )
    //           })
    //         ))}
    //       </tbody>



    //     </table>
    //   </div >

    //   {/* Pagination Controls */}
    //   {
    //     totalPages > 1 && (
    //       <div className="flex justify-center mt-6 space-x-2">
    //         <button
    //           className="btn btn-sm"
    //           onClick={() => goToPage(currentPage - 1)}
    //           disabled={currentPage === 1}
    //         >
    //           Prev
    //         </button>
    //         {[...Array(totalPages)].map((_, index) => (
    //           <button
    //             key={index}
    //             onClick={() => goToPage(index + 1)}
    //             className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : ''}`}
    //           >
    //             {index + 1}
    //           </button>
    //         ))}
    //         <button
    //           className="btn btn-sm"
    //           onClick={() => goToPage(currentPage + 1)}
    //           disabled={currentPage === totalPages}
    //         >
    //           Next
    //         </button>
    //       </div>
    //     )
    //   }


    //   {
    //     showCODInvoice && (
    //       <div className="modal modal-open">
    //         <div className="modal-box max-w-4xl w-full" style={{ backgroundColor: "#baefba" }}>
    //           <div className="modal-action">
    //             <button className="btn" onClick={() => setShowCODInvoice(false)}>✕</button>
    //           </div>
    //           <CODInvoice codInvdata={invoiceCODData} />
    //         </div>
    //       </div>
    //     )
    //   }


    //   {/* Set Offer Modal */}

    //   <Modal show={openoffermodal} size="md" onClose={() => setOpenoffermodal(false)} popup>
    //     <ModalHeader />
    //     <ModalBody>
    //       <div className="text-center">
    //         <HiOutlineTag className="mx-auto mb-4 h-14 w-14 text-green-500" />
    //         <h3 className="mb-5 text-lg font-semibold text-black">
    //           Set offers for this order
    //         </h3>

    //         <form onSubmit={handleSubmit(onSubmit)}>
    //           {/* Input field */}
    //           <input
    //             type="number"
    //             placeholder="Offer %"
    //             {...register("offerord", { required: true, min: 1, max: 100 })}
    //             className="w-full p-2 border text-black border-gray-300 rounded-lg 
    //                      focus:ring-2 focus:ring-green-400 outline-none mb-2"
    //           />

    //           {errors.offerord && (
    //             <p className="text-red-500 text-sm mb-3">Offer must be between 1% and 100%</p>
    //           )}

    //           {/* Buttons */}
    //           <div className="flex justify-center gap-4">
    //             <button
    //               type="button"
    //               className="btn btn-sm bg-gray-400 text-white px-4 py-2 rounded-md"
    //               onClick={() => setOpenoffermodal(false)}
    //             >
    //               Cancel
    //             </button>
    //             <button
    //               type="submit"
    //               className="btn btn-sm bg-green-500 text-white px-4 py-2 rounded-md"
    //             >
    //               Submit
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     </ModalBody>
    //   </Modal>





    //   {/*Order Payment confermation Modal */}
    //   {
    //     showPaymodal && (
    //       <div className="modal modal-open">
    //         <div className="modal-box w-full" style={{ backgroundColor: "#baefba" }}>
    //           <div className="modal-action">
    //             <button className="p-2 rounded-[100%] bg-green-400 hover:bg-green-600" onClick={() => setShowPaymodal(false)}>✕</button>
    //           </div>
    //           <OrderPaymentmodal paydata={orderPaymentData} />
    //         </div>
    //       </div>
    //     )
    //   }
    // </div >
  );
};

export default ConfirmList;


