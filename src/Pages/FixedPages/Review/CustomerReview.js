import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/effect-cards';

import './CustomerReview.css';

import { Autoplay, EffectCards, Navigation, Pagination } from 'swiper/modules';

const CustomerReview = () => {
    return (
        <div>
            <h1 className='text-center text-2xl text-black font-semibold mt-10 pb-10'>Customer Feedback</h1>
            <Swiper
                effect={'cards'}
                grabCursor={true}
                // centeredSlides={true}
                modules={[EffectCards, Autoplay, Pagination, Navigation]}
                autoplay={{
                    delay: 5500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                className="mySwiper"
            ><SwiperSlide><div className="card w-96">
                <div className="card-body">

                    <div className=" flex justify-between">
                        <div className="avatar mask mask-hexagon w-28 ">
                            <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" />
                        </div>
                        <div className='pl-3'>
                            <p className='text-sm font-semibold'>Md. Hassan Mahmud</p>
                            <p className='text-gray-500'>Engineer</p>
                        </div>
                    </div>

                    <p className='text-sm'>"Zaitoon Publication stands out as a trusted name in the world of educational books. Their collection is well-curated, offering a broad spectrum of subjects that cater to students, teachers, and lifelong learners alike. The content is well-researched and tailored to meet the needs of modern education. !!!"</p>

                </div>
            </div>
            </SwiperSlide>


                <SwiperSlide>
                    <div className="card ">
                        <div className="card-body">

                            <div className=" flex justify-between">
                                <div className="mask mask-hexagon w-28">
                                    <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" />
                                </div>
                                <div className='pl-3'>
                                    <p className='text-sm font-semibold'>Md. Imam Hassan</p>
                                    <p className='text-gray-500'>graphics Designer</p>
                                </div>
                            </div>

                            <p className='text-sm'>"Each book is meticulously designed with a focus on clarity, ease of understanding, and accessibility, making learning a more enriching experience. !!!"</p>

                        </div>
                    </div>
                </SwiperSlide>


                <SwiperSlide><div className="card">
                    <div className="card-body">

                        <div className=" flex justify-between">
                            <div className="mask mask-hexagon w-28">
                                <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" />
                            </div>
                            <div className='pl-3'>
                                <p className='text-sm font-semibold'>Md. Emran Hosain</p>
                                <p className='text-gray-500'>Teacher</p>
                            </div>
                        </div>

                        <p className='text-sm'>"Zaitoon Publication has proven time and again that they are committed to providing high-quality educational resources that are both valuable and impactful. !!!"</p>

                    </div>
                </div></SwiperSlide>
                <SwiperSlide><div className="card">
                    <div className="card-body">

                        <div className=" flex justify-between">
                            <div className="mask mask-hexagon w-28">
                                <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" />
                            </div>
                            <div className='pl-3'>
                                <p className='text-sm font-semibold'>Md. Mahmudul Hassan</p>
                                <p className='text-gray-500'>Employee</p>
                            </div>
                        </div>

                        <p className='text-sm'>"যাইতুন পাবলিকেশন" বই প্রকাশনার জগতে একটি বিশ্বস্ত নাম। তাদের প্রকাশনা সমূহ অত্যন্ত চমৎকারভাবে সাজানো, যা ছাত্রছাত্রী, শিক্ষক এবং অন্যান্য সকল পাঠকের জন্যই উপযুক্ত।  !!!"</p>

                    </div>
                </div>
                </SwiperSlide>


                <SwiperSlide><div className="card">
                    <div className="card-body">

                        <div className=" flex justify-between">
                            <div className="mask mask-hexagon w-28">
                                <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" />
                            </div>
                            <div className='pl-3'>
                                <p className='text-sm font-semibold'>Md. Akram Mahmud</p>
                                <p className='text-gray-500'>Fashion Designer</p>
                            </div>
                        </div>

                        <p className='text-sm'>" "যাইতুন পাবলিকেশন" বারবার প্রমাণ করেছে যে তারা উচ্চমানের শিক্ষামূলক উৎস ও উপকরণ সরবরাহে প্রতিশ্রুতিবদ্ধ, যা সকল পাঠক এবং শিক্ষার্থীদের জন্য অত্যন্ত উপকারী এবং  ফলপ্রসূ। !!!"</p>

                    </div>
                </div>
                </SwiperSlide>



                <SwiperSlide><div className="card ">
                    <div className="card-body">

                        <div className=" flex justify-between">
                            <div className="mask mask-hexagon w-28">
                                <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" />
                            </div>
                            <div className='pl-3'>
                                <p className='text-sm font-semibold'>Md. Akibul Islam</p>
                                <p className='text-gray-500'>Lecturer</p>
                            </div>
                        </div>

                        <p className='text-sm'>"Designed specifically for the Play Group level, the book is filled with vibrant illustrations and engaging content that makes learning the Arabic letters fun and interactive. !!!"</p>

                    </div>
                </div>
                </SwiperSlide>


                <SwiperSlide><div className="card ">
                    <div className="card-body">

                        <div className=" flex justify-between">
                            <div className="mask mask-hexagon w-28">
                                <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" />
                            </div>
                            <div className='pl-3'>
                                <p className='text-sm font-semibold'>Md. Rakib Munsi</p>
                                <p className='text-gray-500'>Designer</p>
                            </div>
                        </div>

                        <p className='text-sm'>"Al-Huruf Al-Arabiyyah for Play Group" by Dr. Muhammad Aminul Hoque, published by Zaitoon Publication, is an excellent introduction to the Arabic alphabet for young learners. !!!"</p>

                    </div>
                </div>
                </SwiperSlide>


                <SwiperSlide><div className="card ">
                    <div className="card-body">

                        <div className=" flex justify-between">
                            <div className="mask mask-hexagon w-28">
                                <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" />
                            </div>
                            <div className='pl-3'>
                                <p className='text-sm font-semibold'>Md. Tawhid Ahmed</p>
                                <p className='text-gray-500'>IT Expart</p>
                            </div>
                        </div>

                        <p className='text-sm'>"বইগুলোর বিষয়বস্তু যথাযথভাবে গবেষিত, তথ্যপূর্ণ এবং আধুনিক শিক্ষার প্রয়োজনীয়তা পূরণে সহায়ক। প্রতিটি বই সুনিপুণভাবে ডিজাইন করা, যাতে বিষয়বস্তু পরিষ্কার, সহজবোধ্য এবং সহজে পাঠযোগ্য হয়, ফলে শেখার অভিজ্ঞতা আরও সমৃদ্ধ হয়।  !!!"</p>

                    </div>
                </div>
                </SwiperSlide>



                <SwiperSlide><div className="card ">
                    <div className="card-body">

                        <div className=" flex justify-between">
                            <div className="mask mask-hexagon w-28">
                                <img src="https://cdn1.iconfinder.com/data/icons/user-pictures/101/malecostume-512.png" />
                            </div>
                            <div className='pl-3'>
                                <p className='text-sm font-semibold'>Md. Maruf Hassan</p>
                                <p className='text-gray-500'>Student</p>
                            </div>
                        </div>

                        <p className='text-sm'>"Dr. Hoque’s approach is both educational and entertaining, ensuring that children not only learn the shapes and sounds of the Arabic letters but also develop a love for the language. !!!"</p>

                    </div>
                </div></SwiperSlide>
            </Swiper>
        </div>
    );
};

export default CustomerReview;