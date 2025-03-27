import React, { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// import pdfjs from '-dist';
import { Button } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import bookf from "./banglaRhymes.pdf";
// import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const PdfOpenModal = () => {
    const [numPages, setNumPages] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);


    useEffect(() => {
        
    }, [])

    // * @param {Object} event

    function onDocumentLoadSuccess(event) {
        console.log("Loader event: ",event)
        setNumPages(event);
    }

    return (
        <div>
            {/* You can open the modal using document.getElementById('ID').showModal() method */}
            {/* <button className="btn" >open modal</button> */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <div>

                        <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
                            <div className="w-full max-w-2xl bg-white shadow-lg p-4 rounded-md">
                                <Document
                                    file={bookf}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    {
                                        Array(numPages)
                                        .fill()
                                        .map((_, index)=>(
                                        <Page pageNumber={index} pageIndex={index + 1} />
                                    ))
                                    }
                                    
                                </Document>
                            </div>
                            {/* <div className="mt-4 flex gap-2">
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
                            </div> */}
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default PdfOpenModal;