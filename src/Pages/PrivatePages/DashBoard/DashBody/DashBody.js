import React, { useContext, useEffect, useMemo, useState } from "react";
import './DashBoard.css';
import { MdOutlinePendingActions } from 'react-icons/md';
import { AiFillProduct } from 'react-icons/ai';
import axios from "axios";
import { Link } from "react-router-dom";
import { Zaitooncontext } from "../../../../SecureContext/ContextAuth";

// Sample data: dates & order quantity (dates in YYYY-MM-DD format)
const allData = [
    { date: "2025-04-28", quantity: 3 },
    { date: "2025-04-30", quantity: 2 },
    { date: "2025-05-01", quantity: 7 },
    { date: "2025-05-02", quantity: 4 },
    { date: "2025-05-05", quantity: 500 },
    { date: "2025-05-10", quantity: 5 },
    { date: "2025-05-20", quantity: 8 },
    { date: "2025-05-25", quantity: 3 },
    { date: "2025-06-01", quantity: 10 },
    { date: "2025-06-05", quantity: 2 },
    { date: "2025-06-15", quantity: 100 },
];

function getDaysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
}




const DashBody = () => {

    const {user}=useContext(Zaitooncontext)
    // console.log(user)
    // Start with May 2025 for example
    const [year, setYear] = useState(2025);
    const [month, setMonth] = useState(4); // May (0-based index)
    const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: "" });
    const [countallProd, setCountallProd] = useState(0)



    // for only users

    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/allusers`)
                .then((res) => {
                    const allusers = res.data
                    // console.log(allusers)

                    const end = allusers.length;
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setCount(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);


    //   for only users

    // Total pending Order


    const [viewPending, setViewPending] = useState(0)


    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/caspurchage/pending`)
                .then((res) => {
                    const allpending = res.data
                    // console.log(allusers)

                    const end = allpending.length;
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setViewPending(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);



    // Total products show

    useEffect(() => {
        let start = 0;

        try {
            axios.get(`${process.env.REACT_APP_backendurl}/allProducts`)
                .then((res) => {
                    const allproducts = res.data
                    // console.log(allusers)

                    const end = allproducts.length;
                    // totalUsers;
                    if (start === end) return;

                    const duration = 1000;
                    const incrementTime = 20;
                    const step = Math.ceil((end - start) / (duration / incrementTime));

                    const timer = setInterval(() => {
                        start += step;
                        if (start >= end) {
                            start = end;
                            clearInterval(timer);
                        }
                        setCountallProd(start);
                    }, incrementTime);

                    return () => clearInterval(timer);
                })
        }
        catch (error) {

        }
    }, []);

    // Total products count end


    const daysInMonth = getDaysInMonth(year, month);

    // Filter data for the current month
    const monthData = useMemo(() => {
        const dataMap = {};
        allData.forEach(({ date, quantity }) => {
            if (date.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)) {
                dataMap[date] = quantity;
            }
        });

        const daysArray = [];
        for (let d = 1; d <= daysInMonth; d++) {
            const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
            daysArray.push({ date: dateStr, quantity: dataMap[dateStr] || 0 });
        }
        return daysArray;
    }, [year, month, daysInMonth]);

    const maxQty = Math.max(...monthData.map((d) => d.quantity), 10);

    // Pagination controls
    const prevMonth = () => {
        if (month === 0) {
            setYear((y) => y - 1);
            setMonth(11);
        } else {
            setMonth((m) => m - 1);
        }
    };
    const nextMonth = () => {
        if (month === 11) {
            setYear((y) => y + 1);
            setMonth(0);
        } else {
            setMonth((m) => m + 1);
        }
    };

    // Tooltip handlers
    const showTooltip = (e, quantity, date) => {
        const rect = e.target.getBoundingClientRect();
        setTooltip({
            visible: true,
            x: rect.left + rect.width / 2,
            y: rect.top - 40,
            content: `${date}\nOrders: ${quantity}`,
        });
    };
    const hideTooltip = () => setTooltip({ visible: false, x: 0, y: 0, content: "" });

    return (
        <div className="min-h-screen">
           
           {}
            <div
                className="chartbody"
            >
                <h3
                    style={{
                        marginBottom: 16,
                        fontWeight: "700",
                        color: "#333",
                        userSelect: "none",
                    }}
                >
                    📊 Order Quantity Gantt Chart -{" "}
                    {new Date(year, month).toLocaleString("default", { month: "long", year: "numeric" })}
                </h3>

                <div style={{ marginBottom: 20 }}>
                    <button
                        onClick={prevMonth}
                        style={{
                            marginRight: 8,
                            padding: "8px 14px",
                            fontWeight: "600",
                            borderRadius: 6,
                            border: "none",
                            cursor: "pointer",
                            backgroundColor: "#4ade80",
                            color: "#fff",
                            boxShadow: "0 3px 6px rgb(74 222 128 / 0.4)",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#22c55e")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#4ade80")}
                    >
                        &lt; Prev Month
                    </button>
                    <button
                        onClick={nextMonth}
                        style={{
                            padding: "8px 14px",
                            fontWeight: "600",
                            borderRadius: 6,
                            border: "none",
                            cursor: "pointer",
                            backgroundColor: "#60a5fa",
                            color: "#fff",
                            boxShadow: "0 3px 6px rgb(96 165 250 / 0.4)",
                            transition: "background-color 0.3s",
                        }}
                        onMouseEnter={(e) => (e.target.style.backgroundColor = "#3b82f6")}
                        onMouseLeave={(e) => (e.target.style.backgroundColor = "#60a5fa")}
                    >
                        Next Month &gt;
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        alignItems: "flex-end",
                        height: 220,
                        borderLeft: "3px solid #555",
                        borderBottom: "3px solid #555",
                        paddingLeft: 50,
                        padding: 24,
                        position: "relative",
                        minWidth: daysInMonth * 32,
                        background: "#fff",
                        borderRadius: 8,
                        boxShadow: "inset 0 0 10px rgb(0 0 0 / 0.05)",
                    }}
                >
                    {/* Y Axis Labels */}
                    <div
                        style={{
                            position: "absolute",
                            left: 0,
                            bottom: 0,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            fontSize: 12,
                            color: "#555",
                            paddingBottom: 20,
                            userSelect: "none",
                        }}
                    >
                        {[maxQty, maxQty / 2, ''].map((val) => (
                            <div key={val} style={{ textAlign: "right", width: 40 }}>
                                {Math.round(val)}
                            </div>
                        ))}
                    </div>

                    {/* Bars */}
                    {monthData.map(({ date, quantity }) => {
                        const height = (quantity / maxQty) * 170; // max 170px bar height
                        const day = parseInt(date.slice(-2), 10);

                        return (
                            <div
                                key={date}
                                onMouseEnter={(e) => quantity > 0 && showTooltip(e, quantity, date)}
                                onMouseLeave={hideTooltip}
                                style={{
                                    width: 28,
                                    margin: "0 3px",
                                    backgroundColor: quantity > 0 ? "#22c55e" : "#ddd",
                                    height,
                                    borderRadius: "6px 6px 0 0",
                                    boxShadow: quantity > 0 ? "0 4px 10px rgb(34 197 94 / 0.5)" : "none",
                                    cursor: quantity > 0 ? "pointer" : "default",
                                    display: "flex",
                                    alignItems: "flex-end",
                                    justifyContent: "center",
                                    color: "#333",
                                    fontWeight: "600",
                                    fontSize: 11,
                                    userSelect: "none",
                                    position: "relative",
                                    transition: "background-color 0.3s, box-shadow 0.3s",
                                }}


                            >
                                {/* Day number vertical text */}
                                <div
                                    style={{
                                        writingMode: "vertical-rl",
                                        transform: "rotate(180deg)",
                                        marginBottom: 6,
                                        userSelect: "none",
                                        color: "#444",
                                        fontWeight: "500",
                                    }}
                                >
                                    {day}
                                </div>
                            </div>
                        );
                    })}

                    {/* Tooltip */}
                    {tooltip.visible && (
                        <div
                            style={{
                                position: "fixed",
                                top: tooltip.y,
                                left: tooltip.x,
                                backgroundColor: "#333",
                                color: "#fff",
                                padding: "6px 12px",
                                borderRadius: 6,
                                fontSize: 13,
                                whiteSpace: "pre-line",
                                pointerEvents: "none",
                                transform: "translateX(-50%)",
                                boxShadow: "0 3px 8px rgba(0,0,0,0.4)",
                                zIndex: 1000,
                                userSelect: "none",
                            }}
                        >
                            {/* <FcAcceptDatabase className="text-xl" /> */}
                            📦 {tooltip.content}
                        </div>
                    )}
                </div>

                {/* X Axis Label */}
                <div
                    style={{
                        marginLeft: 50,
                        marginTop: 14,
                        display: "flex",
                        justifyContent: "space-between",
                        maxWidth: daysInMonth * 32,
                        fontSize: 13,
                        color: "#666",
                        userSelect: "none",
                        fontWeight: "600",
                    }}
                >
                    <div>1</div>
                    <div>{Math.floor(daysInMonth / 2)}</div>
                    <div>{daysInMonth}</div>
                </div>
            </div>


            {/* order gant chart end */}


            <div className="flex mt-16">

                {/* User collections */}

                <div style={styles.card}>
                    <h1 style={{ fontSize: '40px' }}>👥</h1>
                    <h2 style={styles.title}>Total Users</h2>
                    <div style={styles.count}>{count.toLocaleString()}</div>
                </div>

                {/* User collections */}

                {/* Pending order count */}

                <Link to={'/dashboard/pendingOrder'}>
                    <div style={styles.card}>
                        <h1 style={{ fontSize: '40px' }}><MdOutlinePendingActions className="text-center" /></h1>
                        <h2 style={styles.title}>Total Pending Products</h2>
                        <div style={styles.count}>{viewPending.toLocaleString()}</div>
                    </div>
                </Link>
                {/* Pending order count */}

                {/* Total products show */}

               
                <div style={styles.card}>
                    <Link to={'/dashboard/allProducts'} >
                    <h1 style={{ fontSize: '40px' }}><AiFillProduct className="text-center" /></h1>
                    <h2 style={styles.title}>Total Products</h2>
                    <div style={styles.count}>{countallProd.toLocaleString()}</div>
                    </Link>
                </div>
               

                {/* tota products show end */}
            </div>
        </div>
    );
};



const styles = {
    card: {
        background: 'linear-gradient(to right, #4ade80, #22c55e)',
        color: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        textAlign: 'center',
        width: '250px',
        margin: 'auto',
        fontFamily: 'sans-serif',
    },
    title: {
        fontSize: '1.25rem',
        marginBottom: '0.5rem',
    },
    count: {
        fontSize: '2.5rem',
        fontWeight: 'bold',
        transition: 'all 0.3s ease-in-out',
    },
};
export default DashBody;
