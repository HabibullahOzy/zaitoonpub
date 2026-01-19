import React, { useEffect, useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import ClassbooksShow from './ClassbooksShow';

const Classbooks = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [activeSub, setActiveSub] = useState(null);

  const { data: allcategory = [], isLoading } = useQuery({
    queryKey: ['allcategory'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/category`);
      return res.json();
    }
  });

  /* ===========================
     Unique Category Names
  ============================ */
  const categories = useMemo(() => {
    return [...new Set(allcategory?.map(c => c.categname))];
  }, [allcategory]);

  /* ===========================
     Auto select first category
  ============================ */
  useEffect(() => {
    if (categories.length && !activeCategory) {
      setActiveCategory(categories[0]);
    }
  }, [categories, activeCategory]);

  /* ===========================
     Get active category object
  ============================ */
  const activeCategoryData = allcategory.find(
    c => c.categname === activeCategory
  );

  /* ===========================
     Subcategories list
  ============================ */
  const subcategories = useMemo(() => {
    if (!activeCategoryData?.subcategories) return [];
    return activeCategoryData.subcategories
      .split(',')
      ?.map(s => s.trim())
      .filter(s => s && s !== 'stationery');
  }, [activeCategoryData]);

  /* ===========================
     Auto select first subcategory
  ============================ */
  useEffect(() => {
    if (subcategories.length && !activeSub) {
      setActiveSub(subcategories[0]);
    }
  }, [subcategories, activeSub]);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="mt-11 lg:w-10/12 p-2 mx-auto">

      {/* ================= CATEGORY TABS ================= */}
      {/* <div className="flex justify-center flex-wrap gap-6 mt-10">
        {categories?.map((cat, i) => (
          <button
            key={i}
            onClick={() => {
              setActiveCategory(cat);
              setActiveSub(null);
            }}
            className={`px-6 py-2 rounded-full shadow-md
              ${activeCategory === cat
                ? 'bg-green-600 text-white'
                : 'bg-gray-200 text-gray-700'}`}
          >
            {cat}
          </button>
        ))}
      </div> */}

      {/* ================= SUBCATEGORY BUTTONS ================= */}
      <div className="flex justify-center mt-12 flex-wrap gap-8">
        {subcategories?.map((sub, i) => (
          <div key={i} className="relative group">

            {/* Tooltip */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
              <div className="animate-bounce text-orange-400 font-bold">
                {sub}
              </div>
            </div>

            {/* Button */}
            {/* <button
              onClick={() => setActiveSub(sub)}
              className={`pb-2 w-24 rounded-full shadow-lg
                ${activeSub === sub
                  ? 'border-b-2 border-green-500 shadow-green-400'
                  : 'shadow-gray-300'}`}
            >
              <img
                src=""
                alt={sub}
                className="rounded-full w-20 h-20 object-cover mx-auto"
              />
            </button> */}
            <button
              onClick={() => setActiveSub(sub)}
              className={`px-6 py-2 rounded-full shadow-md text-lg text-black
                ${activeSub === sub
                  ? 'border-b-2 border-green-500 shadow-green-400'
                  : 'shadow-gray-300'}`}
            >
              {sub}
            </button>
          </div>
        ))}
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="mt-12">
        {activeSub && (
          <ClassbooksShow productCategory={activeSub} />
        )}
      </div>

    </div>
  );
};

export default Classbooks;
