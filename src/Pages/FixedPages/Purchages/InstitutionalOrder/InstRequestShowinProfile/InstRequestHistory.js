import React, { useState } from "react";

const InstRequestHistory = ({ instOrdersHist = [] }) => {
  const [preview, setPreview] = useState(null);

  const isPdf = (url) => url?.toLowerCase().endsWith(".pdf");

  const handleView = (fileUrl) => {
    // Open modal preview
    setPreview(fileUrl);
  };

  const statusStyle = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      case "delivered":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  if (!instOrdersHist.length) {
    return (
      <div className="bg-white shadow rounded p-6 text-center text-gray-500">
        No institutional request history found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-white shadow p-4 rounded">
      <h2 className="text-2xl font-bold mb-4">Institution Request History</h2>

      <table className="min-w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Date</th>
            <th className="border px-2 py-1">Status</th>
            <th className="border px-2 py-1">Institute</th>
            <th className="border px-2 py-1">Contact</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">File</th>
          </tr>
        </thead>

        <tbody>
          {instOrdersHist.map((order) => {
            // If statusHistory exists, show that; else fallback to current status
            const sortedHistory = Array.isArray(order?.statusHistory)
              ? [...order.statusHistory].sort(
                  (a, b) => new Date(b.date) - new Date(a.date)
                )
              : [
                  {
                    status: order.status || "pending",
                    date: order.createdAt,
                  },
                ];

            return sortedHistory?.map((history, index) => (
              <tr
                key={`${order._id}-${index}`}
                className="hover:bg-gray-50 text-black"
              >
                <td className="border px-2 py-1">{history.date}</td>
                <td className="border px-2 py-1">
                  <span
                    className={`px-2 py-1 rounded text-xs font-semibold ${statusStyle(
                      history.status
                    )}`}
                  >
                    {history.status}
                  </span>
                </td>
                <td className="border px-2 py-1">{order.institutionName}</td>
                <td className="border px-2 py-1">{order.contactPerson}</td>
                <td className="border px-2 py-1">{order.email}</td>
                <td className="border px-2 py-1">{order.phone}</td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => handleView(order.file)}
                    className="text-blue-600 underline hover:text-blue-800"
                  >
                    View
                  </button>
                </td>
              </tr>
            ));
          })}
        </tbody>
      </table>

      {/* FILE PREVIEW MODAL */}
      {preview && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-3 border-b bg-gray-100">
              <h3 className="font-semibold">
                File Preview {isPdf(preview) ? "(PDF)" : "(Image)"}
              </h3>
              <button
                onClick={() => setPreview(null)}
                className="text-xl font-bold text-gray-600 hover:text-red-600"
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className="p-4 bg-gray-50 flex justify-center">
              {isPdf(preview) ? (
                <iframe
                  src={`${preview}#toolbar=0&navpanes=0`}
                  className="w-full h-[550px] rounded border bg-white"
                  title="PDF Preview"
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="max-h-[550px] object-contain rounded"
                />
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 px-4 py-3 border-t">
              <button
                onClick={() => setPreview(null)}
                className="px-4 py-2 bg-gray-200 rounded text-sm hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstRequestHistory;
