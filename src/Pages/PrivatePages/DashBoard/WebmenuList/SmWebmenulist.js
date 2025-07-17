import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';

const SmWebmenulist = () => {

const {data: webmenulist=[], refetch} =useQuery({
        queryKey: ['webmenulist'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/webmenulist`);
            const data = await res.json();
            return data;
        }
    });


console.log(webmenulist)
  const handledelete = async (id) => {
    const response = await axios.delete(`${process.env.REACT_APP_backendurl}/webmenu/delete/${id}`);
    response?.status
      ? toast.success("Review Deleted!")
      : toast.error("Please try again");
    refetch();
  };


       const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 10;
          const totalPages = Math.ceil(webmenulist.length / itemsPerPage);
        
          const paginatedData = webmenulist.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          );
        
          const goToPage = (page) => {
            if (page >= 1 && page <= totalPages) setCurrentPage(page);
          };
    
          console.log(paginatedData)

    return (
       <div className="min-h-screen min-w-[50%] mx-auto pt-14 px-2 md:px-4 text-black overflow-x-auto">
                             <h1 className="text-center text-2xl font-bold mb-6">All Web menus</h1>
                       
                             <div className="overflow-x-auto">
                               <table className="min-w-full text-sm border border-gray-300 border-collapse divide-y divide-gray-200">
                                 <thead className="bg-gray-100 text-xs md:text-sm font-semibold text-gray-700">
                                   <tr>
                                     <th className="border px-2 py-2">SL</th>
                                     <th className="border px-2 py-2">Type</th>
                                     <th className="border px-2 py-2">Slider Image</th>
                                     <th className="border px-2 py-2">Marq Text</th>
                                     <th className="border px-2 py-2">Marq Link</th>
                                     <th className="border px-2 py-2">Action</th>
                                   </tr>
                                 </thead>
                                 <tbody className="text-xs md:text-sm">
                                   {paginatedData?.map((cashdata, i) =>
                                       <tr key={`${cashdata._id}`} className="hover:bg-gray-50">
                                         <td className="border px-2 py-4 text-center">{(currentPage - 1) * itemsPerPage + i + 1}</td>
                                         <td className="border px-2 py-4 flex items-center gap-2 text-center">
                                           <p>{cashdata?.type}</p>
                                         </td>
                                         <td className="border px-2 py-4 text-center"><img src={cashdata?.image} alt="" className='w-80 h-auto' /></td>
                                         <td className="border px-2 py-4 text-center">{cashdata?.marqtext}</td>
                                         <td className="border px-2 py-4 text-center">{cashdata?.link}</td>
                                         
                                         <td className="border px-2 py-4 text-center">
                                           <button
                                             onClick={() => handledelete(cashdata?._id)}
                                             className="text-red-600 hover:text-red-800 transition-colors duration-200 text-xl"
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

export default SmWebmenulist;