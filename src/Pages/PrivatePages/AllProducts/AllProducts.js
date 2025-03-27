import React from 'react';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';

const AllProducts = () => {

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/allProducts');
            const data = await res.json()
            return data;

        }
    })

    const handleDelete= id =>{
        console.log(id)
        fetch(`http://localhost:5000/products/delete/${id}`,{
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.deletedCount > 0){
                toast.success("Seller Delet successfully");
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
                        <th>Details</th>
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
                                    {i+1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle h-12 w-12">
                                                <img
                                                    src={informat.img}
                                                    alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{informat.name}</div>
                                            <div className="text-sm opacity-50">{informat.productPrice}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    product offer: {informat.offers} %
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Post date:{informat.post_date}</span>
                                </td>
                                <td>{informat.quantity}</td>
                                <th>
                                    <button className="btn btn-primary btn-xs">Update</button>
                                </th>
                                <th>
                                    <button onClick={()=>{handleDelete(informat._id)}} className="btn btn-error btn-xs">Delete</button>
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