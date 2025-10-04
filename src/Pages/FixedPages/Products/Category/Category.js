import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Play from './Play/Play';
import { BiSolidCategoryAlt } from 'react-icons/bi';

const Category = () => {
  const [activeTab, setActiveTab] = useState(null);

  const { data: allcategory = [] } = useQuery({
    queryKey: ['allcategory'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/category`);
      const data = await res.json();
      return data;
    }
  });

  // get unique categories from product list
  const categories = [...new Set(Array.isArray(allcategory) && allcategory?.map(p => p.categname))];

  return (
    <div className='mt-11 w-10/12 mx-auto'>
      <div>
        <h1 className='flex justify-center text-black font-semibold text-3xl'><BiSolidCategoryAlt className='mr-2 text-yellow-300'/>Category</h1><br/>
        <p className='text-end text-black font-semibold'>সকল ক্যাটাগরি সমূহ</p>
        <hr className='border-2 border-gray-300 w-full mx-auto' />
      </div>

      {/* category buttons */}
      <div className='flex justify-center mt-12 flex-wrap gap-8'>
        {categories?.map((cat, i) => {
          const product = allcategory.find(p => p.categname === cat);
          return (
            <div key={i} className="relative group inline-block">
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block tooltip-content z-10">
                <div className="animate-bounce text-orange-300 -rotate-10 text-lg font-black">
                  {cat}
                </div>
              </div>

              {/* Button */}
              <button
                onClick={() => setActiveTab(cat)}
                className={`pb-2 shadow-lg shadow-gray-300 w-24 rounded-full 
                  ${activeTab === cat 
                    ? 'border-b-2 shadow-orange-500 border-green-500 text-green-600 font-semibold' 
                    : 'text-gray-600'} 
                  active:scale-95 active:bg-opacity-90 active:shadow-inner`}
              >
                <img
                  src={product?.image || "https://via.placeholder.com/100"}
                  alt={cat}
                  className="rounded-full w-20 h-20 object-cover"
                />
              </button>
            </div>
          );
        })}
      </div>

      {/* products by category */}
      <div className="text-gray-800 leading-relaxed mt-10">
        {activeTab && (
          <div className="grid gap-6">
            {(allcategory || []).filter(p => p.categname === activeTab)
              .map(pcate => (
                <div key={pcate._id} className=" rounded-sm p-4">
                    <Play productCategory={pcate} />
                  {/* <img src={p.image} alt={p.nameeng} className="w-full h-40 object-cover rounded-md" />
                  <h2 className="font-semibold mt-2">{p.nameeng}</h2>
                  <p className="text-sm text-gray-500">{p.authorName}</p>
                  <p className="font-bold text-green-600">৳{p.productPrice}</p> */}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;



// import React, { useState } from 'react';
// import Play from './Play/Play';
// import Nursary from './Nursary/Nursary';
// import Kg from './Kg/Kg';
// import { useQuery } from '@tanstack/react-query';

// import playe from '../../../../assets/book.jpg';
// import nursa from '../../../../assets/book2.jpg';
// import kg from '../../../../assets/book3.jpg';


// const Category = () => {
//     const [activeTab, setActiveTab] = useState('summary');

//     // const { data: allcategory = [], refetch } = useQuery({
//     //     queryKey: ['allcategory'],
//     //     queryFn: async () => {
//     //         const res = await fetch(`${process.env.REACT_APP_backendurl}/allcategory`);
//     //         const data = await res.json();
//     //         return data;
//     //     }
//     // });
//     return (
//        <div className='mt-11 w-10/12 mx-auto '>

//                 <div>
//                     <h1 className='text-center text-black font-semibold text-3xl'>Category</h1><br/>
//                     <p className='text-end text-black font-semibold'>সকল ক্যাটাগরি সমূহ</p>
//                     <hr className='border-2 border-gray-300 w-full mx-auto' />
//                 </div>
//                 <div className='flex justify-center mt-12'>


//                     {/* Play */}

//                     <div className="relative group inline-block mr-7">
//                         {/* Tooltip content */}
//                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block tooltip-content z-10">
//                             <div className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">
//                                 Play!
//                             </div>
//                         </div>

//                         {/* Button */}
//                         <button
//                             onClick={() => setActiveTab('summary')}
//                             className={`pb-2 shadow-lg shadow-gray-300 w-24 rounded-full ${activeTab === 'summary'
//                                 ? 'border-b-2 shadow-orange-500 border-green-500 text-green-600 font-semibold'
//                                 : 'text-gray-600'
//                                 }  active:scale-95 active:bg-opacity-90 active:shadow-inner`}
//                         >
//                             <img src={playe} alt="" className="rounded-full w-20" />
//                         </button>
//                     </div>


//                     {/* Nursary */}


//                     <div className="relative group inline-block mr-7">
//                         {/* Tooltip content */}
//                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block tooltip-content z-10">
//                             <div className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">
//                                 Nursary!
//                             </div>
//                         </div>

//                         {/* Button */}
//                         <button
//                             onClick={() => setActiveTab('specification')}
//                             className={`pb-2 shadow-lg w-24 shadow-gray-300 rounded-full ${activeTab === 'specification' ? 'border-b-2 shadow-orange-500 border-green-500 text-green-600 font-semibold' : 'text-gray-600'} active:scale-95 active:bg-opacity-90 active:shadow-inner`}
//                         >
//                             <img src={nursa} alt="" className=' rounded-full w-20 ' />
//                         </button>
//                     </div>



//                     {/* Kg */}

//                     <div className="relative group inline-block">
//                         {/* Tooltip content */}
//                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block tooltip-content z-10">
//                             <div className="animate-bounce text-orange-400 -rotate-10 text-2xl font-black">
//                                 KG!
//                             </div>
//                         </div>

//                         {/* Button */}
//                         <button
//                             onClick={() => setActiveTab('author')}
//                             className={`pb-2 shadow-lg shadow-gray-300 w-24 rounded-full ${activeTab === 'author' ? 'border-b-2 shadow-orange-500 border-green-500 text-green-600 font-semibold' : 'text-gray-600'} active:scale-95 active:bg-opacity-90 active:shadow-inner`}
//                         >
//                             <img src={kg} alt="" className=' rounded-full w-20 ' />
//                         </button>
//                     </div>



//                 </div>


//                 <div className="text-gray-800 leading-relaxed mt-10">
//                     {activeTab === 'summary' &&
//                         // <PSummer data={data} />
//                         <Play></Play>
//                     }
//                     {activeTab === 'specification' &&
//                         // <Pspecifica data={data} />
//                         <Nursary></Nursary>
//                     }
//                     {activeTab === 'author' &&
//                         // <Pauthor data={data} />
//                         <Kg></Kg>
//                     }
//                 </div>
//             </div>
//     );
// };

// export default Category;