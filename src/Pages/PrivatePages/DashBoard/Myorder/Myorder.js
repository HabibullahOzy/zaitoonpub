import React from 'react';
import { useLoaderData } from 'react-router-dom';

const Myorder = () => {


    const orderdataes = useLoaderData();
    console.log(orderdataes);
    return (
        <div className="text-black min-h-screen pt-14" style={{ backgroundColor: "rgb(186, 239, 186)" }}>

            <h1 className=' text-center font-bold text-2xl'>Products List</h1>
            <table className="table table-zebra-zebra overflow-x-auto">
                {/* head */}


                <thead className='text-black text-lg font-bold'>
                    <tr>
                        <th>

                        </th>
                        <th>Product Name</th>
                        <th>Details</th>
                        <th>Product Code</th>
                        <th>Quantity</th>
                        <th>Location</th>
                        <th>Status</th>

                    </tr>
                </thead>
                <tbody className='text-[17px]'>
                    {/* row 1 */}

                    {
                        orderdataes?.map((informat) =>
                            // console.log(users)
                            informat?.productdata?.map((pdtdata, i) =>
                                <tr key={`${informat._id}-${i}`}>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td className='flex'>
                                        <figure className="avatar mask mask-squircle h-12 w-12">
                                            <img
                                                src={`http://localhost:5000/uploads/${pdtdata.image}`}
                                                alt="Avatar" />

                                        </figure>
                                        <td className='grid'>
                                            <span>{pdtdata.name}</span>
                                            <span>TK {pdtdata.productPrice}</span>
                                        </td>
                                    </td>
                                    <td>
                                        product Price:TK {pdtdata?.offer}
                                        <br />
                                        <span className="badge badge-ghost badge-sm">Post date:{pdtdata.postDate}</span>
                                    </td>
                                    <td>{pdtdata?.productCode}</td>
                                    <td>{pdtdata?.quantity}</td>
                                    <td>{informat.dlocation},<br />{informat.city},<br />{informat.area}</td>
                                    <td>{
                                        informat?.status ? <p className='bg-green-300 text-white p-3 text-xl text-center rounded-md'>Order placed</p> : <p>Order is being processed</p>
                                    }</td>
                                </tr>
                            )
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

export default Myorder;