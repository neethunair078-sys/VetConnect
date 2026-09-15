import { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({
  children,
  role = "PET_OWNER",
}) => {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF7F4]">

      {/* Desktop Sidebar */}

      <Sidebar role={role} />


      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          className="
            fixed
            inset-0
            z-40
            bg-black/20
            lg:hidden
          "
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}


      {/* Mobile Sidebar */}

      <Sidebar
        mobile
        open={sidebarOpen}
        onClose={() =>
          setSidebarOpen(false)
        }
        role={role}
      />


      {/* Main */}

      <div className="min-h-screen lg:ml-[230px]">

        <DashboardHeader
          onMenuClick={() =>
            setSidebarOpen(true)
          }
          role={role}
        />


        <main className="px-5 py-6 sm:px-8 lg:px-10 xl:px-12">

          <div className="mx-auto max-w-[1450px]">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;