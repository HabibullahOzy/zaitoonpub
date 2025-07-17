import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';

const AllCategory = () => {

    const { data: allcategory = [], refetch } = useQuery({
        queryKey: ['allcategory'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/category`);
            const data = await res.json();
            return data;
        }
    });


    const handledelete = async (id) => {
    const response = await axios.delete(`${process.env.REACT_APP_backendurl}/category/delete/${id}`);
    response?.status
      ? toast.success("Category Deleted!")
      : toast.error("Please try again");
    refetch();
  };


     const [currentPage, setCurrentPage] = useState(1);
      const itemsPerPage = 5;
      const totalPages = Math.ceil(allcategory.length / itemsPerPage);
    
      const paginatedData = allcategory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
    
      const goToPage = (page) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
      };

      console.log(paginatedData)
    return (
        <div className="min-h-screen mx-auto pt-14 px-2 md:px-4 text-black overflow-x-auto">
              <h1 className="text-center text-2xl font-bold mb-6">All Category</h1>
        
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border border-gray-300 border-collapse divide-y divide-gray-200">
                  <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700">
                    <tr>
                      <th className="border px-2 py-2">SL</th>
                      <th className="border px-2 py-2">image</th>
                      <th className="border px-2 py-2">Category</th>
                      <th className="border px-2 py-2">Sub Category</th>
                      <th className="border px-2 py-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs md:text-sm">
                    {paginatedData?.map((cashdata, i) =>
                        <tr key={`${cashdata._id}`} className="hover:bg-gray-50">
                          <td className="border px-2 py-1">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                          <td className="border px-2 py-1 flex items-center gap-2">
                            <img src={cashdata?.image} alt="Product" className="h-24 w-24 rounded object-cover" />
                          </td>
                          <td className="border px-2 py-1">{cashdata?.categname}</td>
                          <td className="border px-2 py-1">{cashdata?.subcategories}</td>
                          
                          <td className="border px-2 py-1">
                            <button
                              onClick={() => handledelete(cashdata?._id)}
                              className="btn btn-error btn-xs text-white"
                            >
                              Delete
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

export default AllCategory;