import React, { useRef } from 'react';
import { FcPrint } from 'react-icons/fc';
import codimg from '../../../../assets/cod.png';
import paidimg from '../../../../assets/paid.png';

const PaidInvoice = ({ paidInvdata }) => {

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
                <div style={{ textAlign: "center", display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
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
                            Order ID: #{paidInvdata?.orderId || "N/A"}
                        </h3>
                        <p>Date: {paidInvdata?.orderDate || "N/A"}</p>
                        <p>Customer: {paidInvdata?.name || "N/A"}</p>
                    </div>
                    <div>
                        <p>Email: {paidInvdata?.email || "N/A"}</p>
                        <p>Phone: {paidInvdata?.phonenumber || "N/A"}</p>
                        <p>Address: {paidInvdata?.dlocation},<br />{paidInvdata?.area},<br />{paidInvdata?.city},<br />{paidInvdata?.nationality}</p>
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
                            <th style={thStyle}>Price (৳)</th>
                            <th style={thStyle}>SubTotal (৳)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paidInvdata?.productdata?.map((item, i) => (
                            <tr key={i}>
                                <td style={tdStyle}>{item?.name}</td>
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
                        Total: ৳ {paidInvdata?.totalPrice?.toFixed(2)}
                    </h4>
                </div>
            </div>

            {(paidInvdata?.status === "COD" || paidInvdata?.status === "paid") && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}>
                    <img
                        src={paidInvdata?.status === "COD" ? codimg : paidimg}
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


export default PaidInvoice;