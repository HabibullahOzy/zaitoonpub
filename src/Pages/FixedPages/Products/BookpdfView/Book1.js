import React from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';
import { Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import bookf from "../../../../assets/PdfFiles/Nursery_Arabic.pdf";

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const Book1 = () => {
    return (
        <div>
            <iframe
                src={bookf}
                width="100%"
                height="650px"
                title="PDF Viewer"
                style={{ border: 'none' }}
            />


            {/* <div style={{ height: '750px' }}>
                <Viewer fileUrl={bookf} />
            </div> */}

            {/* <Document file={bookf}>
                <Page pageNumber={1} />
            </Document> */}
        </div>
    );
};

export default Book1;