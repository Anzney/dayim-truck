import AppHeader from "../../components/app-header"
import AppSidebar from "../../components/app-sidebar"
import { NotificationProvider } from "../../context/notification-context"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <NotificationProvider>
      <div className="max-h-screen w-full flex">
        <AppSidebar />
        <div className="flex-1 overflow-hidden flex flex-col">
          <AppHeader />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </NotificationProvider>
  )
}

export default DashboardLayout