import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const PaymenHistory = ({ payments = [] }) => {
  const [open, setOpen] = useState(false);

  const totalPaid = payments.reduce(
    (sum, p) => sum + Number(p?.amount || 0),
    0
  );

  if (!payments.length) {
    return (
      <div className="text-center text-sm text-gray-500">
        No payment yet
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center bg-gray-100 px-3 py-2 rounded hover:bg-gray-200 transition"
      >
        <span className="font-semibold text-sm">
        ৳{totalPaid}
        </span>
        {open ? <FaChevronUp /> : <FaChevronDown />}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="mt-2 border rounded-lg overflow-hidden">
          <table className="w-full text-sm border-collapse">
            <thead className="bg-gray-200 text-gray-700">
              <tr>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Method</th>
                <th className="border px-2 py-1">Amount</th>
                <th className="border px-2 py-1">Txn ID</th>
                <th className="border px-2 py-1">Date</th>
                <th className="border px-2 py-1">Note</th>
              </tr>
            </thead>
            <tbody>
              {payments
                .slice()
                .sort(
                  (a, b) =>
                    new Date(b.paymentDate) - new Date(a.paymentDate)
                )
                ?.map((p, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="border px-2 py-1 text-center">
                      {p.rname}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {p.payMethod}
                    </td>
                    <td className="border px-2 py-1 text-center font-semibold">
                      ৳{p.amount}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {p.transactionId}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {p.paymentDate}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {p.paidnote || "-"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymenHistory;
