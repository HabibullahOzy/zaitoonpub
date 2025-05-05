import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import {bgim} from '../../../assets/bg_icon.png'


const Createdproduct = () => {

    const { user, } = useContext(Zaitooncontext);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();


    const handleCreatProduct = async data => {

        const image = data.image;
        const files = data.files[0];
        const formData = new FormData();
        formData.append('image', image);
        formData.append('files', files);
        console.log(image)
        try {
            const response = await axios.post("http://localhost:5000/api/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            console.log(response.data.imageUrl)
        }
        catch (error) {

        }
        // .then(res => res.json())
        // .then(fact => {
        //     console.log(fact)
        //     const image = fact.data.imageUrl;
        //     const files = fact.data.pdfUrl;
        //     const email = user.email;
        //     const productName = data.productName;
        //     const productPrice = data.productPrice;
        //     const offerprice = data.offerprice;
        //     // const purchaseYear = data.purchaseYear;
        //     // const condition = data.condition;
        //     // const category = data.category;
        //     // const resalPrice = data.resalPrice;
        //     // const originalPrice = data.originalPrice;
        //     const quantity = data.quantity;
        //     // const usesYear = data.usesYear;
        //     const postDate = data.postDate;
        //     // const selerName = data.selerName;
        //     // const phoneNumber = data.phoneNumber;
        //     // const location = data.location;
        //     const description = data.description;


        //     const products = {
        //         name: productName,
        //         productPrice,
        //         // purchaseYear,
        //         img: image,
        //         files,
        //         email,
        //         // condition,
        //         catagory_id: productName,
        //         // resale_price: resalPrice,
        //         // original_price: originalPrice,
        //         offers: offerprice,
        //         quantity,
        //         // uses_year: usesYear,
        //         post_date: postDate,
        //         // seller_name: selerName,
        //         // phone: phoneNumber,
        //         // location,
        //         description
        //     }
        //     console.log(products)

        //     fetch('http://localhost:5000/products', {
        //         method: 'POST',
        //         headers: {
        //             'content-type': 'application/json'
        //         },
        //         body: JSON.stringify(products)
        //     })
        //         .then(res => res.json())
        //         .then(infoe => {
        //             console.log(infoe)
        //             if (infoe.acknowledged) {
        //                 toast.success("Your Producte added succesfully");
        //                 navigate('/dashboard/allProducts')
        //             } else {
        //                 toast.error("your producte can't added please try again")
        //             }
        //         })

        // })
    }

    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left ">
                        <h1 className="text-3xl font-bold text-black mb-5">Add Your Products</h1>
                    </div>
                    <div className=" shadow-2xl">
                        <form onSubmit={handleSubmit(handleCreatProduct)} className="card-body">

                            <div className='flex'>
                                <div className=' '>
                                    {/*Product Name section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Producte BN Name</span>
                                        </label>
                                        <input {...register("productName", { required: true })} type="text" placeholder="Please Enter Your Bangla Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                        {errors.productName && <span className=' text-red-500'>This section is required</span>}

                                    </div>


                                    {/*Product Name section arabic start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Producte Name</span>
                                        </label>
                                        <input {...register("productName", { required: true })} type="text" placeholder="Please Enter Your arabic Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                        {errors.productName && <span className=' text-red-500'>This section is required</span>}

                                    </div>

                                    {/*Product Price Section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Producte Price</span>
                                        </label>
                                        <input {...register("productPrice")} type="text" placeholder="Please Enter Resal price" className="input input-bordered lg:w-96" />
                                    </div>

                                    {/* Post date section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Post Date</span>
                                        </label>
                                        <input {...register("postDate", { required: true })} type="datetime-local" placeholder="Please Enter post date" className="input input-bordered lg:w-96 mr-4" />
                                    </div>


                                    {/*Number of page section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Number of Pages</span>
                                        </label>
                                        <input {...register("numberOfpage", { required: true })} type="text" placeholder="Please Enter Your Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                        {errors.productName && <span className=' text-red-500'>This section is required</span>}

                                    </div>



                                    {/*Author Name section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Producte Name</span>
                                        </label>
                                        <input {...register("authorName", { required: true })} type="text" placeholder="Please Enter Your Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                        {errors.productName && <span className=' text-red-500'>This section is required</span>}

                                    </div>

                                    {/*Language section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Producte Name</span>
                                        </label>
                                        <input {...register("productName", { required: true })} type="text" placeholder="Select Language" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                        {errors.productName && <span className=' text-red-500'>This section is required</span>}

                                    </div>



                                    {/* Offer Price section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Offer</span>
                                        </label>
                                        <input {...register("offerprice")} type="text" placeholder="Please Enter Offer rates" className="input input-bordered lg:w-96 mr-4" />
                                    </div>


                                    {/* Products Quantity section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Quantity</span>
                                        </label>
                                        <input {...register("quantity")} type="number" placeholder="Please Enter your products quantity" className="input input-bordered lg:w-96" />
                                    </div>


                                    {/*Edition section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Producte Name</span>
                                        </label>
                                        <input {...register("edition", { required: true })} type="text" placeholder="Please Enter Your Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                        {errors.productName && <span className=' text-red-500'>This section is required</span>}

                                    </div>


                                    {/* Description section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Description</span>
                                        </label>
                                        <textarea {...register("description")} className="textarea textarea-bordered h-24 lg:w-96" placeholder="Pease Enter Description"></textarea>
                                    </div>
                                </div>


                                <div className=''>
                                    {/* Category Select Type of Users */}
                                    <div className="form-control">
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
                                    </div>


                                    {/* Producte Picture section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Producte Picture</span>
                                        </label>
                                        <input {...register("image")} type="file" placeholder="Please Enter Producte price" className="input input-bordered lg:w-96 mr-4" />
                                    </div>


                                    {/* Producte PDF file section start */}
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text text-black">Upload PDF file</span>
                                        </label>
                                        <input {...register("files")} type="file" placeholder="Please Enter Producte price" className="input input-bordered lg:w-96" />
                                    </div>
                                </div>
                            </div>
                            {/* Seller Name section start */}
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Seller Name</span>
                                </label>
                                <input {...register("selerName")} type="text" placeholder="Please Enter Your name" className="input input-bordered" />
                            </div> */}


                            {/* Phone number section start */}
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Phone number</span>
                                </label>
                                <input {...register("phoneNumber")} type="text" placeholder="Please Enter Your Phone number" className="input input-bordered" />
                            </div> */}


                            {/* Condition section start */}
                            {/* <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Location</span>
                                </label>
                                <input {...register("location")} type="text" placeholder="Please Enter Your location" className="input input-bordered" />
                            </div> */}




                            <div className="form-control mt-6">
                                <button className="btn btn-success">Submite</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Createdproduct;