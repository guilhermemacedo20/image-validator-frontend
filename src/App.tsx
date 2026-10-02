import { BrowserRouter, Routes, Route } from "react-router-dom";

import PrivateRoute from "@/routes/PrivateRoute";
import MyAccount from "@/presentation/pages/MyAccount";
import ImageAnalyzer from "@/presentation/pages/ImageAnalyser";
import ForgotPassword from "@/presentation/pages/ForgotPassword";
import Login from "@/presentation/pages/Login";
import Register from "@/presentation/pages/Register";
import ResetPassword from "@/presentation/pages/ResetPassword";
import TwoFactor from "@/presentation/pages/TwoFactor";
import PrivacyPolicy from "@/presentation/pages/PrivacyPolicy";
import RetentionPolicy from "@/presentation/pages/RetentionPolicy";
import SecurityPolicy from "@/presentation/pages/SecurityPolicy";

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
          path="/analyze-image"
          element={
            <PrivateRoute>
              <ImageAnalyzer />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-account"
          element={
            <PrivateRoute>
              <MyAccount />
            </PrivateRoute>
          }
        />
        <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
        <Route path="/politica-de-retencao" element={<RetentionPolicy />} />
        <Route path="/politica-de-seguranca" element={<SecurityPolicy />} />
      </Routes>
    </BrowserRouter>
  );
}
