import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { FaTrashAlt } from 'react-icons/fa';

const USERS_PER_PAGE = 5;

const AllUsers = () => {
    const { user } = useContext(Zaitooncontext);
    const [alluser, setAlluser] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_backendurl}/allusers`)
            .then((res) => {
                setAlluser(res.data);
            })
            .catch((error) => {
                toast.error(error.message);
            });
    }, []);

    const createAdmin = (id) => {
        axios.put(`${process.env.REACT_APP_backendurl}/users/admin/${id}`)
            .then(() => {
                toast.success('Successfully admin Created');
                setAlluser(prev => prev.map(u => u._id === id ? { ...u, role: 'admin' } : u));
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    const userdelete = (id) => {
        axios.delete(`${process.env.REACT_APP_backendurl}/users/delete/${id}`)
            .then(res => {
                if (res.data.acknowledged === true) {
                    toast.success("User Successfully deleted");
                    setAlluser(prev => prev.filter(u => u._id !== id));
                }
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    // Pagination logic
    const totalPages = Math.ceil(alluser.length / USERS_PER_PAGE);
    const paginatedUsers = alluser.slice((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE);

    return (
        <div className="px-4 py-8 min-h-screen w-full text-black">
            <h1 className="text-2xl font-bold text-center mb-6">Users List</h1>

            <div className="overflow-x-auto shadow rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                    <thead className="bg-green-400">
                        <tr>
                            <th className="px-4 py-3 text-left font-semibold">User</th>
                            <th className="px-4 py-3 text-left font-semibold">Email</th>
                            <th className="px-4 py-3 text-left font-semibold">Type</th>
                            <th className="px-4 py-3 text-left font-semibold">Action</th>
                            <th className="px-4 py-3 text-left font-semibold">Delete</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {paginatedUsers.map((user, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition">
                                <td className="px-4 py-3 flex items-center gap-3">
                                    <img
                                        className="h-10 w-10 rounded-full object-cover"
                                        src={user.img}
                                        alt={user.name}
                                    />
                                    <p className="font-medium">{user.name}</p>
                                </td>
                                <td className="px-4 py-3">{user.email}</td>
                                <td className="px-4 py-3 capitalize">{user.role}</td>
                                <td className="px-4 py-3">
                                    {
                                        user.role === 'admin' || user.role === 'superadmin' ? null : (
                                            <button
                                                onClick={() => createAdmin(user._id)}
                                                className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
                                            >
                                                Make Admin
                                            </button>
                                        )
                                    }
                                </td>
                                <td className="px-4 py-3">
                                    <button
                                        onClick={() => userdelete(user._id)}
                                        className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-2">
                <button
                    onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Prev
                </button>
                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-3 py-1 rounded ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-100'}`}
                    >
                        {i + 1}
                    </button>
                ))}
                <button
                    onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllUsers;