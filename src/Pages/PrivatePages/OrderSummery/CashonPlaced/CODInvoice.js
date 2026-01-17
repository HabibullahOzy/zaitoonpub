import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { QRCodeCanvas } from "qrcode.react";
import codimg from "../../../../assets/cod.png";
import paidimg from "../../../../assets/paid.png";

const CODInvoice = ({ codInvdata }) => {
  const componentRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  // ================= CALCULATIONS =================
  const subtotal = Number(codInvdata?.totalPrice || 0);
  const discountPercent = Number(codInvdata?.offer || 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryCharge = Number(codInvdata?.delicharge || 0);
  const grandTotal = subtotal - discountAmount + deliveryCharge;

  const payments = codInvdata?.payments || [];
  const totalPaid = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const dueAmount = Math.max(grandTotal - totalPaid, 0);

  // ================= PDF DOWNLOAD (FAST & STABLE) =================
//   const downloadPDF = async () => {
//     if (!componentRef.current || isGenerating) return;

//     try {
//       setIsGenerating(true);

//       const canvas = await html2canvas(componentRef.current, {
//         scale: 1.5, // Reduced from 2 for 40% faster rendering; still high quality
//         useCORS: true,
//         logging: false,
//         backgroundColor: "#ffffff",
//         // Force-fix for "oklch" error: remove modern CSS variables during clone
//         onclone: (clonedDoc) => {
//           const elements = clonedDoc.getElementsByTagName("*");
//           for (let i = 0; i < elements.length; i++) {
//             const style = clonedDoc.defaultView.getComputedStyle(elements[i]);
//             // If oklch is detected in any style, force it to a safe color
//             if (style.color.includes("oklch") || style.backgroundColor.includes("oklch")) {
//               elements[i].style.color = "#000000";
//               elements[i].style.backgroundColor = "transparent";
//             }
//           }
//         },
//       });

//       // Switch to JPEG with 0.8 quality for significantly faster PDF generation
//       const imgData = canvas.toDataURL("image/jpeg", 0.8);
//       const pdf = new jsPDF("p", "mm", "a4");
//       const pdfWidth = pdf.internal.pageSize.getWidth();
//       const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
//       // Use 'FAST' compression alias in jsPDF
//       pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
//       pdf.save(`Invoice-${codInvdata?.orderId || 'order'}.pdf`);
//     } catch (error) {
//       console.error("Download failed:", error);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   // ================= AUTO DOWNLOAD =================
//   useEffect(() => {
//     // Small delay ensures the QR code and fonts are fully rendered before capturing
//     const timer = setTimeout(() => {
//       downloadPDF();
//     }, 800);
//     return () => clearTimeout(timer);
//   }, [codInvdata]);

// ================= PDF DOWNLOAD (MULTI-PAGE, FAST & MARGINS) =================
  const downloadPDF = async () => {
    if (!componentRef.current || isGenerating) return;

    try {
      setIsGenerating(true);
      
      const canvas = await html2canvas(componentRef.current, {
        scale: 1.5,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
        onclone: (clonedDoc) => {
          const elements = clonedDoc.getElementsByTagName("*");
          for (let el of elements) {
            el.style.colorScheme = "light";
            if (window.getComputedStyle(el).color.includes("oklch")) el.style.color = "#333";
            if (window.getComputedStyle(el).backgroundColor.includes("oklch")) el.style.backgroundColor = "#fff";
          }
        }
      });

      const imgData = canvas.toDataURL("image/jpeg", 0.7);
      const pdf = new jsPDF("p", "mm", "a4");

      // --- MARGIN CONFIGURATION ---
      const margin = 5; // 10mm standard margin
      const pageWidth = pdf.internal.pageSize.getWidth(); // 210
      const pageHeight = pdf.internal.pageSize.getHeight(); // 297
      
      const contentWidth = pageWidth - (margin * 2); 
      const contentHeight = (canvas.height * contentWidth) / canvas.width - (margin * 2);
      const maxPageContentHeight = pageHeight;

      let heightLeft = contentHeight;
      let position = margin; // Start at the top margin

      // --- PAGE GENERATION ---
      // First Page
      pdf.addImage(imgData, "JPEG", margin, position, contentWidth, contentHeight, undefined, 'FAST');
      heightLeft -= maxPageContentHeight;

      // Subsequent Pages
      while (heightLeft > 0) {
        // Position is calculated relative to the full image height
        // We subtract the content height we've already shown
        position = (heightLeft - contentHeight) + margin; 
        pdf.addPage();
        pdf.addImage(imgData, "JPEG", margin, position, contentWidth, contentHeight, undefined, 'FAST');
        heightLeft -= maxPageContentHeight;
      }

      pdf.save(`ZP Invoice-${codInvdata?.orderId}_${codInvdata?.name}.pdf`);
    } catch (error) {
      console.error("PDF Error:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  //   // ================= AUTO DOWNLOAD =================
  useEffect(() => {
    // Small delay ensures the QR code and fonts are fully rendered before capturing
    const timer = setTimeout(() => {
      downloadPDF();
    }, 800);
    return () => clearTimeout(timer);
  }, [codInvdata]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "2rem",
        backgroundColor: "#f3f4f6",
        minHeight: "100vh",
      }}
    >
      {/* Action Button (Not visible in PDF) */}
      <div style={{ width: "820px", textAlign: "right", marginBottom: "1rem" }}>
        <button 
          onClick={downloadPDF} 
          disabled={isGenerating}
          style={{ 
            padding: "10px 20px", 
            cursor: "pointer", 
            background: isGenerating ? "#9ca3af" : "#16a34a", 
            color: "#fff", 
            border: "none", 
            borderRadius: "5px",
            fontWeight: "bold" 
          }}
        >
          {isGenerating ? "Processing..." : "Download Invoice"}
        </button>
      </div>

      <div
        ref={componentRef}
        style={{
          width: "820px",
          background: "#ffffff",
          padding: "50px",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {/* ===== COMPANY HEADER ===== */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <img
            src="https://res.cloudinary.com/dimbdv51r/image/upload/v1748362914/product_images/1748362914468-headerimg.png.png"
            alt="Logo"
            style={{ width: "370px" }}
            crossOrigin="anonymous"
          />
          <div style={{ textAlign: "left", paddingLeft: "25px" }}>
            <h2 style={{ margin: 0, textAlign: "center" }}>Zaitoon Publication.</h2>
            <p style={{ margin: 0 }}>Address: Jalalabad Heights, Jalalabad Housing Society, Sector-1, Road-1, Lane-2, West Khulshi, Chattogram, Bangladesh.</p>
            <p style={{ margin: 0 }}>Email: zaitoonpublication.bd@gmail.com</p>
            <p style={{ margin: 0 }}>Phone: +8801748-806492</p>
          </div>
        </div>

        {/* ===== CUSTOMER & ORDER INFO ===== */}
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <div>
            <h3 style={{ marginBottom: "0.1rem" }}>Bill To:</h3>
            <p><b>Name:</b> {codInvdata?.name}</p>
            <p><b>Email:</b> {codInvdata?.email}</p>
            <p><b>Phone:</b> {codInvdata?.phonenumber}</p>
            <p><b>Address:</b> {codInvdata?.dlocation}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <h3 style={{ marginBottom: "0.1rem" }}>Invoice Info:</h3>
            <p><b>Invoice ID:</b> {codInvdata?.orderId}</p>
            <p><b>Date:</b> {codInvdata?.orderDate}</p>
            <p><b>Payment Status:</b> {dueAmount === 0 ? "Paid" : "Pending"}</p>
            <div style={{ marginTop: "0.1rem" }}>
              <QRCodeCanvas value={"https://zaitoonpublication.com/"} size={40} />
            </div>
          </div>
        </div>

        {/* ===== PRODUCT TABLE ===== */}
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Product</th>
              <th style={thStyle}>Code</th>
              <th style={thStyle}>Quantity</th>
              <th style={thStyle}>Unit Price</th>
              <th style={thStyle}>Total</th>
            </tr>
          </thead>
          <tbody>
            {codInvdata?.productdata?.map((item, i) => (
              <tr key={i}>
                <td style={tdStyle}>{item?.namebn}</td>
                <td style={tdStyle}>{item?.ProductCode}</td>
                <td style={tdStyle}>{item?.quantity}</td>
                <td style={tdStyle}>৳ {item?.productPrice}</td>
                <td style={tdStyle}>৳ {item?.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* ===== TOTALS ===== */}
        <table style={{ ...tableStyle, width: "50%", float: "right" }}>
          <tbody>
            <tr>
              <td style={tdStyle}>Subtotal</td>
              <td style={tdStyle}>৳ {subtotal.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={tdStyle}>Discount</td>
              <td style={tdStyle}>- ৳ {discountAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td style={tdStyle}>Delivery</td>
              <td style={tdStyle}>৳ {deliveryCharge.toFixed(2)}</td>
            </tr>
            <tr style={{ fontWeight: "bold" }}>
              <td style={tdStyle}>Grand Total</td>
              <td style={tdStyle}>৳ {grandTotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        <div style={{ clear: "both" }}></div>

        {/* ===== PAYMENT SUMMARY ===== */}
        {/* ADD 'hide-in-pdf' TO THE className BELOW IF YOU WANT TO CANCEL THIS TABLE IN PDF */}
        <div className=""> 
            <h3 style={{ marginTop: "0.5rem", marginBottom: "0.4rem" }}>Payment Summary</h3>
            <table style={tableStyle}>
            <tbody>
                <tr>
                <td style={tdStyle}>Total Invoice</td>
                <td style={tdStyle}>৳ {grandTotal.toFixed(2)}</td>
                </tr>
                <tr>
                <td style={tdStyle}>Total Paid</td>
                <td style={{ ...tdStyle, color: "green" }}>৳ {totalPaid.toFixed(2)}</td>
                </tr>
                <tr>
                <td style={tdStyle}>Due Amount</td>
                <td style={{ ...tdStyle, color: "red" }}>৳ {dueAmount.toFixed(2)}</td>
                </tr>
            </tbody>
            </table>
        </div>

        {/* ===== PAYMENT HISTORY ===== */}
        {payments.length > 0 && (
          <>
            <h3 style={{ marginTop: "0.2rem", marginBottom: "0.5rem" }}>Payment History</h3>
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>SL</th>
                  <th style={thStyle}>Received By</th>
                  <th style={thStyle}>Method</th>
                  <th style={thStyle}>Transaction</th>
                  <th style={thStyle}>Date</th>
                  <th style={thStyle}>Note</th>
                  <th style={thStyle}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {payments?.map((p, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{i + 1}</td>
                    <td style={tdStyle}>{p.rname}</td>
                    <td style={tdStyle}>{p.payMethod}</td>
                    <td style={tdStyle}>{p.transactionId}</td>
                    <td style={tdStyle}>{p.paymentDate}</td>
                    <td style={tdStyle}>{p.paidnote}</td>
                    <td style={tdStyle}>৳ {Number(p.amount).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        {/* ===== STATUS IMAGE ===== */}
        <div style={{ textAlign: "center" , display: "flex", justifyContent: "center" }}>
          <img src={dueAmount === 0 ? paidimg : codimg} alt="Status" width="180" crossOrigin="anonymous"/>
        </div>

        {/* ===== SIGNATURES ===== */}
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "0.5rem" }}>
          <div style={{ textAlign: "center" }}>
            <p>__________________</p>
            <p>Authorized Signature</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p>__________________</p>
            <p>Customer Signature</p>
          </div>
        </div>

        {/* ===== FOOTER ===== */}
        <div style={{ textAlign: "center", marginTop: "0.5rem", fontSize: "12px", color: "#374151", borderTop: "1px dashed #9ca3af", paddingTop: "0.8rem" }}>
          <p>This is a system generated invoice.</p>
          <p>No GST / VAT applicable.</p>
        </div>
      </div>
    </div>
  );
};

const tableStyle = { width: "100%", borderCollapse: "collapse", marginBottom: "0.5rem" };
const thStyle = { border:"1px solid #d1d5db", padding: "8px", textAlign: "center", backgroundColor: "#f3f4f6" };
const tdStyle = { border: "1px solid #d1d5db", padding: "8px", textAlign: "center" };

export default CODInvoice;








// import React, { useRef } from "react";
// // import { useReactToPrint } from "react-to-print";
// // import html2canvas from "html2canvas";
// // import jsPDF from "jspdf";
// // import img from "../../../../assets/headerimg.png";
// import { FcPrint } from "react-icons/fc";

// import codimg from "../../../../assets/cod.png";
// import paidimg from "../../../../assets/paid.png";

// const CODInvoice = ({ codInvdata }) => {
//     const componentRef = useRef();


//     // print function to handle printing 

//     const handlePrint = () => {
//         const printContents = componentRef.current.innerHTML;
//         const printWindow = window.open("", "", "width=900,height=650");

//         printWindow.document.write(`
//         <html>
//             <head>
//                 <title>ZP Invoice</title>
//                 <style>
//                     body { font-family: Arial, sans-serif; padding: 20px; }
//                     table { width: 100%; border-collapse: collapse; }
//                     th, td { border: 1px solid #b2f3b2; padding: 0.5rem; text-align: left; }
//                     th { background-color: #b2f3b2; font-weight: bold; }
//                 </style>
//             </head>
//             <body>
//                 ${printContents}
//                 <script>
//                     window.onload = function() {
//                         window.print();
//                         window.onafterprint = function () {
//                             window.close();
//                         };
//                     };
//                 </script>
//             </body>
//         </html>
//     `);
//         printWindow.document.close();
//     };



//     // and downloading the invoice as PDF

//     // const handleDownload = async () => {
//     //     const element = componentRef.current;

//     //     if (!element) {
//     //         alert("Invoice content not found.");
//     //         return;
//     //     }

//     //     // Wait for all images to load
//     //     const images = element.querySelectorAll("img");
//     //     const promises = [];

//     //     images.forEach((img) => {
//     //         if (!img.complete) {
//     //             promises.push(
//     //                 new Promise((resolve) => {
//     //                     img.onload = resolve;
//     //                     img.onerror = resolve;
//     //                 })
//     //             );
//     //         }
//     //     });

//     //     await Promise.all(promises);

//     //     try {
//     //         // Wait for all fonts
//     //         await document.fonts.ready;

//     //         const canvas = await html2canvas(element, {
//     //             scale: 2,
//     //             useCORS: true,
//     //             backgroundColor: "#ffffff",
//     //             ignoreElements: (el) => {
//     //                 const style = window.getComputedStyle(el);
//     //                 return (
//     //                     style.backgroundColor?.includes("oklch") ||
//     //                     style.color?.includes("oklch")
//     //                 );
//     //             },
//     //         });

//     //         const imgData = canvas.toDataURL("image/png");
//     //         const pdf = new jsPDF("p", "mm", "a4");
//     //         const imgProps = pdf.getImageProperties(imgData);
//     //         const pdfWidth = pdf.internal.pageSize.getWidth();
//     //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

//     //         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
//     //         pdf.save("invoice.pdf");
//     //     } catch (error) {
//     //         console.error("PDF generation failed:", error);
//     //         alert("Failed to download PDF. Try again.");
//     //     }
//     // };


//     const ordoffer = (codInvdata?.totalPrice || 0);
//     const offerperc = Number(codInvdata?.offer) || 0;
//     const offerPrice = codInvdata?.offer
//         ? Math.round(ordoffer - (offerperc * ordoffer) / 100) + Number(codInvdata?.delicharge)
//         : codInvdata?.totalPrice;

//     return (
//         <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
//             {/* Buttons */}
//             <div
//                 style={{
//                     display: "flex",
//                     justifyContent: "space-between",
//                     marginBottom: "1rem",
//                     flexWrap: "wrap",
//                 }}
//             >
//                 <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Order Invoice</h2>
//                 <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
//                     <button
//                         onClick={handlePrint}
//                         style={{
//                             // backgroundColor: "#2563eb",
//                             color: "white",
//                             padding: "0.5rem 1rem",
//                             borderRadius: "6px",
//                             border: "none",
//                             cursor: "pointer",
//                         }}
//                     >
//                         <FcPrint className="text-2xl" />
//                     </button>
//                     {/* <button
//                         onClick={handleDownload}
//                         style={{
//                             backgroundColor: "#16a34a",
//                             color: "white",
//                             padding: "0.5rem 1rem",
//                             borderRadius: "6px",
//                             border: "none",
//                             cursor: "pointer",
//                         }}
//                     >
//                         Download PDF
//                     </button> */}
//                 </div>
//             </div>

//             {/* Invoice */}
//             <div
//                 ref={componentRef}
//                 style={{
//                     backgroundColor: "#b2f3b2",
//                     padding: "1.5rem",
//                     borderRadius: "10px",
//                     boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//                     fontSize: "14px",
//                     color: "#000000",
//                     width: "800px",      // fixed width
//                     minHeight: "1100px", // fixed height (A4)
//                     overflow: "hidden",
//                 }}
//             >
//                 <div style={{ textAlign: "center", display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
//                     <img src='https://res.cloudinary.com/dimbdv51r/image/upload/v1748362914/product_images/1748362914468-headerimg.png.png' alt="Logo" style={{ width: "400px" }} crossOrigin="anonymous" />
//                 </div>

//                 <div
//                     style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                         marginBottom: "1rem",
//                         flexWrap: "wrap",
//                         gap: "1rem",
//                     }}
//                 >
//                     <div>
//                         <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
//                             Order ID: {codInvdata?.orderId || "N/A"}
//                         </h3>
//                         <p>Date: {codInvdata?.orderDate || "N/A"}</p>
//                         <p>Customer: {codInvdata?.name || "N/A"}</p>
//                     </div>
//                     <div>
//                         <p>Email: {codInvdata?.email || "N/A"}</p>
//                         <p>Phone: {codInvdata?.phonenumber || "N/A"}</p>
//                         <p>Address: {codInvdata?.dlocation}</p>
//                     </div>
//                 </div>

//                 <table
//                     style={{
//                         width: "100%",
//                         borderCollapse: "collapse",
//                         marginBottom: "1rem",
//                     }}
//                 >
//                     <thead>
//                         <tr style={{ backgroundColor: "#f3f4f6" }}>
//                             <th style={thStyle}>Product</th>
//                             <th style={thStyle}>Product Code</th>
//                             <th style={thStyle}>Quantity</th>
//                             <th style={thStyle}>Unit Price (৳)</th>
//                             <th style={thStyle}>SubTotal (৳)</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {codInvdata?.productdata?.map((item, i) => {
//                             // calculate offer price if needed
//                             const ordoffer = codInvdata?.totalPrice;
//                             const offerperc = Number(codInvdata?.offer) || 0;
//                             const offerPrice = codInvdata?.offer
//                                 ? Math.round(ordoffer - (offerperc * ordoffer) / 100)
//                                 : codInvdata?.totalPrice;
//                             return (
//                                 <tr key={i}>
//                                     <td style={tdStyle}>{item?.namebn}</td>
//                                     <td style={tdStyle}>{item?.ProductCode}</td>
//                                     <td style={tdStyle}>{item?.quantity}</td>
//                                     <td style={tdStyle}>{item?.productPrice}</td>
//                                     <td style={tdStyle}>{item?.total}</td>
//                                 </tr>
//                             )
//                         })}
//                     </tbody>
//                 </table>

//                 <div className="flex justify-between p-10" 
//                 // style={{ textAlign: "right", marginTop: "1rem" }}
//                 >
//                     <div>
//                         <h4 className="pt-5 text-[13px] font-semibold">
//                         SubTotal: ৳ {ordoffer.toFixed(2)}
//                     </h4>
//                         {
//                             codInvdata?.offer ? (
//                                 <h4 className="pt-5 text-[13px] font-semibold text-red-500">
//                                     Discount: {codInvdata?.offer}% ( your save  {( (offerperc * ordoffer) / 100).toFixed(2)} ৳)
                                   
//                                 </h4>
//                             ) : (
//                                 <h4 className="pt-5 text-[13px] font-semibold">
//                                     Discount: - 
//                                 </h4>
//                             )
//                         }
                    
//                     </div>
//                    <div>
//                      <h4 className="pt-5 text-[13px] font-semibold">
//                         Delivery Charge: ৳ {codInvdata?.delicharge}
//                     </h4>
//                     <h4 className="pt-5 text-[16px] font-bold">
//                         Pay Total: ৳ {offerPrice.toFixed(2)}
//                     </h4>
//                    </div>
//                 </div>


//                 {/* Status invoice seal */}

//                 {(codInvdata?.status === "COD" || codInvdata?.status === "paid") && (
//                     <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
//                         <img
//                             src={codInvdata?.status === "COD" ? codimg : paidimg}
//                             alt="Invoice Status"
//                             style={{ width: "200px", height: "auto" }}
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// const thStyle = {
//     border: "1px solid #d1d5db",
//     padding: "0.5rem",
//     textAlign: "left",
//     fontWeight: "bold",
// };

// const tdStyle = {
//     border: "1px solid #d1d5db",
//     padding: "0.5rem",
// };

// export default CODInvoice;