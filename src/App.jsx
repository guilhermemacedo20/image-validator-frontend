import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import TwoFactor from "./pages/TwoFactor"
import Register from "./pages/Register"
import ForgotPassword from "./pages/forgotPassword"
import ResetPassword from "./pages/resetPassword"
import PrivateRoute from "./routes/PrivateRoute"
import MyAccount from "./pages/MyAccount"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/2fa" element={<TwoFactor />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route
          path="/my-account"
          element={
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}