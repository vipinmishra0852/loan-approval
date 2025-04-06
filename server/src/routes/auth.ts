import express from "express";
import { v4 as uuidv4 } from "uuid";
import type { User } from "../types";

const router = express.Router();

// Mock users for demo
const users: User[] = [
  {
    id: uuidv4(),
    username: "admin@1",
    password: "12345",
    userType: "Admin",
    name: "John Doe",
  },
  {
    id: uuidv4(),
    username: "verifier@1",
    password: "12345",
    userType: "Verifier",
    name: "John Okoh",
  },
  {
    id: uuidv4(),
    username: "user@1",
    password: "12345",
    userType: "User",
    name: "Jane Smith",
  },
];

type LoginRequest = {
  username: string;
  password: string;
  userType: string;
};

// Login route
router.post("/login", (req: express.Request, res: express.Response) => {
  const { username, password, userType } = req.body as LoginRequest;

  const user = users.find(
    (u) =>
      u.username === username &&
      u.password === password &&
      u.userType === userType
  );

  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials",
  });
});

export default router;
