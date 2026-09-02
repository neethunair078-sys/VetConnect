const PetCard = ({
  pet,
  onClick,
  variant = "dashboard",
}) => {

  // ==========================================
  // DASHBOARD CARD
  // ==========================================

  if (variant === "dashboard") {
    return (
      <button
        type="button"
        onClick={() => onClick?.(pet)}
        className="
          w-full
          text-left
          rounded-[20px]
          bg-[#F7F5F4]
          p-4
          flex
          items-center
          gap-4

          cursor-pointer

          hover:bg-[#F2EEEB]
          hover:shadow-sm

          transition-all
          duration-200

          active:scale-[0.99]
        "
      >

        {/* Pet Image */}

        <div
          className="
            w-20
            h-20
            rounded-[18px]
            overflow-hidden
            shrink-0
            bg-[#EDE8E5]
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


        {/* Details */}

        <div className="min-w-0">

          <h3
            className="
              text-base
              font-semibold
              text-[#302925]
            "
          >
            {pet.name}
          </h3>


          <p
            className="
              mt-1
              text-sm
              text-[#786D67]
            "
          >
            {pet.breed}
          </p>


          <p
            className="
              text-xs
              text-[#786D67]
            "
          >
            {pet.age}
          </p>


          <span
            className="
              inline-flex
              mt-2
              rounded-full
              bg-[#EEDFD4]
              px-3
              py-1
              text-xs
              text-[#876247]
            "
          >
            {pet.status}
          </span>

        </div>

      </button>
    );
  }


  // ==========================================
  // PETS LIST CARD
  // ==========================================

  return (
    <div
      className="
        relative

        w-full
        min-h-[315px]

        rounded-[32px]

        bg-white

        p-5
        sm:p-6

        shadow-[0_12px_35px_rgba(70,45,30,0.05)]

        transition-all
        duration-200

        hover:-translate-y-1
        hover:shadow-[0_18px_40px_rgba(70,45,30,0.09)]
      "
    >

      {/* =========================
          STATUS
      ========================= */}

      <div
        className={`
          absolute
          top-4
          right-4

          rounded-full

          px-3
          py-1

          text-[11px]
          font-medium

          ${
            pet.status === "Vaccine Due"
              ? "bg-[#FFE2E0] text-[#D9544D]"
              : "bg-[#F4E4D8] text-[#7A4D2C]"
          }
        `}
      >

        {pet.status}

      </div>


      {/* =========================
          PET IMAGE
      ========================= */}

      <div className="flex justify-center pt-2">

        <div
          className="
            w-[105px]
            h-[105px]

            rounded-full

            bg-[#F5EDE6]

            p-1

            ring-4
            ring-[#F8F2ED]

            overflow-hidden
          "
        >

          <img
            src={pet.image}
            alt={pet.name}
            className="
              w-full
              h-full
              rounded-full
              object-cover
            "
          />

        </div>

      </div>


      {/* =========================
          DETAILS
      ========================= */}

      <div className="mt-5 text-center">

        <h2
          className="
            text-2xl
            font-medium
            text-[#171514]
          "
        >
          {pet.name}
        </h2>


        <p
          className="
            mt-1
            text-sm
            text-[#725F55]
          "
        >
          {pet.breed}

          <span className="mx-1">
            •
          </span>

          {pet.age}
        </p>


        {/* Tags */}

        {pet.tags?.length > 0 && (
          <div
            className="
              mt-4

              flex
              flex-wrap
              justify-center
              gap-2
            "
          >

            {pet.tags.map((tag) => (

              <span
                key={tag}
                className="
                  rounded-full
                  bg-[#F4F1EF]

                  px-3
                  py-1

                  text-[11px]
                  text-[#665D57]
                "
              >
                {tag}
              </span>

            ))}

          </div>
        )}

      </div>


      {/* =========================
          DIVIDER
      ========================= */}

      <div
        className="
          mt-5
          border-t
          border-[#EEE7E3]
        "
      />


      {/* =========================
          ACTIONS
      ========================= */}

      <div
        className="
          mt-3
          flex
          items-center
          gap-2
        "
      >

        {/* View Profile */}

        <button
          type="button"
          onClick={() => onClick?.(pet)}
          className="
            flex-1

            rounded-full

            bg-[#FBEDE2]

            py-2.5

            text-xs
            font-semibold

            text-[#8B572F]

            cursor-pointer

            transition-all
            duration-200

            hover:bg-[#F6DFD0]

            active:scale-[0.98]
          "
        >
          View Profile
        </button>


        {/* More */}

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            console.log("More options:", pet);
          }}
          className="
            w-9
            h-9
            shrink-0

            rounded-full

            bg-[#F3F0EE]

            flex
            items-center
            justify-center

            text-[#4F4742]

            cursor-pointer

            transition-all
            duration-200

            hover:bg-[#EBE4DF]

            active:scale-95
          "
        >
          •••
        </button>

      </div>

    </div>
  );
};


export default PetCard;