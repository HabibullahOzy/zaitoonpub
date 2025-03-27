import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button} from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import bookf from "./Nursery_Arabic.pdf";
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
// import Document from 'react-pdf/dist/cjs/Document.js';
// import Page from 'react-pdf/dist/cjs/Page.js';

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

// ✅ Set the worker source to the local import
// pdfjs.GlobalWorkerOptions.workerSrc = URL.createObjectURL(new Blob([pdfWorker], { type: "application/javascript" }));



const Book1 = () => {

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    return (
        <div>

<div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
      <div className="w-full max-w-2xl bg-white shadow-lg p-4 rounded-md">
        <Document
          file="./Nursery_Arabic.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>
      <div className="mt-4 flex gap-2">
        <Button
          onClick={() => setPageNumber(pageNumber - 1)}
          disabled={pageNumber <= 1}
        >
          Previous
        </Button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <Button
          onClick={() => setPageNumber(pageNumber + 1)}
          disabled={pageNumber >= numPages}
        >
          Next
        </Button>
      </div>
    </div>


            {/* <iframe
                src={bookf}
                width="100%"
                height="650px"
                // min-height="screen"
                className=' min-h-screen'
                title="PDF Viewer"
                style={{ border: 'none' }}
            /> */}


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