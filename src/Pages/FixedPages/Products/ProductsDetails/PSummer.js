import React from 'react';

const PSummer = ({data}) => {
    console.log(data)
    return (
        <div>
        <p>{data.description}</p>
        </div>
    );
};

export default PSummer;