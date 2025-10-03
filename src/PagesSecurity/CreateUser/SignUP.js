import React, { useContext } from 'react';
import { Zaitooncontext } from '../../SecureContext/ContextAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';
import { PiPhonePlusFill } from 'react-icons/pi';

const SignUP = () => {
    const { user, createUserWithEP, addedUpdateUser, signInwithGoogle } = useContext(Zaitooncontext);


    const navigate = useNavigate();
    const location = useLocation();
    // const form =useForm();

    const from = location.state?.from?.pathname || "/";

    const provider = new GoogleAuthProvider();
    const imageHostKey = process.env.REACT_APP_imgbbhostkey;

    const { register, handleSubmit, formState: { errors } } = useForm();

    const createuser = async (data) => {
        const image = data.image[0];

        const formData = new FormData();
        formData.append('image', image);
        fetch(`https://api.imgbb.com/1/upload?key=${imageHostKey}`, {
            method: 'POST',
            body: formData,
        })
            .then(res => res.json())
            .then(fact => {
                const image = fact.data.url;
                const email = data.email;
                const password = data.password;

                createUserWithEP(email, password)

                    .then((result) => {
                        const user = result.user;
                        
                            user && toast.success("Succesfully added you")

                        
                        const displayName = data.name;
                        const photoURL = image;

                        addedUpdateUser(displayName, photoURL)
                            .then(() => {
                                // const role = data.type;
                                puteUser(email, displayName, photoURL);
                            })
                            .catch((error) => {
                                console.error(error)
                            })
                    })
                    .catch((error) => {
                        
                            error && toast.error("firebase Error")
                    
                    })



            })
        // createUserWithEP(email, password)

        //     try {
        //         const response = await axios.post(`${process.env.REACT_APP_backendurl}/api/upload`, formData, {
        //             headers: { "Content-Type": "multipart/form-data" }
        //         });
       
        //     }
        //     catch (error) {
        //     }
    }

    const handlegoogleLogin = () => {
        signInwithGoogle(provider)
        .then((result) => {
            const email = result.user.email;
            const displayName = result.user.displayName;
            const photoURL = result.user.photoURL;
            const role= "User";

            puteUser(email, displayName, photoURL)
            const user = result.user;
            
                user && toast.success("Succesfully added your account")
                navigate(from, { replace: true })

        })
        .catch((error) => {
            
                error && toast.error("firebaseError", error.message)
            
        })

    }



    const puteUser = async (email, displayName, photoURL) => {

        const addingUser = {
            email,
            name: displayName,
            img: photoURL,
            // role
        }

        try {
            const addData = await axios.post(`${process.env.REACT_APP_backendurl}/users`, addingUser, {
                headers: {
                    'content-type': 'application/json'
                },
            })

            if (addData.status === 200) {
                navigate('/')
                toast.success("User successfully Created")
            }
        }
        catch (error) {
            console.error(error)
        }
        // .then(res =>res.json())
        // .then(data => {
        //     // setUserEmail(email)
        //     navigate('/')
        // })


    }

    return (
        <div className="backImage" style={{ fontFamily: 'Georgia, serif', fontSize: '20px', }}>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-bold  mb-5">Welcome for Sign Up</h1>
                    </div>
                    <div className="card flex-shrink-0 shadow-md shadow-lime-300 md:w-96 lg:w-96" style={{backgroundColor:"rgb(186, 239, 186)"}}>
                        <form onSubmit={handleSubmit(createuser)} className="card-body">

                            {/* Name section start */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name", {
                                    required: "Name is required",
                                    minLength: { value: 3, message: "name mustbe meningfull" }
                                })}  placeholder="Please Enter Your Full Name" className="input input-bordered" />
                                {
                                    errors.name && <p className='text-red-500'>{errors.name?.message}</p>
                                }
                            </div>

                            {/* Photo Section start */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Image</span>
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
                                <input {...register("password")}
                                type="password"
                                placeholder="******"
                                className="input input-bordered"
                                //  message="Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
                                //     pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()\-_=+{}[\]|;:'\",.<>\/\\]).{8,}$",
                                />

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
                                <button className="btn btn-success">Sign up</button>
                                <Toaster />
                            </div>
                        </form>

                        <div className='text-center'>
                            <button onClick={handlegoogleLogin}><FcGoogle /></button>
                            <button  className='ml-3 text-sky-500'><PiPhonePlusFill className='text-2xl'/></button>
                        </div>

                        <p className='text-center mb-5 text-black'>Alredy you have an account <Link to={'/signIn'} className='text-blue-500'>Login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUP;