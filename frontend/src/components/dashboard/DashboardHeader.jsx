import {
  Menu,
  Bell,
  Search,
} from "lucide-react";

const DashboardHeader = ({
  onMenuClick,
  role = "PET_OWNER",
}) => {

  const portalTitle = role === "DOCTOR" ? "Doctor Portal" : "Pet Owner Portal";

  return (
    <header
      className="
        h-[78px]
        flex
        items-center
        justify-between
        px-5
        sm:px-8
        lg:px-10
        xl:px-12
        bg-[#FAF7F4]
      "
    >

      {/* Mobile menu */}

      <button
        onClick={onMenuClick}
        className="lg:hidden"
      >
        <Menu size={24} />
      </button>


      {/* Portal */}

      <div className="hidden lg:block">

        <p className="
          text-base
          text-[#7B6E67]
        ">
          {portalTitle}
        </p>

      </div>


      {/* Actions */}

      <div className="
        flex
        items-center
        gap-3
      ">

        <button
          className="
            w-11
            h-11
            rounded-full
            bg-white
            border
            border-[#E5DDD8]
            flex
            items-center
            justify-center
          "
        >
          <Search size={19} />
        </button>


        <button
          className="
            relative
            w-11
            h-11
            rounded-full
            bg-white
            border
            border-[#E5DDD8]
            flex
            items-center
            justify-center
          "
        >

          <Bell size={19} />

          <span
            className="
              absolute
              top-2
              right-2
              w-2
              h-2
              rounded-full
              bg-[#EBB183]
            "
          />

        </button>

      </div>

    </header>
  );
};

export default DashboardHeader;