"use client";

import {
  Bell,
  MessageSquare,
  Home,
  CreditCard,
  PieChart,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

const UserHeader = () => {
  const { user } = useUser();

  return (
    <header className="bg-white shadow-sm py-2 px-4">
      <div className="flex justify-between items-center">
        <div className="text-green-900 font-bold text-xl">CREDIT APP</div>

        <div className="flex items-center space-x-6">
          <Link to="/user/home" className="flex items-center text-green-900">
            <Home size={20} className="mr-1" />
            <span>Home</span>
          </Link>

          <Link to="/user/payments" className="flex items-center text-gray-500">
            <CreditCard size={20} className="mr-1" />
            <span>Payments</span>
          </Link>

          <Link to="/user/budget" className="flex items-center text-gray-500">
            <PieChart size={20} className="mr-1" />
            <span>Budget</span>
          </Link>

          <Link to="/user/card" className="flex items-center text-gray-500">
            <Wallet size={20} className="mr-1" />
            <span>Card</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <button className="text-green-900">
            <Bell size={20} />
          </button>
          <button className="text-green-900">
            <MessageSquare size={20} />
          </button>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white">
              {user?.name.charAt(0)}
            </div>
            <span className="ml-2 text-green-900">User</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;
