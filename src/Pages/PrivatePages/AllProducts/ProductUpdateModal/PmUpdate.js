import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { useQuery } from '@tanstack/react-query';

const PmUpdate = () => {
  const { isAdmin, isSuperAdmin } = useContext(Zaitooncontext)
  const navigate = useNavigate();
  const productsdata = useLoaderData();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const handleCreatProduct = async (data) => {
    const updatedata = {
      namebn: data.productbnName,
      namearb: data.arbproductarName,
      nameeng: data.engproductName,
      authorName: data.authorName,
      edition: data.edition,
      autemail: data.autemail,
      category: data.category,
      subCategory: data.subcategory,
      numberOfpage: data.numberOfpage,
      offerprice: data.offerprice,
      productPrice: data.productPrice,
      description: data.description,
      quantity: data.quantity,
      ProductCode: data.ProductCode,
      state: data?.state
    };

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_backendurl}/productUpdate/${data.id}`,
        updatedata,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.config.data) {
        toast.success("Updated Successfully ✅");
        if (isAdmin) {
          navigate("/dashboard/allProducts");
        } else if (isSuperAdmin) {
          navigate("/dashboard/superadmin/allProducts");
        }
        else {
          navigate("/");
        }
      } else {
        toast.error("Product Not Updated ");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };



  const { data: allcategory = [] } = useQuery({
    queryKey: ['allcategory'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/category`);
      const data = await res.json();
      return data;
    }
  });



  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-3xl mx-auto shadow-lg p-6 rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Update Product
        </h2>

        {productsdata?.map((pdata, i) => (
          <form
            key={i}
            onSubmit={handleSubmit(handleCreatProduct)}
            className="space-y-5 text-black"
          >
            {/* Hidden ID */}
            <input {...register("id")} type="hidden" defaultValue={pdata._id} />

            {/* Input Field */}
            {/* Name (Bn) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product (BN) <span className='text-red-600'>*</span>
              </label>
              <input
                {...register("productbnName", { required: true })}
                defaultValue={pdata.namebn}
                placeholder="Enter Bangla product name"
                className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              {errors.productbnName && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>

            {/* Name (Arabic) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name (Arabic)
              </label>
              <input
                {...register("arbproductarName")}
                defaultValue={pdata.namearb}
                placeholder="Enter Arabic product name"
                className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>
            {/* Name (En) */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name (EN)
              </label>
              <input
                {...register("engproductName")}
                defaultValue={pdata.nameeng}
                placeholder="Enter English product name"
                className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
            </div>

            {/* Price & Offer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Price
                </label>
                <input
                  {...register("productPrice")}
                  defaultValue={pdata.productPrice}
                  type="number"
                  placeholder="Enter price"
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                
              </div>

              {/* Offer Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Offer Price
                </label>
                <input
                  {...register("offerprice")}
                  defaultValue={pdata.offerprice}
                  type="number"
                  placeholder="Enter offer price"
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

              {/* Author Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Author Email</span>
                </label>
                <input
                  {...register("autemail")}
                  type="email"
                  defaultValue={pdata?.autemail}
                  // placeholder={pdata?.autemail}
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                
              </div>

              {/* Category */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black flex ">Category</span>
                </label>

                {allcategory.length > 0 ? (
                  <select
                    {...register("category")}
                    className="select select-bordered text-black w-full bg-[#baefba]"
                  >
                    {/* <option value="">Select a category</option> */}
                    {allcategory?.map((category) => (
                      <option key={category._id} defaultValue={pdata.category}>
                        {category.categname}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-gray-500">No categories available</p>
                )}

              </div>

            </div>

            {/* Select Subcategory */}

            <div className="form-control">
              <label className="label">
                <span className="label-text text-black">
                  Sub Category
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 bg-[#baefba] p-3 rounded">

                {allcategory?.map((category) => {
                  const subs = category?.subcategories
                    ?.split(',')
                    .map(s => s.trim())
                    .filter(Boolean);

                  return subs?.map((subcat, index) => (
                    <label
                      key={`${category._id}-${index}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={subcat}
                        {...register("subcategory")}
                        className="checkbox checkbox-success"
                      />
                      <span className="text-black">{subcat}</span>
                    </label>
                  ));
                })}

              </div>

            </div>

            {/* Number of Pages & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Pages <span className='text-red-600'>*</span>
                </label>
                <input
                  {...register("numberOfpage", { required: true })}
                  defaultValue={pdata.numberOfpage}
                  type="number"
                  placeholder="Enter pages"
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
              {/* Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <input
                  {...register("quantity")}
                  defaultValue={pdata.quantity}
                  type="number"
                  placeholder="Enter stock quantity"
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Author & Edition */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Author Name
                </label>
                <input
                  {...register("authorName", { required: true })}
                  defaultValue={pdata.authorName}
                  placeholder="Enter author name"
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              {/*product code*/}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Code
                </label>
                <input
                  {...register("ProductCode", { required: true })}
                  defaultValue={pdata.ProductCode}
                  placeholder="Enter author name"
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

              {/* Status*/}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-black">Status </span>
                </label>
                <select
                  {...register("state")}

                  className="select select-bordered text-black w-full bg-[#baefba]"
                >
                  <option value="Available">Available</option>
                  <option value="Unavailable">Unavailable</option>
                  <option value="Previous">Old Edition</option>
                  <option value="Preorder">Preorder</option>
                  <option value="Coming Soon">Coming Soon</option>
                  <option value="Out of Stock">Out of Stock</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Edition <span className='text-red-600'>*</span>
                </label>
                <input
                  {...register("edition", { required: true })}
                  defaultValue={pdata.edition}
                  placeholder="Enter edition"
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description <span className='text-red-600'>*</span>
              </label>
              <textarea
                {...register("description", { required: true })}
                defaultValue={pdata.description}
                placeholder="Enter product description"
                className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 h-28 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Update Product
              </button>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
};

export default PmUpdate;