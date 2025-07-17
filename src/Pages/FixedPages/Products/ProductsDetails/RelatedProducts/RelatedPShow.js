
// import React, { useState, useEffect } from 'react';
// import { Button } from 'primereact/button';
// import { Carousel } from 'primereact/carousel';
// import { Tag } from 'primereact/tag';
// import { useQuery } from '@tanstack/react-query';

// const RelatedPShow = ({categorys}) => {

// const category = categorys || 'KG';

//   const { data: relatedProducts = [], isLoading } = useQuery({
//     queryKey: ['relatedProducts', category],
//     queryFn: async () => {
//       const res = await fetch(`${process.env.REACT_APP_backendurl}/categoryproducts/${category}`);
//       if (!res.ok) throw new Error('Network response was not ok');
//       return res.json();
//     },
//   });


//   // Responsive carousel options
//   const responsiveOptions = [
//     { breakpoint: '1400px', numVisible: 4, numScroll: 1 },
//     { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
//     { breakpoint: '767px', numVisible: 2, numScroll: 1 },
//     { breakpoint: '575px', numVisible: 1, numScroll: 1 },
//   ];

//   // Stock status
//   const getSeverity = (product) => {
//     const quantity = parseInt(product.quantity);
//     if (quantity > 20) return 'success';
//     if (quantity > 0) return 'warning';
//     return 'danger';
//   };

//   // Product card template
//   const productTemplate = (product) => (
//     <div className="bg-white border rounded-2xl shadow hover:shadow-md transition duration-300 overflow-hidden flex flex-col items-center text-center p-4 h-full">
//       <img
//         src={product.image}
//         alt={product.nameeng}
//         className="h-48 w-auto object-contain mb-4"
//       />
//       <h4 className="text-lg font-semibold text-gray-800 mb-1">{product.nameeng}</h4>
//       <p className="text-sm text-gray-500 mb-2">{product.authorName}</p>
//       <h6 className="text-xl font-bold text-green-600 mb-2">৳ {product.productPrice}</h6>
//       <Tag value={product.quantity > 0 ? 'In Stock' : 'Out of Stock'} severity={getSeverity(product)} className="mb-3" />
//       <div className="flex gap-3 mt-auto">
//         <Button icon="pi pi-search" className="p-button-rounded p-button-info" />
//         <Button icon="pi pi-heart-fill" className="p-button-rounded p-button-warning" />
//       </div>
//     </div>
//   );

//   if (isLoading) return <div className="text-center py-10">Loading related products...</div>;

//   return (
//     <div className="my-8 px-2 md:px-8">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Related Products</h2>
//       <Carousel
//         value={relatedProducts}
//         numVisible={4}
//         numScroll={1}
//         responsiveOptions={responsiveOptions}
//         itemTemplate={productTemplate}
//         circular
//         autoplayInterval={4000}
//         className="custom-carousel"
//       />
//     </div>
//   );
// };

  
// export default RelatedPShow;
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Carousel } from 'primereact/carousel';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';

const RelatedPShow = ({ categorys }) => {
  const [products, setProducts] = useState([]);

  const relcategory = categorys;
  console.log(relcategory, "categoryName in RelatedPShow");

  // Fetching related products from API
  const { data: nursproduct = [], isLoading } = useQuery({
    queryKey: ['nursproduct', relcategory],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/categoryproducts/${relcategory}`);
      return res.json();
    },
  });

  useEffect(() => {
    if (Array.isArray(nursproduct)) {
      // Optional: filter by category match
      const filtered = nursproduct.filter((item) => item?.category === relcategory);
      setProducts(filtered.slice(0, 9)); // show max 9
    } else {
      console.warn('Invalid data format for nursproduct:', nursproduct);
      setProducts([]);
    }
  }, [nursproduct]);

  const responsiveOptions = [
    { breakpoint: '1400px', numVisible: 2, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 3, numScroll: 1 },
    { breakpoint: '767px', numVisible: 2, numScroll: 1 },
    { breakpoint: '575px', numVisible: 1, numScroll: 1 },
  ];

  const getSeverity = (product) => {
    if (Number(product.quantity) === 0) return 'danger';
    if (Number(product.quantity) <= 10) return 'warning';
    return 'success';
  };

  const productTemplate = (product) => {
    return (
      <div className="border-1 bg-slate-100 surface-border border-round m-2 text-center py-5 px-3">
        <div className="mb-3">
          <img
            src={product.image}
            alt={product.nameeng}
            className="w-64 h-40 object-contain shadow-2 mx-auto"
          />
        </div>
        <div>
          <h4 className="mb-1">{product.nameeng}</h4>
          <h6 className="mt-0 mb-3">৳ {product.productPrice}</h6>
          <Tag
            value={
              Number(product.quantity) === 0
                ? 'OUT OF STOCK'
                : Number(product.quantity) <= 10
                ? 'LOW STOCK'
                : 'IN STOCK'
            }
            severity={getSeverity(product)}
          />
          <div className="mt-5 flex  flex-wrap gap-2 justify-content-center align-items-center">
            <Button icon="pi pi-star-fill" className="p-button-success p-button-rounded bg-green-600 px-2">Buy now</Button>
            <Button icon="pi pi-search" className="p-button p-button-rounded bg-green-600 px-2" >Add to cart</Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      {isLoading ? (
        <p>Loading related products...</p>
      ) : products.length > 0 ? (
        <Carousel
          value={products}
          numVisible={3}
          numScroll={2}
          responsiveOptions={responsiveOptions}
          className="custom-carousel"
          // circular
          autoplayInterval={5000}
          itemTemplate={productTemplate}
        />
      ) : (
        <p className="text-center text-gray-500">No related products found.</p>
      )}
    </div>
  );
};

export default RelatedPShow;