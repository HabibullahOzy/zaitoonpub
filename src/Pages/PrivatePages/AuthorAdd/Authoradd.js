import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";

const Authoradd = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("bio", data.bio);
    //   formData.append("category", data.category);
      if (data.image[0]) {
        formData.append("image", data.image[0]);
      }

      const res = await axios.post(
        `${process.env.REACT_APP_backendurl}/authors`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.status === 200) {
        toast.success("Author added successfully!");
        setPreview(null);
        reset();
      } else {
        toast.error("Failed to add author!");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white/90 shadow-xl rounded-2xl p-8 w-full max-w-lg border-t-4 border-green-400 backdrop-blur-sm"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-semibold text-center mb-6 text-green-700">
          ✨ Add New Author
        </h2>

        <div className="space-y-4">
          {/* Author Name */}
          <div>
            <label className="block text-green-700 font-medium mb-1">
              Author Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: "Name is required" })}
              type="text"
              placeholder="Enter author name"
              className={`w-full border ${
                errors.name ? "border-red-400" : "border-green-200"
              } focus:border-green-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-100`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-green-700 font-medium mb-1">Email <span className="text-red-500">*</span></label>
            <input
              {...register("email", {required: true})}
              type="email"
              placeholder="Enter author email"
              className="w-full border border-green-200 focus:border-green-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-100"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Dropdown */}
          {/* <div>
            <label className="block text-green-700 font-medium mb-1">
              Category
            </label>
            <select
              {...register("category")}
              className="w-full border border-green-200 focus:border-green-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-100"
            >
              <option value="">Select category</option>
              <option value="Research Scholar">Research Scholar</option>
              <option value="Professor">Professor</option>
              <option value="Writer">Writer</option>
              <option value="Islamic Scholar">Islamic Scholar</option>
              <option value="Educationalist">Educationalist</option>
            </select>
          </div> */}

          {/* Image Upload */}
          <div>
            <label className="block text-green-700 font-medium mb-1">
              Upload Image
            </label>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border border-green-200 focus:border-green-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-100"
            />

            {/* Image Preview */}
            {preview && (
              <div className="mt-3 flex justify-center">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-full border-2 border-green-300 shadow-md"
                />
              </div>
            )}
          </div>

          {/* Bio */}
          <div>
            <label className="block text-green-700 font-medium mb-1">
              Bio <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("bio", { required: "Bio is required" })}
              rows="4"
              placeholder="Write a short biography..."
              className={`w-full border ${
                errors.bio ? "border-red-400" : "border-green-200"
              } focus:border-green-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-green-100`}
            ></textarea>
            {errors.bio && (
              <p className="text-red-500 text-sm mt-1">{errors.bio.message}</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isSubmitting}
          className={`w-full mt-6 py-2 rounded-lg font-semibold text-white shadow-md transition ${
            isSubmitting
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {isSubmitting ? "Adding..." : "Add Author"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Authoradd;
