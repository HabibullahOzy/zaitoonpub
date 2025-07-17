import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import PaidInvoice from './PaidInvoice';

const PaidOrderPlaced = () => {

const { data: cashonprod = [], refetch } = useQuery({
    queryKey: ['cashonprod'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/cashonPaypurchage/paid`);
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
const [showpaidInvoice, setShowpaidInvoice] = useState(false);
const [invoicepaidData, setInvoicepaidData] = useState(null);

  const handleOrderInvoice = async (cashdata) => {
    setShowpaidInvoice(true);
    setInvoicepaidData(cashdata);
  }



  // Pagination logic
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(cashonprod.length / itemsPerPage);

  const paginatedData = cashonprod.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };


    return (
        <div style={{ backgroundColor: "rgb(186, 239, 186)" }}>
      <div className="overflow-x-auto text-black min-h-screen pt-14 px-4">
        <h1 className="text-center font-bold text-2xl mb-6">Paid Orders List</h1>

        <table className="table table-zebra w-full">
          <thead className="text-black text-lg font-bold">
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Code</th>
              <th>Category</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Alt Phone</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((cashdata, i) =>
              cashdata?.productdata?.map((prodata, j) => (
                <tr key={`${cashdata._id}-${j}`} className="text-stone-600">
                  <td>{(currentPage - 1) * itemsPerPage + i + 1}</td>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={prodata.image} alt="Product" />
                        </div>
                      </div>
                      <span>{prodata.name}</span>
                    </div>
                  </td>
                  <td>{prodata?.ProductCode}</td>
                  <td>{prodata?.category}</td>
                  <td>{prodata.quantity}</td>
                  <td>{prodata.offer}</td>
                  <td>{prodata?.total}</td>
                  <td>{cashdata.name}</td>
                  <td>{cashdata.email}</td>
                  <td>{cashdata.phonenumber}</td>
                  <td>{cashdata.alphonenumber}</td>
                  <td>
                    {cashdata?.dlocation},<br />
                    {cashdata.nationality},<br />
                    {cashdata.city},<br />
                    {cashdata.area}
                  </td>
                  <td>
                    {cashdata?.status==='placed' ? (
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
                  </td>
                  <td>
                    {
                      cashdata?.status === 'placed' ? (
                        <button onClick={() => handleOrderInvoice(cashdata)} className="btn btn-sm font-medium btn-success text-white hover:underline">
                          Invoice
                          </button>
                      ) : (<p className="bg-red-300 text-white p-2 text-center rounded-md">
                        Please wait for confirm this Order</p>)
                    }
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

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
      </div>

      {
        showpaidInvoice && (
          <div className="modal modal-open">
            <div className="modal-box max-w-4xl w-full" style={{ backgroundColor: "#baefba" }}>
              <div className="modal-action">
                <button className="btn" onClick={() => setShowpaidInvoice(false)}>✕</button>
              </div>
              <PaidInvoice paidInvdata={invoicepaidData} />
            </div>
          </div>
        )
      }
    </div>
    );
};

export default PaidOrderPlaced;