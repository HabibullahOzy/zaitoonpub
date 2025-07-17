import React from 'react';
import ViewPdfsecond from './ViewPdfsecond';





const PdfOpenModal = (pdf) => {
  
    return (
        <div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box" style={{
                    maxWidth: 650,
                    maxHeight: '100vh',
                    overflowY: 'auto',
                    padding: 4,
                    borderRadius: 12,
                    backgroundColor: 'white',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost bg-[rgb(8, 130, 8)] absolute right-2 top-2">✕</button>
                    </form>
                    <div className="flex flex-col items-center bg-gray-100">
                        <div className="w-full max-w-2xl bg-white shadow-lg p-2 rounded-md">
                            <ViewPdfsecond pdfUrl={pdf.pdf} />
                        </div>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default PdfOpenModal;