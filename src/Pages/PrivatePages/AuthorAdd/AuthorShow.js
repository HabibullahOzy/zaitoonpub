import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import axios from "axios";

const AuthorShow = () => {
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset, setValue } = useForm();

  // Fetch all authors
  const fetchAuthors = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_backendurl}/authorsdata`);
      setAuthors(res.data);
    } catch (error) {
      toast.error("Failed to fetch authors!");
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

  // Delete Author
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this author?")) return;
    try {
      await axios.delete(`${process.env.REACT_APP_backendurl}/author/delet/${id}`);
      toast.success("Author deleted!");
      setAuthors(authors.filter((a) => a._id !== id));
    } catch (error) {
      toast.error("Failed to delete author!");
    }
  };

  // Open Update Modal and set default form values
  const handleEdit = (author) => {
    setSelectedAuthor(author);
    setShowModal(true);
    setValue("name", author.name);
    setValue("email", author.email || "");
    setValue("bio", author.authordescription || "");
  };

  // Handle form submit (react-hook-form)
  const onSubmit = async (formData) => {
    setLoading(true);
    try {
      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("bio", formData.bio);

      if (formData.image?.[0]) {
        data.append("image", formData.image[0]);
      }

      const res = await axios.put(
        `${process.env.REACT_APP_backendurl}/authorsup/${selectedAuthor._id}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (res.status === 200) {
        toast.success("Author updated!");
        setShowModal(false);
        fetchAuthors();
      } else {
        toast.error("Update failed!");
      }
    } catch (error) {
      toast.error("Error updating author!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-3xl font-bold text-green-700 text-center mb-8">
        🌿 Author List
      </h1>

      {/* Author Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {authors.map((author) => (
          <motion.div
            key={author._id}
            className="bg-white/90 border border-green-200 shadow-md rounded-xl p-4 relative overflow-hidden hover:shadow-xl transition"
            whileHover={{ scale: 1.02 }}
          >
            <img
              src={author.image}
              alt={author.name}
              className="w-28 h-28 object-cover rounded-full mx-auto border-4 border-green-300 shadow-sm"
            />
            <h2 className="text-xl text-center font-semibold text-green-800 mt-3">
              {author.name}
            </h2>

            <p className="text-gray-600 mt-3 text-justify text-sm leading-relaxed">
              {author.authordescription?.split("\n").map((line, index) => (
                <span key={index}>
                  {line.trim()}
                  <br />
                </span>
              ))}
            </p>

            <div className="flex justify-center gap-3 mt-4">
              <button
                onClick={() => handleEdit(author)}
                className="bg-green-500 hover:bg-green-600 text-white text-sm px-4 py-1 rounded-md transition"
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(author._id)}
                className="bg-red-500 hover:bg-red-600 text-white text-sm px-4 py-1 rounded-md transition"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Update Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h2 className="text-xl font-semibold text-green-700 mb-4 text-center">
                Update Author
              </h2>

              <div className="space-y-3">
                <input
                  type="text"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Author Name"
                  className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                />

                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                />

                <textarea
                  {...register("bio")}
                  rows="4"
                  placeholder="Author Bio"
                  className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                />

                <input
                  type="file"
                  {...register("image")}
                  accept="image/*"
                  className="w-full border border-green-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
                />
              </div>

              <div className="flex justify-between mt-5">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`${loading
                    ? "bg-green-300 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600"
                    } text-white px-4 py-2 rounded-lg`}
                >
                  {loading ? "Updating..." : "Update"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AuthorShow;
