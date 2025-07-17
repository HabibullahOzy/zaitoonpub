import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Successmassag = () => {

    const { tranId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        // Here you could call your backend to confirm the payment with `tran_id`
        // Or just show success message and redirect after a few seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="text-center p-10 min-h-screen flex flex-col items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-8 max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-green-600">🎉 Payment Successful!</h1>
            <p className='text-xl font-semibold text-green-400'>TranjectionId: {tranId}</p>
            <p className="mt-4">Thank you for your purchase.</p>
            <p className="mt-2 text-gray-500">You will be redirected shortly...</p>
            </div>
        </div>
    );
};

export default Successmassag;