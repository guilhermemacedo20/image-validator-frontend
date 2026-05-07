import { BrowserRouter, Routes, Route } from "react-router-dom"
import ForgotPassword from "./pages/forgotPassword"
import ImageAnalyzer from "./pages/ImageAnalyser"
import Login from "./pages/Login"
import MyAccount from "./pages/MyAccount"
import Register from "./pages/Register"
import ResetPassword from "./pages/resetPassword"
import TwoFactor from "./pages/TwoFactor"
import PrivateRoute from "./routes/PrivateRoute"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/2fa" element={<TwoFactor />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/analyze-image" element={<ImageAnalyzer />} />

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