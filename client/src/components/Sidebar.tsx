"use client"

import { Link, useLocation } from "react-router-dom"
import { useUser } from "../context/UserContext"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Repeat,
  Settings,
  FileText,
  Briefcase,
  UserCog,
  PiggyBank,
  DollarSign,
  FileSignature,
  Landmark,
  Calendar,
  LogOut,
  BarChart3,
} from "lucide-react"

interface SidebarProps {
  userType: "Admin" | "Verifier"
}

const Sidebar = ({ userType }: SidebarProps) => {
  const { user, logout } = useUser()
  const location = useLocation()
  const basePath = `/${userType.toLowerCase()}`

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: `${basePath}/` },
    { name: "Borrowers", icon: <Users size={20} />, path: `${basePath}/borrowers` },
    { name: "Loans", icon: <CreditCard size={20} />, path: `${basePath}/loans` },
    { name: "Repayments", icon: <Repeat size={20} />, path: `${basePath}/repayments` },
    { name: "Loan Parameters", icon: <Settings size={20} />, path: `${basePath}/loan-parameters` },
    { name: "Accounting", icon: <FileText size={20} />, path: `${basePath}/accounting` },
    { name: "Reports", icon: <BarChart3 size={20} />, path: `${basePath}/reports` },
    { name: "Collateral", icon: <Briefcase size={20} />, path: `${basePath}/collateral` },
    { name: "Access Configuration", icon: <UserCog size={20} />, path: `${basePath}/access-configuration` },
    { name: "Savings", icon: <PiggyBank size={20} />, path: `${basePath}/savings` },
  ]

  // Add additional menu items for Admin
  const adminItems = [
    { name: "Other Incomes", icon: <Landmark size={20} />, path: `${basePath}/other-incomes` },
    { name: "Payroll", icon: <DollarSign size={20} />, path: `${basePath}/payroll` },
  ]

  // Common items for both roles
  const commonItems = [
    { name: "Expenses", icon: <DollarSign size={20} />, path: `${basePath}/expenses` },
    { name: "E-signature", icon: <FileSignature size={20} />, path: `${basePath}/e-signature` },
    { name: "Investor Accounts", icon: <Landmark size={20} />, path: `${basePath}/investor-accounts` },
    { name: "Calendar", icon: <Calendar size={20} />, path: `${basePath}/calendar` },
    { name: "Settings", icon: <Settings size={20} />, path: `${basePath}/settings` },
  ]

  const allItems = userType === "Admin" ? [...menuItems, ...adminItems, ...commonItems] : [...menuItems, ...commonItems]

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="w-64 min-h-screen bg-green-900 text-white">
      <div className="p-4 flex items-center">
        <div className="w-10 h-10 rounded-full bg-green-700 flex items-center justify-center">
          <span className="text-white">{user?.name.charAt(0)}</span>
        </div>
        <span className="ml-2 text-sm">{user?.name}</span>
      </div>

      <nav className="mt-4">
        <ul>
          {allItems.map((item) => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm hover:bg-green-800 ${
                  location.pathname === item.path ? "bg-green-800" : ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.name}
              </Link>
            </li>
          ))}

          <li>
            <button
              onClick={handleLogout}
              className="flex items-center px-4 py-3 text-sm hover:bg-green-800 w-full text-left"
            >
              <span className="mr-3">
                <LogOut size={20} />
              </span>
              Sign Out
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar

