import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const OrderPieChart = () => {
  const { data: orders = [] } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_backendurl}/orders`);
      return res.json();
    },
  });

  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth());

  const daysInMonth = getDaysInMonth(year, month);

  const dailyOrderCounts = useMemo(() => {
    const countMap = Array(daysInMonth).fill(0);

    orders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      if (
        createdAt.getFullYear() === year &&
        createdAt.getMonth() === month
      ) {
        const day = createdAt.getDate();
        countMap[day - 1] += 1;
      }
    });

    return countMap;
  }, [orders, year, month, daysInMonth]);

  const labels = Array.from({ length: daysInMonth }, (_, i) => `Day ${i + 1}`);

  const backgroundColors = dailyOrderCounts.map((count) => {
    if (count === 0) return "rgba(229, 231, 235, 0.6)"; // Gray
    if (count <= 3) return "rgba(239, 68, 68, 0.8)"; // Red
    if (count <= 6) return "rgba(250, 204, 21, 0.8)"; // Yellow
    return "rgba(34, 197, 94, 0.8)"; // Green
  });

  const chartData = {
    labels,
    datasets: [
      {
        label: "Orders",
        data: dailyOrderCounts,
        backgroundColor: backgroundColors,
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          padding: 16,
          color: "#333",
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ${ctx.parsed} orders`,
        },
      },
    },
  };

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

  return (
    <div className="p-4 min-h-screen">
      <h2 className="text-xl font-semibold mb-4 text-black">
        🥧 Daily Orders –{" "}
        {new Date(year, month).toLocaleString("default", {
          month: "long",
          year: "numeric",
        })}
      </h2>

      <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={prevMonth}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          ← 
        </button>
        <button
          onClick={nextMonth}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
           →
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        <div className="min-w-[400px] h-[300px]">
          <Pie className="" data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default OrderPieChart;