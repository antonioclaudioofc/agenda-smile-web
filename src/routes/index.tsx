import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/login";
import { RegisterPage } from "../pages/auth/register";
import { RegisterClientPage } from "../pages/auth/register-client";
import { HomePage } from "../pages/dashboard/home";
import { DashboardLayout } from "../components/dashboard-layout";
import { ClientLayout } from "../components/client-layout";
import { PatientsPage } from "../pages/dashboard/patients";
import { DentistsPage } from "../pages/dashboard/dentists";
import { BooksPage } from "../pages/dashboard/books";
import { ClientAppointmentsPage } from "../pages/client/appointments";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PrivateRoute allowedRoles={["secretary"]} />}>
          <Route element={<DashboardLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/patients" element={<PatientsPage />} />
            <Route path="/dentists" element={<DentistsPage />} />
            <Route path="/books" element={<BooksPage />} />
          </Route>
        </Route>

        <Route element={<PrivateRoute allowedRoles={["client"]} />}>
          <Route element={<ClientLayout />}>
            <Route
              path="/client/appointments"
              element={<ClientAppointmentsPage />}
            />
          </Route>
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/client/register" element={<RegisterClientPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
