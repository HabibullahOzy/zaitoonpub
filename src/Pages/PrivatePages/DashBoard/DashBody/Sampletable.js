import React, { useState } from 'react';

const orderData = {
  name: "Mahbub Ullah Tanbir (Ethereal School)",
  email: "fcb39fcb-c6da-4fa0-98a8-1c1086b07f4d",
  phonenumber: "01879133734",
  dlocation: "Ethereal School, Safa tower, Doctor Para, Feni",
  ordnote: "tanbir779@gmail.com",
  totalPrice: 1850,
  orderDate: "September 18, 2025 at 11:40:06 AM",
  status: "confirm",
  orderId: "OI20250918-0002ZP",
  createdAt: "2025-09-18T05:46:34.986+00:00",
  productdata: [
    {
      _id: "68cb9b2551a85edaadef83e2",
      nameeng: "Al Huruful Arabiyah - 01",
      namebn: "আল হুরুফুল আরাবিয়্যাহ - ০১",
      productPrice: "350",
      category: "Play",
      ProductCode: "ZP001",
      authorName: "Dr. Muhammad Aminul Hoque",
      quantity: 1,
      total: 350,
    },
    {
      _id: "68cb9b2651a85edaadef83e3",
      nameeng: "Al Huruful Arabiyah - 02",
      namebn: "আল হুরুফুল আরাবিয়্যাহ - ০২",
      productPrice: "350",
      category: "Nursary",
      ProductCode: "ZP002",
      authorName: "Dr. Muhammad Aminul Hoque",
      quantity: 1,
      total: 350,
    },
    {
      _id: "68cb9b2a51a85edaadef83e5",
      nameeng: "Muslim Nursery Rhymes",
      namebn: "মুসলিম নার্সারি রাইমস",
      productPrice: "150",
      category: "KG",
      ProductCode: "ZP004",
      authorName: "Mustafa Yusuf Mcdermont",
      quantity: 1,
      total: 150,
    },
  ],
};

const Sampletable = () => {
     const [expanded, setExpanded] = useState(false);

    return (
        <div style={{ padding: "20px" }}>
      <h2>Order Table (Nested Example)</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ background: "#f2f2f2" }}>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Total</th>
            <th>Status</th>
            <th>Expand</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orderData.orderId}</td>
            <td>{orderData.name}</td>
            <td>{orderData.ordnote}</td>
            <td>{orderData.phonenumber}</td>
            <td>{orderData.dlocation}</td>
            <td>{orderData.totalPrice}</td>
            <td>{orderData.status}</td>
            <td>
              <button onClick={() => setExpanded(!expanded)}>
                {expanded ? "Hide" : "View Products"}
              </button>
            </td>
          </tr>

          {expanded && (
            <tr>
              <td colSpan="8">
                {/* Child Table */}
                <table border="1" cellPadding="6" cellSpacing="0" style={{ width: "100%", marginTop: "10px", borderCollapse: "collapse" }}>
                  <thead style={{ background: "#e9f5ff" }}>
                    <tr>
                      <th>Product Code</th>
                      <th>Name (English)</th>
                      <th>Name (Bangla)</th>
                      <th>Category</th>
                      <th>Author</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderData.productdata.map((product) => (
                      <tr key={product._id}>
                        <td>{product.ProductCode}</td>
                        <td>{product.nameeng}</td>
                        <td>{product.namebn}</td>
                        <td>{product.category}</td>
                        <td>{product.authorName}</td>
                        <td>{product.productPrice}</td>
                        <td>{product.quantity}</td>
                        <td>{product.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    );
};

export default Sampletable;