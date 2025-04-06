"use client";

import { useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import LoanTable from "../components/LoanTable";
import {
  Users,
  CreditCard,
  PiggyBank,
  BarChart3,
  Building,
  DollarSign,
} from "lucide-react";
import { useLoanStore } from "../stores/loanStore";
import { useAdminStore } from "../stores/adminStore";
import AdminManagement from "../components/AdminManagement";

const AdminDashboard = () => {
  const { loans, initializeLoans } = useLoanStore();
  const { initializeAdmins } = useAdminStore();

  useEffect(() => {
    initializeLoans();
    initializeAdmins();
  }, [initializeLoans, initializeAdmins]);

  const stats = [
    {
      icon: <Users size={24} />,
      value: "200",
      label: "Active Users",
    },
    {
      icon: <Users size={24} />,
      value: "100",
      label: "Borrowers",
    },
    {
      icon: <DollarSign size={24} />,
      value: "550,000",
      label: "Cash Disbursed",
    },
    {
      icon: <BarChart3 size={24} />,
      value: "1,000,000",
      label: "Cash Received",
    },
    {
      icon: <PiggyBank size={24} />,
      value: "450,000",
      label: "Savings",
    },
    {
      icon: <Users size={24} />,
      value: "30",
      label: "Repaid Loans",
    },
    {
      icon: <Building size={24} />,
      value: "10",
      label: "Other Accounts",
    },
    {
      icon: <CreditCard size={24} />,
      value: "50",
      label: "Loans",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userType="Admin" />

      <div className="flex-1">
        <Header />

        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>

          <LoanTable title="Recent Loans" />

          <AdminManagement />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
