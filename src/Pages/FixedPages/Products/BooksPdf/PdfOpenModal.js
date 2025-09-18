import React, { useEffect, useImperativeHandle, useRef } from 'react';
import ViewPdfsecond from './ViewPdfsecond';
import { Modal } from 'flowbite-react';





const PdfOpenModal = ({pdf,ref,modalOpen,onClose}) => {
const dialogRef = useRef(null);

  // Open/close dialog
  React.useEffect(() => {
    const dialog = dialogRef.current;
    if (modalOpen && dialog) {
      dialog.showModal();
    } else if (dialog) {
      dialog.close();
    }
  }, [modalOpen]);

  // Close when clicking backdrop
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal"
      onClick={handleBackdropClick}
    >
      <div
        className="modal-box relative"
        style={{
          maxWidth: 650,
          maxHeight: "100vh",
          overflowY: "auto",
          padding: 4,
          borderRadius: 12,
          backgroundColor: "white",
          boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="btn btn-sm btn-circle btn-ghost bg-[rgb(8, 130, 8)] absolute right-2 top-2"
        >
          ✕
        </button>

        {/* PDF Viewer */}
        <div className="flex flex-col items-center bg-gray-100">
          <div className="w-full max-w-2xl bg-white shadow-lg p-2 rounded-md">
            <ViewPdfsecond pdfUrl={pdf} />
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default PdfOpenModal;



 