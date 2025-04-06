"use client";

import { useState } from "react";
import { MoreVertical, RefreshCw, Search } from "lucide-react";
import { useLoanStore } from "../stores/loanStore";
import { useUser } from "../context/UserContext";
import { useAdminStore } from "../stores/adminStore";
import type { Loan } from "../stores/loanStore";

interface LoanTableProps {
  title: string;
  showOnlyUserLoans?: boolean;
  showSearch?: boolean;
}

interface User {
  id?: string;
  name?: string;
  userType?: string;
}

const LoanTable = ({
  title,
  showOnlyUserLoans = false,
  showSearch = false,
}: LoanTableProps) => {
  const { loans, updateLoanStatus } = useLoanStore();
  const { user } = useUser() as { user: User };
  useAdminStore(); // Assuming addAdmin isn't used here

  const [sortField, setSortField] = useState<keyof Loan>("date");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSort = (field: keyof Loan) => {
    setSortDirection(
      sortField === field && sortDirection === "asc" ? "desc" : "asc"
    );
    setSortField(field);
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateLoanStatus(id, newStatus);
  };

  const filteredLoans = loans.filter((loan) => {
    const userMatch = showOnlyUserLoans
      ? loan.customerName?.toLowerCase() === user?.name?.toLowerCase()
      : true;

    const searchMatch =
      showSearch && searchTerm
        ? [loan.customerName, loan.activity, loan.status].some((field) =>
            field?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true;

    return userMatch && searchMatch;
  });

  const sortedLoans = [...filteredLoans].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];

    if (sortField === "date") {
      return sortDirection === "asc"
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-3 py-1 text-xs text-white rounded inline-block";
    const colorMap: Record<string, string> = {
      PENDING: "bg-yellow-500",
      VERIFIED: "bg-blue-500",
      APPROVED: "bg-green-500",
      REJECTED: "bg-red-500",
      DISBURSED: "bg-purple-500",
    };

    return (
      <span className={`${baseClasses} ${colorMap[status] || "bg-gray-500"}`}>
        {status}
      </span>
    );
  };

  const renderActionButtons = (loan: Loan) => {
    if (user?.userType === "Admin" && loan.status === "VERIFIED") {
      return (
        <>
          <button
            onClick={() => handleStatusChange(loan.id, "APPROVED")}
            className="text-green-600 hover:text-green-900"
          >
            Approve
          </button>
          <button
            onClick={() => handleStatusChange(loan.id, "REJECTED")}
            className="text-red-600 hover:text-red-900"
          >
            Reject
          </button>
        </>
      );
    }

    if (user?.userType === "Verifier" && loan.status === "PENDING") {
      return (
        <>
          <button
            onClick={() => handleStatusChange(loan.id, "VERIFIED")}
            className="text-blue-600 hover:text-blue-900"
          >
            Verify
          </button>
          <button
            onClick={() => handleStatusChange(loan.id, "REJECTED")}
            className="text-red-600 hover:text-red-900"
          >
            Reject
          </button>
        </>
      );
    }

    return (
      <button className="text-gray-400 hover:text-gray-600">
        <MoreVertical size={16} />
      </button>
    );
  };

  return (
    <div className="bg-white shadow-sm rounded-lg p-4 mt-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-lg font-semibold">{title}</h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {showSearch && (
            <div className="relative w-full sm:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search loans..."
                className="pl-10 w-full py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={() => handleSort("date")}
            className="px-3 py-2 text-sm border border-gray-300 rounded-md flex items-center gap-1 hover:bg-gray-50"
          >
            <RefreshCw size={14} />
            <span>
              Sort{" "}
              {sortField === "date"
                ? sortDirection === "asc"
                  ? "↑"
                  : "↓"
                : ""}
            </span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {[
                "User Details",
                "Customer",
                "Date",
                "Amount",
                "Status",
                "Actions",
              ].map((head, index) => (
                <th
                  key={head}
                  className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
                    head === "Actions" ? "text-right" : ""
                  } ${head === "Date" ? "cursor-pointer" : ""}`}
                  onClick={
                    head === "Date" ? () => handleSort("date") : undefined
                  }
                >
                  {head}
                  {head === "Date" &&
                    (sortField === "date"
                      ? sortDirection === "asc"
                        ? " ↑"
                        : " ↓"
                      : "")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedLoans.length > 0 ? (
              sortedLoans.map((loan) => (
                <tr key={loan.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={`https://ui-avatars.com/api/?name=${loan.customerName}&background=random`}
                        alt={loan.customerName}
                      />
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {loan.activity}
                        </div>
                        <div className="text-sm text-gray-500">
                          {loan.updatedDays} days ago
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {loan.customerName}
                    </div>
                    <div className="text-sm text-gray-500">
                      {loan.registrationDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{loan.date}</div>
                    <div className="text-sm text-gray-500">{loan.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₦{Number(loan.amount).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(loan.status)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex space-x-2 justify-end">
                      {renderActionButtons(loan)}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  {showOnlyUserLoans
                    ? "You don't have any loans yet."
                    : "No loans found matching your criteria."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanTable;
