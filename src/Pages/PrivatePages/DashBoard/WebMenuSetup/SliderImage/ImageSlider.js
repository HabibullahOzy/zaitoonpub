import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

const ImageSlider = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        refetch,
    } = useForm();

    const [categoryData, setCategoryData] = useState({
        image: null
    });

    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCategoryData((prev) => ({ ...prev, image: file }));
            setImagePreview(URL.createObjectURL(file));
        }
    };


    const onSubmit = async (data) => {

        const imageFile = categoryData.image;


        // console.log("Form Data:", data);
        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("type", data.type);


        const res = await axios.post(`${process.env.REACT_APP_backendurl}/sliderimage`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        });
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
                <h2 className="text-2xl font-bold mb-4 text-center">Slider Image Setup Form</h2>

                {/* type Name */}
                {/* <label className="block mb-2 font-medium">Category Name</label> */}
                <input
                    hidden
                    defaultValue={"slider"}
                    type="text"
                    {...register("type")}
                    className="w-full border border-green-200 rounded-lg p-2 mb-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                

                {/* Category Image */}
                <label className="block mb-2 font-medium">Slider Image</label>
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
                )}

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
};

export default ImageSlider;