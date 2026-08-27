import { Outlet, useNavigate } from "react-router-dom";
import { IoCalendarOutline } from "react-icons/io5";
import { Avatar, AvatarFallback } from "./avatar";
import { Button } from "./button";
import { useAuth } from "../contexts/AuthContext";

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function ClientLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.setItem("login_account_type", "client");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50/80">
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 md:px-8">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center rounded-lg bg-blue-500">
            <IoCalendarOutline className="size-4 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900">OdontoAgenda</span>
        </div>

        <div className="flex items-center gap-3">
          {user?.first_name && (
            <span className="hidden text-sm text-gray-500 sm:inline">
              {user.first_name}
            </span>
          )}
          <Avatar>
            <AvatarFallback className="bg-blue-50 text-xs font-medium text-blue-700">
              {initials(user?.first_name || "?")}
            </AvatarFallback>
          </Avatar>
          <Button variant="outline" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}
