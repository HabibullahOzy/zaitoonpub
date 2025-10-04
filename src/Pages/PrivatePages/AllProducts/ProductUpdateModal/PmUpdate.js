import axios from 'axios';
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';

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
      numberOfpage: data.numberOfpage,
      offerprice: data.offerprice,
      productPrice: data.productPrice,
      description: data.description,
      quantity: data.quantity,
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
        toast.error("Product Not Updated ❌");
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center py-6">
      <div className="w-full max-w-3xl mx-auto shadow-lg p-6 rounded-2xl border border-gray-200">
        <h2 className="text-2xl font-bold text-center text-black mb-6">
          Update Product
        </h2>

        {productsdata.map((pdata, i) => (
          <form
            key={i}
            onSubmit={handleSubmit(handleCreatProduct)}
            className="space-y-5 text-black"
          >
            {/* Hidden ID */}
            <input {...register("id")} type="hidden" defaultValue={pdata._id} />

            {/* Input Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product (BN)
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

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product (Arabic)
              </label>
              <input
                {...register("arbproductarName", { required: true })}
                defaultValue={pdata.namearb}
                placeholder="Enter Arabic product name"
                className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              {errors.arbproductarName && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product (EN)
              </label>
              <input
                {...register("engproductName", { required: true })}
                defaultValue={pdata.nameeng}
                placeholder="Enter English product name"
                className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
              />
              {errors.engproductName && (
                <p className="text-red-500 text-sm mt-1">This field is required</p>
              )}
            </div>

            {/* Price & Offer */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Product Price
                </label>
                <input
                  {...register("productPrice", { required: true })}
                  defaultValue={pdata.productPrice}
                  type="number"
                  placeholder="Enter price"
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
                {errors.productPrice && (
                  <p className="text-red-500 text-sm mt-1">Required</p>
                )}
              </div>

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

            {/* Number of Pages & Quantity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Number of Pages
                </label>
                <input
                  {...register("numberOfpage", { required: true })}
                  defaultValue={pdata.numberOfpage}
                  type="number"
                  placeholder="Enter pages"
                  className="w-full mt-1 rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-green-500 focus:outline-none"
                />
              </div>

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

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Edition
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
                Description
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



// import axios from 'axios';
// import React from 'react';
// import { useForm } from 'react-hook-form';
// import toast from 'react-hot-toast';
// import { useLoaderData, useNavigate } from 'react-router-dom';

// const PmUpdate = () => {

//     const navigate = useNavigate();

//     const productsdata = useLoaderData();

//     const { register, handleSubmit, formState: { errors } } = useForm();

//     const handleCreatProduct = async (data) => {
//         const namebn = data.productbnName
//         const namearb = data.arbproductarName
//         const nameeng = data.engproductName
//         const authorName = data.authorName
//         const edition = data.edition
//         const numberOfpage = data.numberOfpage
//         const offerprice = data.offerprice
//         const productPrice = data.productPrice
//         const description = data.description
//         const quantity = data.quantity

//         const updatedata = {
//             namebn,
//             namearb,
//             nameeng,
//             authorName,
//             edition,
//             numberOfpage,
//             offerprice,
//             productPrice,
//             description,
//             quantity
//         }

//         const response = await axios.put(`${process.env.REACT_APP_backendurl}/productUpdate/${data.id}`, updatedata, {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         })

//         if (response.config.data) {
//             toast.success("Updated Successfully !!")
//             navigate("/dashboard/allProducts")
//         }
//         else {
//             toast.error("Product Not Updated")
//         }
//     }

//     return (
//         <div>
//             {/* You can open the modal using document.getElementById('ID').showModal() method */}
//             {/* <button className="btn" >open modal</button> */}


//             <div className="flex flex-col items-center">
//                 <div className="w-7/12 mx-auto bg-white shadow-lg p-2 rounded-md">

//                     <div className=" shadow-xl shadow-green-500">
//                         {
//                             productsdata.map((pdata, i) => <form key={i} onSubmit={handleSubmit(handleCreatProduct)} className="card-body">

//                                 <div className='lg:flex'>
//                                     <div className=' '>
//                                         {/* product id */}
//                                         <div className="form-control hidden">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Producte BN Name</span>
//                                             </label>
//                                             <input {...register("id", { required: true })} type="text" defaultValue={pdata._id} placeholder="Please Enter Your Bangla Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
//                                             {errors.productbnName && <span className=' text-red-500'>This section is required</span>}

//                                         </div>


//                                         {/*Product Name section start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Producte BN Name</span>
//                                             </label>
//                                             <input {...register("productbnName", { required: true })} type="text" defaultValue={pdata.namebn} placeholder="Please Enter Your Bangla Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
//                                             {errors.productbnName && <span className=' text-red-500'>This section is required</span>}

//                                         </div>


//                                         {/*Product Name section arabic start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Producte Arabic Name</span>
//                                             </label>
//                                             <input {...register("arbproductarName", { required: true })} type="text" defaultValue={pdata.namearb} placeholder="Please Enter Your arabic Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
//                                             {errors.arbproductarName && <span className=' text-red-500'>This section is required</span>}

//                                         </div>

//                                         {/*Product Name section english start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Producte EN Name</span>
//                                             </label>
//                                             <input {...register("engproductName", { required: true })} type="text" defaultValue={pdata.nameeng} placeholder="Please Enter English Producte Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
//                                             {errors.engproductName && <span className=' text-red-500'>This section is required</span>}

//                                         </div>

//                                         {/*Product Price Section start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Producte Price</span>
//                                             </label>
//                                             <input {...register("productPrice", { required: true })} type="text" defaultValue={pdata.productPrice} placeholder="Please Enter Resal price" className="input input-bordered lg:w-96" />
//                                             {errors.productPrice && <span className=' text-red-500'>This section is required</span>}
//                                         </div>


//                                         {/*Number of page section start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Number of Pages</span>
//                                             </label>
//                                             <input {...register("numberOfpage", { required: true })} type="text" defaultValue={pdata.numberOfpage} placeholder="Please Enter Number of pages" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
//                                             {errors.numberOfpage && <span className=' text-red-500'>This section is required</span>}

//                                         </div>



//                                         {/*Author Name section start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Author Name</span>
//                                             </label>
//                                             <input {...register("authorName", { required: true })} type="text" defaultValue={pdata.authorName} placeholder="Please Enter Author Name" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
//                                             {errors.authorName && <span className=' text-red-500'>This section is required</span>}

//                                         </div>

//                                         {/* Offer Price section start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Offer</span>
//                                             </label>
//                                             <input {...register("offerprice")} type="text" defaultValue={pdata.offerprice} placeholder="Please Enter Offer rates" className="input input-bordered lg:w-96 mr-4" />
//                                         </div>


//                                         {/* Products Quantity section start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Quantity</span>
//                                             </label>
//                                             <input {...register("quantity")} type="number" defaultValue={pdata.quantity} placeholder="Please Enter your products quantity" className="input input-bordered lg:w-96" />
//                                         </div>


//                                         {/*Edition section start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Producte Edition</span>
//                                             </label>
//                                             <input {...register("edition", { required: true })} type="text" defaultValue={pdata.edition} placeholder="Please Enter Your Producte Edition" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
//                                             {errors.edition && <span className=' text-red-500'>This section is required</span>}

//                                         </div>


//                                         {/* Description section start */}
//                                         <div className="form-control">
//                                             <label className="label">
//                                                 <span className="label-text text-black">Description</span>
//                                             </label>
//                                             <textarea {...register("description", { required: true })} defaultValue={pdata.description} className="textarea textarea-bordered h-24 lg:w-96" placeholder="Pease Enter Description"></textarea>
//                                             {errors.description && <span className=' text-red-500'>This section is required</span>}
//                                         </div>
//                                     </div>


//                                     <div className=''>

//                                         {/*Product code section start */}
//                                         {/* <div className="form-control">
//                                                     <label className="label">
//                                                         <span className="label-text text-black">Producte Code</span>
//                                                     </label>
//                                                     <input {...register("pcode", { required: true })} type="text" placeholder="Please Enter Producte Code" className="input input-bordered sm:w-16 lg:w-96 mr-4" />
//                                                     {errors.pcode && <span className=' text-red-500'>This section is required</span>}

//                                                 </div> */}

//                                         {/* Category Select Type of Users */}
//                                         {/* <div className="form-control">
//                                                     <div className="input-group grid">
//                                                         <label className="label ">
//                                                             <span className="label-text text-black">Category</span>
//                                                         </label>
//                                                         <select {...register("category", { required: true })} className="select input-bordered">
//                                                             <option>Play</option>
//                                                             <option>Nursary</option>
//                                                             <option>KG</option>
//                                                             <option>Ebtedaye</option>
//                                                         </select>
//                                                         {errors.category && <span className='text-red-500'>This field is required</span>}
//                                                     </div>
//                                                 </div> */}


//                                         {/* Producte Picture section start */}
//                                         {/* <div className="form-control">
//                                                     <label className="label">
//                                                         <span className="label-text text-black">Producte Picture</span>
//                                                     </label>
//                                                     <input {...register("image", { required: true })} type="file" accept='image/*' placeholder="Please Enter Producte picture" className="input input-bordered lg:w-96 mr-4" />
//                                                     {errors.image && <span className=' text-red-500'>This section is required</span>}
//                                                 </div> */}


//                                         {/* Producte PDF file section start */}
//                                         {/* <div className="form-control">
//                                                     <label className="label">
//                                                         <span className="label-text text-black">Upload PDF file</span>
//                                                     </label>
//                                                     <input {...register("files", { required: true })} type="file" accept='application/pdf' placeholder="Please Enter Producte PDF file" className="input input-bordered lg:w-96" />
//                                                     {errors.files && <span className=' text-red-500'>This section is required</span>}
//                                                 </div> */}
//                                     </div>
//                                 </div>





//                                 <div className="form-control mt-6">
//                                     <button className="btn btn-success">Submite</button>
//                                 </div>
//                             </form>)
//                         }
//                     </div>

//                 </div>

//             </div>
//         </div >
//     );
// };

// export default PmUpdate;