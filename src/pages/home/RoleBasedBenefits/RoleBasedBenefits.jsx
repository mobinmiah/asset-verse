import React from "react";
import { FaUsersCog, FaLaptop, FaChartLine, FaUserCheck } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const RoleBasedBenefits = () => {
  const { user } = useAuth();
  const { role } = useRole();

  // Benefits config
  const benefits = {
    hr: [
      {
        icon: <FaUsersCog className="text-3xl text-primary" />,
        title: "Centralized Asset Control",
        desc: "Manage all company assets from one dashboard with full visibility and control.",
      },
      {
        icon: <FaChartLine className="text-3xl text-primary" />,
        title: "Real-time Asset Tracking",
        desc: "Track availability, assignments, and returns with accurate real-time data.",
      },
      {
        icon: <FaUserCheck className="text-3xl text-primary" />,
        title: "Employee Asset Management",
        desc: "Assign, approve, and monitor assets issued to employees effortlessly.",
      },
    ],
    employee: [
      {
        icon: <FaLaptop className="text-3xl text-primary" />,
        title: "Easy Asset Requests",
        desc: "Request company assets quickly without paperwork or long approval chains.",
      },
      {
        icon: <FaUserCheck className="text-3xl text-primary" />,
        title: "Clear Asset Ownership",
        desc: "View assigned assets, return status, and request history in one place.",
      },
      {
        icon: <FaChartLine className="text-3xl text-primary" />,
        title: "Transparent Approval Process",
        desc: "Track your request status with complete transparency.",
      },
    ],
    guest: [
      {
        icon: <FaUsersCog className="text-3xl text-primary" />,
        title: "Corporate Asset Management",
        desc: "A modern platform to manage organizational assets efficiently.",
      },
      {
        icon: <FaChartLine className="text-3xl text-primary" />,
        title: "Smart Tracking System",
        desc: "Gain insights into asset usage, availability, and lifecycle.",
      },
      {
        icon: <FaUserCheck className="text-3xl text-primary" />,
        title: "Role-Based Access",
        desc: "Designed for both HR teams and employees with secure access control.",
      },
    ],
  };

  const activeBenefits = user
    ? role === "hr"
      ? benefits.hr
      : benefits.employee
    : benefits.guest;

  return (
    <section className="py-14 sm:py-16 lg:py-20 px-4 sm:px-8 lg:px-16  rounded-lg shadow-sm shadow-neutral bg-base-100">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary mb-4 text-center">
          Role Based Benefits
        </h2>
        <p className="text-center text-base-content/70 max-w-2xl mx-auto mb-12">
          {user
            ? role === "hr"
              ? "Built to empower HR teams with full control over company assets."
              : "Designed to simplify asset access and management for employees."
            : "A smart, scalable solution for modern corporate asset management."}
        </p>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {activeBenefits.map((item, index) => (
            <div
              key={index}
              className="card bg-base-200 shadow-md hover:shadow-lg transition rounded-2xl"
            >
              <div className="card-body items-center text-center">
                {item.icon}
                <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
                <p className="text-sm text-base-content/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RoleBasedBenefits;
