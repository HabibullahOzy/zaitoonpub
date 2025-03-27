import React from 'react';
import rahym from '../../../../assets/PdfFiles/banglaRhymes.pdf';

const Book5 = () => {
    return (
        <div>
            <iframe
                src={rahym}
                width="100%"
                height="650px"
                title=""
                style={{ border: 'none' }}
            />
        </div>
    );
};

export default Book5;