import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PmUpdate from './ProductUpdateModal/PmUpdate';
import { Link } from 'react-router-dom';
import { FaTrashAlt } from 'react-icons/fa';
import { GrDocumentUpdate } from 'react-icons/gr';
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from 'react-icons/tb';


const AllProducts = () => {

     const [modalOpen, setModalOpen] = useState(null)
     
     const [currentPage, setCurrentPage] = useState(1);


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/allProducts`);
            const data = await res.json()
            return data;

        }
    })

    const handleDelete = id => {
        // console.log(id)
        fetch(`${process.env.REACT_APP_backendurl}/products/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                if (data.deletedCount > 0) {
                    toast.success("Product successfully Deleted");
                    refetch();
                }
            })
    }
    // console.log(users)
// Pagination function

  const itemsPerPage = 5;

  // Pagination logic
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
    return (
      <div className="min-h-screen pt-14 px-4 text-black w-full">
  <h1 className="text-center font-bold text-3xl mb-8">Products List</h1>

  <div className="w-full overflow-x-auto rounded-xl shadow-md border">
    <table className="min-w-full table-auto">
      <thead className="bg-gray-100 text-black text-base font-semibold border-b">
        <tr className="text-left">
          <th className="px-4 py-3">#</th>
          <th className="px-4 py-3">Product Name</th>
          <th className="px-4 py-3">Category</th>
          <th className="px-4 py-3">Details</th>
          <th className="px-4 py-3">Code</th>
          <th className="px-4 py-3">Qty</th>
          <th className="px-4 py-3 text-center" colSpan="2">Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm divide-y divide-gray-200">
        {currentUsers.length > 0 ? (
          currentUsers.map((informat, i) => (
            <tr key={informat._id} className="hover:bg-gray-50 transition">
              <td className="px-4 py-3">{startIndex + i + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 overflow-hidden rounded-md bg-gray-200">
                    <img
                      src={informat.image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{informat.nameeng}</p>
                    <p className="text-xs text-gray-500">৳{informat.productPrice}</p>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3">{informat.category}</td>
              <td className="px-4 py-3">
                Offer: {informat?.offerprice}%
                <br />
                <span className="text-xs text-gray-500">Posted: {informat.postDate}</span>
              </td>
              <td className="px-4 py-3">{informat?.ProductCode}</td>
              <td className="px-4 py-3">{informat?.quantity}</td>
              <td className="px-2 py-3 text-center">
                <Link
                  to={`/productsupdate/${informat._id}`}
                  className="inline-flex items-center gap-1 btn btn-success btn-xs"
                >
                  <GrDocumentUpdate className="text-white" /> Update
                </Link>
              </td>
              <td className="px-2 py-3 text-center">
                <button
                  onClick={() => handleDelete(informat._id)}
                  className="inline-flex items-center gap-1 btn btn-error btn-xs"
                >
                  <FaTrashAlt className='text-white text-lg' /> Delete
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center text-gray-500 py-6">
              No products available.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>

  {/* Pagination Controls */}
  {totalPages > 1 && (
    <div className="flex justify-center mt-8 flex-wrap gap-2">
      <button
        onClick={() => goToPage(currentPage - 1)}
        className="btn btn-sm"
        disabled={currentPage === 1}
      >
        <TbPlayerTrackPrevFilled className="text-white" />
      </button>

      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => goToPage(index + 1)}
          className={`btn btn-sm ${
            currentPage === index + 1 ? 'btn-primary' : 'btn-outline'
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        onClick={() => goToPage(currentPage + 1)}
        className="btn btn-sm"
        disabled={currentPage === totalPages}
      >
        <TbPlayerTrackNextFilled className="text-white" />
      </button>
    </div>
  )}
</div>
    );
};

export default AllProducts;