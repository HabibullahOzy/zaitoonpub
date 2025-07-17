import React, { use, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import axios from 'axios';
import { FcAddDatabase } from 'react-icons/fc';
import { useQuery } from '@tanstack/react-query';


const Createdproduct = () => {

    const { user } = useContext(Zaitooncontext);

    // uploaded file size less then 5mb

    const [productCode, setProductCode] = useState('');

    const generateNextProductCode = () => {
        const lastNumber = parseInt(localStorage.getItem('lastProductNumber') || '0', 10);
        const nextNumber = lastNumber + 1;
        localStorage.setItem('lastProductNumber', nextNumber);
        return `ZP${nextNumber.toString().padStart(4, '0')}`;
    };

    useEffect(() => {
        const procode = generateNextProductCode();
        setProductCode(procode);
    }, []);




    const { register, handleSubmit, formState: { errors }, reset } = useForm();


    const handleCreatProduct = async data => {
        // console.log(data)
        const imageFile = data.image?.[0];
        const pdfFile = data.files?.[0];

        if (!imageFile || !pdfFile) {
            console.error("Image or PDF file missing");
            return;
        }
        const formData = new FormData();
        formData.append('namebn', data.productbnName);
        formData.append('namearb', data.arbproductarName);
        formData.append('nameeng', data.engproductName);
        formData.append('productPrice', data.productPrice);
        formData.append('postDate', data.postDate);
        formData.append('numberOfpage', data.numberOfpage);
        formData.append('authorName', data.authorName);
        formData.append('language', data.language);
        formData.append('offerprice', data.offerprice);
        formData.append('quantity', data.quantity);
        formData.append('edition', data.edition);
        formData.append('description', data.description);
        formData.append('ProductCode', data.pcode);
        formData.append('category', data.category);
        formData.append('email', user.email);
        formData.append('image', imageFile);
        formData.append('pdf', pdfFile);

        // console.log(formData)

        for (let [key, value] of formData.entries()) {
            // console.log(`${key}:`, value);
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_backendurl}/profile`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            // console.log(response.data)
            if (response.data.insertedId) {
                toast.success("Product succesfully created")
                reset()
            }
            else {
                toast.error("Please try again properly, product not created")
            }
        }
        catch (error) {

        }

    }




    const { data: allcategory = [], refetch } = useQuery({
        queryKey: ['allcategory'],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/category`);
            const data = await res.json();
            return data;
        }
    });

    return (
        <div className="hero min-h-screen">
            <div className="hero-content flex-col w-full">
                <div className="text-center lg:text-left">
                    <h1 className="text-3xl font-bold text-black mb-5">Add Your Products</h1>
                </div>

                <div className="shadow-xl shadow-green-500 bg-[#baefba] w-full max-w-6xl p-6 rounded-lg">
                    <form onSubmit={handleSubmit(handleCreatProduct)} className="card-body w-full">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column */}
                            <div className="space-y-4">
                                {/* Product BN Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product BN Name</span>
                                    </label>
                                    <input
                                        {...register("productbnName", { required: true })}
                                        type="text"
                                        placeholder="Enter Bangla Product Name"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.productbnName && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Product Arabic Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product Arabic Name</span>
                                    </label>
                                    <input
                                        {...register("arbproductarName", { required: true })}
                                        type="text"
                                        placeholder="Enter Arabic Product Name"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.arbproductarName && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Product EN Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product EN Name</span>
                                    </label>
                                    <input
                                        {...register("engproductName", { required: true })}
                                        type="text"
                                        placeholder="Enter English Product Name"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.engproductName && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Product Price */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product Price</span>
                                    </label>
                                    <input
                                        {...register("productPrice", { required: true })}
                                        type="text"
                                        placeholder="Enter Product Price"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.productPrice && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Post Date */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Post Date</span>
                                    </label>
                                    <input
                                        {...register("postDate", { required: true })}
                                        type="datetime-local"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.postDate && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Number of Pages */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Number of Pages</span>
                                    </label>
                                    <input
                                        {...register("numberOfpage", { required: true })}
                                        type="text"
                                        placeholder="Enter number of pages"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.numberOfpage && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Author Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Author Name</span>
                                    </label>
                                    <input
                                        {...register("authorName", { required: true })}
                                        type="text"
                                        placeholder="Enter author name"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.authorName && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Language */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Language</span>
                                    </label>
                                    <input
                                        {...register("language", { required: true })}
                                        type="text"
                                        placeholder="Enter language"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.language && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Offer Price */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Offer Price</span>
                                    </label>
                                    <input
                                        {...register("offerprice")}
                                        type="text"
                                        placeholder="Enter offer price"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Quantity */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Quantity</span>
                                    </label>
                                    <input
                                        {...register("quantity")}
                                        type="number"
                                        placeholder="Enter quantity"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Edition */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Edition</span>
                                    </label>
                                    <input
                                        {...register("edition", { required: true })}
                                        type="text"
                                        placeholder="Enter edition"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.edition && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Description */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Description</span>
                                    </label>
                                    <textarea
                                        {...register("description", { required: true })}
                                        className="textarea textarea-bordered h-24 w-full"
                                        placeholder="Enter product description"
                                    ></textarea>
                                    {errors.description && <span className="text-red-500">This field is required</span>}
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-4">
                                {/* Product Code */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product Code</span>
                                    </label>
                                    <input
                                        {...register("pcode")}
                                        type="text"
                                        defaultValue={productCode}
                                        readOnly
                                        // placeholder="Enter product code"
                                        className="input input-bordered w-full"
                                    />

                                </div>

                                {/* Category */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Category</span>
                                    </label>

                                    {allcategory.length > 0 ? (
                                        <select
                                            {...register("category", { required: true })}
                                            className="select select-bordered text-black w-full bg-[#baefba]"
                                        >
                                            {/* <option value="">Select a category</option> */}
                                            {allcategory.map((category) => (
                                                <option key={category._id} value={category._id}>
                                                    {category.categname}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <p className="text-gray-500">No categories available</p>
                                    )}

                                    {errors.category && (
                                        <span className="text-red-500">This field is required</span>
                                    )}
                                </div>

                                {/* Select Subcategory */}

                                <div className="form-control">
                                    <label className="label">
                                        <span className='label-text text-black'>Sub Category</span>
                                    </label>
                                    <select
                                        className="select select-bordered w-full bg-[#baefba] text-black"
                                        {...register("subcategory", { required: true })}
                                    >
                                        <option value="">Select a subcategory</option>
                                        {allcategory.map((category) => {
                                            const subcategoryString = category?.subcategories || "";
                                            const subcategoryArray = subcategoryString.split(",").map(s => s.trim());

                                            return subcategoryArray.map((subcat, index) => (
                                                <option key={`${category._id}-${index}`} value={subcat}>
                                                    {subcat}
                                                </option>
                                            ));
                                        })}
                                    </select>

                                    {errors.subcategory && (
                                        <span className="text-red-500">This field is required</span>
                                    )}
                                </div>
                                {/* Product Picture */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product Picture</span>
                                    </label>
                                    <input
                                        {...register("image", { required: true })}
                                        type="file"
                                        accept="image/*"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.image && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* PDF Upload */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Upload PDF file</span>
                                    </label>
                                    <input
                                        {...register("files", { required: true })}
                                        type="file"
                                        accept="application/pdf"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.files && <span className="text-red-500">This field is required</span>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-success w-full lg:w-1/3 mx-auto"><FcAddDatabase className='text-3xl hover:bg-blue-600' />
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Createdproduct;