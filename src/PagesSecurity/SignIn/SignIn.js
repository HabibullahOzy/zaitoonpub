import React, { use, useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zaitooncontext } from '../../SecureContext/ContextAuth';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from 'firebase/auth';
import useAdmin from '../../hooks/adminHooks/useAdmin';
import useSuperAdmin from '../../hooks/superAdmin/superAdmin';
import { useQuery } from '@tanstack/react-query';
import { PiPhonePlusFill } from 'react-icons/pi';

import axios from 'axios';
import { t } from 'i18next';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
// import toast from 'react-hot-toast';

const SignIn = () => {
    const provider = new GoogleAuthProvider();
    const { user, loginWithEP, signInwithGoogle, setLoader } = useContext(Zaitooncontext)
    const navigate = useNavigate();
    const location = useLocation();

    const [showPassword, setShowPassword] = useState(false);

    const [isAdmin] = useAdmin(user?.email);

    const [isSuperAdmin] = useSuperAdmin(user?.email);

    // console.log(user?.email, isAdmin, isSuperAdmin)

    const from = location.state?.from?.pathname || "/";

    // const { data: users = [], refetch } = useQuery({
    //     queryKey: ['users'],
    //     queryFn: async () => {
    //         const res = await fetch(`${process.env.REACT_APP_backendurl}/usersing/${user?.email}`);
    //         const data = await res.json();
    //         return data;
    //     }
    // });


    const [users, setUsers] = useState();
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${process.env.REACT_APP_backendurl}/usersing/${user?.email}`);
                setUsers(res.data);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        };

        // Call the async function
        if (user?.email) {
            fetchUser();
        }
    }, [user?.email]);

    // console.log(users)

    const { register, handleSubmit, formState: { errors } } = useForm();

    const loginHandle = (data) => {
        const email = data.email;
        const password = data.password;

        loginWithEP(email, password)
            .then((results) => {
                // console.log(results.user)
                toast.success("Successfully Login Complited")
                // { isAdmin === '' && <p className='text-red-500'>You are not an admin</p> }

                // Don't run until user info is available

                const timer = setTimeout(() => {
                    if (isAdmin || isSuperAdmin) {
                        navigate('/dashboard');
                    } else {
                        navigate(from, { replace: true });
                    }
                }, 3000); // Delay before navigating

                return () => clearTimeout(timer);


                // {
                //     users?.role === "admin" && navigate('/dashboard', { replace: true });
                //     users?.role === "superadmin" && navigate('/dashboard', { replace: true });
                //     !isAdmin && !isSuperAdmin &&
                // }
            })
            .catch((error) => {
                // console.log(error.message)
                toast.error("Please Enter Currect Email & password", error.message)
            })

    }


    const handlegoogleLogin = () => {
        signInwithGoogle(provider)
            .then((result) => {
                // console.log(result.user)
                toast.success("Successfully Login Complited")
                navigate(from, { replace: true })
            })
            .catch((error) => {
                // console.log(error)
                toast.error(error)
            })
    }

    return (
        <div>
            <div className="hero min-h-screen">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-black mb-5">Login now</h1>
                    </div>
                    <div className="card flex-shrink-0  shadow-md shadow-lime-300 lg:w-96 md:w-96" style={{ backgroundColor: "rgb(186, 239, 186)" }}>
                        <form onSubmit={handleSubmit(loginHandle)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-sm text-black">Email</span>
                                </label>
                                <input type="email" {...register("email", {
                                    required: "Required",
                                    massage: "Email is not properly used"
                                })} placeholder="please enter your email address" className="input input-bordered shadow-lg shadow-slate-100" />
                                {errors.email && errors.email.message}
                            </div>
                            <div className="form-control relative">
                                <label className="label">
                                    <span className="label-text font-semibold text-black">Password</span>
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password", {
                                            required: "Required",
                                            message: "Password must be minimum length six characters",
                                            minLength: { value: 6, message: "Minimum 6 characters required" }
                                        })}
                                        placeholder="Please enter password"
                                        className="input input-bordered shadow-lg shadow-slate-100 w-full pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-2 flex items-center text-gray-500"
                                    >
                                        {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p className="text-red-500">{errors.password.message}</p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover text-black">Forgot password?</a>
                                </label>
                            </div>



                            <div className="form-control mt-6">
                                <button className="btn btn-success">Login</button>
                            </div>
                        </form>

                        <div className='text-center'>
                            <button onClick={handlegoogleLogin}><FcGoogle className='text-2xl'/></button>
                            <button  className='ml-3 text-sky-500'><PiPhonePlusFill className='text-2xl'/></button>
                        
                        </div>

                        <p className='text-center mb-5 text-black'>If you do not have an account  <Link to={'/signUp'} className='text-blue-500'>Signup</Link></p>
                    </div>
                </div>
            </div>
            <Toaster></Toaster>
        </div>
    );
};

export default SignIn;