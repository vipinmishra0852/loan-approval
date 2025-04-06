"use client"

import { useEffect } from "react"
import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import StatCard from "../components/StatCard"
import LoanTable from "../components/LoanTable"
import { Users, CreditCard, PiggyBank, BarChart3, DollarSign } from "lucide-react"
import { useLoanStore } from "../stores/loanStore"

const VerifierDashboard = () => {
  const { initializeLoans } = useLoanStore()

  useEffect(() => {
    initializeLoans()
  }, [initializeLoans])

  const stats = [
    {
      icon: <CreditCard size={24} />,
      value: "50",
      label: "Loans",
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
      icon: <BarChart3 size={24} />,
      value: "1,000,000",
      label: "Cash Received",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userType="Verifier" />

      <div className="flex-1">
        <Header />

        <main className="p-6">
          <div className="flex items-center mb-6">
            <h1 className="text-2xl font-semibold">Dashboard</h1>
            <span className="mx-2">-</span>
            <h2 className="text-2xl font-semibold text-green-800">Loans</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} icon={stat.icon} value={stat.value} label={stat.label} />
            ))}
          </div>

          <LoanTable title="Applied Loans" />
        </main>
      </div>
    </div>
  )
}

export default VerifierDashboard

