import React from 'react';
import book4 from "../../../../assets/PdfFiles/rhyme demo 3.pdf"
const Book4 = () => {
    return (
        <div>
            <iframe
                src={book4}
                width="100%"
                height="650px"
                title="PDF Viewer"
                style={{ border: 'none' }}
            />
        </div>
    );
};

export default Book4;