import React, { useState, useEffect, use } from "react";
import { Chart } from "primereact/chart";
import axios from "axios";
import { MdVisibility } from "react-icons/md";



// helper to group data
const groupBy = (data, format) => {
    return data.reduce((acc, item) => {
        const d = new Date(item.date);
        let key = "";
        if (format === "day") key = d.toISOString().split("T")[0]; // YYYY-MM-DD
        if (format === "month") key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`; // YYYY-MM
        if (format === "year") key = `${d.getFullYear()}`; // YYYY
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {});
};

const Visitorshow = () => {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [view, setView] = useState("day"); // "day" | "month" | "year"

    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue("--text-color");
        const textColorSecondary = documentStyle.getPropertyValue("--text-color-secondary");
        const surfaceBorder = documentStyle.getPropertyValue("--surface-border");


        axios.get(`${process.env.REACT_APP_backendurl}/visitor`)
            .then(response => {

                const rawData = response.data;
                // group data by selected view
                const grouped = groupBy(rawData, view);
                const labels = Object.keys(grouped).sort();
                const values = labels.map((key) => grouped[key]);

                const data = {
                    labels,
                    datasets: [
                        {
                            label: `Visits this ${view}`,
                            data: values,
                            fill: false,
                            tension: 0.4,
                            borderColor: documentStyle.getPropertyValue("--blue-500")
                        }
                    ]
                };

                const options = {
                    maintainAspectRatio: false,
                    aspectRatio: 0.6,
                    plugins: {
                        legend: {
                            labels: {
                                color: textColor
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: { color: textColorSecondary },
                            grid: { color: surfaceBorder }
                        },
                        y: {
                            ticks: { color: textColorSecondary },
                            grid: { color: surfaceBorder }
                        }
                    }
                };

                setChartData(data);
                setChartOptions(options);
            })
            .catch(error => {
                console.error("Error fetching visitor logs:", error);
            });


    }, [view]);

    return (
        <div className="card min-h-screen">
            <h1 className="flex text-black text-2xl font-semibold pb-5"><MdVisibility className="mr-2 text-[#4d89b3]" /> Visited Person</h1>
            <div className="flex gap-3 mb-3">
                <button onClick={() => setView("day")} className="px-3 py-1 bg-blue-500 text-white rounded">
                    Day
                </button>
                <button onClick={() => setView("month")} className="px-3 py-1 bg-green-500 text-white rounded">
                    Month
                </button>
                <button onClick={() => setView("year")} className="px-3 py-1 bg-purple-500 text-white rounded">
                    Year
                </button>
            </div>
            <Chart type="line" data={chartData} options={chartOptions} />
        </div>
    );
};

export default Visitorshow;