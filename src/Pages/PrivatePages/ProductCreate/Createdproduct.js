import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import axios from 'axios';
import { FcAddDatabase } from 'react-icons/fc';
import { useQuery } from '@tanstack/react-query';
// import { FcAddDatabase } from "react-icons/fc";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { motion, AnimatePresence } from 'framer-motion';
import { GrCompliance } from "react-icons/gr";
import { ImSpinner8 } from "react-icons/im";


const Createdproduct = () => {

    const { user } = useContext(Zaitooncontext);

    //   uploaded file size less then 5mb

    const [productCode, setProductCode] = useState('');
    const [previewImage, setPreviewImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [previewPdf, setPreviewPdf] = useState(null);
    const [pdfFile, setPdfFile] = useState(null);
    const [submitShow, setSubmitShow] = useState(false);

    const { data: allprods = [] } = useQuery({
        queryKey: ["allprods"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/allProducts`);
            const data = await res.json();
            return data;
        },
    });

    useEffect(() => {
        if (allprods.length > 0) {
            // Find the highest numeric value from ProductCode (like ZP0007 → 7)
            const lastCode = allprods
                .map((p) => parseInt(p?.ProductCode?.replace("ZP", ""), 10))
                .filter((n) => !isNaN(n))
                .sort((a, b) => b - a)[0] || 0;

            // Generate next ProductCode
            const nextCode = lastCode + 1;
            const formattedCode = `ZP${nextCode.toString().padStart(4, "0")}`;
            setProductCode(formattedCode);
        } else {
            // If no products exist yet
            setProductCode("ZP0001");
        }
    }, [allprods]);




    const { register, handleSubmit, formState: { errors }, reset } = useForm();



    //   Handle Image Select
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setImageFile(file);
            setPreviewImage(URL.createObjectURL(file));
        } else {
            toast.error("Image must be less than 5MB!");
        }
    };

    // Handle PDF Select
    const handlePdfChange = (e) => {
        const file = e.target.files[0];
        if (file && file.size <= 5 * 1024 * 1024) {
            setPdfFile(file);
            setPreviewPdf(URL.createObjectURL(file))
            // setPreviewPdf(file);
        } else {
            toast.error("PDF must be less than 5MB!");
        }
    };

    // Remove Image
    const removeImage = () => {
        setImageFile(null);
        setPreviewImage(null);
    };

    // Remove PDF
    const removePdf = () => {
        setPdfFile(null);
        setPreviewPdf(null);
    };


    const handleCreatProduct = async data => {

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
        formData.append('autemail', data.autemail);
        formData.append('language', data.language);
        formData.append('offerprice', data.offerprice);
        formData.append('quantity', data.quantity);
        formData.append('edition', data.edition);
        formData.append('state', data.state);
        formData.append('description', data.description);
        formData.append('ProductCode', data.pcode);
        formData.append('category', data.category);
        formData.append('subCategory', data.subcategory);
        formData.append('email', user.email);
        formData.append('image', imageFile);
        formData.append('pdf', pdfFile);



        for (let [key, value] of formData.entries()) {
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_backendurl}/profile`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
            if (response.data.insertedId) {
                setSubmitShow(response.data.insertedId)
                toast.success("Product succesfully created")
                reset()
                removeImage()
                removePdf()
                setSubmitShow(true)
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



    // Auto reset success message after 3 seconds
    //   useEffect(() => {
    //     if (submitShow) {
    //       const timer = setTimeout(() => {
    //         setSubmitShow(false);
    //       }, 3000);
    //       return () => clearTimeout(timer);
    //     }
    //   }, [submitShow, setSubmitShow]);


    const [loading, setLoading] = useState(false);

    // Handle transitions
    useEffect(() => {
        if (submitShow) {
            setLoading(true);

            // ⏳ Simulate 1.5s "submitting" delay before showing success
            const loadingTimer = setTimeout(() => {
                setLoading(false);
            }, 1500);

            // ✅ After success, auto-reset to button in 3 seconds
            const resetTimer = setTimeout(() => {
                setSubmitShow(false);
                setLoading(false);
            }, 4500);

            return () => {
                clearTimeout(loadingTimer);
                clearTimeout(resetTimer);
            };
        }
    }, [submitShow, setSubmitShow]);

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
                                        <span className="label-text text-black">Product BN Name <small className='text-red-600 text-sm ml-1'>*</small></span>
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
                                        {...register("arbproductarName")}
                                        type="text"
                                        placeholder="Enter Arabic Product Name"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Product EN Name */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product EN Name</span>
                                    </label>
                                    <input
                                        {...register("engproductName")}
                                        type="text"
                                        placeholder="Enter English Product Name"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Product Price */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product Price <small className='text-red-600 text-sm ml-1'>*</small></span>
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
                                        <span className="label-text text-black">Post Date <small className='text-red-600 text-sm ml-1'>*</small></span>
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
                                        <span className="label-text text-black">Number of Pages <small className='text-red-600 text-sm ml-1'>*</small></span>
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
                                        <span className="label-text text-black">Author Name <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <input
                                        {...register("authorName", { required: true })}
                                        type="text"
                                        placeholder="Enter author name"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.authorName && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Author Email */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Author Email <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <input
                                        {...register("autemail", { required: true })}
                                        type="email"
                                        placeholder="Enter author name"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.autemail && <span className="text-red-500">This field is required</span>}
                                </div>

                                {/* Language */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Language <small className='text-red-600 text-sm ml-1'>*</small></span>
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
                                        <span className="label-text text-black">Quantity <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <input
                                        {...register("quantity", { required: true })}
                                        type="number"
                                        placeholder="Enter quantity"
                                        className="input input-bordered w-full"
                                    />
                                </div>

                                {/* Edition */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Edition <small className='text-red-600 text-sm ml-1'>*</small></span>
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
                                        <span className="label-text text-black">Description <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <textarea
                                        {...register("description", { required: true })}
                                        className="textarea input textarea-bordered h-24 w-full"
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
                                        <span className="label-text text-black">Product Code <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <input
                                        {...register("pcode", { required: true })}
                                        type="text"
                                        defaultValue={productCode}

                                        className="input input-bordered w-full"
                                    />
                                    {errors.pcode && (
                                        <span className="text-red-500">This field is required</span>
                                    )}

                                </div>

                                {/* Status*/}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Status <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <select
                                        {...register("state")}

                                        className="select select-bordered text-black w-full bg-[#baefba]"
                                    >
                                        <option value="Available">Available</option>
                                        <option value="Unavailable">Unavailable</option>
                                        <option value="Preorder">Preorder</option>
                                        <option value="Coming Soon">Coming Soon</option>
                                        <option value="Out of Stock">Out of Stock</option>
                                    </select>
                                </div>


                                {/* Category */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black flex ">Category <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>

                                    {allcategory.length > 0 ? (
                                        <select
                                            {...register("category", { required: true })}
                                            className="select select-bordered text-black w-full bg-[#baefba]"
                                        >
                                            {/* <option value="">Select a category</option> */}
                                            {allcategory.map((category) => (
                                                <option key={category._id} value={category.categname}>
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
                                        <span className='label-text text-black'>Sub Category <small className='text-red-600 text-sm ml-1'>*</small></span>
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
                                {/* <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product Picture <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <input
                                        {...register("image", { required: true })}
                                        type="file"
                                        accept="image/*"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.image && <span className="text-red-500">This field is required</span>}
                                </div> */}

                                {/* Image Upload + Preview */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Product Picture <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <input
                                        {...register("image", { required: true })}
                                        type="file"
                                        accept="image/*"
                                        className="input input-bordered w-full"
                                        onChange={handleImageChange}
                                    />
                                    {previewImage && (
                                        <div className="mt-2 relative inline-block">
                                            <img src={previewImage} alt="Preview" className="h-32 object-cover border rounded-md" />
                                            <p className="text-xs text-gray-600">
                                                Size: {(imageFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                            <button
                                                type="button"
                                                onClick={removeImage}
                                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1"
                                            >
                                                <AiOutlineCloseCircle size={18} />
                                            </button>
                                        </div>
                                    )}
                                    {errors.image && <span className="text-red-500">Image required</span>}
                                </div>

                                {/* PDF Upload */}
                                {/* <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Upload PDF file <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <input
                                        {...register("files", { required: true })}
                                        type="file"
                                        accept="application/pdf"
                                        className="input input-bordered w-full"
                                    />
                                    {errors.files && <span className="text-red-500">This field is required</span>}
                                </div> */}

                                {/* PDF Upload + Preview */}
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text text-black">Upload PDF <small className='text-red-600 text-sm ml-1'>*</small></span>
                                    </label>
                                    <input
                                        {...register("files", { required: true })}
                                        type="file"
                                        accept="application/pdf"
                                        max={1}
                                        className="input input-bordered w-full"
                                        onChange={handlePdfChange}
                                    />
                                    {previewPdf && (
                                        <div className="mt-2 relative p-2 border rounded-md bg-white">
                                            <p className="text-sm text-black font-semibold">{pdfFile.name}</p>
                                            <p className="text-xs text-gray-600">
                                                {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                                            </p>
                                            <div className="mt-2"> <embed src={previewPdf} type="application/pdf" width="100%" height="200px" /> <p className="text-sm text-gray-600">Size: {(pdfFile.size / 1024 / 1024).toFixed(2)} MB</p> </div>
                                            {/* <a
                                                href={URL.createObjectURL(pdfFile)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 underline text-xs"
                                            >
                                                Preview PDF
                                            </a> */}
                                            <button
                                                type="button"
                                                onClick={removePdf}
                                                className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1"
                                            >
                                                <AiOutlineCloseCircle size={18} />
                                            </button>
                                        </div>
                                    )}
                                    {errors.files && <span className="text-red-500">PDF required</span>}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        {/* <div className="form-control mt-6">
                            <button type="submit" className="btn btn-success w-full lg:w-1/3 mx-auto"><FcAddDatabase className='text-3xl hover:bg-blue-600' />
                                Submit
                            </button>
                            {
                                submitShow ? <p><GrCompliance />Submited</p> : <p>someting ealse Pleas try again .....</p>
                            }
                        </div> */}
                        <div className="form-control mt-6 text-center">
                            <AnimatePresence mode="wait">
                                {!submitShow && !loading && (
                                    // 🟢 Default Submit Button
                                    <motion.button
                                        key="submit"
                                        type="submit"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="btn bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 w-full lg:w-1/3 mx-auto shadow-lg rounded-2xl py-3"
                                    >
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                        >
                                            <FcAddDatabase className="text-3xl" />
                                        </motion.div>
                                        <motion.span
                                            animate={{ opacity: [1, 0.7, 1] }}
                                            transition={{ repeat: Infinity, duration: 1.5 }}
                                        >
                                            Submit
                                        </motion.span>
                                    </motion.button>
                                )}

                                {submitShow && loading && (
                                    // 🌀 Loading Spinner Animation
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex items-center justify-center gap-3 text-green-600 mt-3"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                                        >
                                            <ImSpinner8 className="text-3xl" />
                                        </motion.div>
                                        <motion.span
                                            animate={{ opacity: [1, 0.6, 1] }}
                                            transition={{ repeat: Infinity, duration: 1.2 }}
                                            className="font-semibold"
                                        >
                                            Submitting...
                                        </motion.span>
                                    </motion.div>
                                )}

                                {submitShow && !loading && (
                                    // ✅ Success Message Animation
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{ opacity: 1, scale: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9, y: -20 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        className="flex flex-col items-center justify-center gap-2 mt-3"
                                    >
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: [1.2, 1], rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <GrCompliance className="text-green-600 text-4xl animate-pulse" />
                                        </motion.div>
                                        <motion.p
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="text-green-600 font-semibold text-lg"
                                        >
                                            Submitted Successfully!
                                        </motion.p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default Createdproduct;