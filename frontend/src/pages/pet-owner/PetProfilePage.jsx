import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Heart,
  Scale,
  ShoppingBag,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { dashboardData } from "../../data/dashboardData";


const PetProfilePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // ------------------------------------------
  // TEMPORARY DATA
  // Later this will come from Django API
  // ------------------------------------------

  const pet = dashboardData.pets.find(
    (item) => item.id === Number(id)
  );

  // ------------------------------------------
  // PET NOT FOUND
  // ------------------------------------------

  if (!pet) {
    return (
      <DashboardLayout>
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-[#302925]">
              Pet not found
            </h2>

            <button
              type="button"
              onClick={() => navigate("/pet-owner/pets")}
              className="
                mt-4
                rounded-full
                bg-[#8B572F]
                px-5
                py-2.5
                text-sm
                font-medium
                text-white
                cursor-pointer
                hover:bg-[#744622]
                transition
              "
            >
              Back to Pets
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout>

      <div className="w-full">

        {/* =====================================
            BACK
        ===================================== */}

        <button
          type="button"
          onClick={() => navigate("/pet-owner/pets")}
          className="
            mb-6
            inline-flex
            items-center
            gap-2
            text-sm
            font-medium
            text-[#665D57]
            cursor-pointer
            hover:text-[#8B572F]
            transition
          "
        >
          <ArrowLeft size={17} />

          Back to My Pets
        </button>


        {/* =====================================
            PROFILE CARD
        ===================================== */}

        <section
          className="
            w-full

            rounded-[30px]

            bg-white

            px-6
            py-7

            sm:px-8
            sm:py-9

            lg:px-10
            lg:py-10

            shadow-[0_12px_40px_rgba(70,45,30,0.06)]
          "
        >

          <div
            className="
              flex
              flex-col
              lg:flex-row

              items-center
              lg:items-center

              gap-8
              lg:gap-10
            "
          >

            {/* =================================
                PET IMAGE
            ================================= */}

            <div className="shrink-0">

              <div
                className="
                  w-40
                  h-40

                  sm:w-44
                  sm:h-44

                  lg:w-48
                  lg:h-48

                  rounded-full

                  overflow-hidden

                  bg-[#F4EEEA]

                  border-[6px]
                  border-white

                  shadow-[0_8px_30px_rgba(70,45,30,0.10)]
                "
              >

                <img
                  src={pet.image}
                  alt={pet.name}
                  className="
                    w-full
                    h-full
                    object-cover
                  "
                />

              </div>

            </div>


            {/* =================================
                PET INFORMATION
            ================================= */}

            <div className="flex-1 w-full">

              <h1
                className="
                  text-4xl
                  sm:text-5xl

                  font-bold

                  tracking-tight

                  text-[#181615]
                "
              >
                {pet.name}
              </h1>


              <p
                className="
                  mt-2

                  text-base
                  sm:text-lg

                  text-[#665D57]
                "
              >
                {pet.breed}

                {pet.gender && (
                  <>
                    {" • "}
                    {pet.gender}
                  </>
                )}
              </p>


              {/* =================================
                  STATS
              ================================= */}

              <div
                className="
                  mt-6

                  flex
                  flex-wrap

                  gap-3
                "
              >

                {/* Age */}

                <InfoBadge
                  icon={CalendarDays}
                  label="Age"
                  value={pet.age || "3 Years, 2 Mos"}
                />


                {/* Weight */}

                <InfoBadge
                  icon={Scale}
                  label="Weight"
                  value={
                    pet.weight
                      ? `${pet.weight} lbs`
                      : "65 lbs"
                  }
                />


                {/* Status */}

                <InfoBadge
                  icon={Heart}
                  label="Status"
                  value={pet.status || "Healthy"}
                />

              </div>


              {/* =================================
                  ACTIONS
              ================================= */}

              <div
                className="
                  mt-7

                  flex
                  flex-col
                  sm:flex-row

                  gap-3
                "
              >

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/pet-owner/appointments/book?pet=${pet.id}`
                    )
                  }
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2

                    rounded-full

                    bg-[#8B572F]

                    px-6
                    py-3

                    text-sm
                    font-semibold

                    text-white

                    cursor-pointer

                    hover:bg-[#744622]

                    hover:-translate-y-0.5

                    hover:shadow-md

                    active:translate-y-0

                    transition-all
                  "
                >
                  <CalendarDays size={17} />

                  Book a Vet
                </button>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================
            FUTURE PROFILE SECTIONS
        ===================================== */}

        <div
          className="
            mt-6

            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-3

            gap-5
          "
        >

          <ProfileSection
            title="Health Records"
            description="View and manage medical records, prescriptions and vaccination history."
            buttonText="View Records"
            onClick={() =>
              navigate(
                `/pet-owner/health-records?pet=${pet.id}`
              )
            }
          />


          <ProfileSection
            title="Appointments"
            description="View upcoming and previous veterinary consultations."
            buttonText="View Appointments"
            onClick={() =>
              navigate(
                `/pet-owner/appointments?pet=${pet.id}`
              )
            }
          />


          <ProfileSection
            title="Pet Details"
            description="Manage your pet's personal information and health details."
            buttonText="Edit Profile"
            onClick={() =>
              navigate(
                `/pet-owner/pets/${pet.id}/edit`
              )
            }
          />

        </div>

      </div>

    </DashboardLayout>
  );
};


// =================================================
// INFO BADGE
// =================================================

const InfoBadge = ({
  icon: Icon,
  label,
  value,
}) => {
  return (
    <div
      className="
        inline-flex
        items-center
        gap-3

        rounded-full

        bg-[#F7F4F2]

        px-4
        py-2.5
      "
    >

      <Icon
        size={18}
        className="text-[#8B572F]"
      />

      <div>

        <p
          className="
            text-[10px]
            text-[#8B7E77]
          "
        >
          {label}
        </p>

        <p
          className="
            text-sm
            font-semibold
            text-[#302925]
          "
        >
          {value}
        </p>

      </div>

    </div>
  );
};


// =================================================
// PROFILE SECTION
// =================================================

const ProfileSection = ({
  title,
  description,
  buttonText,
  onClick,
}) => {
  return (
    <div
      className="
        rounded-[24px]

        bg-white

        p-6

        shadow-[0_8px_30px_rgba(70,45,30,0.05)]
      "
    >

      <h2
        className="
          text-xl
          font-semibold
          text-[#302925]
        "
      >
        {title}
      </h2>


      <p
        className="
          mt-2

          text-sm
          leading-6

          text-[#786D67]
        "
      >
        {description}
      </p>


      <button
        type="button"
        onClick={onClick}
        className="
          mt-5

          rounded-full

          border
          border-[#D8C9BE]

          px-4
          py-2

          text-sm
          font-medium

          text-[#704728]

          cursor-pointer

          hover:bg-[#FBF4EF]

          transition
        "
      >
        {buttonText}
      </button>

    </div>
  );
};


export default PetProfilePage;