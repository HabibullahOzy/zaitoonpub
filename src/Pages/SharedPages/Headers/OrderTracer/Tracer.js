import React from "react";
import {
  FaClipboardCheck,
  FaBoxOpen,
  FaTruck,
  FaShippingFast,
  FaCheckCircle,
} from "react-icons/fa";

const steps = [
  {
    label: "Order Placed",
    icon: <FaClipboardCheck />,
    message: "We have received your order",
  },
  {
    label: "Order Packed",
    icon: <FaBoxOpen />,
    message: "Your items are packed securely",
  },
  {
    label: "Shipped",
    icon: <FaTruck />,
    message: "Order has left the warehouse",
  },
  {
    label: "Out for Delivery",
    icon: <FaShippingFast />,
    message: "Courier is on the way",
  },
  {
    label: "Delivered",
    icon: <FaCheckCircle />,
    message: "Order delivered successfully 🎉",
  },
];

const Tracer = ({ currentStep = 2 }) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      {/* Tracker */}
      <div className="flex items-center justify-between relative">
        {steps?.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center relative">
            {/* Line */}
            {index !== 0 && (
              <div
                className={`absolute top-5 left-0 w-full h-1 -z-10
                transition-all duration-700
                ${index <= currentStep ? "bg-green-500" : "bg-gray-300"}`}
              />
            )}

            {/* Icon Circle */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-xl
              transition-all duration-500
              ${
                index <= currentStep
                  ? "bg-green-500 text-white scale-110 animate-pulse"
                  : "bg-gray-300 text-gray-600"
              }`}
            >
              {step.icon}
            </div>

            {/* Label */}
            <p
              className={`mt-2 text-sm font-semibold text-center
              ${index <= currentStep ? "text-green-600" : "text-gray-500"}`}
            >
              {step.label}
            </p>
          </div>
        ))}
      </div>

      {/* Message */}
      <div className="mt-6 text-center">
        <p className="text-base font-medium text-green-600 animate-fadeIn">
          {steps[currentStep]?.message}
        </p>
      </div>
    </div>
  );
};

export default Tracer;
