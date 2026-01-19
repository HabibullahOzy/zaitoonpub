import React, { useContext, useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { FaCartFlatbed } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import PdfOpenModal from '../BooksPdf/PdfOpenModal';
import axios from 'axios';
import Reviewgetform from '../../Review/ReviewTake/Reviewgetform';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import PSummer from './PSummer';
import Pspecifica from './Pspecifica';
import Pauthor from './Pauthor';
import { HiShare } from 'react-icons/hi';
import { PiArrowBendRightDownBold } from 'react-icons/pi';
// import { FcReading } from 'react-icons/fc'
// import { FaStar } from 'react-icons/fa';
// import CustomerReview from '../../Review/CustomerReview';
import img from '../../../../assets/wppBuy.png';
import './ProductsDetails.css';
import { FaShoppingBag } from 'react-icons/fa';
import BuyNowpdModa from './BuyNowpdModal/BuyNowpdModa';
import SharebookSocialModal from './ShareBook/SharebookSocialModal';
import RelatedPShow from './RelatedProducts/RelatedPShow';
import { FcOk } from 'react-icons/fc';
import { CheckCircleIcon } from 'lucide-react';

const ProductsDetails = () => {
    const { user, producD, setProducD, localDeviceId } = useContext(Zaitooncontext);
    const dataes = useLoaderData();
    const [modalOpen, setModalOpen] = useState(false);
    const [rating, setRating] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [reviewinfo, setReviewinfo] = useState()
    const [activeTab, setActiveTab] = useState('summary');
    const [redata, setRedata] = useState()
    // const navigate = useNavigate();




    const emaile = user?.email || localDeviceId()

    const queryClient = useQueryClient();

    const handleAddCart = async (id, offerPrice) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_backendurl}/products/${id}`)
            const email = emaile
            const nameeng = response?.data[0]?.nameeng
            const namebn = response?.data[0]?.namebn
            const namearb = response?.data[0]?.namearb
            const image = response?.data[0]?.image
            const productPrice = response?.data[0]?.productPrice
            const category = response?.data[0]?.category
            const ProductCode = response?.data[0]?.ProductCode
            const authorName = response?.data[0]?.authorName
            const edition = response?.data[0]?.edition
            const offer = offerPrice
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
                postDate,
                rating
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
                    if (infoe.acknowledged) {
                        toast.custom((t) => (
                            <div
                                className={`${t.visible ? "animate-custom-enter" : "animate-custom-leave"
                                    } max-w-md w-full bg-white shadow-lg rounded-xl pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                            >
                                <div className="flex-1 p-4">
                                    <div className="flex items-start">
                                        {/* ICON */}
                                        <div className="flex-shrink-0">
                                            <CheckCircleIcon className="h-10 w-10 text-green-500" />
                                        </div>

                                        {/* TEXT */}
                                        <div className="ml-3">
                                            <p className="text-sm font-semibold text-gray-900">
                                                Success
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Producte added to cart succesfully!!
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* CLOSE BUTTON */}
                                <div className="flex border-l border-gray-200">
                                    <button
                                        onClick={() => toast.dismiss(t.id)}
                                        className="px-4 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>
                        ));
                        queryClient.clear();
                        // navigate('/dashboard/allProducts')
                    } else {
                        toast.error("producte can't added please try again")
                    }
                })

        } catch (error) {
            console.error(error)
        }

    }



    const handleReview = (id, data) => {
        setReviewinfo(data)
        setShowModal(true)
    }



    // for Reting show section

    useEffect(() => {
        dataes?.map(async (info) => {
            const res = await axios.get(`${process.env.REACT_APP_backendurl}/review/${info?.ProductCode}`);
            setRedata(res.data)

        })
    }, [])

    const totalRatings = redata?.reduce((sum, rinfo) => sum + rinfo.rating, 0);
    const averageRating = redata?.length ? (totalRatings / redata.length) : 0;

    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 >= 0.5;
    const totalStars = 5;



    // Buy now purchase section

    const [showbuyModal, setShowbuyModal] = useState(false);
    const [buyNowProduct, setBuyNowProduct] = useState('');

    const openBuyNownPurchase = (produc) => {
        // if (!user) {
        //     toast.error("Please login first to buy now");
        //     return;
        // }

         // calculate total price
      const productsWithPrice = dataes.map((p) => {
        const finalPrice = p?.offerprice
          ? Math.round(Number(p.productPrice) - (Number(p.offerprice) * Number(p.productPrice)) / 100)
          : p.productPrice;

        return {
          price: finalPrice,
        };
      });

      const totalProductPrice = productsWithPrice.reduce(
        (sum, p) => sum + Number(p.price),
        0
      );

      const offer =totalProductPrice

        setShowbuyModal(true);
        setBuyNowProduct(produc, offer);
    }


    // Wish list section

    // const addpdWishList = async (product) => {
    //     if (!user) {
    //         toast.error("Please login first to add to wishlist");
    //         return;
    //     }

    //     const wishlistItem = {
    //         email: user?.email,
    //         product
    //     };

    //     try {
    //         const response = await fetch(`${process.env.REACT_APP_backendurl}/wishList`, {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify(wishlistItem)
    //         });

    //         const data = await response.json();
    //         if (data.acknowledged) {
    //             toast.success("Product added to wishlist successfully");
    //             navigate(`/wishList/${user?.email}`);
    //             // refetch();
    //         } else {
    //             toast.error("Failed to add product to wishlist");
    //         }
    //     } catch (error) {
    //         console.error("Error adding to wishlist:", error);
    //         toast.error("An error occurred while adding to wishlist");
    //     }
    // }


    // Share with social media section
    const [showShareModal, setShowShareModal] = useState(false);
    const [shareProduct, setShareProduct] = useState('');


    const handleShareProduct = (product) => {
        // if (!user) {
        //     toast.error("Please login first to share product");
        //     return;
        // }

        setShowShareModal(true);
        setShareProduct(product);
    }

    const [orderCou, setOrderCou] = useState()
    useEffect(() => {
        try {
            dataes?.map(async (info) => {
                const res = await axios.get(`${process.env.REACT_APP_backendurl}/ordercount/${info?.ProductCode}`);
                const orderCou = res.data
                setOrderCou(orderCou)

            })
        }
        catch (error) {

        }
    }, []);



    const email = user?.email || localDeviceId();

    //  Access queryClient
    //   const queryClient = useQueryClient();

    const { data: cartItems = [] } = useQuery({
        queryKey: ['cartItems', email],
        queryFn: async () => {
            const res = await fetch(`${process.env.REACT_APP_backendurl}/cashOnpurc/${email}`);
            return res.json();
        },
    });

    const cartMatch = cartItems?.map(cartit => cartit.ProductCode)


    return (
        <div className='grid '>
            {
                dataes?.map((data, i) => {

                    const offerPrice = data?.offerprice
                        ? Math.round(data.productPrice - (data.offerprice * data.productPrice) / 100)
                        : data.productPrice;
                    return (
                        <div className="text-black lg:w-10/12 md:w-10/12 w-full lg:mx-auto md:mx-auto p-5 mt-12 min-h-screen" key={i}>


                            <div className='lg:flex '>
                                <div className='lg:w-1/2 grid justify-center'>
                                    <button
                                        // onClick={() => document.getElementById('my_modal_3').showModal()}
                                        onClick={() => setModalOpen(true)} className="tooltip tooltip-success" data-tip="Read Some Demo pages একটু পড়ে দেখুন"
                                    >
                                        <figure className="border border-spacing-2 grid flex flex-grow shadow-md shadow-lime-400 border-emerald-400 p-5">
                                            <div className='flex text-center justify-center  text-yellow-500'>
                                                <p className=' font-semibold'>একটু পড়ে দেখুন </p> <div
                                                    style={{
                                                        display: "inline-block",
                                                        animation: "updown 1.5s ease-in-out infinite",
                                                    }}
                                                >
                                                    <PiArrowBendRightDownBold size={18} className='ml-2' />
                                                    <style>
                                                        {`
          @keyframes updown {
            0% { transform: translateY(-5px); }
            50% { transform: translateY(5px); }
            100% { transform: translateY(-5px); }
          }
        `}
                                                    </style>
                                                </div>
                                            </div>
                                            <img src={data.image} alt="" className='lg:w-80 object-contain transition-transform duration-300 hover:scale-105' />

                                        </figure>
                                    </button>
                                </div>

                                <div className='lg:w-1/2'>
                                    <div>
                                        <h1 className="font-semibold text-2xl p-2">{data.namebn} | {data.nameeng} | {data.namearb}</h1>

                                        {/* upper star rating */}

                                        <div className="flex items-center gap-1">
                                            {[...Array(totalStars)].map((_, index) => {
                                                if (index < fullStars) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="mask mask-star-2 bg-yellow-500 w-4 h-4"
                                                        />
                                                    );
                                                } else if (index === fullStars && halfStar) {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="relative w-6 h-6">
                                                            <div className="mask mask-star-2 bg-yellow-500 w-2 h-4 absolute left-0 top-0" />
                                                            <div className="mask mask-star-2 bg-gray-300 w-full h-full" />
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <div
                                                            key={index}
                                                            className="mask mask-star-2 bg-gray-300 w-4 h-4"
                                                        />
                                                    );
                                                }
                                            })}
                                            {/* <span className="text-sm text-gray-600 ml-2">({averageRating.toFixed(1)})</span> */}
                                        </div>


                                        {/* Upper star rating */}


                                    </div>


                                    <h1 className="flex justify-evently p-5">
                                        {data?.offerprice ? (
                                            <>
                                                <p className='text-xl font-semibold text-green-600 line-through' style={{ textDecorationColor: "red" }}>
                                                    Tk {data.productPrice}৳
                                                </p>
                                                <p className='text-2xl font-semibold text-red-400'>
                                                    Tk {offerPrice}৳
                                                </p>
                                            </>
                                        ) : (
                                            <p className='font-semibold text-xl text-green-600'>Tk {data?.productPrice}৳</p>
                                        )}
                                    </h1>


                                    <div className='flex gap-2'>
                                        <FcOk /> In Stock<>{
                                            orderCou?.totalQuantity ? <p className={`text-green-600 font-semibold ${(data?.quantity - orderCou?.totalQuantity) === 0 || (data?.quantity - orderCou?.totalQuantity) < 0 ? 'text-red-600' : ''}`}>{`${data?.quantity - orderCou?.totalQuantity}`}</p> : <p className='text-green-600 font-semibold'>{data?.quantity}</p>
                                        }</> + copies available
                                    </div>


                                    {/* products action button */}
                                    <div className=" p-2">

                                        {
                                            data?.state === "Previous" 
                                            ? <p className='text-red-700 font-semibold'>Out Of Stock</p> 
                                            : <div className='flex gap-5'>

                                            <button
                                                onClick={() => openBuyNownPurchase(data)}
                                                className="p-4 w-1/2 rounded-md bg-green-500 text-white flex items-center justify-center bounce-button"
                                            >
                                                <FaShoppingBag className="w-10" />
                                                অর্ডার করুন
                                            </button>


                                            {cartMatch?.some(c => c === data?.ProductCode) ? (
                                                <p className="p-2 w-1/2 bg-green-200 text-green-600 flex items-center justify-center font-semibold">
                                                    Added
                                                </p>
                                            ) : (
                                                <button
                                                    onClick={() => handleAddCart(data?._id, offerPrice)}
                                                    className="p-4 w-1/2 bg-green-600 rounded-md text-white flex items-center justify-center vibrate-button"
                                                >
                                                    <FaCartFlatbed className="w-8" />
                                                    কার্টে যোগ করুন
                                                </button>
                                            )}

                                        </div> 
                                        }


                                        {/* <button
                                                onClick={() => addpdWishList(data)}
                                                className="p-4 w-1/2 bg-green-50 text-green-500 flex items-center justify-center tooltip tooltip-success"
                                                data-tip="Add to Wishlist পছন্দের তালিকায় যুক্ত করুন"
                                            >
                                                <FaHeartCirclePlus className="w-10" />
                                            </button> */}

                                        <a
                                            href="https://wa.me/message/PARTY6QIOII2E1"
                                            target="_blank"
                                            className="p-4 mt-5 rounded-lg bg-green-700 text-white flex items-center justify-center swing-button"
                                        >
                                            <img src={img} className="w-5" />
                                            হোয়াটসঅ্যাপ এ অর্ডার করুন +8801748-806492
                                        </a>




                                        {/* <button onClick={() => document.getElementById('my_modal_3').showModal()} className="p-4 w-1/2 bg-green-500 text-white text-green-600 flex items-center justify-center tooltip tooltip-success" data-tip="Some Read একটু পড়ে দেখুন"><FcReading /></button> */}



                                        <button onClick={() => handleShareProduct(data)} className="p-4 mt-5 w-full rounded-lg bg-green-500 text-white text-green-600 flex items-center justify-center animate-pulse"><HiShare className='w-8' />
                                            বন্ধুদের সাথে শেয়ার করুন
                                        </button>

                                        {/* <button type="button" className="btn btn-outline btn-success shadow-md shadow-lime-400" ><FaCartFlatbed className='w-8' />Add to cart</button> */}

                                        {/* <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn btn-outline btn-sm btn-success shadow-md shadow-lime-400">Some Read</button> */}

                                    </div>

                                </div>
                            </div>



                            {/* Products Detaails section */}
                            <div className='bg-green-200 p-5 mt-10 shadow-xl shadow-lime-200 rounded-lg'>

                                <h1 className='text-xl font-semibold mb-6'>Product Specification</h1>
                                <div className="lg:flex md:flex grid grid-cols-1 gap-3 border-b pb-2 mb-4">
                                    <button
                                        onClick={() => setActiveTab('summary')}
                                        className={`pb-2 ${activeTab === 'summary' ? 'border-b-2 border-green-500 text-green-600 font-semibold' : 'text-gray-600'}`}
                                    >
                                        Summary
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('specification')}
                                        className={`pb-2 ${activeTab === 'specification' ? 'border-b-2 border-green-500 text-green-600 font-semibold' : 'text-gray-600'}`}
                                    >
                                        Specification
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('author')}
                                        className={`pb-2 ${activeTab === 'author' ? 'border-b-2 border-green-500 text-green-600 font-semibold' : 'text-gray-600'}`}
                                    >
                                        Author
                                    </button>
                                </div>

                                {/*specific products details show Tab Content */}
                                <div className="text-gray-800 leading-relaxed">
                                    {activeTab === 'summary' && <PSummer data={data} />}
                                    {activeTab === 'specification' && <Pspecifica data={data} />}
                                    {activeTab === 'author' && <Pauthor data={data} />}
                                </div>
                            </div>
                            <div className='mt-10'>
                                <RelatedPShow categorys={data?.category}></RelatedPShow>
                            </div>

                            {/* Products Review and Reting section */}
                            <div className='bg-green-200 p-5 mt-10 shadow-lg shadow-lime-200 rounded-lg '>

                                <h1 className='text-xl'>Review And Retings</h1>
                                <div className='flex justify-end'>

                                    {
                                        user ? <button className='btn btn-success btn-sm' onClick={() => handleReview(data?._id, data)}>
                                            review
                                        </button> : <div className='flex '><p className='text-xl'>Please at first login, then write review</p> <Link className='ml-5 text-sky-600 text-xl hover:font-semibold' to={'/signIn'}>Login</Link> </div>
                                    }
                                </div>
                                {/* star reting section start */}

                                <div className="flex items-center gap-1">
                                    {[...Array(totalStars)]?.map((_, index) => {
                                        if (index < fullStars) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="mask mask-star-2 bg-green-500 w-6 h-6"
                                                />
                                            );
                                        } else if (index === fullStars && halfStar) {
                                            return (
                                                <div
                                                    key={index}
                                                    className="relative w-6 h-6">
                                                    <div className="mask mask-star-2 bg-green-500 w-3 h-6 absolute left-0 top-0" />
                                                    <div className="mask mask-star-2 bg-gray-300 w-full h-full" />
                                                </div>
                                            );
                                        } else {
                                            return (
                                                <div
                                                    key={index}
                                                    className="mask mask-star-2 bg-gray-300 w-6 h-6"
                                                />
                                            );
                                        }
                                    })}
                                    <span className="text-sm text-gray-600 ml-2">({averageRating.toFixed(1)})</span>
                                </div>

                                {/* star rating section end  */}
                                <div className='flex'> <p>Total Review: {redata?.length}</p> ||

                                    <p>Total Rating: {totalRatings}</p></div>

                            </div>


                            {

                                setProducD(data)


                            }
                        </div>)
                }
                )
            }




            <PdfOpenModal pdf={producD.pdf} modalOpen={modalOpen}
                onClose={() => setModalOpen(false)}>

            </PdfOpenModal>




            {/* REview and Reting section */}
            {showModal && (
                <div className="modal modal-open ">

                    <div className="modal-box max-w-4xl bg-gre " style={{ backgroundColor: "#baefba" }}>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        {/* <CashOnpurch cartItems={modalData} /> */}

                        <Reviewgetform rdata={reviewinfo}></Reviewgetform>
                    </div>
                </div>
            )}



            {/* Buy Now Purchase Modal */}

            {showbuyModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl bg-green-50" style={{ backgroundColor: "#baefba" }}>
                        <div className="modal-action">
                            <button className="text-black" onClick={() => setShowbuyModal(false)}>✕</button>
                        </div>
                        <BuyNowpdModa dataes={buyNowProduct} />
                    </div>
                </div>
            )}


            {/* Book share Modal */}

            {showShareModal && (
                <div className="modal modal-open">
                    <div className="modal-box max-w-4xl bg-green-50" style={{ backgroundColor: "#baefba" }}>
                        <div className="modal-action">
                            <button className="btn" onClick={() => setShowShareModal(false)}>✕</button>
                        </div>
                        <SharebookSocialModal Shdataes={shareProduct} />
                    </div>
                </div>
            )}






        </div>
    );
};

export default ProductsDetails;