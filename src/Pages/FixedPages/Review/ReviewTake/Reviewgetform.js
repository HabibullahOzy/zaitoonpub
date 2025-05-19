import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaStar } from 'react-icons/fa';


const Reviewgetform = ({ rdata }) => {

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);

    const reviewData = rdata;
    console.log(reviewData)

    const onSubmit = async (data) => {
        console.log(data, rating)
        const rname = data.rname
        const dreview = data.dreview
        const pdata = reviewData._id
        const pdatacode = reviewData?.productCode
        const review = {
            dreview,
            rname,
            pdatacode,
            pdata,
            rating,
            date: new Date().toISOString("en-BD", {
                timeZone: "Asia/Dhaka",
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "2-digit",
                second: "2-digit",
                hour12: true,
            }),
        };



        const response = await axios.post(`http://localhost:5000/review`, review)
        console.log(response)
        if (response?.data?.insertedId) {
            toast.success("Review successfully added!!")
            reset();
            setRating(0);
        }else{
            toast.error("Review NOT adeed, Please try again")
        }

    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 rounded-2xl shadow-lg space-y-4">
            <h2 className="text-xl font-semibold mb-2">Leave a Product Review</h2>

            {/* Star Rating */}
            <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    return (
                        <label key={starValue}>
                            <input
                                type="radio"
                                name="rating"
                                value={starValue}
                                className="hidden"
                                onClick={() => setRating(starValue)}
                            />
                            <FaStar
                                className={`cursor-pointer transition-colors ${starValue <= (hover || rating) ? 'text-yellow-400' : 'text-gray-300'
                                    }`}
                                size={24}
                                onMouseEnter={() => setHover(starValue)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    );
                })}
            </div>

            {rating === 0 && <p className="text-red-500 text-sm">Please select a rating.</p>}



            <div className="container mt-8">
                <input required type="text" {...register("rname", { required: true })} className="input"></input>
                <label className="label">Name</label>
            </div>

            {/* Review Text */}
            <div className='container'>
                <textarea
                    {...register("dreview", { required: "Review cannot be empty" })}
                    className="w-full border border-gray-300 rounded-lg p-3 resize-none"
                    rows="4"
                    placeholder="Write your review here..."
                />

            </div>
            {errors.review && <p className="text-red-500 text-sm">{errors.review.message}</p>}


            {/* Submit Button */}
            <button
                type="submit"
                disabled={rating === 0}
                className="w-full bg-green-200 hover:bg-green-400 text-white py-2 rounded-lg transition"
            >
                Submit Review
            </button>
        </form>
    );
};

export default Reviewgetform;