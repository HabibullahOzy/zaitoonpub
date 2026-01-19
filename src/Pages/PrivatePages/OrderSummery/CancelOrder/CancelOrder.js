import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash, FaTrashAlt } from 'react-icons/fa';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';

const CancelOrder = () => {

  const { data: cashonprod = [], refetch } = useQuery({
    queryKey: ['cashonprod'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/caspurchage/cancel`);
      return res.json();
    }
  });

  const handleConfirmOrder = async (id) => {
    const response = await axios.put(`${process.env.REACT_APP_backendurl}/orderconfirmtatus/${id}`);
   
    response?.status
      ? toast.success("Confirm Order Placed!")
      : toast.error("Order not confirm, please try again");
    refetch();
  };


  // const handleUpdateOrder = async (id) => {
  //   const response = await axios.put(`${process.env.REACT_APP_backendurl}/orderStatus/${id}`);
    
  //   response?.status
  //     ? toast.success("Paid Order Placed!")
  //     : toast.error("Order not placed, please try again");
  //   refetch();
  // };



  // const handleUpdateCODOrder = async (id) => {
  //   const response = await axios.put(`${process.env.REACT_APP_backendurl}/orderCODStatus/${id}`);
    
  //   response?.status
  //     ? toast.success("COD Order Placed!")
  //     : toast.error("Order not placed, please try again");
  //   refetch();
  // };

  const handleDeleteOrder = async (id) => {
    const response = await axios.delete(`${process.env.REACT_APP_backendurl}/orderItem/delete/${id}`);
    response?.status
      ? toast.success("Order Deleted!")
      : toast.error("Please try again");
    refetch();
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const totalPages = Math.ceil(cashonprod.length / itemsPerPage);

  const paginatedData = cashonprod.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };


  const [expandedRow, setExpandedRow] = useState(null);
  return (
    <div className="min-h-screen pt-14 px-2 md:px-4 text-black overflow-x-auto">
      <h1 className="text-center text-2xl font-bold mb-6">Cancelled Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 border-collapse divide-y divide-gray-200">
          <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700">
            <tr>
              <th className="border px-2 py-2">SL</th>
              <th className="border px-2 py-2">Order Id</th>
              <th className="border px-2 py-2">Customer</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">Phone</th>
              <th className="border px-2 py-2">Location</th>
              <th className="border px-2 py-2">SubTotal</th>
              <th className="border px-2 py-2">Offer</th>
              <th className="border px-2 py-2">PayTotal</th>
              <th className="border px-2 py-2">Pay Method</th>
              <th className="border px-2 py-2">Pay Amount</th>
              <th className="border px-2 py-2">Transaction ID</th>
              <th className="border px-2 py-2">Pay Date</th>
              <th className="border px-2 py-2">Updated</th>
              <th className="border px-2 py-2 text-center">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {paginatedData?.map((cashdata, i) => {
              // calculate offer price if needed
              const ordoffer = cashdata?.totalPrice;
              const offerperc = Number(cashdata?.offer) || 0;
              const offerPrice = cashdata?.offer
                ? Math.round(ordoffer - (offerperc * ordoffer) / 100)
                : cashdata?.totalPrice;
                return (
              <React.Fragment key={cashdata._id}>
                <tr className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td className="border px-2 py-1">{cashdata?.orderId}</td>
                  <td className="border px-2 py-1">{cashdata?.name}</td>
                  <td className="border px-2 py-1 break-all">{cashdata?.email}</td>
                  <td className="border px-2 py-1">{cashdata?.phonenumber}</td>
                  <td className="border px-2 py-1 whitespace-pre-line">{cashdata?.dlocation}</td>
                  <td className="border px-2 py-1">{ordoffer}</td>
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
                      {cashdata?.updatedAt}
                    </td>
                  
                  <td className="border px-2 py-1 flex gap-2 items-center justify-center">
                    <button
                      onClick={() => handleConfirmOrder(cashdata._id)}
                      className="bg-green-600 btn-sm btn text-white px-3 py-1 rounded text-sm"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(cashdata?._id)}
                      className="btn btn-error btn-xs text-white"
                    >
                      <FaTrashAlt />
                    </button>

                    <button
                      onClick={() => setExpandedRow(expandedRow === cashdata._id ? null : cashdata._id)}
                      className="text-blue-600 text-2xl bg-white rounded px-1"
                    >
                      {expandedRow === cashdata._id ? <FaEyeSlash className='' /> : <FaEye />}
                    </button>
                  </td>
                 
                </tr>

                {expandedRow === cashdata._id && (
                  <tr>
                    <td colSpan="10" className="p-2">
                      {/* Nested Product Table */}
                      <table className="w-full border border-gray-300 border-collapse text-xs md:text-sm">
                        <thead className="bg-green-200">
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
                            <tr key={prodata._id} className="hover:bg-green-50 bg-white">
                              <td className="border px-2 py-1">{j+1}</td>
                              <td className="border px-2 py-1">
                                <img src={prodata.image} alt="Product" className="h-10 w-10 rounded object-cover" />
                              </td>
                              <td className="border px-2 py-1 text-center">{prodata?.namebn || prodata?.nameeng}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.ProductCode}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.category}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.subcategory}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.authorName}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.edition}</td>
                              <td className="border px-2 py-1 text-center">{prodata.quantity}</td>
                              <td className="border px-2 py-1 text-center">{prodata.offer}</td>
                              <td className="border px-2 py-1 text-center">{prodata?.total}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            )})}
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
              className={`btn btn-sm ${currentPage === index + 1 ? "btn-primary" : ""}`}
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
    </div>
  );
};

export default CancelOrder;