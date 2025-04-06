import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

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

interface LoanStore {
  loans: Loan[];
  initializeLoans: () => void;
  addLoan: (loan: Loan) => void;
  updateLoanStatus: (id: string, status: string) => void;
}

const sampleLoans: Loan[] = [
  {
    id: uuidv4(),
    customerName: "Jane Smith",
    amount: "50000",
    status: "PENDING",
    activity: "New Loan Application",
    updatedDays: 1,
    registrationDate: "24.05.2019",
    date: "June 09, 2021",
    time: "6:30 PM",
  },
  {
    id: uuidv4(),
    customerName: "Jane Smith",
    amount: "100000",
    status: "VERIFIED",
    activity: "Home Renovation Loan",
    updatedDays: 2,
    registrationDate: "23.05.2019",
    date: "June 07, 2021",
    time: "2:30 PM",
  },
  {
    id: uuidv4(),
    customerName: "Jane Smith",
    amount: "100000",
    status: "REJECTED",
    activity: "Business Expansion",
    updatedDays: 2,
    registrationDate: "23.05.2019",
    date: "June 07, 2021",
    time: "10:15 AM",
  },
  {
    id: uuidv4(),
    customerName: "Jane Smith",
    amount: "100000",
    status: "APPROVED",
    activity: "Education Loan",
    updatedDays: 14,
    registrationDate: "10.05.2019",
    date: "May 27, 2021",
    time: "9:45 AM",
  },
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
  {
    id: uuidv4(),
    customerName: "Christian Bale",
    status: "PENDING",
    activity: "Payment not going through",
    updatedDays: 2,
    registrationDate: "24.05.2019",
    date: "June 08, 2021",
    time: "5:00 PM",
  },
  {
    id: uuidv4(),
    customerName: "Henry Cavil",
    status: "VERIFIED",
    activity: "Unable to add replies",
    updatedDays: 2,
    registrationDate: "24.05.2019",
    date: "June 08, 2021",
    time: "4:00 PM",
  },
  {
    id: uuidv4(),
    customerName: "Chris Evans",
    status: "VERIFIED",
    activity: "Downtime since last week",
    updatedDays: 3,
    registrationDate: "23.05.2019",
    date: "June 08, 2021",
    time: "2:00 PM",
  },
  {
    id: uuidv4(),
    customerName: "Sam Smith",
    status: "PENDING",
    activity: "Referral Bonus",
    updatedDays: 4,
    registrationDate: "22.05.2019",
    date: "June 08, 2021",
    time: "11:30 AM",
  },
  {
    id: uuidv4(),
    customerName: "Bruce Wayne",
    status: "APPROVED",
    amount: "250000",
    activity: "Commercial Property Loan",
    updatedDays: 5,
    registrationDate: "20.05.2019",
    date: "June 06, 2021",
    time: "3:45 PM",
  },
  {
    id: uuidv4(),
    customerName: "Peter Parker",
    status: "REJECTED",
    amount: "30000",
    activity: "Travel Loan Request",
    updatedDays: 3,
    registrationDate: "22.05.2019",
    date: "June 05, 2021",
    time: "12:15 PM",
  },
  {
    id: uuidv4(),
    customerName: "Clark Kent",
    status: "VERIFIED",
    amount: "150000",
    activity: "Car Loan",
    updatedDays: 1,
    registrationDate: "25.05.2019",
    date: "June 04, 2021",
    time: "9:00 AM",
  },
  {
    id: uuidv4(),
    customerName: "Diana Prince",
    status: "APPROVED",
    amount: "200000",
    activity: "Startup Investment",
    updatedDays: 6,
    registrationDate: "18.05.2019",
    date: "June 03, 2021",
    time: "10:00 AM",
  },
];

export const useLoanStore = create<LoanStore>((set) => ({
  loans: [],

  initializeLoans: () => {
    const storedLoans = localStorage.getItem("loans");
    if (storedLoans) {
      set({ loans: JSON.parse(storedLoans) });
    } else {
      set({ loans: sampleLoans });
      localStorage.setItem("loans", JSON.stringify(sampleLoans));
    }
  },

  addLoan: (loan) => {
    set((state) => {
      const updatedLoans = [...state.loans, loan];
      localStorage.setItem("loans", JSON.stringify(updatedLoans));
      return { loans: updatedLoans };
    });
  },

  updateLoanStatus: (id, status) => {
    set((state) => {
      const updatedLoans = state.loans.map((loan) =>
        loan.id === id
          ? {
              ...loan,
              status: status as
                | "PENDING"
                | "VERIFIED"
                | "APPROVED"
                | "REJECTED",
            }
          : loan
      );
      localStorage.setItem("loans", JSON.stringify(updatedLoans));
      return { loans: updatedLoans };
    });
  },
}));
