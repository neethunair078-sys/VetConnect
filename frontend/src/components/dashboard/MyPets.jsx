import SectionHeader from "./SectionHeader";
import PetCard from "./PetCard";
import { useNavigate } from "react-router-dom";

const MyPets = ({
  pets,
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

    </section>
  );
};

export default MyPets;