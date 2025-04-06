"use client";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import VerifierDashboard from "./pages/VerifierDashboard";
import UserDashboard from "./pages/UserDashboard";
import LoanApplicationForm from "./pages/LoanApplicationForm";
import PlaceholderPage from "./pages/PlaceholderPage";
import { UserProvider } from "./context/UserContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-800"></div>
      </div>
    );
  }

  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/apply" element={<LoanApplicationForm />} />

          <Route
            path="/admin/*"
            element={
              <ProtectedRoute userType="Admin">
                <Routes>
                  <Route path="/" element={<AdminDashboard />} />
                  <Route
                    path="/borrowers"
                    element={<PlaceholderPage title="Borrowers" />}
                  />
                  <Route
                    path="/loans"
                    element={<PlaceholderPage title="Loans" />}
                  />
                  <Route
                    path="/repayments"
                    element={<PlaceholderPage title="Repayments" />}
                  />
                  <Route
                    path="/loan-parameters"
                    element={<PlaceholderPage title="Loan Parameters" />}
                  />
                  <Route
                    path="/accounting"
                    element={<PlaceholderPage title="Accounting" />}
                  />
                  <Route
                    path="/reports"
                    element={<PlaceholderPage title="Reports" />}
                  />
                  <Route
                    path="/collateral"
                    element={<PlaceholderPage title="Collateral" />}
                  />
                  <Route
                    path="/access-configuration"
                    element={<PlaceholderPage title="Access Configuration" />}
                  />
                  <Route
                    path="/savings"
                    element={<PlaceholderPage title="Savings" />}
                  />
                  <Route
                    path="/other-incomes"
                    element={<PlaceholderPage title="Other Incomes" />}
                  />
                  <Route
                    path="/payroll"
                    element={<PlaceholderPage title="Payroll" />}
                  />
                  <Route
                    path="/expenses"
                    element={<PlaceholderPage title="Expenses" />}
                  />
                  <Route
                    path="/e-signature"
                    element={<PlaceholderPage title="E-Signature" />}
                  />
                  <Route
                    path="/investor-accounts"
                    element={<PlaceholderPage title="Investor Accounts" />}
                  />
                  <Route
                    path="/calendar"
                    element={<PlaceholderPage title="Calendar" />}
                  />
                  <Route
                    path="/settings"
                    element={<PlaceholderPage title="Settings" />}
                  />
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/verifier/*"
            element={
              <ProtectedRoute userType="Verifier">
                <Routes>
                  <Route path="/" element={<VerifierDashboard />} />
                  <Route
                    path="/borrowers"
                    element={<PlaceholderPage title="Borrowers" />}
                  />
                  <Route
                    path="/loans"
                    element={<PlaceholderPage title="Loans" />}
                  />
                  <Route
                    path="/repayments"
                    element={<PlaceholderPage title="Repayments" />}
                  />
                  <Route
                    path="/loan-parameters"
                    element={<PlaceholderPage title="Loan Parameters" />}
                  />
                  <Route
                    path="/accounting"
                    element={<PlaceholderPage title="Accounting" />}
                  />
                  <Route
                    path="/reports"
                    element={<PlaceholderPage title="Reports" />}
                  />
                  <Route
                    path="/collateral"
                    element={<PlaceholderPage title="Collateral" />}
                  />
                  <Route
                    path="/access-configuration"
                    element={<PlaceholderPage title="Access Configuration" />}
                  />
                  <Route
                    path="/savings"
                    element={<PlaceholderPage title="Savings" />}
                  />
                  <Route
                    path="/expenses"
                    element={<PlaceholderPage title="Expenses" />}
                  />
                  <Route
                    path="/e-signature"
                    element={<PlaceholderPage title="E-Signature" />}
                  />
                  <Route
                    path="/investor-accounts"
                    element={<PlaceholderPage title="Investor Accounts" />}
                  />
                  <Route
                    path="/calendar"
                    element={<PlaceholderPage title="Calendar" />}
                  />
                  <Route
                    path="/settings"
                    element={<PlaceholderPage title="Settings" />}
                  />
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route
            path="/user/*"
            element={
              <ProtectedRoute userType="User">
                <Routes>
                  <Route path="/" element={<UserDashboard />} />
                  <Route path="/apply" element={<LoanApplicationForm />} />
                  <Route
                    path="/home"
                    element={<PlaceholderPage title="Home" />}
                  />
                  <Route
                    path="/payments"
                    element={<PlaceholderPage title="Payments" />}
                  />
                  <Route
                    path="/budget"
                    element={<PlaceholderPage title="Budget" />}
                  />
                  <Route
                    path="/card"
                    element={<PlaceholderPage title="Card" />}
                  />
                </Routes>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
