const BookingSummary = ({
  pet,
  doctor,
  selectedDate,
  selectedTime,
  onContinue,
}) => {

  const canContinue =
    pet &&
    doctor &&
    selectedDate &&
    selectedTime;


  const formattedDate =
    selectedDate
      ? new Date(
          `${selectedDate}T00:00:00`
        ).toLocaleDateString(
          "en-US",
          {
            weekday: "long",
            month: "short",
            day: "numeric",
            year: "numeric",
          }
        )
      : null;


  return (
    <aside
      className="
        rounded-[28px]

        bg-white

        border
        border-[#EEE8E4]

        p-6

        h-fit

        lg:sticky
        lg:top-6
      "
    >

      <h2
        className="
          text-xl
          font-semibold

          text-[#302925]
        "
      >
        Summary
      </h2>


      <div
        className="
          mt-5

          border-t
          border-[#EEE8E4]

          pt-5
        "
      >

        <p
          className="
            text-xs
            text-[#8B7E77]
          "
        >
          Service
        </p>

        <p
          className="
            mt-1

            text-sm
            font-medium

            text-[#302925]
          "
        >
          Online Veterinary Consultation
        </p>

      </div>


      {/* Pet */}

      <div
        className="
          mt-5

          border-t
          border-[#EEE8E4]

          pt-5
        "
      >

        <p
          className="
            text-xs
            text-[#8B7E77]
          "
        >
          Pet
        </p>


        {pet ? (

          <div
            className="
              mt-3

              flex
              items-center
              gap-3
            "
          >

            <div
              className="
                w-9
                h-9

                rounded-full

                overflow-hidden

                bg-[#F4EFEB]
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


            <div>

              <p
                className="
                  text-sm
                  font-medium

                  text-[#302925]
                "
              >
                {pet.name}
              </p>

              <p
                className="
                  text-xs

                  text-[#786D67]
                "
              >
                {pet.breed}
              </p>

            </div>

          </div>

        ) : (

          <p
            className="
              mt-2
              text-sm
              italic
              text-[#B2A9A4]
            "
          >
            Not selected
          </p>

        )}

      </div>


      {/* Doctor */}

      <div
        className="
          mt-5

          border-t
          border-[#EEE8E4]

          pt-5
        "
      >

        <p
          className="
            text-xs
            text-[#8B7E77]
          "
        >
          Veterinarian
        </p>


        <p
          className="
            mt-1

            text-sm
            font-medium

            text-[#302925]
          "
        >
          {doctor
            ? doctor.name
            : "Not selected"}
        </p>

      </div>


      {/* Date */}

      <div
        className="
          mt-5

          border-t
          border-[#EEE8E4]

          pt-5
        "
      >

        <p
          className="
            text-xs
            text-[#8B7E77]
          "
        >
          Date & Time
        </p>


        {selectedDate &&
        selectedTime ? (

          <div className="mt-1">

            <p
              className="
                text-sm
                font-medium

                text-[#302925]
              "
            >
              {formattedDate}
            </p>

            <p
              className="
                mt-1

                text-sm

                text-[#786D67]
              "
            >
              {selectedTime}
            </p>

          </div>

        ) : (

          <p
            className="
              mt-1

              text-sm
              italic

              text-[#B2A9A4]
            "
          >
            Not selected
          </p>

        )}

      </div>


      {/* Price */}

      <div
        className="
          mt-5

          border-t
          border-[#EEE8E4]

          pt-5

          flex
          items-center
          justify-between
        "
      >

        <span
          className="
            text-sm
            font-medium

            text-[#5D514A]
          "
        >
          Consultation Fee
        </span>


        <span
          className="
            text-2xl
            font-semibold

            text-[#8B572F]
          "
        >
          ₹450
        </span>

      </div>


      {/* Continue */}

      <button
        type="button"
        disabled={!canContinue}
        onClick={onContinue}
        className={`
          w-full

          mt-6

          rounded-full

          py-3.5

          text-sm
          font-semibold

          transition-all

          ${
            canContinue
              ? `
                bg-[#8B572F]
                text-white

                cursor-pointer

                hover:bg-[#744622]
                hover:-translate-y-0.5
              `
              : `
                bg-[#E7E3E0]
                text-[#A49B95]

                cursor-not-allowed
              `
          }
        `}
      >
        Continue to Confirmation
      </button>

    </aside>
  );
};

export default BookingSummary;