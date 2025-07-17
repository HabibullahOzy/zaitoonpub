import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import codimg from "../../../../assets/cod.png";
import paidimg from "../../../../assets/paid.png";
import { FcPrint } from "react-icons/fc";

const Invoice = ({ invdata }) => {
    // console.log(invdata);
    const componentRef = useRef();


    // print function to handle printing 

    const handlePrint = () => {
        const printContents = componentRef.current.innerHTML;
        const printWindow = window.open("", "", "width=900,height=650");

        printWindow.document.write(`
        <html>
            <head>
                <title>ZP Invoice</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 20px; }
                    table { width: 100%; border-collapse: collapse; }
                    th, td { border: 1px solid #b2f3b2; padding: 0.5rem; text-align: left; }
                    th { background-color: #b2f3b2; font-weight: bold; }
                </style>
            </head>
            <body>
                ${printContents}
                <script>
                    window.onload = function() {
                        window.print();
                        window.onafterprint = function () {
                            window.close();
                        };
                    };
                </script>
            </body>
        </html>
    `);
        printWindow.document.close();
    };



    // and downloading the invoice as PDF

    // const handleDownload = async () => {
    //     const element = componentRef.current;

    //     if (!element) {
    //         alert("Invoice content not found.");
    //         return;
    //     }

    //     // Wait for all images to load
    //     const images = element.querySelectorAll("img");
    //     const promises = [];

    //     images.forEach((img) => {
    //         if (!img.complete) {
    //             promises.push(
    //                 new Promise((resolve) => {
    //                     img.onload = resolve;
    //                     img.onerror = resolve;
    //                 })
    //             );
    //         }
    //     });

    //     await Promise.all(promises);

    //     try {
    //         // Wait for all fonts
    //         await document.fonts.ready;

    //         const canvas = await html2canvas(element, {
    //             scale: 2,
    //             useCORS: true,
    //             backgroundColor: "#ffffff",
    //             ignoreElements: (el) => {
    //                 const style = window.getComputedStyle(el);
    //                 return (
    //                     style.backgroundColor?.includes("oklch") ||
    //                     style.color?.includes("oklch")
    //                 );
    //             },
    //         });

    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF("p", "mm", "a4");
    //         const imgProps = pdf.getImageProperties(imgData);
    //         const pdfWidth = pdf.internal.pageSize.getWidth();
    //         const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    //         pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    //         pdf.save("invoice.pdf");
    //     } catch (error) {
    //         console.error("PDF generation failed:", error);
    //         alert("Failed to download PDF. Try again.");
    //     }
    // };

    return (
        <div style={{ padding: "1rem", maxWidth: "900px", margin: "0 auto" }}>
            {/* Buttons */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                    flexWrap: "wrap",
                }}
            >
                <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>Order Invoice</h2>
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                    <button
                        onClick={handlePrint}
                        style={{
                            // backgroundColor: "#2563eb",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                       <FcPrint className="text-2xl" />
                    </button>
                    {/* <button
                        onClick={handleDownload}
                        style={{
                            backgroundColor: "#16a34a",
                            color: "white",
                            padding: "0.5rem 1rem",
                            borderRadius: "6px",
                            border: "none",
                            cursor: "pointer",
                        }}
                    >
                        Download PDF
                    </button> */}
                </div>
            </div>

            {/* Invoice */}
            <div
                ref={componentRef}
                style={{
                    backgroundColor: "#b2f3b2",
                    padding: "1.5rem",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                    fontSize: "14px",
                    color: "#000000",
                    width: "800px",      // fixed width
                    minHeight: "1100px", // fixed height (A4)
                    overflow: "hidden",
                }}
            >
                <div style={{ textAlign: "center", display:"flex", justifyContent:"center", marginBottom: "1rem" }}>
                    <img src='https://res.cloudinary.com/dimbdv51r/image/upload/v1748362914/product_images/1748362914468-headerimg.png.png' alt="Logo" style={{ width: "400px" }} crossOrigin="anonymous" />
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: "1rem",
                        flexWrap: "wrap",
                        gap: "1rem",
                    }}
                >
                    <div>
                        <h3 style={{ fontSize: "18px", fontWeight: "bold" }}>
                            Order ID: #{invdata?.orderId || "N/A"}
                        </h3>
                        <p>Date: {invdata?.orderDate || "N/A"}</p>
                        <p>Customer: {invdata?.name || "N/A"}</p>
                    </div>
                    <div>
                        <p>Email: {invdata?.email || "N/A"}</p>
                        <p>Phone: {invdata?.phonenumber || "N/A"}</p>
                        <p>Address: {invdata?.dlocation},<br />{invdata?.area},<br />{invdata?.city},<br />{invdata?.nationality}</p>
                    </div>
                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginBottom: "1rem",
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: "#f3f4f6" }}>
                            <th style={thStyle}>Product</th>
                            <th style={thStyle}>Product Code</th>
                            <th style={thStyle}>Quantity</th>
                            <th style={thStyle}>Unit Price (৳)</th>
                            <th style={thStyle}>Sub Total (৳)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invdata?.productdata?.map((item, i) => (
                            <tr key={i}>
                                <td style={tdStyle}>{item?.nameeng}</td>
                                <td style={tdStyle}>{item?.ProductCode}</td>
                                <td style={tdStyle}>{item?.quantity}</td>
                                <td style={tdStyle}>{item?.offer}</td>
                                <td style={tdStyle}>{item?.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div style={{ textAlign: "right", marginTop: "1rem" }}>
                    <h4 style={{ fontSize: "16px", fontWeight: "bold" }}>
                        Total: ৳ {invdata?.totalPrice?.toFixed(2)}
                    </h4>
                </div>
            </div>

{/* Status invoice seal */}
{(invdata?.status === "COD" || invdata?.status === "paid") && (
  <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
    <img
      src={invdata?.status === "COD" ? codimg : paidimg}
      alt="Invoice Status"
      style={{ width: "200px", height: "auto" }}
    />
  </div>
)}

        </div>
    );
};

const thStyle = {
    border: "1px solid #d1d5db",
    padding: "0.5rem",
    textAlign: "left",
    fontWeight: "bold",
};

const tdStyle = {
    border: "1px solid #d1d5db",
    padding: "0.5rem",
};

export default Invoice;