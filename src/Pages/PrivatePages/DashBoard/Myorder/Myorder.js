import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import OrderPaymentmodal from "./OrderPaymentmodal";
import Invoice from "../../OrderSummery/InvoiceOrder/Invoice";
import PaymenHistory from "../../OrderSummery/OrderConfirmation/PaymenHistory";
import { useQueryClient } from "@tanstack/react-query";

const Myorder = () => {
  const orderdataes = useLoaderData();
  const queryClient =useQueryClient()

  const [showModal, setShowModal] = useState(false);
  const [orderPaymeData, setOrderPaymeData] = useState(null);

  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);

  const [expandedRow, setExpandedRow] = useState(null);

  /* pagination */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orderdataes.length / itemsPerPage);

  const paginatedData = orderdataes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const handleUpdateOrderpayment = (id) => {
    setOrderPaymeData(id);
    setShowModal(true);
    queryClient.clear();
  };

  const handleOrderInvoice = (data) => {
    setInvoiceData(data);
    setShowInvoiceModal(true);
  };

  return (
    <div className="min-h-screen pt-14 px-2 md:px-4 text-black overflow-x-auto">
      <h1 className="text-center text-2xl font-bold mb-6">My Orders</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 border-collapse divide-y divide-gray-200">
          <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700">
            <tr>
              <th className="border px-2 py-2">SL</th>
              <th className="border px-2 py-2">Order ID</th>
              <th className="border px-2 py-2">email</th>
              <th className="border px-2 py-2">Order Date</th>
              <th className="border px-2 py-2">Location</th>
              <th className="border px-2 py-2">Total Payable</th>
              <th className="border px-2 py-2">Offer</th>
              <th className="border px-2 py-2">Paid</th>
              <th className="border px-2 py-2">Status</th>
              <th className="border px-2 py-2 text-center">Invoice</th>
              <th className="border px-2 py-2 text-center">Action</th>
            </tr>
          </thead>

          <tbody className="text-xs md:text-sm">
            {paginatedData.map((order, i) => (
              <React.Fragment key={order._id}>
                {/* MAIN ORDER ROW */}
                <tr className="hover:bg-gray-50">
                  <td className="border px-2 py-1">
                    {(currentPage - 1) * itemsPerPage + i + 1}
                  </td>
                  <td className="border px-2 py-1">{order.orderId}</td>
                  <td className="border px-2 py-1">{order.email}</td>
                  <td className="border px-2 py-1">{order.orderDate}</td>
                  <td className="border px-2 py-1 whitespace-pre-line">
                    {order.dlocation}
                  </td>
                  <td className="border px-2 py-1 text-center">
                    {order.totalPrice}
                  </td>
                  <td className="border px-2 py-1 text-center text-red-600">
                    {order?.offer} %
                  </td>
                  <td className="border py-1 text-center">
                      <PaymenHistory payments={order?.payments} />
                    </td>

                  <td className="border px-2 py-1 text-center">
                    {order.status === "placed" ? (
                      <span className="text-green-700 font-semibold">
                        Order Placed
                      </span>
                    ) : order.transactionId ? (
                      <span className="text-blue-600">
                        Processing
                      </span>
                    ) : (
                      <button
                        onClick={() => handleUpdateOrderpayment(order._id)}
                        className="btn btn-success btn-xs text-white"
                      >
                        Payment
                      </button>
                    )}
                  </td>

                  <td className="border px-2 py-1 text-center">
                    {order.status === "complete" ? (
                      <button
                        onClick={() => handleOrderInvoice(order)}
                        className="bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Invoice
                      </button>
                    ) : (
                      <span className="text-yellow-600 text-xs">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="border px-2 py-1 flex justify-center gap-2">
                    <button
                      onClick={() =>
                        setExpandedRow(
                          expandedRow === order._id ? null : order._id
                        )
                      }
                      className="text-blue-600 text-xl"
                    >
                      {expandedRow === order._id ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </td>
                </tr>

                {/* EXPANDED PRODUCT TABLE */}
                {expandedRow === order._id && (
                  <tr>
                    <td colSpan="8" className="p-2">
                      <table className="w-full border border-gray-300 border-collapse text-xs md:text-sm">
                        <thead className="bg-green-200">
                          <tr>
                            <th className="border px-2 py-1">SL</th>
                            <th className="border px-2 py-1">Image</th>
                            <th className="border px-2 py-1">Name</th>
                            <th className="border px-2 py-1">Code</th>
                            <th className="border px-2 py-1">Qty</th>
                            <th className="border px-2 py-1">Price</th>
                            <th className="border px-2 py-1">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.productdata.map((product, j) => (
                            <tr key={j} className="bg-white hover:bg-green-50">
                              <td className="border px-2 py-1">{j + 1}</td>
                              <td className="border px-2 py-1">
                                <img
                                  src={product?.image}
                                  alt={product?.nameeng || product?.namebn}
                                  className="h-10 w-10 object-cover rounded"
                                />
                              </td>
                              <td className="border px-2 py-1">
                                {product?.nameeng || product?.namebn}
                              </td>
                              <td className="border px-2 py-1">
                                {product?.ProductCode}
                              </td>
                              <td className="border px-2 py-1 text-center">
                                {product?.quantity}
                              </td>
                              <td className="border px-2 py-1 text-center">
                                {product?.offer}
                              </td>
                              <td className="border px-2 py-1 text-center">
                                {product?.total}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
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

      {/* Payment Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-xl">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <OrderPaymentmodal paydata={orderPaymeData} />
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {showInvoiceModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => setShowInvoiceModal(false)}
            >
              ✕
            </button>
            <Invoice invdata={invoiceData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Myorder;


// import React, { useState } from 'react';
// import { useLoaderData } from 'react-router-dom';
// import OrderPaymentmodal from './OrderPaymentmodal';
// import Invoice from '../../OrderSummery/InvoiceOrder/Invoice';

// const Myorder = () => {
//   const orderdataes = useLoaderData();
 

//   const [showModal, setShowModal] = useState(false);
//   const [orderPaymeData, setOrderPaymeData] = useState();

//   // Invoice modal state
//   const [showInvoiceModal, setShowInvoiceModal] = useState(false);
//   const [invoiceData, setInvoiceData] = useState();




//   const handleUpdateOrderpayment = (id) => {
//     setShowModal(true)
//     setOrderPaymeData(id)
//   }



//   const handleOrderInvoice = (informat) => {
//     setShowInvoiceModal(true)
//     setInvoiceData(informat);
//   }


//   // Pagination logic
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const totalPages = Math.ceil(orderdataes.length / itemsPerPage);

//   const paginatedData = orderdataes.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };
//   return (
//     <div className="text-black min-h-screen pt-14 px-4 md:px-8" style={{ backgroundColor: "rgb(186, 239, 186)" }}>
//       <h1 className="text-center font-bold text-2xl mb-6">Order List</h1>

//       <div className="overflow-x-auto w-full">
//         <table className="table w-full table-zebra text-[15px] md:text-[17px]">
//           <thead className="text-black text-lg font-bold">
//             <tr>
//               <th>SL</th>
//               <th>Product Name</th>
//               <th>Details</th>
//               <th>Product Code</th>
//               <th>Quantity</th>
//               <th>Total Payable</th>
//               <th>Location</th>
//               <th>Status</th>
//               <th>Invoice</th>
//             </tr>
//           </thead>
//           <tbody className='text-stone-700'>
//             {paginatedData?.map((informat, i) =>
//               informat?.productdata?.map((pdtdata, j) => (
//                 <tr key={`${informat._id}-${j}`}>
//                   <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
//                   <td>
//                     <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
//                       <figure className="avatar mask mask-squircle h-12 w-12">
//                         <img src={pdtdata.image} alt="Avatar" />
//                       </figure>
//                       <div className="flex flex-col">
//                         <span className="font-medium break-words max-w-[150px] sm:max-w-[200px]">{pdtdata.nameeng}</span>
//                         <span className="text-sm text-gray-600">TK {pdtdata.productPrice}</span>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="whitespace-normal break-words max-w-xs">
//                     OrderId: {informat?.orderId}
//                     <br />
//                     <span className="badge badge-ghost badge-sm">Post date: {informat?.orderDate}</span>
//                   </td>
//                   <td className="break-words max-w-[100px]">{pdtdata?.ProductCode}</td>
//                   <td>{pdtdata?.quantity}</td>
//                   <td>{informat.totalPrice}</td>
//                   <td className="whitespace-normal break-words max-w-[150px]">
//                     {informat.dlocation}
//                   </td>
//                   <td>
//                      {informat?.status === 'placed' ? (
//                       <p className="bg-green-400 text-white text-sm p-2 rounded-md text-center">
//                         Order Placed
//                       </p>
//                     ) : (
//                       <div className="flex flex-col gap-1">
//                         {
//                           informat?.transactionId ? <p className="text-xs text-gray-600">Order is being processed</p> : <button
//                           onClick={() => handleUpdateOrderpayment(informat?._id)}
//                           className="btn btn-success btn-sm text-white"
//                         >
//                           payment data
//                         </button>
//                         }
//                       </div>
//                     )}
//                   </td>
//                   <td>
//                     {informat?.status === 'complete' ? (
//                       <button onClick={() => handleOrderInvoice(informat)} className="bg-green-400 text-white text-sm p-2 rounded-md text-center">
//                         Invoice
//                       </button>
//                     ) : (
//                       <p className="bg-yellow-400 text-white text-sm p-2 rounded-md text-center">
//                         Please wait for complete your order
//                       </p>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination Controls */}
//       {totalPages > 1 && (
//         <div className="flex flex-wrap justify-center mt-6 gap-2">
//           <button
//             className="btn btn-sm"
//             onClick={() => goToPage(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToPage(index + 1)}
//               className={`btn btn-sm ${currentPage === index + 1 ? 'btn-primary' : ''}`}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             className="btn btn-sm"
//             onClick={() => goToPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}

//       {/*Order Payment confermation Modal */}
//       {showModal && (
//         <div className="modal modal-open">
//           <div className="modal-box w-full" style={{ backgroundColor: "#baefba" }}>
//             <div className="modal-action">
//               <button className="p-2 rounded-[100%] bg-green-400 hover:bg-green-600" onClick={() => setShowModal(false)}>✕</button>
//             </div>
//             <OrderPaymentmodal paydata={orderPaymeData} />
//           </div>
//         </div>
//       )}

// {/* Invoice Modal */}

//       {
//         showInvoiceModal && (
//           <div className="modal modal-open">
//             <div className="modal-box max-w-4xl w-full" style={{ backgroundColor: "#baefba" }}>
//               <div className="modal-action">
//                 <button className="btn" onClick={() => setShowInvoiceModal(false)}>✕</button>
//               </div>
//               <Invoice invdata={invoiceData} />
//             </div>
//           </div>
//         )
//       }
//     </div>
//   );
// };

// export default Myorder;