"use client"

import type React from "react"

import { useState } from "react"
import { useAdminStore } from "../stores/adminStore"
import { v4 as uuidv4 } from "uuid"
import { UserPlus, Trash2 } from "lucide-react"

const AdminManagement = () => {
  const { admins, addAdmin, removeAdmin } = useAdminStore()
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAdmin, setNewAdmin] = useState({
    username: "",
    password: "",
    name: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewAdmin({
      ...newAdmin,
      [name]: value,
    })
  }

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newAdmin.username || !newAdmin.password || !newAdmin.name) {
      alert("Please fill in all fields")
      return
    }

    addAdmin({
      id: uuidv4(),
      username: newAdmin.username,
      password: newAdmin.password,
      name: newAdmin.name,
    })

    setNewAdmin({
      username: "",
      password: "",
      name: "",
    })

    setShowAddForm(false)
  }

  const handleRemoveAdmin = (id: string) => {
    if (window.confirm("Are you sure you want to remove this admin?")) {
      removeAdmin(id)
    }
  }

  return (
    <div className="bg-white shadow-sm p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Admin Management</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3 py-1 text-sm bg-green-800 text-white rounded flex items-center"
        >
          <UserPlus size={16} className="mr-1" /> Add Admin
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border border-gray-200 rounded-md">
          <h3 className="text-md font-medium mb-3">Add New Admin</h3>
          <form onSubmit={handleAddAdmin}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  value={newAdmin.username}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="admin@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={newAdmin.password}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Password"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={newAdmin.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md mr-2"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 text-sm bg-green-800 text-white rounded-md">
                Add Admin
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left text-gray-500 text-sm">
              <th className="pb-2">ID</th>
              <th className="pb-2">Name</th>
              <th className="pb-2">Username</th>
              <th className="pb-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id} className="border-t border-gray-100">
                <td className="py-3 text-sm">{admin.id.substring(0, 8)}</td>
                <td className="py-3 text-sm">{admin.name}</td>
                <td className="py-3 text-sm">{admin.username}</td>
                <td className="py-3">
                  <button onClick={() => handleRemoveAdmin(admin.id)} className="text-red-500 hover:text-red-700">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  No admins found. Add your first admin.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminManagement

