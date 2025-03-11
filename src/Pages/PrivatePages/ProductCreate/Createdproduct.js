import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import { useNavigate } from 'react-router-dom';
// import {bgim} from '../../../assets/bg_icon.png'


const Createdproduct = () => {

    const { user, } = useContext(Zaitooncontext);

    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm();


    const handleCreatProduct = data => {
        console.log(data)
        const image = data.image[0];

        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_imgbbhostkey}`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(fact => {
                const image = fact.data.url;
                const file = fact.data.url;
                const email = user.email;
                const productName = data.productName;
                const productPrice = data.productPrice;
                const offerprice =data.offerprice;
                // const purchaseYear = data.purchaseYear;
                // const condition = data.condition;
                // const category = data.category;
                // const resalPrice = data.resalPrice;
                // const originalPrice = data.originalPrice;
                const quantity = data.quantity;
                // const usesYear = data.usesYear;
                const postDate = data.postDate;
                // const selerName = data.selerName;
                // const phoneNumber = data.phoneNumber;
                // const location = data.location;
                const description = data.description;


                const products = {
                    name: productName,
                    productPrice,
                    // purchaseYear,
                    img: image,
                    file,
                    email,
                    // condition,
                    catagory_id: productName,
                    // resale_price: resalPrice,
                    // original_price: originalPrice,
                    offers:offerprice,
                    quantity,
                    // uses_year: usesYear,
                    post_date: postDate,
                    // seller_name: selerName,
                    // phone: phoneNumber,
                    // location,
                    description
                }
                console.log(products)

                fetch('http://localhost:5000/products', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(products)
                })
                    .then(res => res.json())
                    .then(infoe => {
                        console.log(infoe)
                        if (infoe.acknowledged) {
                            toast.success("Your Producte added succesfully");
                            navigate('/dashboard/allProducts')
                        } else {
                            toast.error("your producte can't added please try again")
                        }
                    })

            })
    }

    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold text-black mb-5">Add Your Products</h1>
                    </div>
                    <div className=" shadow-2xl">
                        <form onSubmit={handleSubmit(handleCreatProduct)} className="card-body">

                            <div className='lg:flex md:flex '>
                                {/*Product Name section start */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Producte Name</span>
                                    </label>
                                    <input {...register("productName", { required: true })} type="text" placeholder="Please Enter Your Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
                                    {errors.productName && <span className=' text-red-500'>This section is required</span>}

                                </div>

                                {/*Product Price Section start */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Producte Price</span>
                                    </label>
                                    <input {...register("productPrice")} type="text" placeholder="Please Enter Resal price" className="input input-bordered lg:w-96" />
                                </div>
                            </div>

                            <div className='lg:flex'>
                                {/* Producte Picture section start */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Producte Picture</span>
                                    </label>
                                    <input {...register("image")} type="file" placeholder="Please Enter Producte price" className="input input-bordered lg:w-96 mr-4" />
                                </div>


                                {/* Producte PDF file section start */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Upload PDF file</span>
                                    </label>
                                    <input {...register("files")} type="file" placeholder="Please Enter Producte price" className="input input-bordered lg:w-96" />
                                </div>
                            </div>


                            {/* Condition Select Type of Users */}
                            {/* <div className="form-control">
                                <div className="input-group grid">
                                    <label className="label ">
                                        <span className="label-text">Category</span>
                                    </label>
                                    <select {...register("category", { required: true })} className="select input-bordered">
                                        <option>Lenovo</option>
                                        <option>HP</option>
                                        <option>Asus</option>
                                        <option>Honey</option>
                                        <option>Component</option>
                                        <option>Electronics</option>
                                        <option>WebSite</option>
                                        <option>fashion</option>
                                    </select>
                                    {errors.category && <span className='text-red-500'>This field is required</span>}
                                </div>
                            </div> */}
                            {/* Select Offer Price */}

                            <div className='lg:flex'>
                                {/* Offer Price section start */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Offer</span>
                                    </label>
                                    <input {...register("offerprice")} type="text" placeholder="Please Enter Offer rates" className="input input-bordered lg:w-96 mr-4" />
                                </div>


                                {/* Products Quantity section start */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Quantity</span>
                                    </label>
                                    <input {...register("quantity")} type="number" placeholder="Please Enter your products quantity" className="input input-bordered lg:w-96" />
                                </div>
                            </div>




                            <div className='lg:flex'>
                                {/* Post date section start */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Post Date</span>
                                    </label>
                                    <input {...register("postDate", { required: true })} type="datetime-local" placeholder="Please Enter post date" className="input input-bordered lg:w-96 mr-4" />
                                </div>

                                {/* Description section start */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Description</span>
                                    </label>
                                    <textarea {...register("description")} className="textarea textarea-bordered h-24 lg:w-96" placeholder="Pease Enter Description"></textarea>
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