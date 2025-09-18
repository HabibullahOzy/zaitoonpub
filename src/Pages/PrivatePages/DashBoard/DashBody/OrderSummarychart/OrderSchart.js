// import { useQuery } from '@tanstack/react-query';
// import React, { useMemo, useState } from 'react';

// const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

// const OrderSchart = () => {
//      const { data: orders = [], isLoading } = useQuery({
//     queryKey: ["orders"],
//     queryFn: async () => {
//       const res = await fetch(`${process.env.REACT_APP_backendurl}/orders`);
//       return res.json();
//     },
//   });

//   const [year, setYear] = useState(new Date().getFullYear());
//   const [month, setMonth] = useState(new Date().getMonth());
//   const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });

//   const allData = useMemo(() => {
//     if (!orders || !orders.length) return [];

//     return orders.flatMap((order) => {
//       const dateStr = new Date(order.createdAt).toISOString().split("T")[0]; // YYYY-MM-DD
//       const totalQuantity = order.productdata.reduce((sum, p) => sum + (p.quantity || 0), 0);

//       return [{ date: dateStr, quantity: totalQuantity }];
//     });
//   }, [orders]);

//   const daysInMonth = getDaysInMonth(year, month);

//   const monthData = useMemo(() => {
//     const dataMap = {};

//     allData.forEach(({ date, quantity }) => {
//       const orderMonth = date.slice(0, 7);
//       const targetMonth = `${year}-${String(month + 1).padStart(2, "0")}`;

//       if (orderMonth === targetMonth) {
//         dataMap[date] = (dataMap[date] || 0) + quantity;
//       }
//     });

//     const daysArray = [];
//     for (let d = 1; d <= daysInMonth; d++) {
//       const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
//       daysArray.push({ date: dateStr, quantity: dataMap[dateStr] || 0 });
//     }

//     return daysArray;
//   }, [year, month, daysInMonth, allData]);

//   const maxQty = Math.max(...monthData.map((d) => d.quantity), 10);

//   const prevMonth = () => {
//     if (month === 0) {
//       setYear((y) => y - 1);
//       setMonth(11);
//     } else {
//       setMonth((m) => m - 1);
//     }
//   };

//   const nextMonth = () => {
//     if (month === 11) {
//       setYear((y) => y + 1);
//       setMonth(0);
//     } else {
//       setMonth((m) => m + 1);
//     }
//   };

//   const showTooltip = (e, quantity, date) => {
//     const rect = e.target.getBoundingClientRect();
//     setTooltip({
//       visible: true,
//       x: rect.left + rect.width / 2,
//       y: rect.top - 40,
//       content: `${date}\nOrders: ${quantity}`,
//     });
//   };

//   const hideTooltip = () => setTooltip({ visible: false, x: 0, y: 0, content: "" });
//     return (
//         <div className="min-h-screen p-4">
//       <div className="chartbody">
//         <h3 className="text-lg font-bold text-gray-800 mb-4 select-none">
//           📊 Order Quantity Gantt Chart -{" "}
//           {new Date(year, month).toLocaleString("default", {
//             month: "long",
//             year: "numeric",
//           })}
//         </h3>

//         <div className="mb-4">
//           <button
//             onClick={prevMonth}
//             className="mr-2 bg-green-400 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded shadow"
//           >
//             &lt; Prev Month
//           </button>
//           <button
//             onClick={nextMonth}
//             className="bg-blue-400 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded shadow"
//           >
//             Next Month &gt;
//           </button>
//         </div>

//         <div
//           style={{
//             display: "flex",
//             alignItems: "flex-end",
//             height: 220,
//             borderLeft: "3px solid #555",
//             borderBottom: "3px solid #555",
//             paddingLeft: 50,
//             padding: 24,
//             position: "relative",
//             minWidth: daysInMonth * 32,
//             background: "#fff",
//             borderRadius: 8,
//             boxShadow: "inset 0 0 10px rgb(0 0 0 / 0.05)",
//           }}
//         >
//           {/* Y Axis */}
//           <div
//             style={{
//               position: "absolute",
//               left: 0,
//               bottom: 0,
//               height: "100%",
//               display: "flex",
//               flexDirection: "column",
//               justifyContent: "space-between",
//               fontSize: 12,
//               color: "#555",
//               paddingBottom: 20,
//               userSelect: "none",
//             }}
//           >
//             {[maxQty, maxQty / 2, 0].map((val) => (
//               <div key={val} style={{ textAlign: "right", width: 40 }}>
//                 {Math.round(val)}
//               </div>
//             ))}
//           </div>

//           {/* Bars */}
//           {monthData.map(({ date, quantity }) => {
//             const height = (quantity / maxQty) * 170;
//             const day = parseInt(date.slice(-2), 10);

//             return (
//               <div
//                 key={date}
//                 onMouseEnter={(e) => quantity > 0 && showTooltip(e, quantity, date)}
//                 onMouseLeave={hideTooltip}
//                 style={{
//                   width: 28,
//                   margin: "0 3px",
//                   backgroundColor: quantity > 0 ? "#22c55e" : "#ddd",
//                   height,
//                   borderRadius: "6px 6px 0 0",
//                   boxShadow: quantity > 0 ? "0 4px 10px rgb(34 197 94 / 0.5)" : "none",
//                   cursor: quantity > 0 ? "pointer" : "default",
//                   display: "flex",
//                   alignItems: "flex-end",
//                   justifyContent: "center",
//                   color: "#333",
//                   fontWeight: "600",
//                   fontSize: 11,
//                   userSelect: "none",
//                 }}
//               >
//                 <div
//                   style={{
//                     writingMode: "vertical-rl",
//                     transform: "rotate(180deg)",
//                     marginBottom: 6,
//                     userSelect: "none",
//                     color: "#444",
//                     fontWeight: "500",
//                   }}
//                 >
//                   {day}
//                 </div>
//               </div>
//             );
//           })}

//           {/* Tooltip */}
//           {tooltip.visible && (
//             <div
//               style={{
//                 position: "fixed",
//                 top: tooltip.y,
//                 left: tooltip.x,
//                 backgroundColor: "#333",
//                 color: "#fff",
//                 padding: "6px 12px",
//                 borderRadius: 6,
//                 fontSize: 13,
//                 whiteSpace: "pre-line",
//                 pointerEvents: "none",
//                 transform: "translateX(-50%)",
//                 boxShadow: "0 3px 8px rgba(0,0,0,0.4)",
//                 zIndex: 1000,
//                 userSelect: "none",
//               }}
//             >
//               📦 {tooltip.content}
//             </div>
//           )}
//         </div>

//         {/* X Axis */}
//         <div
//           style={{
//             marginLeft: 50,
//             marginTop: 14,
//             display: "flex",
//             justifyContent: "space-between",
//             maxWidth: daysInMonth * 32,
//             fontSize: 13,
//             color: "#666",
//             userSelect: "none",
//             fontWeight: "600",
//           }}
//         >
//           <div>1</div>
//           <div>{Math.floor(daysInMonth / 2)}</div>
//           <div>{daysInMonth}</div>
//         </div>
//       </div>
//     </div>
//     );
// };

// export default OrderSchart;





import React, { useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const OrderSchart = () => {
  const { data: orders = [] } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/orders`);
      return res.json();
    },
  });

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });

  const allData = useMemo(() => {
    if (!orders.length) return [];
    return orders.flatMap((order) => {
      const dateStr = new Date(order.createdAt).toISOString().split("T")[0];
      const quantity = order.productdata.reduce((sum, p) => sum + (p.quantity || 0), 0);
      return [{ date: dateStr, quantity }];
    });
  }, [orders]);

  const daysInMonth = getDaysInMonth(year, month);

  const monthData = useMemo(() => {
    const map = {};
    allData.forEach(({ date, quantity }) => {
      const targetMonth = `${year}-${String(month + 1).padStart(2, '0')}`;
      if (date.startsWith(targetMonth)) {
        map[date] = (map[date] || 0) + quantity;
      }
    });

    return Array.from({ length: daysInMonth }, (_, i) => {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`;
      return { date: dateStr, quantity: map[dateStr] || 0 };
    });
  }, [allData, year, month, daysInMonth]);

  const maxQty = Math.max(...monthData.map((d) => d.quantity), 10);

  const prevMonth = () => {
    if (month === 0) {
      setYear((y) => y - 1);
      setMonth(11);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setYear((y) => y + 1);
      setMonth(0);
    } else setMonth((m) => m + 1);
  };

  const showTooltip = (e, content) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      x: rect.left + rect.width / 2,
      y: rect.top - 12,
      content,
    });
  };

  const hideTooltip = () => setTooltip({ visible: false, x: 0, y: 0, content: '' });

  return (
    <div className="p-4 md:p-6 lg:p-10">
      <div className="max-w-full mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          📊 Quantity of Ordered Products - {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
        </h2>

        <div className="flex justify-end gap-4 mb-6">
          <button onClick={prevMonth} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow">
            ← 
          </button>
          <button onClick={nextMonth} className="px-4 py-2 bg-green-300 hover:bg-green-500 text-white rounded shadow">
             →
          </button>
        </div>

        <div className="relative overflow-x-auto bg-white rounded-xl shadow-inner p-4">
          {/* Y Axis Labels */}
          <div className="absolute left-2 top-4 bottom-4 flex flex-col justify-between text-sm text-gray-500 font-semibold z-10">
            {[maxQty, maxQty / 2, 0].map((val) => (
              <div key={val} className="h-[170px] flex items-start">{Math.round(val)}</div>
            ))}
          </div>

          {/* Chart Bars */}
          <div
            className="flex items-end h-56 pl-14 relative"
            style={{ minWidth: `${daysInMonth * 30}px` }}
          >
            {monthData.map(({ date, quantity }) => {
              const height = (quantity / maxQty) * 170;
              const day = parseInt(date.slice(-2), 10);

              return (
                <div
                  key={date}
                  className="mx-[3px] flex flex-col items-center justify-end cursor-pointer"
                  onMouseEnter={(e) => quantity > 0 && showTooltip(e, `${date}\n📦 Products: ${quantity}`)}
                  onMouseLeave={hideTooltip}
                >
                  <div
                    className={`w-6 rounded-t-lg ${quantity > 0 ? "bg-green-500 shadow-md" : "bg-gray-300"} transition-all duration-200`}
                    style={{ height }}
                  />
                  <span className="mt-1 text-xs font-semibold text-gray-600">{day}</span>
                </div>
              );
            })}
          </div>

          {/* Tooltip */}
          {tooltip.visible && (
            <div
              className="fixed px-3 py-2 text-sm text-white bg-black rounded-lg shadow-lg z-50"
              style={{
                top: tooltip.y,
                left: tooltip.x,
                transform: "translate(-50%, -100%)",
                whiteSpace: "pre-line",
              }}
            >
              {tooltip.content}
            </div>
          )}
        </div>

        {/* X Axis Guide */}
        <div className="flex justify-between px-14 mt-4 text-sm text-gray-500 font-medium">
          <span>1</span>
          <span>{Math.floor(daysInMonth / 2)}</span>
          <span>{daysInMonth}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSchart;