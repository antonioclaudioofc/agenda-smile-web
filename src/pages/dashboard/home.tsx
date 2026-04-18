import { AppSidebar } from "../../components/app-sidebar";
import { SidebarInset, SidebarProvider } from "../../components/sidebar";

export function HomePage() {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset className="bg-zinc-100">
        <div className="p-4">sadasd</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
