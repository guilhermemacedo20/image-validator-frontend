import { useAuth } from "../context/AuthContext"

export default function Dashboard() {
  const { logout } = useAuth()

  return (
    <div className="p-10">
      <h1 className="text-2xl mb-4">Dashboard</h1>

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}