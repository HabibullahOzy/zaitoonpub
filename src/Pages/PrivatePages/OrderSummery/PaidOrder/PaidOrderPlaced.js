import React from 'react';

const PaidOrderPlaced = () => {
    return (
        <div className="overflow-x-auto text-black min-h-screen pt-14">

            <h1 className=' text-center font-bold text-2xl'>Products List</h1>
            <table className="table table-zebra-zebra">
                {/* head */}


                <thead className='text-black text-lg font-bold'>
                    <tr>
                        <th>

                        </th>
                        <th>Product Name</th>
                        <th>Details</th>
                        <th>Product Code</th>
                        <th>Quantity</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}

                    {/* {
                        orderdataes?.productdata?.map((informat, i) =>
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
                                                    src={`http://localhost:5000/uploads/${informat.image}`}
                                                    alt="Avatar" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{informat.name}</div>
                                            <div className="text-sm opacity-50">{informat.offer}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    product offer: {informat?.offerprice} %
                                    <br />
                                    <span className="badge badge-ghost badge-sm">Post date:{informat.postDate}</span>
                                </td>
                                <td>{informat?.productCode}</td>
                                <td>{informat?.quantity}</td>
                                <th>
                                    <button className="btn btn-primary btn-xs">Update</button>
                                </th>
                                <th>
                                    <button onClick={""} className="btn btn-error btn-xs">Delete</button>
                                </th>
                            </tr>
                        )
                    } */}




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

export default PaidOrderPlaced;