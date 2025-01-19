import React from 'react';
import book3 from "../../../../assets/PdfFiles/KG Arabic Book Demo.pdf"

const Book3 = () => {
    return (
        <div>
            <iframe
                src={book3}
                width="100%"
                height="650px"
                title="PDF Viewer"
                style={{ border: 'none' }}
            />
        </div>
    );
};

export default Book3;