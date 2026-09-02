import { Star } from "lucide-react";

const DoctorCard = ({
  doctor,
  selected,
  onSelect,
}) => {
  return (
    <div
      className={`
        rounded-[26px]

        bg-white

        border

        p-5

        transition-all

        ${
          selected
            ? "border-[#8B572F] shadow-[0_8px_25px_rgba(139,87,47,0.12)]"
            : "border-transparent hover:border-[#E8DDD5]"
        }
      `}
    >

      <div className="flex items-center gap-4">

        {/* Doctor Image */}

        <div
          className="
            w-16
            h-16

            rounded-full

            overflow-hidden

            shrink-0

            bg-[#F3EEEA]
          "
        >

          <img
            src={doctor.image}
            alt={doctor.name}
            className="
              w-full
              h-full
              object-cover
            "
          />

        </div>


        {/* Doctor Details */}

        <div className="min-w-0">

          <h3
            className="
              text-base
              font-semibold

              text-[#302925]
            "
          >
            {doctor.name}
          </h3>

          <p
            className="
              mt-1

              text-sm

              text-[#786D67]
            "
          >
            {doctor.specialization}
          </p>

          <div
            className="
              mt-2

              flex
              items-center
              gap-1

              text-xs

              text-[#8B572F]
            "
          >
            <Star
              size={13}
              fill="currentColor"
            />

            {doctor.rating}

            <span className="text-[#786D67]">
              ({doctor.reviews} reviews)
            </span>
          </div>

        </div>

      </div>


      <button
        type="button"
        onClick={() => onSelect(doctor)}
        className={`
          w-full

          mt-5

          rounded-full

          py-3

          text-sm
          font-medium

          cursor-pointer

          transition-all

          ${
            selected
              ? "bg-[#8B572F] text-white hover:bg-[#744622]"
              : "border border-[#B98A68] text-[#5F422F] hover:bg-[#FBF3EE]"
          }
        `}
      >
        {selected ? "Selected" : "Select"}
      </button>

    </div>
  );
};

export default DoctorCard;