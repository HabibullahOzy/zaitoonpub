import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import PmUpdate from './ProductUpdateModal/PmUpdate';
import { Link } from 'react-router-dom';

const AllProducts = () => {

     const [modalOpen, setModalOpen] = useState(null)


    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allProducts');
            const data = await res.json()
            return data;

        }
    })

    const handleDelete = id => {
        console.log(id)
        fetch(`http://localhost:5000/products/delete/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.deletedCount > 0) {
                    toast.success("Product successfully Deleted");
                    refetch();
                }
            })
    }
    console.log(users)
    return (
        <div className="overflow-x-auto text-black min-h-screen pt-14">

            <h1 className=' text-center font-bold text-2xl'>Products List</h1>
            <table className="table">
                {/* head */}


                <thead className='text-black text-lg font-bold'>
                    <tr>
                        <th>

                        </th>
                        <th>Product Name</th>
                        <th>Product Category</th>
                        <th>Details</th>
                        <th>Product Code</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}

                    {
                        users.map((informat, i) =>
                            // console.log(users)
                            <tr key={informat._id}>
                                <th>
                                    {i + 1}
                                </th>
                                <td>
                                    <td className="flex items-center gap-3">
                                        <td className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={`http://localhost:5000/uploads/${informat.image}`}
                                                    alt="product pic" />
                                            </div>
                                        </td>
                                        <td className='grid'>
                                            <td className="font-bold">{informat.nameeng}</td>
                                            <td className="text-sm opacity-50">{informat.productPrice}</td>
                                        </td>
                                    </td>
                                </td>

                                <td>
                                    {informat.category}
                                </td>
                                <td>
                                    product offer: {informat?.offerprice} %
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Post date:{informat.postDate}</span>
                                </td>
                                <td>{informat?.productCode}</td>
                                <td>{informat?.quantity}</td>
                                <th>
                                    <Link to={`/productsupdate/${informat._id}`} className="btn btn-xs btn-success">Update</Link>
                                </th>
                                <th>
                                    <button onClick={() => { handleDelete(informat._id) }} className="btn btn-error btn-xs">Delete</button>
                                </th>
                            </tr>
                        )
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

export default AllProducts;