const TimeSlotPicker = ({
  selectedDate,
  slots,
  selectedTime,
  onSelectTime,
}) => {

  if (!selectedDate) {
    return (
      <div
        className="
          rounded-[24px]

          bg-white

          border
          border-vet-border

          p-6

          text-center
        "
      >

        <p
          className="
            text-sm
            text-vet-text-secondary
          "
        >
          Select a date to view available
          consultation times.
        </p>

      </div>
    );
  }


  return (
    <div>

      <h3
        className="
          text-sm
          font-semibold

          text-vet-text-primary
        "
      >
        Available Times
      </h3>


      {slots.length === 0 ? (

        <div
          className="
            mt-4

            rounded-[20px]

            bg-white

            border
            border-vet-border

            p-6
          "
        >

          <p
            className="
              text-sm
              text-vet-text-secondary
            "
          >
            No consultation slots are
            available for this date.
          </p>

        </div>

      ) : (

        <div
          className="
            mt-4

            grid

            grid-cols-2
            sm:grid-cols-3

            gap-3
          "
        >

          {slots.map((time) => {

            const selected =
              selectedTime === time;


            return (
              <button
                key={time}
                type="button"
                onClick={() =>
                  onSelectTime(time)
                }
                className={`
                  rounded-full

                  border

                  px-4
                  py-2.5

                  text-sm

                  cursor-pointer

                  transition-all

                  ${
                    selected
                      ? `
                        bg-vet-primary-dark
                        border-[#8B572F]
                        text-white
                      `
                      : `
                        bg-white
                        border-[#B98A68]
                        text-[#5F422F]

                        hover:bg-[#FBF3EE]
                      `
                  }
                `}
              >
                {time}
              </button>
            );

          })}

        </div>

      )}

    </div>
  );
};

export default TimeSlotPicker;