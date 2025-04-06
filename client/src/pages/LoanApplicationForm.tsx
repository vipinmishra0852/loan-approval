"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoanStore } from "../stores/loanStore";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "../context/UserContext";
import UserHeader from "../components/UserHeader";

const LoanApplicationForm = () => {
  const navigate = useNavigate();
  const { addLoan } = useLoanStore();
  const { user } = useUser();
  const [formData, setFormData] = useState({
    fullName: "",
    loanAmount: "",
    loanTenure: "",
    employmentStatus: "",
    reasonForLoan: "",
    employmentAddress1: "",
    employmentAddress2: "",
    termsAccepted: false,
    creditInfoConsent: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.loanAmount) newErrors.loanAmount = "Loan amount is required";
    if (!formData.loanTenure) newErrors.loanTenure = "Loan tenure is required";
    if (!formData.employmentStatus)
      newErrors.employmentStatus = "Employment status is required";
    if (!formData.reasonForLoan)
      newErrors.reasonForLoan = "Reason for loan is required";
    if (!formData.employmentAddress1)
      newErrors.employmentAddress1 = "Employment address is required";
    if (!formData.termsAccepted)
      newErrors.termsAccepted = "You must accept the terms";
    if (!formData.creditInfoConsent)
      newErrors.creditInfoConsent =
        "You must consent to credit information disclosure";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      // Create a new loan application
      const newLoan = {
        id: uuidv4(),
        customerName: formData.fullName,
        amount: formData.loanAmount,
        tenure: formData.loanTenure,
        reason: formData.reasonForLoan,
        status: "PENDING" as "PENDING" | "VERIFIED" | "APPROVED" | "REJECTED",
        activity: "New Loan Application",
        updatedDays: 0,
        registrationDate: new Date()
          .toLocaleDateString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
          .replace(/\//g, "."),
        date: new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "2-digit",
          year: "numeric",
        }),
        time: new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };

      addLoan(newLoan);

      alert("Loan application submitted successfully!");
      navigate("/user/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {user?.userType === "User" && <UserHeader />}

      <div className="bg-white p-6 mx-auto my-6 max-w-5xl shadow-md rounded-md">
        <h1 className="text-3xl font-bold text-center mb-10">
          APPLY FOR A LOAN
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium">
                Full name as it appears on bank account
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.fullName ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Full name as it appears on bank account"
              />
              {errors.fullName && (
                <p className="mt-1 text-red-500 text-xs">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                How much do you need?
              </label>
              <input
                type="text"
                name="loanAmount"
                value={formData.loanAmount}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.loanAmount ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="How much do you need?"
              />
              {errors.loanAmount && (
                <p className="mt-1 text-red-500 text-xs">{errors.loanAmount}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Loan tenure (in months)
              </label>
              <input
                type="text"
                name="loanTenure"
                value={formData.loanTenure}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.loanTenure ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Loan tenure (in months)"
              />
              {errors.loanTenure && (
                <p className="mt-1 text-red-500 text-xs">{errors.loanTenure}</p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Employment status
              </label>
              <input
                type="text"
                name="employmentStatus"
                value={formData.employmentStatus}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.employmentStatus ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Employment status"
              />
              {errors.employmentStatus && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.employmentStatus}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block mb-2 text-sm font-medium">
                Reason for loan
              </label>
              <textarea
                name="reasonForLoan"
                value={formData.reasonForLoan}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.reasonForLoan ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Reason for loan"
                rows={4}
              />
              {errors.reasonForLoan && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.reasonForLoan}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Employment address
              </label>
              <input
                type="text"
                name="employmentAddress1"
                value={formData.employmentAddress1}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md ${
                  errors.employmentAddress1
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
                placeholder="Employment address"
              />
              {errors.employmentAddress1 && (
                <p className="mt-1 text-red-500 text-xs">
                  {errors.employmentAddress1}
                </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium">
                Employment address (continued)
              </label>
              <input
                type="text"
                name="employmentAddress2"
                value={formData.employmentAddress2}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Employment address"
              />
            </div>
          </div>

          <div className="mt-8">
            <div className="bg-gray-100 p-4 rounded-md">
              <h3 className="text-sm font-medium mb-2">Chart</h3>
              <div className="h-40 w-full bg-white border border-gray-300 rounded-md flex items-center justify-center">
                <p className="text-gray-500">
                  Loan repayment chart visualization would appear here
                </p>
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="termsAccepted"
                  name="termsAccepted"
                  type="checkbox"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className={`h-4 w-4 rounded border-gray-300 ${
                    errors.termsAccepted ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="termsAccepted"
                  className="font-medium text-gray-700"
                >
                  I have read the important information and accept that by
                  completing the application I will be bound by the terms
                </label>
                {errors.termsAccepted && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors.termsAccepted}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="creditInfoConsent"
                  name="creditInfoConsent"
                  type="checkbox"
                  checked={formData.creditInfoConsent}
                  onChange={handleChange}
                  className={`h-4 w-4 rounded border-gray-300 ${
                    errors.creditInfoConsent ? "border-red-500" : ""
                  }`}
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="creditInfoConsent"
                  className="font-medium text-gray-700"
                >
                  Any personal and credit information obtained may be disclosed
                  from time to time to other lenders, credit bureaus or other
                  credit reporting agencies.
                </label>
                {errors.creditInfoConsent && (
                  <p className="mt-1 text-red-500 text-xs">
                    {errors.creditInfoConsent}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="bg-green-800 text-white py-3 px-8 rounded-md hover:bg-green-700 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanApplicationForm;
