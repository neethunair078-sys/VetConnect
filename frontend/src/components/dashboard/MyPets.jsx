import SectionHeader from "./SectionHeader";
import PetCard from "./PetCard";
import { useNavigate } from "react-router-dom";

const MyPets = ({
  pets,
  loading,
  error,
  onViewAll,
  onPetClick,
}) => {

  const navigate = useNavigate()

  return (
    <section
      className="
        rounded-[28px]
        bg-white
        p-6
        sm:p-7
        lg:p-8
        shadow-[0_12px_40px_rgba(70,45,30,0.05)]
      "
    >

      <SectionHeader
        title="My Pets"
        action="View All"
        onAction={() => navigate("/pet-owner/pets")}
      />

      {/* Loading */}

      {loading && (
        <div className="py-10 text-center">
          <p className="text-sm text-[#81756E]">
            Loading your pets...
          </p>
        </div>
      )}


      {/* Error */}

      {!loading && error && (
        <div className="py-10 text-center">
          <p className="text-sm text-red-500">
            Unable to load your pets.
          </p>
        </div>
      )}


      {/* Empty */}

      {!loading && !error && pets.length === 0 && (
        <div className="py-10 text-center">

          <p className="text-sm text-[#81756E]">
            You haven't added any pets yet.
          </p>

          <button
            type="button"
            onClick={() => navigate("/pet-owner/pets/add")}
            className="
              mt-4
              rounded-full
              bg-vet-primary-dark
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              cursor-pointer
              hover:bg-vet-primary-dark-hover
              transition
            "
          >
            Add Your First Pet
          </button>

        </div>
      )}





      {!loading && !error && pets.length > 0 && (
        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-4
          "
        >

          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              pet={pet}
              onClick={() => onPetClick?.(pet)}
            />
          ))}

        </div>
      )}

    </section>
  );
};

export default MyPets;