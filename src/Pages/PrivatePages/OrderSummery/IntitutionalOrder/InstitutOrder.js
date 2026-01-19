import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";

const InstitutOrder = () => {
  const { data: instOrders = [], refetch } = useQuery({
    queryKey: ["instOrders"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/institutorder`);
      const data = await res.json();
      return data;
    },
  });

  const [notes, setNotes] = useState({});

  const handleNoteChange = (id, value) => {
    setNotes((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const [previewFile, setPreviewFile] = useState(null);

  const handleActionOrder = async (id, newStatus, note) => {
    try {
      const resp = await fetch(`${process.env.REACT_APP_backendurl}/instorderstatus/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus, note: note }),
      });

      const data = await resp.json();

      if (data.success) {
        toast.success(`Request successfully ${newStatus}!`);
        refetch();
      } else {
        toast.error("Please try again later");
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error! Please try again later");
    }
  };

  const getButtonProps = (status) => {
    switch (status) {
      case "accepted":
        return { text: "Accepted", className: "bg-green-700 text-white" };
      case "rejected":
        return { text: "Rejected", className: "bg-red-700 text-white" };
      case "delivered":
        return { text: "Delivered", className: "bg-blue-700 text-white" };
      default:
        return { text: "Pending", className: "bg-gray-300 text-black" };
    }
  };

  const isPDF = (url) => url?.toLowerCase().endsWith(".pdf");
  const getPreviewUrl = (url) => `${url}?dl=0`;

  return (
    <div className="overflow-x-auto p-4 min-h-screen">
      <h1 className="text-center p-5 text-black text-2xl font-bold">Institutional Orders</h1>
      <table className="min-w-full border border-gray-200 rounded-lg">
        <thead className="bg-gray-100 text-black">
          <tr>
            <th className="border px-3 py-2">SL</th>
            <th className="border px-3 py-2">Institution</th>
            <th className="border px-3 py-2">Contact</th>
            <th className="border px-3 py-2">Email</th>
            <th className="border px-3 py-2">Phone</th>
            <th className="border px-3 py-2">File</th>
            <th className="border px-3 py-2">Date</th>
            <th className="border px-3 py-2">Note</th>
            <th className="border px-3 py-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {instOrders?.map((order, i) => {
            const { text, className } = getButtonProps(order?.status);

            return (
              <tr key={order._id} className="hover:bg-gray-50 text-black">
                <td className="border px-3 py-2 text-center">{i + 1}</td>
                <td className="border px-3 py-2">{order.institutionName}</td>
                <td className="border px-3 py-2">{order.contactPerson}</td>
                <td className="border px-3 py-2">{order.email}</td>
                <td className="border px-3 py-2">{order.phone}</td>

                <td className="border px-3 py-2 text-center space-x-2">
                  <button
                    onClick={() => setPreviewFile(order.file)}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    View
                  </button>
                </td>

                <td className="border px-3 py-2">{order?.createdAt}</td>
                <td className="border px-3 py-2">{order?.note}</td>

                <td className="border px-3 py-2 text-center">
                  {order?.status === "pending" ? (
                    <div className="flex flex-col gap-2 items-center">

                      {/* 📝 NOTE INPUT */}
                      <input
                        type="text"
                        placeholder="Write a note..."
                        value={notes[order._id] || ""}
                        onChange={(e) => handleNoteChange(order._id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm w-full max-w-[200px]"
                      />

                      {/* 🔘 ACTION BUTTONS */}
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleActionOrder(order._id, "accepted", notes[order._id])
                          }
                          className="bg-green-300 px-2 rounded btn btn-sm"
                        >
                          Accept
                        </button>

                        <button
                          onClick={() =>
                            handleActionOrder(order._id, "rejected", notes[order._id])
                          }
                          className="bg-red-300 px-2 rounded btn btn-sm"
                        >
                          Reject
                        </button>

                        <button
                          onClick={() =>
                            handleActionOrder(order._id, "delivered", notes[order._id])
                          }
                          className="bg-blue-300 px-2 rounded btn btn-sm"
                        >
                          Delivered
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className={`px-2 rounded ${className}`}>{text}</p>
                  )}
                </td>

              </tr>
            );
          })}
        </tbody>
      </table>

      {/* ===== MODAL ===== */}
      {previewFile && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-5xl rounded-xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center px-5 py-3 border-b">
              <h3 className="font-semibold text-gray-800">
                {isPDF(previewFile) ? "PDF Preview" : "Image Preview"}
              </h3>
              <button
                onClick={() => setPreviewFile(null)}
                className="text-2xl text-gray-500 hover:text-red-600"
              >
                ✕
              </button>
            </div>

            <div className="bg-gray-100 p-4 flex justify-center">
              {isPDF(previewFile) ? (
                <iframe
                  src={getPreviewUrl(previewFile)}
                  className="w-full h-[700px] bg-white rounded"
                  title="PDF Preview"
                />
              ) : (
                <img
                  src={getPreviewUrl(previewFile)}
                  className="max-h-[600px] rounded"
                  alt="Preview"
                />
              )}
            </div>

            <div className="flex justify-end gap-3 px-5 py-3 border-t">
              <button
                onClick={() => setPreviewFile(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
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

export default InstitutOrder;
