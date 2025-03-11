import React, { useContext } from 'react';
import { Zaitooncontext } from '../../SecureContext/ContextAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from 'firebase/auth';

const SignUP = () => {
    const { user, createUserWithEP, signInwithGoogle } = useContext(Zaitooncontext);
    console.log(user)

    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const provider = new GoogleAuthProvider();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const createuser = (data) => {
        const email = data.email;
        const password = data.password
        createUserWithEP(email, password)
        .then((result)=>{
            const results =result.user;
            toast.success("Successfully Login Complited");
            navigate(from, {replace: true})
        })
    }

    const handlegoogleLogin = () => {
        signInwithGoogle(provider)
        .then((result)=>{
            const credential = GoogleAuthProvider.credentialFromResult(result);
            console.log(credential)
            toast.success("Login successfully")
        })
        .catch((error)=>{

        })
        
    }
    return (
        <div className="backImage" style={{ fontFamily: 'Georgia, serif', fontSize: '20px', }}>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-white mb-5">Sign Up</h1>
                    </div>
                    <div className="card flex-shrink-0  shadow-2xl" style={{ backgroundImage: 'linear-gradient(to right, green, rgb(215, 215, 141))' }}>
                        <form onSubmit={handleSubmit(createuser)} className="card-body">

                            {/* Name section start */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", {
                                    // required: "Name is required",
                                    minLength: { value: 4, message: "name mustbe meningfull" }
                                })} placeholder="Please Enter Your Name" className="input input-bordered" />
                                {
                                    errors.name && <p className='text-red-500'>{errors.name?.message}</p>
                                }
                            </div>

                            {/* Photo Section start */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo URL</span>
                                </label>
                                <input {...register("image")} type='file' placeholder="Please Enter Image" className="input input-bordered" />
                            </div>

                            {/* Email section start */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input {...register("email")} type="email" placeholder="Please Enter Your Email Address" className="input input-bordered" />
                            </div>

                            {/* Password section start */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input {...register("password")} type="password" placeholder="******" className="input input-bordered" />

                                {/* Select Type of Users */}
                                {/* <div className="form-control">
                                    <div className="input-group grid">
                                        <label className="label">
                                            <span className="">Chosse Type</span>
                                        </label>
                                        <select {...register("type")} className="select select-bordered">
                                            <option>Pick category</option>
                                            <option>Seller</option>
                                            <option>User</option>
                                        </select>

                                    </div>
                                </div> */}
                                {/* Select Type of Users */}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-success">Signup</button>
                                <Toaster />
                            </div>
                        </form>

                        <div className='text-center'>
                            <button onClick={handlegoogleLogin}><FcGoogle /></button>
                            {/* <button onClick={""} className='ml-3 text-sky-500'><AiFillGithub /></button> */}
                        </div>

                        <p className='text-center mb-5 text-black'>Alredy you have an account <Link to={'/signIn'} className='text-blue-500'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUP;