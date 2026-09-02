import { Plus } from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import PetCard from "../../components/dashboard/PetCard";

import { dashboardData } from "../../data/dashboardData";
import { useNavigate } from "react-router-dom";


const PetsPage = () => {

  const navigate = useNavigate();
  const pets = dashboardData.pets;


  // =================================
  // ADD NEW PET
  // =================================

  const handleAddPet = () => {
    // console.log("Add new pet");
    navigate("/pet-owner/pets/add");
  };


  // =================================
  // VIEW PET PROFILE
  // =================================

  const handlePetClick = (pet) => {
    console.log("Selected pet:", pet);
     navigate(`/pet-owner/pets/${pet.id}`);

    // Later:
    // navigate(`/pet-owner/pets/${pet.id}`);
  };


  return (
    <DashboardLayout>

      {/* =================================
          PAGE HEADER
      ================================= */}

      <div
        className="
          flex
          flex-col
          gap-6

          sm:flex-row
          sm:items-end
          sm:justify-between
        "
      >

        {/* Title */}

        <div className="max-w-[650px]">

          <h1
            className="
              text-4xl
              sm:text-5xl

              font-semibold
              tracking-tight

              text-[#191716]
            "
          >
            My Pets
          </h1>


          <p
            className="
              mt-3

              text-sm
              sm:text-base

              leading-6

              text-[#665D57]
            "
          >
            Manage your furry family members, track their
            health status, and easily book upcoming wellness
            visits.
          </p>

        </div>


        {/* =================================
            ADD NEW PET BUTTON
        ================================= */}

        <button
          type="button"
          onClick={handleAddPet}
          className="
            inline-flex
            items-center
            justify-center
            gap-2

            self-start
            sm:self-auto

            rounded-full

            bg-[#8B572F]

            px-6
            py-3

            text-sm
            font-semibold
            text-white

            cursor-pointer

            transition-all
            duration-200

            hover:bg-[#744622]
            hover:-translate-y-0.5
            hover:shadow-md

            active:translate-y-0
            active:scale-[0.98]
          "
        >

          <Plus
            size={18}
            strokeWidth={2.5}
          />

          Add New Pet

        </button>

      </div>


      {/* =================================
          PET GRID
      ================================= */}

      <div
        className="
          mt-10

          grid
          grid-cols-1

          sm:grid-cols-2

          xl:grid-cols-3

          gap-6
          lg:gap-7

          max-w-[1100px]
        "
      >

        {/* Existing Pets */}

        {pets.map((pet) => (

          <PetCard
            key={pet.id}
            pet={pet}
            variant="list"
            onClick={() => handlePetClick(pet)}
          />

        ))}


        {/* =================================
            ADD NEW PET CARD
        ================================= */}

        <button
          type="button"
          onClick={handleAddPet}
          className="
            group

            w-full
            min-h-[315px]

            rounded-[32px]

            border
            border-dashed
            border-[#DCCFC6]

            bg-transparent

            flex
            flex-col
            items-center
            justify-center

            px-8

            text-center

            cursor-pointer

            transition-all
            duration-200

            hover:bg-white
            hover:border-[#EBB183]

            hover:shadow-[0_12px_30px_rgba(70,45,30,0.06)]

            active:scale-[0.99]
          "
        >

          {/* Plus Circle */}

          <span
            className="
              w-14
              h-14

              rounded-full

              bg-[#F3EFED]

              flex
              items-center
              justify-center

              text-[#65452E]

              transition-all
              duration-200

              group-hover:bg-[#FBEDE2]
              group-hover:scale-105
            "
          >
            <Plus size={25} />
          </span>


          {/* Heading */}

          <h2
            className="
              mt-6

              text-xl
              sm:text-[22px]

              font-medium
              leading-7

              text-[#292421]
            "
          >
            Welcome a new
            <br />
            family member
          </h2>


          {/* Description */}

          <p
            className="
              mt-3

              max-w-[230px]

              text-sm
              leading-5

              text-[#665D57]
            "
          >
            Add another pet to track their
            health records and appointments.
          </p>

        </button>

      </div>

    </DashboardLayout>
  );
};


export default PetsPage;