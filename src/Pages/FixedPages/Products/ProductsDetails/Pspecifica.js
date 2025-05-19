import React from 'react';

const Pspecifica = ({data}) => {
    return (
        <div>
            <p>Product Name: {data.namearb}</p>
            <p>Category: {data.category}</p>
            <p>Edition: {data.edition}</p>
            <p>Language: {data.language}</p>
            <p>Page: {data.numberOfpage}</p>
            <p>Price: {data.productPrice}</p>
            <p>Author Name: {data.authorName}</p>
        </div>
    );
};

export default Pspecifica;