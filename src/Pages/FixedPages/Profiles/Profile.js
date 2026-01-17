import React, { useContext } from 'react';
import { Zaitooncontext } from '../../../SecureContext/ContextAuth';
import { useQuery } from '@tanstack/react-query';
import InstRequestHistory from '../Purchages/InstitutionalOrder/InstRequestShowinProfile/InstRequestHistory';

const Profile = () => {
    const { user } = useContext(Zaitooncontext);

    const {
        data: instOrdersHist = [],
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['instOrdersHist', user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await fetch(
                `${process.env.REACT_APP_backendurl}/institutorder/${user?.email}`
            );
            return res.json();
        },
    });

    return (
        <div className="max-w-6xl mx-auto px-4 py-10 min-h-screen">
            {/* ===== Profile Card ===== */}
            <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col md:flex-row gap-6 items-center">
                <img
                    src={user?.photoURL}
                    alt="Profile"
                    className="w-32 h-32 rounded-full border-4 border-gray-100 object-cover"
                />

                <div className="flex-1 space-y-2">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {user?.displayName}
                    </h2>

                    <p className="text-gray-600">
                        <span className="font-semibold">Email:</span> {user?.email}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Account Created:</span>{' '}
                        {user?.metadata?.creationTime}
                    </p>

                    <p className="text-gray-600">
                        <span className="font-semibold">Last Login:</span>{' '}
                        {user?.metadata?.lastSignInTime}
                    </p>
                </div>
            </div>

            {/* ===== Institutional Requests Section ===== */}
            {
                !isLoading && instOrdersHist.length === 0 ? " " : <div className="mt-10">

                {/* Loading */}
                {isLoading && (
                    <div className="bg-white rounded-lg p-6 text-center shadow">
                        <span className="loading loading-spinner loading-md"></span>
                        <p className="mt-2 text-gray-500">Loading your requests...</p>
                    </div>
                )}

                {/* Error */}
                {isError && (
                    <div className="bg-red-50 text-red-600 p-5 rounded-lg">
                        Failed to load institutional requests.
                    </div>
                )}

                {/* Empty State */}
                {!isLoading && instOrdersHist.length === 0 && (
                    <div className="bg-gray-50 border border-dashed rounded-xl p-10 text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/4076/4076508.png"
                            alt="No Orders"
                            className="w-24 mx-auto mb-4 opacity-70"
                        />
                        <h4 className="text-lg font-semibold text-gray-700">
                            No Institutional Orders Found
                        </h4>
                        <p className="text-gray-500 mt-2">
                            You haven’t submitted any institutional order requests yet.
                        </p>
                    </div>
                )}

                {/* Data Exists */}
                {!isLoading && instOrdersHist.length > 0 && (
                    <InstRequestHistory instOrdersHist={instOrdersHist} />
                )}
            </div>
            }
        </div>
    );
};

export default Profile;
