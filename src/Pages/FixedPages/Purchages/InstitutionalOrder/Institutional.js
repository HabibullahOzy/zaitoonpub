import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { FaTag, FaTruck } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { GiBookshelf } from "react-icons/gi";
import { Zaitooncontext } from "../../../../SecureContext/ContextAuth";
import toast from "react-hot-toast";

const Institutional = () => {
const {user}=useContext(Zaitooncontext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [captchaError, setCaptchaError] = useState(false);

  
  const handleFile = (f) => {
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const onSubmit = async (data) => {
    if (!isHuman) {
      setCaptchaError(true);
      return;
    }

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) =>
      formData.append(key, value)
    );
    formData.append("email", user?.email)
    formData.append("file", file);

    try {
      await axios.post(
        `${process.env.REACT_APP_backendurl}/institutionalorderreq`,
        formData
      );
      toast.success("Institutional order submitted successfully!");
      reset()
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  return (
    <div className="">
      <section className="w-full py-20">
        <div className="w-10/12 mx-auto text-center">

          {/* TITLE */}
          <h2 className="text-3xl font-medium text-gray-800 mb-16">
            Why Choose Us
          </h2>

          {/* ITEMS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">

            {/* ITEM 1 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full border-2 border-[#4ac58d] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#44c8a9] flex items-center justify-center">
                  <GiBookshelf className="text-white text-7xl" />
                </div>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">
                Best Book Collection
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                "Reading book is a wonderful experience and there's an explorer in
                all of us who shouldn't be lost at any cost. We offer splendid
                discounts on bulk purchases."
              </p>
            </div>

            {/* ITEM 2 */}
            <div className="flex flex-col items-center">
              {/* <div className="w-28 h-28 rounded-full border-2 border-[#8ec5f5] flex items-center justify-center"> */}
              <div className="w-28 h-28 rounded-full border-2 border-[#4ac58d] flex items-center justify-center">
                {/* <div className="w-24 h-24 rounded-full bg-[#8ec5f5] flex items-center justify-center"> */}
                <div className="w-24 h-24 rounded-full bg-[#44c8a9] flex items-center justify-center">
                  <FaTag className="text-white text-4xl" />
                </div>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">
                Best Price
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                "Reading book is a wonderful experience and there's an explorer in
                all of us who shouldn't be lost at any cost. We offer splendid
                discounts on bulk purchases."
              </p>
            </div>

            {/* ITEM 3 */}
            <div className="flex flex-col items-center">
              <div className="w-28 h-28 rounded-full border-2 border-[#4ac58d] flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-[#44c8a9] flex items-center justify-center">
                  <FaTruck className="text-white text-4xl" />
                </div>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mt-6 mb-4">
                On Time Delivery
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed max-w-sm">
                On Time 24/7 Delivery is available to meet your unique on-demand
                and scheduled delivery needs. Our professional executives and
                friendly customer service will ensure your books are delivered
                reliably to their destination and it will be free of cost.
              </p>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto p-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" shadow-xl rounded-xl bg-gray-50 p-6 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">
            Request A Quote
          </h2>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Organization's Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("institutionName", { required: true })}
              placeholder="Organization Name"
              className="input input-bordered w-full text-black"
            />
            {errors.institutionName && (
              <p className="text-red-500 text-sm">Organization's name is required</p>
            )}
          </div>


          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Your Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("contactPerson", { required: true })}
              placeholder="Contact Person"
              className="input input-bordered w-full"
            />
            {errors.contactPerson && (
              <p className="text-red-500 text-sm">Name is required</p>
            )}
          </div>

          {/* <div>
            <label className="block text-gray-700 font-medium mb-1">
              email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register("email", { required: true })}
              placeholder="Email"
              className="input input-bordered w-full"
            />
          </div> */}

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phone", { required: true })}
              placeholder="Phone Number"
              className="input input-bordered w-full"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">Phone Number is required</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Order Note (Optional)
            </label>
            <textarea
              {...register("description")}
              placeholder="Order Description"
              className="textarea textarea-bordered w-full"
            />
          </div>




          {/* 🔥 DRAG & DROP FILE INPUT */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Upload Product-List File (Max. 4MB) <span className="text-red-500">*</span>
            </label>
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
            ${dragActive ? "border-green-500 bg-blue-50" : "border-gray-300"}`}
            >
              <input
                type="file"
                hidden
                id="fileInput"
                onChange={(e) => handleFile(e.target.files[0])}
                required
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <p className="font-medium">
                  Drag & drop your file here or{" "}
                  
                </p>
                <p className="text-sm text-gray-500 flex justify-center items-center">
                  <HiOutlineClipboardDocumentList className="text-2xl"/> Select your file
                </p>
              </label>
            </div>
          </div>


          {/* PREVIEW */}
          {file && (
            <div className="grid md:grid-cols-2 gap-4">
              {file.type === "application/pdf" && (
                <iframe
                  src={preview}
                  title="PDF Preview"
                  className="w-full h-56 border rounded"
                />
              )}

              <div className="border rounded p-3 flex items-center justify-center">
                {file.type.startsWith("image/") ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="h-52 object-contain"
                  />
                ) : (
                  <p className="text-sm text-gray-600">{file.name}</p>
                )}
              </div>
            </div>
          )}

          {/* ✅ CAPTCHA CHECKBOX */}
          <div className="border rounded-md p-4 max-w-md bg-gray-50">
            {captchaError && (
              <p className="text-red-500 text-sm mb-2">
                Verification expired. Check the checkbox again.
              </p>
            )}

            <div className="flex items-center justify-between">
              {/* LEFT: CHECKBOX + TEXT */}
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isHuman}
                  onChange={() => {
                    setIsHuman(!isHuman);
                    setCaptchaError(false);
                  }}
                  className="checkbox checkbox-success"
                />
                <span className="text-sm select-none text-black">I'm not a robot</span>
              </label>

              {/* RIGHT: reCAPTCHA LOGO */}
              <div className="text-right text-[11px] text-gray-500 leading-tight">
                <img
                  src="https://www.gstatic.com/recaptcha/api2/logo_48.png"
                  alt="reCAPTCHA"
                  className="w-8 ml-auto mb-1"
                />
                <div>reCAPTCHA</div>
                <div>
                  <span className="underline cursor-pointer">Privacy</span> ·{" "}
                  <span className="underline cursor-pointer">Terms</span>
                </div>
              </div>
            </div>
          </div>

          <button className="btn btn-success w-full">
            Submit Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default Institutional;

