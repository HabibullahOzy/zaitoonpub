import React from 'react';
import book1v1 from '../../../../assets/PdfFiles/Play Arabic Demo 1.pdf'

const Book1View1 = () => {
    return (
        <div>
            <iframe
                src={book1v1}
                width="100%"
                height="650px"
                title="PDF Viewer"
                style={{ border: 'none' }}
            />
        </div>
    );
};

export default Book1View1;