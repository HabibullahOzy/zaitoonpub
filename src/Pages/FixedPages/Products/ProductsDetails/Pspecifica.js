import React from 'react';

const Pspecifica = ({data}) => {
    return (
        <div>
            <p className='flex justify-around border-b-2 border-white p-2'>Product Name: <span>{data.namearb}</span></p>
            <p className='flex justify-around border-b-2 border-white p-2'>Category: <span>{data.category}</span></p>
            <p className='flex justify-around border-b-2 border-white p-2'>Edition: <span>{data.edition}</span></p>
            <p className='flex justify-around border-b-2 border-white p-2'>Language: <span>{data.language}</span></p>
            <p className='flex justify-around border-b-2 border-white p-2'>Page: <span>{data.numberOfpage}</span></p>
            <p className='flex justify-around border-b-2 border-white p-2'>Price: <span>{data.productPrice}</span></p>
            <p className='flex justify-around border-b-2 border-white p-2'>Author Name: <span>{data.authorName}</span></p>
        </div>
    );
};

export default Pspecifica;