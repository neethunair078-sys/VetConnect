import {
  LayoutDashboard,
  PawPrint,
  CalendarDays,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  X,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";


const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/pet-owner/dashboard",
  },
  {
    label: "Pets",
    icon: PawPrint,
    path: "/pet-owner/pets",
  },
  {
    label: "Appointments",
    icon: CalendarDays,
    path: "/pet-owner/appointments",
  },
  {
    label: "Health Records",
    icon: FileText,
    path: "/pet-owner/health-records",
  },
  {
    label: "Settings",
    icon: Settings,
    path: "/pet-owner/settings",
  },
];


const Sidebar = ({
  mobile = false,
  open = false,
  onClose,
}) => {

  const navigate = useNavigate();
  const location = useLocation();


  if (mobile && !open) {
    return null;
  }


  // Navigation handler
  const handleNavigation = (path) => {

    navigate(path);

    // Close mobile sidebar after navigation
    if (mobile && onClose) {
      onClose();
    }
  };


  // Logout handler
  const handleLogout = () => {

    // For now, remove the logged-in user
    localStorage.removeItem("user");

    // Later we will replace this with Django logout/API
    navigate("/login");

    if (mobile && onClose) {
      onClose();
    }
  };


  return (
    <aside
      className={`
        ${
          mobile
            ? "fixed left-0 top-0 z-50 w-[260px]"
            : "hidden lg:flex fixed left-0 top-0 z-30 w-[230px]"
        }

        h-screen
        bg-[#F5F2F0]
        flex-col
        border-r
        border-[#E8E1DD]

        ${mobile ? "shadow-xl" : ""}
      `}
    >

      {/* =====================================================
          LOGO
      ===================================================== */}

      <div className="h-[78px] px-6 flex items-center gap-3">

        <div
          className="
            w-10
            h-10
            rounded-full
            bg-[#EBB183]
            flex
            items-center
            justify-center
            text-white
          "
        >
          <PawPrint size={20} />
        </div>


        <span
          className="
            text-xl
            font-semibold
            text-[#5B3B29]
          "
        >
          VetConnect
        </span>


        {/* Mobile close button */}

        {mobile && (
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="
              ml-auto
              p-2
              rounded-full

              cursor-pointer

              text-[#665D57]

              transition-all
              duration-200

              hover:bg-[#EBB183]/20
              hover:text-[#62412D]

              active:scale-95
            "
          >
            <X size={20} />
          </button>
        )}

      </div>


      {/* =====================================================
          USER
      ===================================================== */}

      <div className="px-5 mt-3">

        <div className="flex items-center gap-3">

          <div
            className="
              w-11
              h-11
              rounded-full
              overflow-hidden
              shrink-0
              bg-[#E8C4A8]
            "
          >
            <img
              src="/images/profile/user.jpg"
              alt="Sarah"
              className="w-full h-full object-cover"
            />
          </div>


          <div>

            <p className="text-sm font-semibold text-[#292421]">
              Welcome back
            </p>

            <p className="text-sm text-[#443A35]">
              Sarah
            </p>

            {/* <p className="text-xs text-[#8B7E77]">
              Premium Member
            </p> */}

          </div>

        </div>

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav className="mt-8 px-4 space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          // Check whether current page is active
          const isActive =
            location.pathname === item.path;


          return (
            <button
              key={item.label}
              type="button"
              onClick={() => handleNavigation(item.path)}
              className={`
                w-full
                flex
                items-center
                gap-3
                rounded-full
                px-4
                py-3
                text-sm

                cursor-pointer

                transition-all
                duration-200

                ${
                  isActive
                    ? `
                      bg-[#EBB183]
                      text-[#62412D]
                      font-medium
                    `
                    : `
                      text-[#665D57]
                      hover:bg-[#EBB183]/20
                      hover:text-[#62412D]
                    `
                }

                active:scale-[0.98]
              `}
            >

              <Icon size={18} />

              <span>
                {item.label}
              </span>

            </button>
          );

        })}

      </nav>


      {/* =====================================================
          BOTTOM ACTIONS
      ===================================================== */}

      <div className="mt-auto px-5 pb-6 space-y-4">


        {/* Book Vet Visit */}

        <button
          type="button"
          onClick={() =>
            handleNavigation(
              "/pet-owner/appointments/book"
            )
          }
          className="
            w-full
            rounded-full
            bg-[#EBB183]
            py-3

            text-sm
            font-medium
            text-[#62412D]

            cursor-pointer

            transition-all
            duration-200

            hover:bg-[#E3A674]
            hover:shadow-md
            hover:-translate-y-0.5

            active:translate-y-0
            active:scale-[0.98]
          "
        >
          Book Vet Visit
        </button>


        {/* Help Center */}

        <button
          type="button"
          onClick={() =>
            handleNavigation(
              "/pet-owner/help"
            )
          }
          className="
            flex
            items-center
            gap-3

            text-sm
            text-[#665D57]

            cursor-pointer

            transition-colors
            duration-200

            hover:text-[#EBB183]
          "
        >
          <HelpCircle size={18} />

          Help Center
        </button>


        {/* Sign Out */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            items-center
            gap-3

            text-sm
            text-[#665D57]

            cursor-pointer

            transition-colors
            duration-200

            hover:text-red-500
          "
        >
          <LogOut size={18} />

          Sign Out
        </button>

      </div>

    </aside>
  );
};


export default Sidebar;