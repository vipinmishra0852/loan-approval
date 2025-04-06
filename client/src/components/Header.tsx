"use client"

import { Bell, MessageSquare } from "lucide-react"
import { useUser } from "../context/UserContext"

const Header = () => {
  const { user } = useUser()

  return (
    <header className="bg-white shadow-sm py-2 px-4 flex justify-between items-center">
      <div className="text-green-900 font-bold text-xl">CREDIT APP</div>

      <div className="flex items-center space-x-4">
        <button className="text-green-900">
          <Bell size={20} />
        </button>
        <button className="text-green-900">
          <MessageSquare size={20} />
        </button>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white">
            {user?.userType.charAt(0)}
          </div>
          <span className="ml-2 text-green-900">{user?.userType}</span>
        </div>
      </div>
    </header>
  )
}

export default Header

