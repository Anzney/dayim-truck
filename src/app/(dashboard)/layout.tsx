import AppHeader from "../../components/app-header"
import AppSidebar from "../../components/app-sidebar"
import { NotificationProvider } from "../../context/notification-context"

import { SidebarProvider } from "@/components/ui/sidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationProvider>
      <SidebarProvider>
        <div className="flex max-h-screen w-full">
          <AppSidebar />
          <div className="flex-1 overflow-hidden flex flex-col">
            <AppHeader />
            <main className="flex-1 overflow-auto">
              {children}
            </main>
          </div>
        </div>
      </SidebarProvider>
    </NotificationProvider>
  )
}

export default DashboardLayout