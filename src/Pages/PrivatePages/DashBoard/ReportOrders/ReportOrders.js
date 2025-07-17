// import dayjs from 'dayjs';
// import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
// import ReactToPrint from "react-to-print";
// import React, { useRef, useState } from 'react';
// import { FcPrint } from 'react-icons/fc';
// import { useQuery } from '@tanstack/react-query';
// import ReactPaginate from 'react-paginate';
// import DatePicker from 'react-datepicker';
import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { useQuery } from "@tanstack/react-query";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { FcPrint } from "react-icons/fc";
import { FaFileCsv, FaFileExcel } from "react-icons/fa6";


dayjs.extend(weekOfYear);



const ReportOrders = () => {
  const [filterType, setFilterType] = useState("month");
  const [statusfilterType, setStatusFilterType] = useState("complete");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;
  const printRef = useRef();

  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/orders");
      return res.json();
    },
  });

  const getFilteredOrders = () => {
    const selected = dayjs(selectedDate);
    return orders?.filter((order) => {
      const orderDate = dayjs(order.createdAt);
      const orderStatus = (order?.status);

      if (filterType === "month") {
        return (
          orderDate.year() === selected.year() &&
          orderDate.month() === selected.month()
        );
      }

      if (filterType === "week") {
        return (
          orderDate.year() === selected.year() &&
          orderDate.week() === selected.week()
        );
      }

      if (filterType === "year") {
        return orderDate.year() === selected.year();
      }

      if (filterType === "complete") {
        return orderStatus === "complete";
      }

      if (filterType === "confirm") {
        return orderStatus === "confirm";
      }

      if (filterType === "pending") {
        return orderStatus === "pending";
      }

      if (filterType === "cancel") {
        return orderStatus === "cancel";
      }


      return true;
    });
  };

  const filteredOrders = getFilteredOrders();
  const offset = currentPage * itemsPerPage;
  const currentItems = filteredOrders.slice(offset, offset + itemsPerPage);

  const exportToExcel = () => {
    const cleanData = [];

    filteredOrders.forEach((order, i) => {
      order?.productdata?.forEach((prod) => {
        cleanData.push({
          ID: i + 1,
          OrderID: order.orderId,
          ProductName: prod.nameeng,
          ProductCode: prod.ProductCode,
          UnitPrice: prod.productPrice,
          Quantity: prod.quantity,
          TotalOrderPrice: order.totalPrice,
          Name: order.name,
          Email: order.email,
          Phone: order.phonenumber,
          Address: order.dlocation,
          Date: order.orderDate,
          Status: order.status,
        });
      });
    });

    const ws = XLSX.utils.json_to_sheet(cleanData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Orders");

    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "OrderSummary.xlsx");
  };

  // const exportToCSV = () => {
  //   const cleanData = filteredOrders.map((order, i) => ({
  //     ID: i + 1,
  //     Name: order.name,
  //     Email: order.email,
  //     Phone: order.phonenumber,
  //     Address: order.dlocation,
  //     Total: order.totalPrice,
  //     Date: order.orderDate,
  //     Status: order.status,
  //     OrderID: order.orderId,
  //   }));

  //   const ws = XLSX.utils.json_to_sheet(cleanData);
  //   const csv = XLSX.utils.sheet_to_csv(ws);
  //   const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  //   saveAs(blob, "OrderSummary.csv");
  // };

  const handlePrint = () => {
    const printContents = printRef.current.innerHTML;
    const printWindow = window.open("", "", "width=900,height=650");
    printWindow.document.write(`
      <html>
       <head>
       <title>ZP Order Summery</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #b2f3b2; padding: 0.5rem; text-align: left; }
                    th { background-color: #b2f3b2; font-weight: bold; }
                </style>
            </head>
      <body>
      ${printContents}
      <script>
        window.onload = function() {
          window.print();
          window.onafterprint = function () {
            window.close();
          };
        };
      </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="p-4 max-w-7xl mx-auto overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-black">Order Summary</h2>

      <div className="flex gap-4 flex-wrap mb-6 items-center justify-between overflow-x-auto">
        <div className="flex gap-4 items-center">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow"
          >
            <option value="month">Monthly</option>
            <option value="week">Weekly</option>
            <option value="year">Yearly</option>
          </select>

          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            dateFormat={
              filterType === "month"
                ? "MMMM yyyy"
                : filterType === "year"
                  ? "yyyy"
                  : "yyyy-MM-dd"
            }
            showMonthYearPicker={filterType === "month"}
            showYearPicker={filterType === "year"}
            className="p-2 border border-gray-300 rounded shadow"
          />


          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-2 border border-gray-300 rounded shadow"
            
          >
            <option>Order Status</option>
            <option value="complete">complete</option>
            <option value="confirm">confirm</option>
            <option value="pending">pending</option>
            <option value="cancel">cancel</option>
          </select>
        </div>

        <div className="flex gap-4 items-center">
          <button onClick={handlePrint} className="bg-green-600 text-white px-4 py-2 rounded shadow"><FcPrint /></button>
          <button onClick={exportToExcel} className="bg-green-300 text-white px-4 py-2 rounded shadow flex"><FaFileExcel />Excel</button>
          {/* <button onClick={exportToCSV} className="bg-amber-500 text-white px-4 py-2 rounded shadow"><FaFileCsv /></button> */}
        </div>
      </div>

      <div ref={printRef} className="overflow-x-auto text-black p-2 rounded min-h-screen">
        <table className="min-w-full text-sm border border-collapse border-black">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1">SL</th>
              <th className="border px-2 py-1">Order ID</th>
              <th className="border px-2 py-1">Product Name</th>
              <th className="border px-2 py-1">Product Code</th>
              <th className="border px-2 py-1">Unit Price</th>
              <th className="border px-2 py-1">Quantity</th>
              <th className="border px-2 py-1">Total Price</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Phone</th>
              <th className="border px-2 py-1">Location</th>
              <th className="border px-2 py-1">Date</th>
              <th className="border px-2 py-1">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((order, i) =>
              order?.productdata?.map((ord, j) => (
                <tr key={`${order._id}-${j}`} className="hover:bg-gray-50">
                  <td className="border px-2 py-1">{offset + i + 1}</td>
                  <td className="border px-2 py-1">{order.orderId}</td>
                  <td className="border px-2 py-1">{ord?.nameeng}</td>
                  <td className="border px-2 py-1">{ord?.ProductCode}</td>
                  <td className="border px-2 py-1">{ord?.productPrice}tk</td>
                  <td className="border px-2 py-1">{ord?.quantity}</td>
                  <td className="border px-2 py-1">{order.totalPrice}tk</td>
                  <td className="border px-2 py-1">{order.name}</td>
                  <td className="border px-2 py-1">{order.phonenumber}</td>
                  <td className="border px-2 py-1">{order.dlocation}</td>
                  <td className="border px-2 py-1">{order.orderDate}</td>
                  <td className="border px-2 py-1">{order?.status === "pending" ? <p className="bg-orange-400 rounded-full px-2">{order.status}</p> : order.status === "confirm" ? <p className="bg-blue-400 rounded-full px-2">{order.status}</p> : order.status === "complete" ? <p className="bg-green-400 rounded-full px-2">{order?.status}</p> : order.status === "cancel" ? <p className="bg-red-500 rounded-full px-2">{order.status}</p> : <></>}</td>
                </tr>
              ))
            )}
            {currentItems.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4">No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={"←"}
          nextLabel={"→"}
          pageCount={Math.ceil(filteredOrders.length / itemsPerPage)}
          onPageChange={({ selected }) => setCurrentPage(selected)}
          containerClassName={"flex space-x-2"}
          pageClassName={"px-3 py-1 border rounded"}
          activeClassName={"bg-white text-black border border-gray-300 rounded-full font-semibold"}
          disabledClassName={"opacity-50"}
        />
      </div>
    </div>

    // <div className="p-4">
    //   <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
    //     <h2 className="text-xl font-bold">Order Summary</h2>

    //     <div className="flex gap-2 items-center flex-wrap">
    //       <select
    //         value={filter}
    //         onChange={(e) => setFilter(e.target.value)}
    //         className="border p-2 rounded"
    //       >
    //         <option value="weekly">Weekly</option>
    //         <option value="monthly">Monthly</option>
    //         <option value="yearly">Yearly</option>
    //       </select>

    //       <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
    //                           <button
    //                               onClick={handlePrint}
    //                               style={{
    //                                   // backgroundColor: "#2563eb",
    //                                   color: "white",
    //                                   padding: "0.5rem 1rem",
    //                                   borderRadius: "6px",
    //                                   border: "none",
    //                                   cursor: "pointer",
    //                               }}
    //                           >
    //                               <FcPrint className="text-2xl" />
    //                           </button>
    //                           {/* <button
    //                               onClick={handleDownload}
    //                               style={{
    //                                   backgroundColor: "#16a34a",
    //                                   color: "white",
    //                                   padding: "0.5rem 1rem",
    //                                   borderRadius: "6px",
    //                                   border: "none",
    //                                   cursor: "pointer",
    //                               }}
    //                           >
    //                               Download PDF
    //                           </button> */}
    //                       </div>

    //       <button
    //         onClick={downloadPDF}
    //         className="bg-green-600 text-white px-4 py-2 rounded"
    //       >
    //         Download PDF
    //       </button>
    //     </div>
    //   </div>

    //   <div ref={printRef} className="overflow-x-auto bg-white shadow rounded-lg">
    //     <table className="min-w-full divide-y divide-gray-200 text-sm">
    //       <thead className="bg-gray-100">
    //         <tr>
    //           <th className="px-4 py-2 text-left">ID</th>
    //           <th className="px-4 py-2 text-left">Customer</th>
    //           <th className="px-4 py-2 text-left">Amount</th>
    //           <th className="px-4 py-2 text-left">Date</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {paginatedOrders.map((order) => (
    //           <tr key={order.id} className="border-t">
    //             <td className="px-4 py-2">{order.id}</td>
    //             <td className="px-4 py-2">{order.customer}</td>
    //             <td className="px-4 py-2">${order.amount}</td>
    //             <td className="px-4 py-2">{order.date}</td>
    //           </tr>
    //         ))}
    //         {paginatedOrders.length === 0 && (
    //           <tr>
    //             <td colSpan="4" className="text-center py-4 text-gray-500">
    //               No orders found.
    //             </td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>

    //   {/* Pagination */}
    //   <div className="mt-4 flex justify-end items-center gap-2">
    //     <button
    //       onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
    //       disabled={page === 1}
    //       className="px-3 py-1 border rounded disabled:opacity-50"
    //     >
    //       Prev
    //     </button>
    //     <span className="text-sm">
    //       Page {page} of {totalPages}
    //     </span>
    //     <button
    //       onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
    //       disabled={page === totalPages}
    //       className="px-3 py-1 border rounded disabled:opacity-50"
    //     >
    //       Next
    //     </button>
    //   </div>
    // </div>
  );
};

export default ReportOrders;