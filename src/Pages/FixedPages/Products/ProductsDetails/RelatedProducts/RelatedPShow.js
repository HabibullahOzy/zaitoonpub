import React, { useContext, useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Card, Button } from 'flowbite-react';
import './Relatedshow.css';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Zaitooncontext } from '../../../../../SecureContext/ContextAuth';
import axios from 'axios';
import { FcViewDetails } from 'react-icons/fc';
import { FaCartFlatbed } from 'react-icons/fa6';

const RelatedPShow = ({ categorys }) => {
  const { user, producD, setProducD, localDeviceId } = useContext(Zaitooncontext);
  const [products, setProducts] = useState([]);
  const scrollRef = useRef(null);
  const backendURL = process.env.REACT_APP_backendurl;

  const { data: nursproduct = [], isLoading } = useQuery({
    queryKey: ['nursproduct', categorys],
    queryFn: async () => {
      const res = await fetch(`${backendURL}/categoryproducts/${categorys}`);
      return res.json();
    },
  });

  useEffect(() => {
    if (Array.isArray(nursproduct)) {
      const filtered = nursproduct.filter(p => p?.category === categorys);
      setProducts(filtered.slice(0, 20));
    }
  }, [nursproduct, categorys]);

  // Auto-scroll loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });

        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 5) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  const emaile = user?.email || localDeviceId()



  const handleAddCart = async (id) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_backendurl}/products/${id}`)
            const email = emaile
            console.log(email)
            const nameeng = response?.data[0]?.nameeng
            const namebn = response?.data[0]?.namebn
            const namearb = response?.data[0]?.namearb
            const image = response?.data[0]?.image
            const productPrice = response?.data[0]?.productPrice
            const category = response?.data[0]?.category
            const ProductCode = response?.data[0]?.ProductCode
            const authorName = response?.data[0]?.authorName
            const edition = response?.data[0]?.edition
            // const offer = offerPrice
            const offer = response?.data[0]?.offerprice
                        ? Math.round(response?.data[0]?.productPrice - (response?.data[0]?.offerprice * response?.data[0]?.productPrice) / 100)
                        : response?.data[0]?.productPrice;
            const postDate = response?.data[0]?.postDate


            const cartProducts = {
                id,
                email,
                offer,
                nameeng,
                namebn,
                namearb,
                image,
                productPrice,
                category,
                ProductCode,
                authorName,
                edition,
                postDate
            }
            fetch(`${process.env.REACT_APP_backendurl}/addedCart`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartProducts)
            })
                .then(res => res.json())
                .then(infoe => {
                    // console.log(infoe)
                    if (infoe.acknowledged) {
                        toast.success("Producte added to cart succesfully!!");
                        // navigate('/dashboard/allProducts')
                    } else {
                        toast.error("producte can't added please try again")
                    }
                })

        } catch (error) {
            console.log(error)
        }

    }

  return (
    <div className="relative py-10">
      <h2 className="text-2xl font-semibold  mb-6 text-gray-800">Related Products</h2>

      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="relative">
          {/* Arrow Buttons */}
          <button
            onClick={scrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <FaArrowLeft />
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow hover:bg-gray-100"
          >
            <FaArrowRight />
          </button>

          {/* Scrollable Product Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 no-scrollbar"
          > 
            {products.map((product) => (
              <div
                key={product._id}
                className="snap-start shrink-0 w-[85%] sm:w-[45%] md:w-[30%] lg:w-[22%] transition-all duration-300 grid grid-cols-1 place-items-center"
              >
                <Card
                  className="h-full flex flex-col justify-between border border-gray-200 shadow"
                >
                  <img
                    src={product.image}
                    alt={product.nameeng}
                    className="w-full object-cover mb-4 rounded-lg"
                  />
                  <div className="md:flex lg:flex xl:flex flex justify-center gap-2 mt-auto place-items-center hover:shadow-lg transition-shadow duration-300">
                    <button
                      onClick={() => window.open(`/products/${product?._id}`, '_blank')}
                      className="px-8 py-2 tooltip rounded-full bg-green-400 hover:bg-green-600 text-white tooltip-top tooltip-success"
                      data-tip="Show Details"
                    >
                      <FcViewDetails className="w-5 h-5" />
                    </button>



                    <button
                    onClick={() => handleAddCart(product?._id)}
                    className='px-8 py-2 rounded-full bg-green-500 hover:bg-green-700 text-white tooltip tooltip-top tooltip-success' data-tip="Add to Cart"> <FaCartFlatbed className="w-8" /></button>
                  </div>
                  <h5 className="text-md font-bold text-gray-900 text-center">{product.nameeng}</h5>
                  <p className="text-green-700 text-sm text-center font-semibold">
                    ৳ {product.productPrice}
                  </p>
                  {/* <p className="text-xs text-center">
                    {Number(product.quantity) === 0 ? (
                      <span className="text-red-500 font-semibold">OUT OF STOCK</span>
                    ) : Number(product.quantity) <= 10 ? (
                      <span className="text-yellow-500 font-semibold">LOW STOCK</span>
                    ) : (
                      <span className="text-green-600 font-semibold">IN STOCK</span>
                    )}
                  </p> */}

                </Card>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RelatedPShow;