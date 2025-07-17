import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const ConfirmList = () => {

    
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
// const [showCODInvoice, setShowCODInvoice] = useState(false);
// const [invoiceCODData, setInvoiceCODData] = useState(null);

  const handleOrderComplete = async (id) => {
    const response = await axios.put(`${process.env.REACT_APP_backendurl}/ordercompletetatus/${id}`);
    // console.log(response)
    response?.status
      ? toast.success("Complete Order Placed!")
      : toast.error("Order not placed, please try again");
    refetch();
  };



  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
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


    return (
     
      <div style={{ backgroundColor: "rgb(186, 239, 186)" }} className="overflow-x-auto text-black min-h-screen pt-14 px-4">
        <h1 className="text-center font-bold text-2xl mb-6">Confirm Orders</h1>

       <div className="overflow-x-auto">
         <table className="table w-full">
          <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700  overflow-x-auto">
            <tr>
              <th className="border px-2 py-2">SL</th>
              <th className="border px-2 py-2">Order Id</th>
              <th className="border px-2 py-2">Product</th>
              <th className="border px-2 py-2">Code</th>
              <th className="border px-2 py-2">Category</th>
              <th className="border px-2 py-2">Qty</th>
              <th className="border px-2 py-2">Price</th>
              <th className="border px-2 py-2">Total</th>
              <th className="border px-2 py-2">Pay Total</th>
              <th className="border px-2 py-2">Customer</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">Phone</th>
              {/* <th className="border px-2 py-2">Alt Phone</th> */}
              <th className="border px-2 py-2">Location</th>
              <th className="border px-2 py-2">Pay Method</th>
              <th className="border px-2 py-2">Pay Amount</th>
              <th className="border px-2 py-2">Transaction ID</th>
              <th className="border px-2 py-2">Pay Date</th>
              {/* <th className="border px-2 py-2">Order Status</th> */}
              {/* <th className="border px-2 py-2">Status</th> */}
              <th className="border px-2 py-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((cashdata, i) =>
              cashdata?.productdata?.map((prodata, j) => (
                <tr key={`${cashdata._id}-${j}`} className="text-black hover:bg-gray-50">
                  <td className="border px-2 py-1 text-center">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td className="border px-2 py-1 text-center">{cashdata?.orderId}</td>
                  <td className="border px-2 py-1 text-center">
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={prodata.image} alt="Product" />
                        </div>
                      </div>
                      <span>{prodata.name}</span>
                    </div>
                  </td>
                  <td className="border px-2 py-1 text-center">{prodata?.ProductCode}</td>
                  <td className="border px-2 py-1 text-center">{prodata?.category}</td>
                  <td className="border px-2 py-1 text-center">{prodata.quantity}</td>
                  <td className="border px-2 py-1 text-center">{prodata.offer}</td>
                  <td className="border px-2 py-1 text-center">{prodata?.total}</td>
                  <td className="border px-2 py-1 text-center">{cashdata?.totalPrice}</td>
                  <td className="border px-2 py-1 text-center">{cashdata.name}</td>
                  <td className="border px-2 py-1 text-center">{cashdata.email}</td>
                  <td className="border px-2 py-1 text-center">{cashdata.phonenumber}</td>
                  {/* <td>{cashdata.alphonenumber}</td> */}
                  <td className="border px-2 py-1  text-center">
                    {cashdata?.dlocation},<br />
                    {cashdata.nationality},<br />
                    {cashdata.city},<br />
                    {cashdata.area}
                  </td>
                  <td className="border px-2 py-1 text-center">{cashdata?.payMethod}</td>
                  <td className="border px-2 py-1 text-center">{cashdata?.amount}</td>
                  <td className="border px-2 py-1 text-center">{cashdata?.transactionId}</td>
                  <td className="border px-2 py-1 text-center">{cashdata?.paymentDate}</td>
                  {/* <td className="">{cashdata?.role}</td> */}
                  {/* <td>
                    {cashdata?.status==='confirm' ? (
                      <p className="bg-green-300 text-white p-2 text-center rounded-md">
                        Order Placed
                      </p>
                    ) : (
                      // <button
                      //   onClick={() => handleUpdateOrder(cashdata._id)}
                      //   className="btn btn-sm font-medium btn-success text-white hover:underline"
                      // >
                      //   CODpayment
                      // </button>
                      ""
                    )}
                  </td> */}
                  <td className="border px-2 py-1 text-center">
                    {
                      cashdata?.status === 'confirm' ? (
                        <button onClick={() => handleOrderComplete(cashdata?._id)} className="btn btn-sm font-medium btn-success text-white hover:underline">
                          Complete
                          </button>
                      ) : (<p className="bg-red-300 text-white p-2 text-center rounded-md">
                        Please at first confirm this Order</p>)
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
       </div>

        {/* Pagination Controls */}
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
              Next
            </button>
          </div>
        )}
      

      {/* {
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
      } */}
    </div>
    );
};

export default ConfirmList;