import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const ReviewList = () => {

  const { data: review = [], refetch } = useQuery({
    queryKey: ['review'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/allreview`);
      const data = await res.json();
      return data;
    }
  });


  const handledelete = async (id) => {
    const response = await axios.delete(`${process.env.REACT_APP_backendurl}/review/delete/${id}`);
    response?.status
      ? toast.success("Review Deleted!")
      : toast.error("Please try again");
    refetch();
  };


  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(review.length / itemsPerPage);

  const paginatedData = review.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen min-w-[50%] mx-auto pt-14 px-2 md:px-4 text-black overflow-x-auto">
      <h1 className="text-center text-2xl font-bold mb-6">All Reviews</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border border-gray-300 border-collapse divide-y divide-gray-200">
          <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700">
            <tr>
              <th className="border px-2 py-2">SL</th>
              <th className="border px-2 py-2">Reviewer Name</th>
              <th className="border px-2 py-2">Email</th>
              <th className="border px-2 py-2">Product Code</th>
              <th className="border px-2 py-2">Rating</th>
              <th className="border px-2 py-2">Review</th>
              <th className="border px-2 py-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-xs md:text-sm">
            {paginatedData?.map((cashdata, i) =>
              <tr key={`${cashdata._id}`} className="hover:bg-gray-50">
                <td className="border px-2 py-4">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                <td className="border px-2 py-4 flex items-center gap-2">
                  <p>{cashdata.rname}</p>
                </td>
                <td className="border px-2 py-4">{cashdata?.email}</td>
                <td className="border px-2 py-4">{cashdata?.pdatacode}</td>
                <td className="border px-2 py-4">{cashdata?.rating}</td>
                <td className="border px-2 py-4">{cashdata?.dreview}</td>

                <td className="border px-2 py-4">
                  <button
                    onClick={() => handledelete(cashdata?._id)}
                    className="text-red-600 hover:text-red-800 transition-colors duration-200"
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </td>
              </tr>
            )}
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
            Next <TbPlayerTrackNextFilled />
          </button>
        </div>
      )}

    </div>
  );
};

export default ReviewList;