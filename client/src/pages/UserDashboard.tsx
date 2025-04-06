"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CreditCard,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useUser } from "../context/UserContext";
import { useLoanStore } from "../stores/loanStore";
import UserHeader from "../components/UserHeader";

// Sample loan data matching the Loan interface
const sampleLoans = [
  {
    id: "1",
    customerName: "John Doe",
    activity: "Personal Loan",
    amount: "50000",
    tenure: "12",
    reason: "Debt consolidation",
    status: "APPROVED" as const,
    updatedDays: 5,
    registrationDate: "2023-10-10",
    date: "2023-10-15",
    time: "10:30 AM",
  },
  {
    id: "2",
    customerName: "John Doe",
    activity: "Business Expansion",
    amount: "200000",
    tenure: "24",
    reason: "Expand retail business",
    status: "PENDING" as const,
    updatedDays: 3,
    registrationDate: "2023-10-30",
    date: "2023-11-02",
    time: "02:15 PM",
  },
  {
    id: "3",
    customerName: "John Doe",
    activity: "Emergency Loan",
    amount: "30000",
    tenure: "6",
    reason: "Medical expenses",
    status: "REJECTED" as const,
    updatedDays: 10,
    registrationDate: "2023-09-10",
    date: "2023-09-20",
    time: "09:45 AM",
  },
  {
    id: "4",
    customerName: "John Doe",
    activity: "Education Loan",
    amount: "75000",
    tenure: "18",
    reason: "University tuition",
    status: "APPROVED" as const,
    updatedDays: 2,
    registrationDate: "2023-08-03",
    date: "2023-08-05",
    time: "11:20 AM",
  },
  {
    id: "5",
    customerName: "John Doe",
    activity: "Home Renovation",
    amount: "150000",
    tenure: "36",
    reason: "Kitchen remodeling",
    status: "PENDING" as const,
    updatedDays: 1,
    registrationDate: "2023-12-09",
    date: "2023-12-10",
    time: "04:30 PM",
  },
  {
    id: "6",
    customerName: "John Doe",
    activity: "Car Purchase",
    amount: "800000",
    tenure: "48",
    reason: "New vehicle",
    status: "VERIFIED" as const,
    updatedDays: 7,
    registrationDate: "2023-07-15",
    date: "2023-07-22",
    time: "03:10 PM",
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const loans = useLoanStore((state) => state.loans);
  const initializeLoans = useLoanStore((state) => state.initializeLoans);
  const addLoan = useLoanStore((state) => state.addLoan);

  const [activeTab, setActiveTab] = useState("borrow");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(7);
  const [sortField, setSortField] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log("Initializing loans...");
        await initializeLoans();

        // Add sample loans if no loans exist
        if (loans.length === 0 && user?.name) {
          sampleLoans.forEach((loan) => {
            addLoan({
              ...loan,
              customerName: user.name, // Use the current user's name
            });
          });
        }

        console.log("Loans initialized:", loans);
      } catch (error) {
        console.error("Error loading loans:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [initializeLoans, addLoan, user?.name, loans.length]);

  const userLoans = loans.filter((loan) => {
    if (!user?.name) return false;
    const userName = user.name.toLowerCase().trim();
    const customerName = (loan.customerName || "").toLowerCase().trim();
    return customerName.includes(userName) || userName.includes(customerName);
  });

  const filteredLoans = userLoans.filter(
    (loan) =>
      loan.activity?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loan.status?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedLoans = [...filteredLoans].sort((a, b) => {
    if (!sortField) return 0;
    return sortDirection === "asc"
      ? new Date(a.date).getTime() - new Date(b.date).getTime()
      : new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const indexOfLastLoan = currentPage * rowsPerPage;
  const indexOfFirstLoan = indexOfLastLoan - rowsPerPage;
  const currentLoans = sortedLoans.slice(indexOfFirstLoan, indexOfLastLoan);
  const totalPages = Math.ceil(sortedLoans.length / rowsPerPage);

  const handleSort = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    setSortField("date");
  };

  const handleFilter = () => {
    console.log("Filter clicked");
  };

  const handleApplyForLoan = () => {
    navigate("/user/apply");
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500";
      case "VERIFIED":
        return "bg-green-500";
      case "APPROVED":
        return "bg-blue-600";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <UserHeader />
        <div className="p-6 flex justify-center items-center h-64">
          <div className="text-lg">Loading your loans...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <UserHeader />
      <div className="p-6">
        <div className="text-sm text-gray-500 mb-4">
          USER - DASHBOARD - LOANS
        </div>

        <div className="bg-white p-6 rounded-md shadow-sm mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-green-800 text-white p-2 rounded-md mr-4">
                <CreditCard size={24} />
              </div>
              <div>
                <div className="text-xs text-gray-500">DEPOSIT</div>
                <div className="text-2xl font-bold">₦ 0.0</div>
              </div>
            </div>
            <button
              onClick={handleApplyForLoan}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition-colors"
            >
              Get A Loan
            </button>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm mb-6">
          <div className="flex border-b">
            {["borrow", "transact", "deposit"].map((tab) => (
              <button
                key={tab}
                className={`flex-1 py-3 text-center ${
                  activeTab === tab ? "bg-green-50 text-green-800" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === "borrow"
                  ? "Borrow Cash"
                  : tab === "transact"
                  ? "Transact"
                  : "Deposit Cash"}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm mb-6 p-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for loans"
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-md shadow-sm">
          <div className="p-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Applied Loans</h2>
            <div className="flex space-x-2">
              <button
                onClick={handleSort}
                className="px-3 py-1 text-sm border border-gray-300 rounded flex items-center"
              >
                Sort {sortDirection === "asc" ? "↑" : "↓"}
              </button>
              <button
                onClick={handleFilter}
                className="px-3 py-1 text-sm border border-gray-300 rounded flex items-center"
              >
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-500 text-sm border-b">
                  <th className="px-4 py-2">Loan Officer</th>
                  <th className="px-4 py-2">Amount</th>
                  <th className="px-4 py-2">Tenure (months)</th>
                  <th className="px-4 py-2">Date Applied</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {currentLoans.length > 0 ? (
                  currentLoans.map((loan) => (
                    <tr key={loan.id} className="border-b">
                      <td className="px-4 py-4">
                        <div className="flex items-center">
                          <img
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                              loan.customerName
                            )}&background=random`}
                            alt={loan.customerName}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <div>
                            <div className="text-sm">{loan.customerName}</div>
                            <div className="text-xs text-gray-500">
                              {loan.activity}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        ₦
                        {loan.amount
                          ? Number(loan.amount).toLocaleString()
                          : "0"}
                      </td>
                      <td className="px-4 py-4">{loan.tenure}</td>
                      <td className="px-4 py-4">
                        {loan.date} at {loan.time}
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`px-3 py-1 text-xs text-white rounded-full ${getStatusClass(
                            loan.status
                          )}`}
                        >
                          {loan.status}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-right">
                        <button className="text-gray-500">
                          <MoreVertical size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-4 py-4 text-center text-gray-500"
                    >
                      {userLoans.length === 0
                        ? "No loans found for your account."
                        : "No loans match your search criteria."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {filteredLoans.length > 0 && (
            <div className="p-4 flex items-center justify-between text-sm text-gray-500">
              <div className="flex items-center">
                <span>Rows per page:</span>
                <select
                  className="ml-2 border-none bg-transparent"
                  value={rowsPerPage}
                  onChange={(e) => setRowsPerPage(Number(e.target.value))}
                >
                  <option value={5}>5</option>
                  <option value={7}>7</option>
                  <option value={10}>10</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="text-gray-500 disabled:opacity-50"
                >
                  <ChevronLeft />
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="text-gray-500 disabled:opacity-50"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
