import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import OrderPaymentmodal from './OrderPaymentmodal';
import Invoice from '../../OrderSummery/InvoiceOrder/Invoice';

const Myorder = () => {
  const orderdataes = useLoaderData();
  console.log(orderdataes);

  const [showModal, setShowModal] = useState(false);
  const [orderPaymeData, setOrderPaymeData] = useState();

  // Invoice modal state
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [invoiceData, setInvoiceData] = useState();



  // console.log(orderPaymeData)

  const handleUpdateOrderpayment = (id) => {
    setShowModal(true)
    setOrderPaymeData(id)
  }



  const handleOrderInvoice = (informat) => {
    setShowInvoiceModal(true)
    setInvoiceData(informat);
  }


  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(orderdataes.length / itemsPerPage);

  const paginatedData = orderdataes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  // console.log(paginatedData)

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className="text-black min-h-screen pt-14 px-4 md:px-8" style={{ backgroundColor: "rgb(186, 239, 186)" }}>
      <h1 className="text-center font-bold text-2xl mb-6">Order List</h1>

      <div className="overflow-x-auto w-full">
        <table className="table w-full table-zebra text-[15px] md:text-[17px]">
          <thead className="text-black text-lg font-bold">
            <tr>
              <th>SL</th>
              <th>Product Name</th>
              <th>Details</th>
              <th>Product Code</th>
              <th>Quantity</th>
              <th>Total Payable</th>
              <th>Location</th>
              <th>Status</th>
              <th>Invoice</th>
            </tr>
          </thead>
          <tbody className='text-stone-700'>
            {paginatedData?.map((informat, i) =>
              informat?.productdata?.map((pdtdata, j) => (
                <tr key={`${informat._id}-${j}`}>
                  <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      <figure className="avatar mask mask-squircle h-12 w-12">
                        <img src={pdtdata.image} alt="Avatar" />
                      </figure>
                      <div className="flex flex-col">
                        <span className="font-medium break-words max-w-[150px] sm:max-w-[200px]">{pdtdata.nameeng}</span>
                        <span className="text-sm text-gray-600">TK {pdtdata.productPrice}</span>
                      </div>
                    </div>
                  </td>
                  <td className="whitespace-normal break-words max-w-xs">
                    OrderId: {informat?.orderId}
                    <br />
                    <span className="badge badge-ghost badge-sm">Post date: {informat?.orderDate}</span>
                  </td>
                  <td className="break-words max-w-[100px]">{pdtdata?.ProductCode}</td>
                  <td>{pdtdata?.quantity}</td>
                  <td>{informat.totalPrice}</td>
                  <td className="whitespace-normal break-words max-w-[150px]">
                    {informat.dlocation}
                  </td>
                  <td>
                     {informat?.status === 'placed' ? (
                      <p className="bg-green-400 text-white text-sm p-2 rounded-md text-center">
                        Order Placed
                      </p>
                    ) : (
                      <div className="flex flex-col gap-1">
                        {
                          informat?.transactionId ? <p className="text-xs text-gray-600">Order is being processed</p> : <button
                          onClick={() => handleUpdateOrderpayment(informat?._id)}
                          className="btn btn-success btn-sm text-white"
                        >
                          payment data
                        </button>
                        }
                      </div>
                    )}
                  </td>
                  <td>
                    {informat?.status === 'complete' ? (
                      <button onClick={() => handleOrderInvoice(informat)} className="bg-green-400 text-white text-sm p-2 rounded-md text-center">
                        Invoice
                      </button>
                    ) : (
                      <p className="bg-yellow-400 text-white text-sm p-2 rounded-md text-center">
                        Please wait for complete your order
                      </p>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center mt-6 gap-2">
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

      {/*Order Payment confermation Modal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box w-full" style={{ backgroundColor: "#baefba" }}>
            <div className="modal-action">
              <button className="p-2 rounded-[100%] bg-green-400 hover:bg-green-600" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <OrderPaymentmodal paydata={orderPaymeData} />
          </div>
        </div>
      )}

{/* Invoice Modal */}

      {
        showInvoiceModal && (
          <div className="modal modal-open">
            <div className="modal-box max-w-4xl w-full" style={{ backgroundColor: "#baefba" }}>
              <div className="modal-action">
                <button className="btn" onClick={() => setShowInvoiceModal(false)}>✕</button>
              </div>
              <Invoice invdata={invoiceData} />
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Myorder;