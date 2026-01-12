import React, { useEffect, useState } from 'react';
import ClassbooksShow from './ClassbooksShow';
import { BiSolidCategoryAlt } from 'react-icons/bi';
import { useQuery } from '@tanstack/react-query';

const Classbooks = () => {
    const [activeTab, setActiveTab] = useState(null);

  const { data: allcategory = [] } = useQuery({
    queryKey: ['allcategory'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/category`);
      const data = await res.json();
      return data;
    }
  });

  // Get unique categories
  const categories = [...new Set(Array.isArray(allcategory) 
    ? allcategory?.map(p => p.categname) 
    : []
  )];

  // ✅ Automatically set the first category as active when data loads
  useEffect(() => {
    if (categories.length > 0 && !activeTab) {
      setActiveTab(categories[0]);
    }
  }, [categories, activeTab]);

  return (
    <div className='mt-11 lg:w-10/12 lg:w-10/12 p-2 mx-auto'>
      
      {/* Category buttons */}
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

      {/* Products by category */}
      <div className="text-gray-800 leading-relaxed mt-10">
        {activeTab && (
          <div className="grid gap-6">
            {(allcategory || []).filter(p => p.categname === activeTab)
              .map(pcate => (
                <div key={pcate._id} className="rounded-sm p-4">
                  <ClassbooksShow productCategory={pcate} />
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classbooks;