import React from 'react';





const PdfOpenModal = () => {
    
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

                        <div className="flex flex-col items-center bg-gray-100">
                            <div className="w-full max-w-2xl bg-white shadow-lg p-2 rounded-md">
                                
                                <iframe
                                    src={`http://localhost:5000/uploads/1746865729687-cgq3 213-15-4628.pdf`}
                                    width="100%"
                                    height="650px"
                                    title="PDF Viewer"
                                    style={{ border: 'none' }}>

                                </iframe>


                                {/* <Document file={`http://localhost:5000/uploads/1746865729687-cgq3 213-15-4628.pdf`} onLoadSuccess={onDocumentLoadSuccess}>
                                    {Array.from(new Array(numPages), (el, index) => (
                                        <Page
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                            className="custom-pdf-page"
                                        />
                                    ))}
                                </Document> */}



                                {/* <div>
                                    <Document file={`http://localhost:5000/uploads/1746865729687-cgq3 213-15-4628.pdf`} onLoadSuccess={onDocumentLoadSuccess}>
                                    <Page pageNumber={pageNumber} renderTextLayer={false} renderAnnotationLayer={false}/>
                                </Document>
                                <p>
                                    Page {pageNumber} of {numPages}
                                </p>
                                </div> */}
                            </div>

                        </div>
                    </div>
                </div>
            </dialog >
        </div >
    );
};

export default PdfOpenModal;