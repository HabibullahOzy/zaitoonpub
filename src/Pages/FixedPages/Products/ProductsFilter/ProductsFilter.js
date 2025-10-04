import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useMemo, useContext } from "react";
import toast from "react-hot-toast";
import { FaCartFlatbed } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { Zaitooncontext } from "../../../../SecureContext/ContextAuth";
import { FcViewDetails } from "react-icons/fc";

const ProductsFilter = () => {

const {user, localDeviceId} = useContext(Zaitooncontext)
    const { data: allproducts = []} = useQuery({
        queryKey: ["allproducts"],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/allProducts`);
            const data = await res.json();
            return data;
        },
    });

const queryClient = useQueryClient();
    const handleAddCart = async (id, offerPrice) => {
        const response = await axios.get(`${process.env.REACT_APP_backendurl}/products/${id}`);
        const product = response?.data[0];



        const cartProducts = {
            id,
            email: user?.email || localDeviceId(),
            offer: offerPrice,
            nameeng: product?.nameeng,
            namebn: product?.namebn,
            namearb: product?.namearb,
            image: product?.image,
            productPrice: product?.productPrice,
            category: product?.category,
            ProductCode: product?.ProductCode,
            authorName: product?.authorName,
            edition: product?.edition,
            postDate: product?.postDate
        };

        fetch(`${process.env.REACT_APP_backendurl}/addedCart`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(cartProducts)
        })
            .then(res => res.json())
            .then(infoe => {
                if (infoe.acknowledged) {
                    toast.success("Your Product added successfully");
                    queryClient.clear();
                } else {
                    toast.error("Your product can't be added, please try again");
                }
            });
    };

    // Helper: unique values
    const getUniqueValues = (data, key) => [...new Set(data.map((item) => item[key]))];

    // Language is comma separated
    const getUniqueLanguages = (data) => {
        const langs = data.flatMap((p) =>
            p.language?.split(",").map((l) => l.trim())
        );
        return [...new Set(langs)];
    };

    const productsData = allproducts;

    // States
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedsubCategory, setSelectedsubCategory] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedEditions, setSelectedEditions] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 2000]);

    // Toggle checkbox helper
    const toggleFilter = (value, selected, setSelected) => {
        setSelected((prev) =>
            prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
        );
    };

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        return productsData.filter((p) => {
            const langs = p.language?.split(",").map((l) => l.trim());

            return (
                (selectedCategories.length ? selectedCategories.includes(p.category) : true) &&
                (selectedsubCategory.length ? selectedsubCategory.includes(p.subCategory) : true) &&
                (selectedAuthors.length ? selectedAuthors.includes(p.authorName) : true) &&
                (selectedEditions.length ? selectedEditions.includes(p.edition) : true) &&
                (selectedLanguages.length ? selectedLanguages.some((l) => langs.includes(l)) : true) &&
                Number(p.productPrice) >= priceRange[0] &&
                Number(p.productPrice) <= priceRange[1]
            );
        });
    }, [
        productsData,
        selectedCategories,
        selectedsubCategory,
        selectedAuthors,
        selectedEditions,
        selectedLanguages,
        priceRange,
    ]);

    // Unique filter options
    const categories = getUniqueValues(productsData, "category");
    const subCategory = getUniqueValues(productsData, "subCategory");
    const authors = getUniqueValues(productsData, "authorName");
    const editions = getUniqueValues(productsData, "edition");
    const languages = getUniqueLanguages(productsData);

    return (
       <div className="p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
  {/* Filters */}
  <aside className="w-full lg:w-1/4 space-y-6 p-4 border rounded-lg shadow bg-white text-black">
    <h2 className="text-xl font-semibold">Filters</h2>

    {/* Category */}
    <div>
      <h3 className="font-medium mb-2">Category</h3>
      {categories.map((c) => (
        <label key={c} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={selectedCategories.includes(c)}
            onChange={() =>
              toggleFilter(c, selectedCategories, setSelectedCategories)
            }
          />
          {c}
        </label>
      ))}
    </div>

    {/* Subcategory */}
    <div>
      <h3 className="font-medium mb-2">Sub Category</h3>
      {subCategory.map((sub,i) => (
        <label key={i} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={selectedsubCategory.includes(sub)}
            onChange={() =>
              toggleFilter(sub, selectedsubCategory, setSelectedsubCategory)
            }
          />
          {sub}
        </label>
      ))}
    </div>

    {/* Author */}
    <div>
      <h3 className="font-medium mb-2">Author</h3>
      {authors.map((autho,i) => (
        <label key={i} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={selectedAuthors.includes(autho)}
            onChange={() => toggleFilter(autho, selectedAuthors, setSelectedAuthors)}
          />
          {autho}
        </label>
      ))}
    </div>

    {/* Edition */}
    <div>
      <h3 className="font-medium mb-2">Edition</h3>
      {editions.map((edi,i) => (
        <label key={i} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={selectedEditions.includes(edi)}
            onChange={() =>
              toggleFilter(edi, selectedEditions, setSelectedEditions)
            }
          />
          {edi}
        </label>
      ))}
    </div>

    {/* Language */}
    <div>
      <h3 className="font-medium mb-2">Language</h3>
      {languages.map((lang,j) => (
        <label key={j} className="flex items-center gap-2 mb-1">
          <input
            type="checkbox"
            checked={selectedLanguages.includes(lang)}
            onChange={() =>
              toggleFilter(lang, selectedLanguages, setSelectedLanguages)
            }
          />
          {lang}
        </label>
      ))}
    </div>

    {/* Price Range */}
    <div>
      <h3 className="font-medium mb-2">Price Range</h3>
      <div className="flex items-center gap-2">
        <input
          type="number"
          className="w-20 border rounded p-1"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
        />
        <span>-</span>
        <input
          type="number"
          className="w-20 border rounded p-1"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
        />
      </div>
    </div>

    {/* Reset */}
    <button
      onClick={() => {
        setSelectedCategories([]);
        setSelectedsubCategory([]);
        setSelectedAuthors([]);
        setSelectedEditions([]);
        setSelectedLanguages([]);
        setPriceRange([0, 2000]);
      }}
      className="w-full mt-4 bg-gray-200 hover:bg-gray-300 p-2 rounded"
    >
      Reset Filters
    </button>
  </aside>

  {/* Product Grid */}
  <main className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {filteredProducts.length > 0 ? (
      filteredProducts.map((product) => {
        const offerPrice = product?.offerprice
          ? product.productPrice -
            (product.productPrice * parseInt(product.offerprice)) / 100
          : null;

        return (
          <div
            key={product._id}
            className="relative flex flex-col border rounded-lg shadow-sm hover:shadow-lg transition bg-white"
          >
            {/* Badge */}
            {product?.offerprice && (
              <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow">
                {product?.offerprice}% OFF
              </span>
            )}

            {/* Image */}
            <Link
              to={`/products/${product._id}`}
              className="block relative overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.nameeng}
                className="transition-transform duration-300 hover:scale-105"
              />
            </Link>

            {/* Buttons */}
            <div className="mt-auto flex gap-2 p-2">
              <Link
                to={`/products/${product._id}`}
                className="w-1/2 bg-green-200 text-green-600 flex items-center justify-center py-2 rounded hover:bg-green-300"
              >
                 <FcViewDetails className="w-5 h-5" />
              </Link>
              <button
                onClick={() => handleAddCart(product._id, offerPrice)}
                className="w-1/2 bg-green-200 text-green-600 flex items-center justify-center py-2 rounded hover:bg-green-300"
              >
                <FaCartFlatbed className="w-8" />
              </button>
            </div>

            {/* Info */}
            <div className="flex flex-col bg-[#baefba] flex-grow p-3 rounded-b-lg">
              <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 text-center">
                {product.nameeng}
              </h3>
              <p className="text-xs text-gray-500 text-center">
                {product.authorName}
              </p>
              <p className="text-xs text-gray-400 text-center mt-1">
                {product.category} • {product.language} • {product.numberOfpage}{" "}
                pages
              </p>

              {/* Price */}
              <div className="flex justify-center items-center gap-2 mt-3">
                {product?.offerprice ? (
                  <>
                    <p className="text-sm font-semibold text-gray-400 line-through">
                      {product.productPrice}৳
                    </p>
                    <p className="text-lg font-bold text-red-500">{offerPrice}৳</p>
                  </>
                ) : (
                  <p className="text-lg font-bold text-green-600">
                    {product.productPrice}৳
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <p className="col-span-full text-center text-gray-500">
        No products found.
      </p>
    )}
  </main>
</div>

    );
};

export default ProductsFilter;




// import { useQuery } from "@tanstack/react-query";
// import React, { useState, useMemo } from "react";



// const ProductsFilter = () => {

//     const { data: allproducts = [], refetch } = useQuery({
//         queryKey: ['allproducts'],
//         queryFn: async () => {
//             const res = await fetch(`${process.env.REACT_APP_backendurl}/allProducts`);
//             const data = await res.json();
//             return data;
//         }
//     });

//     // Helper: unique values
//     const getUniqueValues = (data, key) => [...new Set(data.map(item => item[key]))];

//     // Since `language` is comma separated, split them
//     const getUniqueLanguages = (data) => {
//         const langs = data.flatMap((p) => p.language.split(",").map((l) => l.trim()));
//         return [...new Set(langs)];
//     };
//     const productsData = allproducts;
//     const [selectedCategories, setSelectedCategories] = useState([]);
//     const [selectedLanguages, setSelectedLanguages] = useState([]);
//     const [priceRange, setPriceRange] = useState([0, 1000]);

//     // Toggle helper
//     const toggleFilter = (value, selected, setSelected) => {
//         setSelected((prev) =>
//             prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
//         );
//     };

//     // Filtering
//     const filteredProducts = useMemo(() => {
//         return productsData.filter((p) => {
//             const langs = p.language.split(",").map((l) => l.trim());

//             return (
//                 (selectedCategories.length ? selectedCategories.includes(p.category) : true) &&
//                 (selectedLanguages.length ? selectedLanguages.some((l) => langs.includes(l)) : true) &&
//                 p.productPrice >= priceRange[0] &&
//                 p.productPrice <= priceRange[1]
//             );
//         });
//     }, [selectedCategories, selectedLanguages, priceRange]);

//     const categories = getUniqueValues(productsData, "category");
//     const languages = getUniqueLanguages(productsData);

//     return (
//         <div className="flex gap-8 p-6">
//             {/* Filters */}
//             <aside className="w-1/4 space-y-6 p-4 border rounded-lg shadow">
//                 <h2 className="text-xl font-semibold">Filters</h2>

//                 {/* Category */}
//                 <div>
//                     <h3 className="font-medium mb-2">Category</h3>
//                     {categories.map((c) => (
//                         <label key={c} className="flex items-center gap-2 mb-1">
//                             <input
//                                 type="checkbox"
//                                 checked={selectedCategories.includes(c)}
//                                 onChange={() => toggleFilter(c, selectedCategories, setSelectedCategories)}
//                             />
//                             {c}
//                         </label>
//                     ))}
//                 </div>

//                 {/* Language */}
//                 <div>
//                     <h3 className="font-medium mb-2">Language</h3>
//                     {languages.map((l) => (
//                         <label key={l} className="flex items-center gap-2 mb-1">
//                             <input
//                                 type="checkbox"
//                                 checked={selectedLanguages.includes(l)}
//                                 onChange={() => toggleFilter(l, selectedLanguages, setSelectedLanguages)}
//                             />
//                             {l}
//                         </label>
//                     ))}
//                 </div>

//                 {/* Price Range */}
//                 <div>
//                     <h3 className="font-medium mb-2">Price Range</h3>
//                     <div className="flex items-center gap-2">
//                         <input
//                             type="number"
//                             className="w-20 border rounded p-1"
//                             value={priceRange[0]}
//                             onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
//                         />
//                         <span>-</span>
//                         <input
//                             type="number"
//                             className="w-20 border rounded p-1"
//                             value={priceRange[1]}
//                             onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
//                         />
//                     </div>
//                 </div>

//                 <button
//                     onClick={() => {
//                         setSelectedCategories([]);
//                         setSelectedLanguages([]);
//                         setPriceRange([0, 1000]);
//                     }}
//                     className="w-full mt-4 bg-gray-200 hover:bg-gray-300 p-2 rounded"
//                 >
//                     Reset Filters
//                 </button>
//             </aside>

//             {/* Product Grid */}
//             {/* <main className="w-3/4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {filteredProducts.length > 0 ? (
//           filteredProducts.map((p) => (
//             <div key={p._id} className="border rounded-lg p-4 shadow hover:shadow-lg transition">
//               <img src={p.image} alt={p.nameeng} className="w-full h-40 object-cover rounded" />
//               <h3 className="font-semibold mt-2">{p.nameeng}</h3>
//               <p className="text-sm text-gray-600">{p.category}</p>
//               <p className="text-sm">Lang: {p.language}</p>
//               <p className="text-sm">Pages: {p.numberOfpage}</p>
//               <p className="font-bold text-lg">৳ {p.productPrice}</p>
//               <p className="text-xs mt-2">{p.authorName}</p>
//             </div>
//           ))
//         ) : (
//           <p className="col-span-full text-center text-gray-500">No products found.</p>
//         )}
//       </main> */}
//             <main className="w-3/4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
//                 {filteredProducts.length > 0 ? (
//                     filteredProducts.map((product, i) => {
//                         const offerPrice = product?.offerprice
//                             ? product.productPrice - (product.productPrice * parseInt(product.offerprice)) / 100
//                             : null;

//                         return (
//                             <div key={i} className="flex flex-col h-full">
//                                 <div className="relative bg-white border rounded-lg shadow-sm hover:shadow-lg transition flex flex-col h-full group">

//                                     {/* --- Discount Badge --- */}
//                                     {product?.offerprice && (
//                                         <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow">
//                                             {product?.offerprice}% OFF
//                                         </span>
//                                     )}

//                                     {/* Product Image */}
//                                     <a href={`/products/${product._id}`} className="block relative overflow-hidden">
//                                         <img
//                                             src={product.image}
//                                             alt={product.nameeng}
//                                             className=" transition-transform duration-300 group-hover:scale-105"
//                                         />
//                                     </a>

//                                     {/* Product Info */}
//                                     <div className="flex flex-col bg-[#baefba] flex-grow p-3">
//                                         <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 text-center">
//                                             {product.nameeng}
//                                         </h3>
//                                         <p className="text-xs text-gray-500 text-center">{product.authorName}</p>
//                                         <p className="text-xs text-gray-400 text-center mt-1">
//                                             {product.category} • {product.language} • {product.numberOfpage} pages
//                                         </p>

//                                         {/* Price Section */}
//                                         <div className="flex justify-center items-center gap-2 mt-3">
//                                             {product?.offerprice ? (
//                                                 <>
//                                                     <p className="text-sm font-semibold text-gray-400 line-through">
//                                                         {product.productPrice}৳
//                                                     </p>
//                                                     <p className="text-lg font-bold text-red-500">{offerPrice}৳</p>
//                                                 </>
//                                             ) : (
//                                                 <p className="text-lg font-bold text-green-600">{product.productPrice}৳</p>
//                                             )}
//                                         </div>

//                                         {/* Buttons */}
//                                         <div className="mt-auto flex gap-2 pt-4">
//                                             <a
//                                                 href={`/products/${product._id}`}
//                                                 className="p-4 w-1/2 bg-green-200 text-green-600 flex items-center justify-center tooltip tooltip-success" data-tip="View Details"
//                                             >
//                                                 👁 View
//                                             </a>
//                                             <button
//                                                 onClick={() =>console.log("Add to Cart", product._id)}
//                                                 className="p-4 w-1/2 bg-green-200 text-green-600 flex items-center justify-center tooltip tooltip-success" data-tip="Add to Cart"
//                                             >
//                                                 🛒 Add
//                                             </button>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         );
//                     })
//                 ) : (
//                     <p className="col-span-full text-center text-gray-500">No products found.</p>
//                 )}
//             </main>


//         </div>
//     );
// }

// export default ProductsFilter;