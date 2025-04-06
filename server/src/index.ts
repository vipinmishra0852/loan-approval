import express from "express"
import cors from "cors"

// Initialize express app
const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.get("/", (req, res) => {
  res.send("Loan Manager API is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

