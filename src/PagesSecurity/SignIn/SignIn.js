import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Zaitooncontext } from '../../SecureContext/ContextAuth';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from 'firebase/auth';
// import toast from 'react-hot-toast';

const SignIn = () => {
    const provider = new GoogleAuthProvider();

    const navigate = useNavigate();
    const location = useLocation();

    const { user, loginWithEP, signInwithGoogle } = useContext(Zaitooncontext)

    const from = location.state?.from?.pathname || "/";

    const { register, handleSubmit, formState: { errors } } = useForm();

    const loginHandle = (data) => {
        const email = data.email;
        const password = data.password;

        loginWithEP(email, password)
            .then((results) => {
                console.log(results.user)
                toast.success("Successfully Login Complited")
                navigate(from, { replace: true})
            })
            .catch((error) => {
                console.log(error)
            })

    }


    const handlegoogleLogin=()=>{
        signInwithGoogle(provider)
        .then((result)=>{
            console.log(result.user)
            toast.success("Successfully Login Complited")
            navigate(from, {replace: true})
        })
        .catch((error)=>{
            console.log(error)
            toast.error(error)
        })
    }

    return (
        <div>
            <div className="hero min-h-screen" style={{backgroundImage: `url()`}}>
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold text-black mb-5">Login now</h1>
                    </div>
                    <div className="card flex-shrink-0  shadow-md shadow-lime-300 w-96" style={{backgroundColor:"rgb(186, 239, 186)"}}>
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
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text font-semibold text-black">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: "Required",
                                    massage: "Password mustbe minimum length six charecter",
                                    minLength: { value: 6 }
                                })} placeholder="please enter password" className="input input-bordered shadow-lg shadow-slate-100" />
                                {errors.password && <p className='text-red-500 '>{errors.password.message}</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover text-black">Forgot password?</a>
                                </label>
                            </div>


                            
                            <div className="form-control mt-6">
                                <button className="btn btn-success">Login</button>
                            </div>
                        </form>

                        <div className='text-center'>
                            <button onClick={handlegoogleLogin}><FcGoogle /></button>
                            {/* <button onClick={handleGithubLogIn} className='ml-3 text-sky-500'><AiFillGithub /></button> */}
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