import express from "express"
import { v4 as uuidv4 } from "uuid"
import type { Loan } from "../types"

const router = express.Router()

// Mock loans for demo
const loans: Loan[] = [
  {
    id: uuidv4(),
    customerName: "Tom Cruise",
    status: "PENDING",
    activity: "Contact Email not Linked",
    updatedDays: 1,
    registrationDate: "24.05.2019",
    date: "June 09, 2021",
    time: "6:30 PM",
  },
  {
    id: uuidv4(),
    customerName: "Matt Damon",
    status: "PENDING",
    activity: "Adding Images to Featured Posts",
    updatedDays: 1,
    registrationDate: "24.05.2019",
    date: "June 09, 2021",
    time: "6:00 AM",
  },
  {
    id: uuidv4(),
    customerName: "Robert Downey",
    status: "PENDING",
    activity: "When will I be charged this month?",
    updatedDays: 2,
    registrationDate: "24.05.2019",
    date: "June 08, 2021",
    time: "5:30 PM",
  },
]

// Get all loans
router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    count: loans.length,
    data: loans,
  })
})

// Create a new loan
router.post("/", (req, res) => {
  const { customerName, amount, tenure, reason } = req.body

  const newLoan: Loan = {
    id: uuidv4(),
    customerName,
    amount,
    tenure,
    reason,
    status: "PENDING",
    activity: "New Loan Application",
    updatedDays: 0,
    registrationDate: new Date()
      .toLocaleDateString("en-US", { day: "2-digit", month: "2-digit", year: "numeric" })
      .replace(/\//g, "."),
    date: new Date().toLocaleDateString("en-US", { month: "long", day: "2-digit", year: "numeric" }),
    time: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }),
  }

  loans.push(newLoan)

  res.status(201).json({
    success: true,
    data: newLoan,
  })
})

// Update loan status
router.put("/:id", (req, res) => {
  const { id } = req.params
  const { status } = req.body

  const loanIndex = loans.findIndex((loan) => loan.id === id)

  if (loanIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Loan not found",
    })
  }

  loans[loanIndex] = {
    ...loans[loanIndex],
    status: status as "PENDING" | "VERIFIED" | "APPROVED" | "REJECTED",
  }

  res.status(200).json({
    success: true,
    data: loans[loanIndex],
  })
})

export default router

