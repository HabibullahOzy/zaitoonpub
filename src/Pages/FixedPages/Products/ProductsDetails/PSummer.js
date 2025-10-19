import React from 'react';

const PSummer = ({ data }) => {
    return (
        <div>
            {data?.description
                ?.split(/\n+/) // split by new lines
                .filter(para => para.trim() !== "") // remove empty lines
                .map((para, index) => (
                    <p key={index} className="mb-3 leading-relaxed text-gray-800">
                        {para}
                    </p>
                ))}
        </div>
    );
};

export default PSummer;