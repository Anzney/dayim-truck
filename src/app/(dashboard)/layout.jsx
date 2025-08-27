import AppHeader from "../../components/app-header"
import AppSidebar from "../../components/app-sidebar"
import { NotificationProvider } from "../../context/notification-context"


const DashboardLayout = ({ children }) => {
  return (
    <NotificationProvider>
      <div className="max-h-screen w-full flex">
        <AppSidebar />
        <div className="flex-1">
          <AppHeader />
          {children}
        </div>
      </div>
    </NotificationProvider>
  )
}

export default DashboardLayout