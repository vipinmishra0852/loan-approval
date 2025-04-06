export interface User {
  id: string;
  username: string;
  password: string;
  userType: "Admin" | "Verifier" | "User";
  name: string;
}

export interface Loan {
  id: string;
  customerName: string;
  amount?: string;
  tenure?: string;
  reason?: string;
  status: "PENDING" | "VERIFIED" | "APPROVED" | "REJECTED";
  activity: string;
  updatedDays: number;
  registrationDate: string;
  date: string;
  time: string;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
  name: string;
}
