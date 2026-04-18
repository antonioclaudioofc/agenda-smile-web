import { TooltipProvider } from "./components/tooltip";
import { AppRoutes } from "./routes";

export function App() {
  return (
    <TooltipProvider>
      <AppRoutes />
    </TooltipProvider>
  );
}
