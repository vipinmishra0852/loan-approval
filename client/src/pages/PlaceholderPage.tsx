"use client"

import Sidebar from "../components/Sidebar"
import Header from "../components/Header"
import { useUser } from "../context/UserContext"

interface PlaceholderPageProps {
  title: string
}

const PlaceholderPage = ({ title }: PlaceholderPageProps) => {
  const { user } = useUser()
  const userType = user?.userType || "Admin"

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userType={userType as "Admin" | "Verifier"} />

      <div className="flex-1">
        <Header />

        <main className="p-6">
          <h1 className="text-2xl font-semibold mb-6">{title}</h1>

          <div className="bg-white p-12 rounded-md shadow-sm flex flex-col items-center justify-center">
            <h2 className="text-xl font-medium text-gray-600 mb-4">Page Coming Soon</h2>
            <p className="text-gray-500 mb-6 text-center">This page is under development. Please check back later.</p>
            <div className="w-16 h-1 bg-green-800 rounded-full"></div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default PlaceholderPage

