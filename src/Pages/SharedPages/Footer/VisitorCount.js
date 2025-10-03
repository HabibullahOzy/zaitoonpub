// import React, { useEffect, useState } from 'react';
// import dayjs from "dayjs";

// const VisitorCount = () => {
//     const [stats, setStats] = useState({ today: 0, yesterday: 0, month: 0, total: 0 });


//     const websiteId = process.env.REACT_APP_umamiwebsiteid;

//     const umamiUrl = process.env.REACT_APP_umamihost; // example: https://umami.yourdomain.com

//     const username = process.env.REACT_APP_username;

//     const password = process.env.REACT_APP_password;


//     const getDateRange = (type) => {
//         const today = dayjs();
//         if (type === "today") return [today.startOf("day"), today.endOf("day")];
//         if (type === "yesterday") {
//             const y = today.subtract(1, "day");
//             return [y.startOf("day"), y.endOf("day")];
//         }
//         if (type === "month") return [today.startOf("month"), today.endOf("month")];
//         if (type === "total") return [dayjs("2024-01-01"), today.endOf("day")]; // adjust if needed
//     };

//     useEffect(() => {
//         const loadStats = async () => {
//             try {
//                 const loginRes = await fetch(`${umamiUrl}/api/auth/login`, {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({ username, password }),
//                 });

//                 const { token } = await loginRes.json();

//                 const all = await Promise.all(
//                     ["today", "yesterday", "month", "total"].map(async (range) => {
//                         const [start, end] = getDateRange(range);
//                         const res = await fetch(`${umamiUrl}/api/websites/${websiteId}/metrics`, {
//                             method: "POST",
//                             headers: {
//                                 Authorization: `Bearer ${token}`,
//                                 "Content-Type": "application/json",
//                             },
//                             body: JSON.stringify({
//                                 type: "event",
//                                 metric: "visitors",
//                                 startAt: start.valueOf(),
//                                 endAt: end.valueOf(),
//                             }),
//                         });
//                         const data = await res.json();
//                         return { [range]: data?.value || 0 };
//                     })
//                 );

//                 setStats(Object.assign({}, ...all));
//             } catch (error) {
//                 console.error("Failed to load stats:", error);
//             }
//         };

//         loadStats();
//     }, [umamiUrl, websiteId, username, password]);


// //     const [stats, setStats] = useState({ today: 0, yesterday: 0, month: 0, total: 0 });



// //   useEffect(() => {
// //     const loadStats = async () => {
// //       try {
// //         const res = await fetch("${process.env.REACT_APP_backendurl}/api/visitor-stats");
// //         const data = await res.json();

// //         const reducedStats = {
// //           today: data.data?.find(item => item.label === "Today")?.value || 0,
// //           yesterday: data.data?.find(item => item.label === "Yesterday")?.value || 0,
// //           month: data.data?.find(item => item.label === "This month")?.value || 0,
// //           total: data.data?.find(item => item.label === "Total")?.value || 0,
// //         };

// //         setStats(reducedStats);
// //       } catch (err) {
// //         console.error("Failed to load visitor stats", err);
// //       }
// //     };

// //     loadStats();
// //   }, []);

//     return (
//         <div className="">
//             <h6 className="footer-title bg-green-500 p-3">Visitor counter</h6>
//             <div className="link link-hover">👁️ Today: {stats.today}</div>
//             <div className="link link-hover">👁️ Yesterday: {stats.yesterday}</div>
//             <div className="link link-hover">👁️ This Month: {stats.month}</div>
//             <div className="link link-hover">👁️ Total: {stats.total}</div>
//         </div>
//     );
// };

// export default VisitorCount;