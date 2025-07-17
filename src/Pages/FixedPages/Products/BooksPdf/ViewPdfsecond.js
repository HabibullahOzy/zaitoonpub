import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const ViewPdfsecond = ({ pdfUrl }) => {
    const [pdfDoc, setPdfDoc] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [scale, setScale] = useState(1.5);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const containerRef = useRef();
    const touchStartX = useRef(null);

    // Load PDF document
    useEffect(() => {
        if (!pdfUrl) return;

        const loadPDF = async () => {
            setLoading(true);
            setError(null);
            setPdfDoc(null);
            setNumPages(0);
            try {
                const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
                const pdf = await loadingTask.promise;
                setPdfDoc(pdf);
                setNumPages(pdf.numPages);
            } catch (err) {
                console.error('Error loading PDF:', err);
                setError('Failed to load PDF');
            } finally {
                setLoading(false);
            }
        };

        loadPDF();
    }, [pdfUrl]);

    // Render all pages
    useEffect(() => {
        const renderAllPages = async () => {
            if (!pdfDoc || !containerRef.current) return;

            containerRef.current.innerHTML = '';
            for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
                const page = await pdfDoc.getPage(pageNum);
                const viewport = page.getViewport({ scale });

                const canvas = document.createElement('canvas');
                canvas.style.marginBottom = '1rem';
                canvas.style.maxWidth = '100%';
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                containerRef.current.appendChild(canvas);

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport,
                };

                await page.render(renderContext).promise;
            }
        };

        if (pdfDoc) renderAllPages();
    }, [pdfDoc, scale]);

    // Zoom handlers
    const zoomIn = () => setScale((s) => s + 0.1);
    const zoomOut = () => setScale((s) => (s > 0.4 ? s - 0.1 : s));

    // Touch gestures for swipe navigation
    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        if (touchStartX.current === null) return;
        const deltaX = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(deltaX) > 50) {
            if (deltaX > 0) {
                setScale((s) => (s > 0.4 ? s - 0.1 : s)); // Swipe right to zoom out
            } else {
                setScale((s) => s + 0.1); // Swipe left to zoom in
            }
        }
        touchStartX.current = null;
    };

    return (
        <div style={{ textAlign: 'center', margin: 'auto' }}>
            {/* Controls */}
            <div
                style={{
                    marginBottom: 2,
                    marginRight: 10,
                    marginLeft: 10,
                    display: 'flex',
                    justifyContent: 'space-around',
                    flexWrap: 'wrap',
                }}
            >
                <div className="flex gap-5">
                    <button
                        onClick={zoomIn}
                        disabled={loading || !!error}
                        style={buttonStyle}
                    >
                        +
                    </button>
                    <button
                        onClick={zoomOut}
                        disabled={loading || !!error || scale <= 0.4}
                        style={buttonStyle}
                    >
                        -
                    </button>
                </div>
            </div>

            {/* Status messages */}
            {loading && <p>Loading PDF...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Canvas container for all pages */}
            <div
                ref={containerRef}
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{
                    overflowX: 'auto',
                    maxWidth: '100%',
                    padding: '0 10px',
                }}
            />

            {/* Page indicator */}
            <p>Total Pages: {numPages}</p>
        </div>
    );
};

// Simple button styling
const buttonStyle = {
    padding: '0 5px 0 5px',
    fontSize: 10,
    borderRadius: 4,
    border: '1px solid #007bff',
    backgroundColor: 'rgb(8, 130, 8)',
    color: 'white',
    cursor: 'pointer',
    userSelect: 'none',
    transition: 'background-color 0.3s',
};

export default ViewPdfsecond;












// import React, { useEffect, useState, useRef, useCallback } from 'react';
// import * as pdfjsLib from 'pdfjs-dist';
// import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';

// pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

// const ViewPdfsecond = ({ pdfUrl }) => {
//     const [pdfDoc, setPdfDoc] = useState(null);
//     const [pageNumber, setPageNumber] = useState(1);
//     const [numPages, setNumPages] = useState(0);
//     const [scale, setScale] = useState(1.5);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const canvasRef = useRef();

//     // Load PDF document
//     useEffect(() => {
//         if (!pdfUrl) return;

//         const loadPDF = async () => {
//             setLoading(true);
//             setError(null);
//             setPdfDoc(null);
//             setNumPages(0);
//             setPageNumber(1);
//             try {
//                 const loadingTask = pdfjsLib.getDocument({ url: pdfUrl });
//                 const pdf = await loadingTask.promise;
//                 setPdfDoc(pdf);
//                 setNumPages(pdf.numPages);
//                 setPageNumber(1);
//             } catch (err) {
//                 console.error('Error loading PDF:', err);
//                 setError('Failed to load PDF');
//             } finally {
//                 setLoading(false);
//             }
//         };

//         loadPDF();
//     }, [pdfUrl]);

//     // Render current page
//     useEffect(() => {
//         const renderPage = async (num) => {
//             if (!pdfDoc) return;

//             const page = await pdfDoc.getPage(num);
//             const viewport = page.getViewport({ scale });
//             const canvas = canvasRef.current;
//             const context = canvas.getContext('2d');

//             canvas.height = viewport.height;
//             canvas.width = viewport.width;

//             const renderContext = {
//                 canvasContext: context,
//                 viewport: viewport,
//             };

//             await page.render(renderContext).promise;
//         };

//         if (pdfDoc) {
//             renderPage(pageNumber);
//         } else {
//             // Clear canvas if no PDF loaded
//             const canvas = canvasRef.current;
//             if (canvas) {
//                 const context = canvas.getContext('2d');
//                 context.clearRect(0, 0, canvas.width, canvas.height);
//             }
//         }
//     }, [pdfDoc, pageNumber, scale]);

//     // Pagination handlers
//     const goPrev = () => setPageNumber((p) => (p > 1 ? p - 1 : p));
//     const goNext = () => setPageNumber((p) => (p < numPages ? p + 1 : p));

//     // Keyboard navigation handler
//     const handleKeyDown = useCallback(
//         (e) => {
//             if (loading || error) return; // disable keys while loading/error
//             if (e.key === 'ArrowLeft') {
//                 goPrev();
//             } else if (e.key === 'ArrowRight') {
//                 goNext();
//             }
//         },
//         [loading, error, goPrev, goNext]
//     );

//     useEffect(() => {
//         window.addEventListener('keydown', handleKeyDown);
//         return () => window.removeEventListener('keydown', handleKeyDown);
//     }, [handleKeyDown]);

//     // Download PDF
//     //   const handleDownload = () => {
//     //     if (!pdfUrl) return;
//     //     const link = document.createElement('a');
//     //     link.href = pdfUrl;
//     //     link.download = pdfUrl.split('/').pop() || 'file.pdf';
//     //     document.body.appendChild(link);
//     //     link.click();
//     //     document.body.removeChild(link);
//     //   };

//     // Print PDF (open in new tab and print)
//     //   const handlePrint = () => {
//     //     if (!pdfUrl) return;
//     //     const printWindow = window.open(pdfUrl);
//     //     if (printWindow) {
//     //       printWindow.onload = () => {
//     //         printWindow.focus();
//     //         printWindow.print();
//     //       };
//     //     }
//     //   };

//     return (
//         <div style={{ textAlign: 'center', margin: 'auto' }}>
//             {/* Controls */}
//             <div
//                 style={{
//                     marginBottom: 2,
//                     marginRight: 10,
//                     marginLeft: 10,
//                     display: 'flex',
//                     justifyContent: 'space-around',
                    
//                     flexWrap: 'wrap',
//                 }}
//             >
//                 <div className='flex gap-5'>
//                     <button
//                         onClick={() => setScale((s) => s + 0.1)}
//                         disabled={loading || !!error}
//                         style={buttonStyle}
//                     >
//                         +
//                     </button>
//                     <button
//                         onClick={() => setScale((s) => (s > 0.4 ? s - 0.1 : s))}
//                         disabled={loading || !!error || scale <= 0.4}
//                         style={buttonStyle}
//                     >
//                         -
//                     </button>
//                 </div>
//                 <div className='flex gap-5'>
//                     <button onClick={goPrev} disabled={loading || !!error || pageNumber <= 1} style={buttonStyle}>
//                         Previous
//                     </button>
//                     <button
//                         onClick={goNext}
//                         disabled={loading || !!error || pageNumber >= numPages}
//                         style={buttonStyle}
//                     >
//                         Next
//                     </button>
//                 </div>
//                 {/* <button onClick={handleDownload} disabled={loading || !!error} style={buttonStyle}>
//           Download
//         </button>
//         <button onClick={handlePrint} disabled={loading || !!error} style={buttonStyle}>
//           Print
//         </button> */}
//             </div>

//             {/* Status messages */}
//             {loading && <p>Loading PDF...</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}

//             {/* Canvas for PDF page */}
//             <canvas
//                 ref={canvasRef}
//                 style={{
//                     border: '1px solid #ccc',
//                     maxWidth: '100%',
//                     marginBottom: 10,
//                     display: loading || error ? 'none' : 'block',
//                 }}
//             />

//             {/* Page indicator */}
//             <p>
//                 Page {numPages ? pageNumber : 0} of {numPages}
//             </p>
//         </div>
//     );
// };

// // Simple button styling
// const buttonStyle = {
//     padding: '0 5px 0 5px',
//     fontSize: 10,
//     borderRadius: 4,
//     border: '1px solid #007bff',
//     backgroundColor: 'rgb(8, 130, 8)',
//     color: 'white',
//     cursor: 'pointer',
//     userSelect: 'none',
//     transition: 'background-color 0.3s',
// };

// export default ViewPdfsecond;