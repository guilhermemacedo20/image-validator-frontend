import { BrowserRouter, Routes, Route } from "react-router-dom"
import ForgotPassword from "./pages/forgotPassword"
import ImageAnalyzer from "./pages/ImageAnalyser"
import Login from "./pages/Login"
import MyAccount from "./pages/MyAccount"
import Register from "./pages/Register"
import ResetPassword from "./pages/resetPassword"
import TwoFactor from "./pages/TwoFactor"
import PrivateRoute from "./routes/PrivateRoute"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import RetentionPolicy from "./pages/RetentionPolicy"
import SecurityPolicy from "./pages/SecurityPolicy"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/2fa" element={<TwoFactor />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/analyze-image" element={<PrivateRoute><ImageAnalyzer /></PrivateRoute>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/politica-de-retencao" element={<RetentionPolicy />} />
        <Route path="/politica-de-seguranca" element={<SecurityPolicy />} />

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
