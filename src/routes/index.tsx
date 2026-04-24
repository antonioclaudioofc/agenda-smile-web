import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "../pages/auth/login";
import { RegisterPage } from "../pages/auth/register";
import { HomePage } from "../pages/dashboard/home";
import { DashboardLayout } from "../components/dashboard-layout";
import { PatientsPage } from "../pages/dashboard/patients";
import { DentistsPage } from "../pages/dashboard/dentists";
import { BooksPage } from "../pages/dashboard/books";

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/patients" element={<PatientsPage />} />
          <Route path="/dentists" element={<DentistsPage />} />
          <Route path="/books" element={<BooksPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}
