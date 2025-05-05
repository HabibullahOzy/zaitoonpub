import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
// import useAdmin from '../../../../hooks/adminHooks/useAdmin';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { reload } from 'firebase/auth';

const AllUsers = () => {
    const { user } = useContext(Zaitooncontext);
    // const [isAdmin]=useAdmin(user?.email);
    const [alluser, setAlluser] = useState([])
    useEffect(() => {
        try {
            axios.get('http://localhost:5000/allusers')
                .then((res) => {
                    const allusers = res.data
                    console.log(allusers)
                    setAlluser(allusers)
                })
        }
        catch (error) {
            // console.log(error)
            toast.error(error.message)
        }
    }, []);

    const createAdmin = (id) => {
        try {
            axios.put(`http://localhost:5000/users/admin/${id}`)
                .then((res) => {
                    toast.success('Successfully admin Created')
                    // reload("")
                })
        }
        catch (error) {
            console.log(error)
        }
    }



    const userdelete = (id) => {
        try {
            axios.delete(`http://localhost:5000/users/delete/${id}`)
                .then(res => {
                    console.log(res)
                    if (res.data.acknowledged === true) {
                        toast.success("User Successfully deleted")
                        // reload('')
                    }
                })
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="overflow-x-auto text-black min-h-screen pt-14">

            <h1 className=' text-center font-bold text-2xl'>Users List</h1>
            <table className="table"><thead className='text-black text-lg font-bold'>
                <tr>
                    <th>
                        Select
                    </th>
                    <th>User Name</th>
                    <th>Type</th>
                    <th></th>
                    {/* Last SignIn date */}
                    <th></th>
                </tr>
            </thead>
                <tbody>
                    {/* row 1 */}

                    {
                        alluser?.map((user, i) => (<tr key={i}>
                            <th>
                                <label>
                                    <input type="checkbox" className="checkbox" />
                                </label>
                            </th>
                            <td>
                                <div className="flex items-center gap-3">
                                    <div className="avatar">
                                        <div className="mask mask-squircle h-12 w-12">
                                            <img
                                                src={user.img}
                                                alt="Avatar Tailwind CSS Component" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="font-bold">{user.name}</div>
                                        <div className="text-sm opacity-50">{user.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                {user.role}
                                {/* <br />
                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span> */}
                            </td>
                            {/* <td></td> */}
                            <th>
                                {
                                    user?.role === 'admin' || user?.role === 'superadmin' ? "" : <button onClick={() => createAdmin(user._id)} className="btn btn-primary btn-xs">Admin</button>
                                }
                            </th>
                            <th>
                                <button onClick={() => userdelete(user._id)} className="btn btn-error btn-xs">Delete</button>
                            </th>
                        </tr>))

                    }

                </tbody>
                {/* foot */}
                {/* <tfoot>
                <tr>
                    <th></th>
                    <th>Name</th>
                    <th>Job</th>
                    <th>Favorite Color</th>
                    <th></th>
                </tr>
            </tfoot> */}
            </table>
        </div>
    );
};

export default AllUsers;