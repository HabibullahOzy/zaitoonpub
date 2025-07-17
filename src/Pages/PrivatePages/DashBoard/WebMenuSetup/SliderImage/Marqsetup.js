import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const Marqsetup = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        refetch,
    } = useForm();


    const onSubmit = async (data) => {

        const type = "marq";
        const marqtext = data.mtext;
        const link = data.categname;

        const marqdata = {
            type,
            marqtext,
            link,
        }


        const res = await axios.post(`${process.env.REACT_APP_backendurl}/marqwebmenu`, marqdata);
        // console.log(res.data);
        if (res?.data?.insertedId) {
            toast.success("Category and subcategories added successfully!");
            // Reset form or perform any other actions
        } else {
            toast.error("Failed to add category. Please try again.");
        }
        // Submit logic here
    };

    return (
        <div className="flex justify-center items-center min-h-screen p-4 w-full md:w-1/2 mx-auto text-black">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="p-6 rounded-xl shadow-md w-full"
                style={{ backgroundColor: "rgb(186, 239, 186)" }}
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Marq Setup Form</h2>

                {/* Marq Text */}
                <label className="block mb-2 font-medium">Marq Text <span className='text-red-600'>*</span></label>
                <input
                    type="text"
                    {...register("mtext", { required: "Category name is required" })}
                    className="w-full bg-white rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.categname && (
                    <p className="text-red-500">{errors.categname.message}</p>
                )}



                {/* Link */}
                <label className="block mb-2 font-medium">Any link</label>
                <input
                    type="text"
                    {...register("categname")}
                    className="w-full border border-green-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                {errors.categname && (
                    <p className="text-red-500">{errors.categname.message}</p>
                )}


                {/* Category Image */}
                {/* <label className="block mb-2 font-medium">Slider Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="mb-4"
                />

                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-auto mb-4 rounded-lg"
                    />
                )} */}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition mt-5"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default Marqsetup;