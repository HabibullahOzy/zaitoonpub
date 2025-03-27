import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { Zaitooncontext } from '../../../../SecureContext/ContextAuth';
import { FaCartFlatbed } from 'react-icons/fa6';
import toast from 'react-hot-toast';
import PdfOpenModal from '../BooksPdf/PdfOpenModal';

const ProductsDetails = () => {
    const { offer, user, producD, setProducD } = useContext(Zaitooncontext);
    const dataes = useLoaderData();
    const [modalOpen, setModalOpen] = useState(null)


    console.log(dataes)

    // console.log(producD)

    const handleAddCart = (id) => {
        console.log(id)
        const email = user.email
        const name = producD.name
        const image = producD.img
        const productPrice = producD.productPrice
        const catagory_id = producD.catagory_id

        const cartProducts = {
            id,
            email,
            offer,
            name,
            image,
            productPrice,
            catagory_id
        }
        console.log(id)
        fetch(`http://localhost:5000/addedCart`, {
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
                    toast.success("Your Producte added succesfully");
                    // navigate('/dashboard/allProducts')
                } else {
                    toast.error("your producte can't added please try again")
                }
            })


    }
    return (
        <div>
            {
                dataes?.map((data, i) => <div className="lg:flex text-black w-9/12 m-auto mt-12 min-h-screen">
                    <div key={i}>
                        <figure className="border border-spacing-2 border-emerald-400 p-5">
                            <img src={data.img} alt="" className='' srcset="" />
                        </figure>
                    </div>
                    <div className="p-10">
                        <div>
                            <h1 className="font-semibold p-2">{data.name}</h1>

                            <div className="rating  rating-half p-2">
                                {/* <input type="radio" name="rating-11" className="rating-hidden" /> */}
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400 w-2" aria-label="0.5 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="1 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="1.5 star" defaultChecked />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="2 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="2.5 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="3 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="3.5 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="4 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-1 bg-orange-400" aria-label="4.5 star" />
                                <input type="radio" name="rating-11" className="mask mask-star-2 mask-half-2 bg-orange-400" aria-label="5 star" />
                            </div>
                        </div>
                        <hr className="bg-gray-300 h-1" />

                        <p className="p-2">{data.description}</p>

                        <hr className="bg-gray-300 h-1" />

                        <h1 className="flex justify-evently p-5">
                            {
                                data?.offers ? <p className=' text-xl font-semibold text-gray-600' style={{ textDecoration: "line-through", textDecorationColor: "red" }}>TK. {data.productPrice}৳</p> : ""
                            }


                            {
                                data?.offers ? <p className='text-2xl font-semibold text-red-400'>TK. {offer}৳</p> : <p className=' font-semibold text-gray-600' >TK. {data.productPrice}৳</p>
                            }
                        </h1>

                        <div className="flex justify-around p-2">
                            <button type="button" className="btn btn-outline btn-success" onClick={() => handleAddCart(dataes._id)}><FaCartFlatbed className='w-8' />Add to cart</button>
                            <button onClick={() => document.getElementById('my_modal_3').showModal()} className="btn btn-outline btn-success">Some Read</button>
                        </div>
                    </div>

                    {
                        setProducD(data)
                    }
                </div>)
            }


            <PdfOpenModal>
                modalOpen={modalOpen}
                setModalOpen={setModalOpen}
            </PdfOpenModal>

        </div>
    );
};

export default ProductsDetails;