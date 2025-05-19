import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

const PmUpdate = () => {

    const navigate = useNavigate();

    const productsdata = useLoaderData();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleCreatProduct = async (data) => {
        const namebn = data.productbnName
        const namearb = data.arbproductarName
        const nameeng = data.engproductName
        const authorName = data.authorName
        const edition = data.edition
        const numberOfpage = data.numberOfpage
        const offerprice = data.offerprice
        const productPrice = data.productPrice
        const description = data.description
        const quantity = data.quantity

        const updatedata = {
            namebn,
            namearb,
            nameeng,
            authorName,
            edition,
            numberOfpage,
            offerprice,
            productPrice,
            description,
            quantity
        }

        const response = await axios.put(`http://localhost:5000/productUpdate/${data.id}`, updatedata, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (response.config.data) {
            toast.success("Updated Successfully !!")
            navigate("/dashboard/allProducts")
        }
        else {
            toast.error("Product Not Updated")
        }
    }

    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" >open modal</button> */}


            <div className="flex flex-col items-center">
                <div className="w-7/12 mx-auto bg-white shadow-lg p-2 rounded-md">

                    <div className=" shadow-xl shadow-green-500">
                        {
                            productsdata.map((pdata, i) => <form key={i} onSubmit={handleSubmit(handleCreatProduct)} className="card-body">

                                <div className='lg:flex'>
                                    <div className=' '>
                                        {/* product id */}
                                        <div className="form-control hidden">
                                            <label className="label">
                                                <span className="label-text text-black">Producte BN Name</span>
                                            </label>
                                            <input {...register("id", { required: true })} type="text" defaultValue={pdata._id} placeholder="Please Enter Your Bangla Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                            {errors.productbnName && <span className=' text-red-500'>This section is required</span>}

                                        </div>


                                        {/*Product Name section start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Producte BN Name</span>
                                            </label>
                                            <input {...register("productbnName", { required: true })} type="text" defaultValue={pdata.namebn} placeholder="Please Enter Your Bangla Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                            {errors.productbnName && <span className=' text-red-500'>This section is required</span>}

                                        </div>


                                        {/*Product Name section arabic start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Producte Arabic Name</span>
                                            </label>
                                            <input {...register("arbproductarName", { required: true })} type="text" defaultValue={pdata.namearb} placeholder="Please Enter Your arabic Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                            {errors.arbproductarName && <span className=' text-red-500'>This section is required</span>}

                                        </div>

                                        {/*Product Name section english start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Producte EN Name</span>
                                            </label>
                                            <input {...register("engproductName", { required: true })} type="text" defaultValue={pdata.nameeng} placeholder="Please Enter English Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                            {errors.engproductName && <span className=' text-red-500'>This section is required</span>}

                                        </div>

                                        {/*Product Price Section start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Producte Price</span>
                                            </label>
                                            <input {...register("productPrice", { required: true })} type="text" defaultValue={pdata.productPrice} placeholder="Please Enter Resal price" className="input input-bordered lg:w-96" />
                                            {errors.productPrice && <span className=' text-red-500'>This section is required</span>}
                                        </div>


                                        {/*Number of page section start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Number of Pages</span>
                                            </label>
                                            <input {...register("numberOfpage", { required: true })} type="text" defaultValue={pdata.numberOfpage} placeholder="Please Enter Number of pages" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                            {errors.numberOfpage && <span className=' text-red-500'>This section is required</span>}

                                        </div>



                                        {/*Author Name section start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Author Name</span>
                                            </label>
                                            <input {...register("authorName", { required: true })} type="text" defaultValue={pdata.authorName} placeholder="Please Enter Author Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                            {errors.authorName && <span className=' text-red-500'>This section is required</span>}

                                        </div>

                                        {/* Offer Price section start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Offer</span>
                                            </label>
                                            <input {...register("offerprice")} type="text" defaultValue={pdata.offerprice} placeholder="Please Enter Offer rates" className="input input-bordered lg:w-96 mr-4" />
                                        </div>


                                        {/* Products Quantity section start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Quantity</span>
                                            </label>
                                            <input {...register("quantity")} type="number" defaultValue={pdata.quantity} placeholder="Please Enter your products quantity" className="input input-bordered lg:w-96" />
                                        </div>


                                        {/*Edition section start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Producte Edition</span>
                                            </label>
                                            <input {...register("edition", { required: true })} type="text" defaultValue={pdata.edition} placeholder="Please Enter Your Producte Edition" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                            {errors.edition && <span className=' text-red-500'>This section is required</span>}

                                        </div>


                                        {/* Description section start */}
                                        <div className="form-control">
                                            <label className="label">
                                                <span className="label-text text-black">Description</span>
                                            </label>
                                            <textarea {...register("description", { required: true })} defaultValue={pdata.description} className="textarea textarea-bordered h-24 lg:w-96" placeholder="Pease Enter Description"></textarea>
                                            {errors.description && <span className=' text-red-500'>This section is required</span>}
                                        </div>
                                    </div>


                                    <div className=''>

                                        {/*Product code section start */}
                                        {/* <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-black">Producte Code</span>
                                                    </label>
                                                    <input {...register("pcode", { required: true })} type="text" placeholder="Please Enter Producte Code" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                                    {errors.pcode && <span className=' text-red-500'>This section is required</span>}

                                                </div> */}

                                        {/* Category Select Type of Users */}
                                        {/* <div className="form-control">
                                                    <div className="input-group grid">
                                                        <label className="label ">
                                                            <span className="label-text text-black">Category</span>
                                                        </label>
                                                        <select {...register("category", { required: true })} className="select input-bordered">
                                                            <option>Play</option>
                                                            <option>Nursary</option>
                                                            <option>KG</option>
                                                            <option>Ebtedaye</option>
                                                        </select>
                                                        {errors.category && <span className='text-red-500'>This field is required</span>}
                                                    </div>
                                                </div> */}


                                        {/* Producte Picture section start */}
                                        {/* <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-black">Producte Picture</span>
                                                    </label>
                                                    <input {...register("image", { required: true })} type="file" accept='image/*' placeholder="Please Enter Producte picture" className="input input-bordered lg:w-96 mr-4" />
                                                    {errors.image && <span className=' text-red-500'>This section is required</span>}
                                                </div> */}


                                        {/* Producte PDF file section start */}
                                        {/* <div className="form-control">
                                                    <label className="label">
                                                        <span className="label-text text-black">Upload PDF file</span>
                                                    </label>
                                                    <input {...register("files", { required: true })} type="file" accept='application/pdf' placeholder="Please Enter Producte PDF file" className="input input-bordered lg:w-96" />
                                                    {errors.files && <span className=' text-red-500'>This section is required</span>}
                                                </div> */}
                                    </div>
                                </div>





                                <div className="form-control mt-6">
                                    <button className="btn btn-success">Submite</button>
                                </div>
                            </form>)
                        }
                    </div>

                </div>

            </div>
        </div >
    );
};

export default PmUpdate;