import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { Zaitooncontext } from "../../../../../SecureContext/ContextAuth";

const VideoUpload = () => {
  const { user } = useContext(Zaitooncontext);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [youtubeEmbed, setYoutubeEmbed] = useState(null);

  // Handle Thumbnail Selection
  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      toast.error("Image must be less than 5MB!");
    }
  };

  // Remove Thumbnail
  const removeThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  // Handle YouTube Link Input
  const handleYoutubeChange = (e) => {
    const link = e.target.value;
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;
    const match = link.match(youtubeRegex);
    if (match) {
      setYoutubeEmbed(`https://www.youtube.com/embed/${match[1]}`);
    } else {
      setYoutubeEmbed(null);
    }
  };

  // Form Submit
  const handleSubmitVideo = async (data) => {
    if (!thumbnailFile || !data.videoLink) {
      toast.error("Thumbnail and video link are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("image", thumbnailFile);
      formData.append("title", data.title);
      formData.append("srce", data.videoLink);
      formData.append("email", user?.email);
      console.log(formData)

      const response = await axios.post(
        `${process.env.REACT_APP_backendurl}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.data.insertedId) {
        toast.success("Video successfully uploaded!");
        reset();
        removeThumbnail();
        setYoutubeEmbed(null);
      } else {
        toast.error("Failed to upload video. Try again!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl border border-green-200"
      >
        <h2 className="text-2xl font-semibold text-green-700 mb-6 text-center">
          🎬 Add Product Video
        </h2>

        <form onSubmit={handleSubmit(handleSubmitVideo)} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Title</label>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Intro Video"
              className="input input-bordered w-full border-green-200 focus:border-green-400"
            />
            {errors.title && <span className="text-red-500 text-sm">Title is required</span>}
          </div>

          {/* Thumbnail */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">Thumbnail Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="file-input file-input-bordered w-full border-green-200 focus:border-green-400"
            />
            {thumbnailPreview && (
              <div className="mt-2 relative">
                <img
                  src={thumbnailPreview}
                  alt="Thumbnail Preview"
                  className="w-full h-48 object-cover rounded-lg shadow-md border border-green-100"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  className="absolute top-2 right-2 bg-red-600 text-white rounded-full px-2 py-1 text-xs"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* YouTube Video Link */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">YouTube Video Link</label>
            <input
              {...register("videoLink", { required: true })}
              type="url"
              onChange={handleYoutubeChange}
              placeholder="https://www.youtube.com/watch?v=-M6t0oP5ZDc"
              className="input input-bordered w-full border-green-200 focus:border-green-400"
            />
          </div>

          {/* YouTube Preview */}
          {youtubeEmbed && (
            <div className="mt-3">
              <iframe
                width="100%"
                height="230"
                src={youtubeEmbed}
                title="YouTube Preview"
                className="rounded-lg border border-green-200 shadow-md"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {/* Submit */}
          <div className="text-center pt-2">
            <button
              type="submit"
              className="btn bg-green-600 hover:bg-green-700 text-white px-8 py-2 rounded-full shadow-md"
            >
              Upload Video
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default VideoUpload;
