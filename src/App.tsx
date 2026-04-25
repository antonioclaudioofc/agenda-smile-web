import { TooltipProvider } from "./components/tooltip";
import { AuthProvider } from "./contexts/AuthContext";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <TooltipProvider>
        <AppRoutes />
      </TooltipProvider>
    </AuthProvider>
  );
}
