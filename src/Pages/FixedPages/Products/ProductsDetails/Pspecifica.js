import React from 'react';
import { FaBook, FaTag, FaLanguage, FaFileAlt, FaDollarSign, FaUser } from 'react-icons/fa';

const Pspecifica = ({ data }) => {
  const details = [
    { label: "Book Name", value: data.nameeng, icon: <FaBook className="text-blue-500" /> },
    { label: "Category", value: data.category, icon: <FaTag className="text-green-500" /> },
    { label: "Edition", value: data.edition, icon: <FaFileAlt className="text-yellow-500" /> },
    { label: "Language", value: data.language, icon: <FaLanguage className="text-purple-500" /> },
    { label: "Page", value: data.numberOfpage, icon: <FaFileAlt className="text-red-400" /> },
    { label: "Price", value: data.productPrice, icon: <FaDollarSign className="text-teal-500" /> },
    { label: "Author Name", value: data.authorName, icon: <FaUser className="text-pink-500" /> },
  ];

  return (
    <div className="max-w-3xl mx-auto shadow-xl rounded-xl overflow-hidden border border-gray-200 transition-transform hover:scale-105">
    
      <div className="divide-y divide-gray-200">
        {details.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-4 py-4 cursor-pointer transition-colors hover:bg-indigo-50 ${
              index % 2 === 0 ? 'bg-gray-50' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium text-gray-700">{item.label}:</span>
            </div>
            <span className="text-gray-900 font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pspecifica;
