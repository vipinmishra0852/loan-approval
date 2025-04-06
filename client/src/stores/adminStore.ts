import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"

interface Admin {
  id: string
  username: string
  password: string
  name: string
}

interface AdminStore {
  admins: Admin[]
  initializeAdmins: () => void
  addAdmin: (admin: Admin) => void
  removeAdmin: (id: string) => void
}

// Default admin
const defaultAdmin: Admin = {
  id: uuidv4(),
  username: "admin@1",
  password: "12345",
  name: "John Doe",
}

export const useAdminStore = create<AdminStore>((set) => ({
  admins: [],

  initializeAdmins: () => {
    // Check if admins exist in localStorage
    const storedAdmins = localStorage.getItem("admins")
    if (storedAdmins) {
      set({ admins: JSON.parse(storedAdmins) })
    } else {
      // Initialize with default admin
      set({ admins: [defaultAdmin] })
      localStorage.setItem("admins", JSON.stringify([defaultAdmin]))
    }
  },

  addAdmin: (admin) => {
    set((state) => {
      const updatedAdmins = [...state.admins, admin]
      localStorage.setItem("admins", JSON.stringify(updatedAdmins))
      return { admins: updatedAdmins }
    })
  },

  removeAdmin: (id) => {
    set((state) => {
      // Prevent removing the last admin
      if (state.admins.length <= 1) {
        alert("Cannot remove the last admin")
        return { admins: state.admins }
      }

      const updatedAdmins = state.admins.filter((admin) => admin.id !== id)
      localStorage.setItem("admins", JSON.stringify(updatedAdmins))
      return { admins: updatedAdmins }
    })
  },
}))

