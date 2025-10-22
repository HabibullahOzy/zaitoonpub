import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import CODInvoice from '../CashonPlaced/CODInvoice';
import { Divide } from 'lucide-react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Completelist = () => {


  const { data: confirmprod = [], refetch } = useQuery({
    queryKey: ['confirmprod'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/caspurchage/complete`);
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

  const handleOrderComplete = async (data) => {
    setShowCODInvoice(true);
    setInvoiceCODData(data)
  };



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

 const [expandedOrderId, setExpandedOrderId] = useState(null);

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  return (
    <div
      style={{ backgroundColor: "rgb(186, 239, 186)" }}
      className="overflow-x-auto text-black min-h-screen pt-14 px-4"
    >
      <h1 className="text-center font-bold text-2xl mb-6">Completed Orders</h1>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700">
            <tr>
               <th className="border px-2 py-2">SL</th>
              <th className="border px-2 py-2">Order Id</th>
              <th className="border px-2 py-2">Customer</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">Phone</th>
              <th className="border px-2 py-2">Location</th>
              <th className="border px-1 py-2">Order Note</th>
              <th className="border px-2 py-2">SubTotal</th>
              <th className="border px-2 py-2">Offer</th>
              <th className="border px-2 py-2">PayTotal</th>
              <th className="border px-2 py-2">Pay Method</th>
              <th className="border px-2 py-2">Pay Amount</th>
              <th className="border px-2 py-2">Transaction ID</th>
              <th className="border px-2 py-2">Pay Date</th>
              <th className="border px-2 py-2">Pay Note</th>
              <th className="border px-2 py-2">Updated</th>
              <th className="border px-2 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((cashdata, i) => {
              // calculate offer price if needed
              const ordoffer = cashdata?.totalPrice - 150;
              const offerperc = Number(cashdata?.offer) || 0;
              const offerPrice = cashdata?.offer
                ? Math.round(ordoffer - (offerperc * ordoffer) / 100) + 150
                : cashdata?.totalPrice;
              return (
                <React.Fragment key={cashdata._id}>
                {/* Parent Row */}
                <tr className="text-black hover:bg-gray-50">
                  <td className="border px-2 py-1 text-center">
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
                  <td className="border px-2 py-1 text-center flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleOrderComplete(cashdata)}
                        className="btn btn-sm font-medium btn-success text-white hover:underline"
                      >
                        Invoice
                      </button>
                    


                    <button
                      className="btn btn-sm btn-outline text-black text-blue-600 text-2xl bg-white rounded px-1"
                      onClick={() => toggleExpand(cashdata._id)}
                    >
                      {expandedOrderId === cashdata._id ? <FaEyeSlash className='' /> : <FaEye />}
                    </button>
                  
                  </td>
                 
                    
                </tr>

                {/* Nested Child Row */}
                {expandedOrderId === cashdata._id && (
                  <tr>
                    <td colSpan="10" className="p-2 bg-green-50">
                      <table className="table w-full border mt-2">
                        <thead className="bg-gray-200 text-xs md:text-sm font-semibold text-gray-700">
                          <tr>
                            <th className="border px-2 py-2 text-center">SL</th>
                            <th className="border px-2 py-2 text-center">Image</th>
                            <th className="border px-2 py-2 text-center">Product Name</th>
                            <th className="border px-2 py-2 text-center">Code</th>
                            <th className="border px-2 py-2 text-center">Category</th>
                            <th className="border px-2 py-2 text-center">Sub Category</th>
                            <th className="border px-2 py-2 text-center">authorName</th>
                            <th className="border px-2 py-2 text-center">edition</th>
                            <th className="border px-2 py-2 text-center">Qty</th>
                            <th className="border px-2 py-2 text-center">Price</th>
                            <th className="border px-2 py-2 text-center">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cashdata?.productdata?.map((prodata,j) => (
                            <tr key={prodata._id} className="hover:bg-gray-50">
                              <td className="border px-2 py-1 text-center">{j + 1}</td>
                              <td className="border px-2 py-1 text-center">
                                <div className="flex items-center gap-2">
                                  <div className="avatar">
                                    <div className="mask mask-squircle h-10 w-10">
                                      <img src={prodata.image} alt="Product" />
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="border px-2 py-1 text-center">{prodata?.namebn || prodata?.nameeng}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.ProductCode}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.category}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.subcategory}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.authorName}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.edition}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.quantity}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.productPrice}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
              )
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
              className={`btn btn-sm ${
                currentPage === index + 1 ? "btn-primary" : ""
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



      { showCODInvoice && ( <div className="modal modal-open"> <div className="modal-box max-w-4xl w-full" style={{ backgroundColor: "#baefba" }}> <div className="modal-action"> <button className="btn" onClick={() => setShowCODInvoice(false)}>✕</button> </div> <CODInvoice codInvdata={invoiceCODData} /> </div> </div> ) }
    </div>
  );
};

export default Completelist;