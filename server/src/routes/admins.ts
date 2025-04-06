import express from "express"
import { v4 as uuidv4 } from "uuid"
import type { Admin } from "../types"

const router = express.Router()

// Mock admins for demo
let admins: Admin[] = [
  {
    id: uuidv4(),
    username: "admin@1",
    password: "12345",
    name: "John Doe",
  },
]

// Get all admins
router.get("/", (req, res) => {
  // Don't send passwords to client
  const adminsWithoutPasswords = admins.map(({ password, ...admin }) => admin)

  res.status(200).json({
    success: true,
    count: admins.length,
    data: adminsWithoutPasswords,
  })
})

// Add a new admin
router.post("/", (req, res) => {
  const { username, password, name } = req.body

  const newAdmin: Admin = {
    id: uuidv4(),
    username,
    password,
    name,
  }

  admins.push(newAdmin)

  // Don't send password to client
  const { password: _, ...adminWithoutPassword } = newAdmin

  res.status(201).json({
    success: true,
    data: adminWithoutPassword,
  })
})

// Remove an admin
router.delete("/:id", (req, res) => {
  const { id } = req.params

  // Prevent removing the last admin
  if (admins.length <= 1) {
    return res.status(400).json({
      success: false,
      message: "Cannot remove the last admin",
    })
  }

  const adminIndex = admins.findIndex((admin) => admin.id === id)

  if (adminIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Admin not found",
    })
  }

  admins = admins.filter((admin) => admin.id !== id)

  res.status(200).json({
    success: true,
    message: "Admin removed successfully",
  })
})

export default router

