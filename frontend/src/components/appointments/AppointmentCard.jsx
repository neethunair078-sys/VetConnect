import {
  CalendarDays,
  Clock3,
  Video,
  UserRound,
} from "lucide-react";


const AppointmentCard = ({
  appointment,
  onJoin,
  onReschedule,
  onViewDetails,
  onCancel,
}) => {

  return (
    <div
      className="
        w-full

        rounded-[28px]

        border
        border-[#EEE8E4]

        bg-white

        p-5
        sm:p-6

        shadow-[0_8px_30px_rgba(70,45,30,0.04)]

        transition-all
        duration-200

        hover:shadow-[0_12px_35px_rgba(70,45,30,0.07)]
      "
    >

      {/* =====================================
          TOP
      ===================================== */}

      <div
        className="
          flex
          flex-col
          sm:flex-row

          sm:items-start
          sm:justify-between

          gap-4
        "
      >

        {/* Pet */}

        <div className="flex items-center gap-4">

          <div
            className="
              w-16
              h-16

              sm:w-[72px]
              sm:h-[72px]

              rounded-full

              overflow-hidden

              shrink-0

              bg-[#F4EFEB]
            "
          >

            <img
              src={appointment.petImage}
              alt={appointment.pet}
              className="
                w-full
                h-full
                object-cover
              "
            />

          </div>


          <div>

            <h3
              className="
                text-lg
                sm:text-xl

                font-semibold

                text-[#302925]
              "
            >
              {appointment.pet}
            </h3>


            <div
              className="
                mt-1

                flex
                items-center
                gap-2
              "
            >

              <UserRound
                size={14}
                className="text-[#8B572F]"
              />

              <span
                className="
                  text-sm
                  text-[#665D57]
                "
              >
                {appointment.doctor}
              </span>

            </div>

          </div>

        </div>


        {/* Consultation type */}

        <div
          className="
            inline-flex
            items-center
            gap-2

            self-start

            rounded-full

            bg-[#F6EADF]

            px-3
            py-1.5

            text-xs
            font-medium

            text-[#8B572F]
          "
        >

          <Video size={13} />

          Online Consultation

        </div>

      </div>


      {/* =====================================
          DETAILS
      ===================================== */}

      <div
        className="
          mt-5

          flex
          flex-col
          sm:flex-row

          gap-3
          sm:gap-6
        "
      >

        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <div
            className="
              w-8
              h-8

              rounded-full

              bg-[#F7F3F0]

              flex
              items-center
              justify-center
            "
          >
            <CalendarDays
              size={15}
              className="text-[#8B572F]"
            />
          </div>


          <span
            className="
              text-sm
              font-medium

              text-[#4C423C]
            "
          >
            {appointment.displayDate || appointment.date}
          </span>

        </div>


        <div
          className="
            flex
            items-center
            gap-2
          "
        >

          <div
            className="
              w-8
              h-8

              rounded-full

              bg-[#F7F3F0]

              flex
              items-center
              justify-center
            "
          >
            <Clock3
              size={15}
              className="text-[#8B572F]"
            />
          </div>


          <span
            className="
              text-sm
              font-medium

              text-[#4C423C]
            "
          >
            {appointment.time}
          </span>

        </div>

      </div>


      {/* =====================================
          CONSULTATION TYPE
      ===================================== */}

      <p
        className="
          mt-4

          text-sm

          text-[#786D67]
        "
      >
        {appointment.type}
      </p>


      {/* =====================================
          ACTIONS
      ===================================== */}

      <div
        className="
          mt-5

          flex
          flex-col
          sm:flex-row

          gap-3
        "
      >

        {/* Join */}

        {onJoin && (

          <button
            type="button"
            onClick={() => onJoin(appointment)}
            className="
              flex-1

              inline-flex
              items-center
              justify-center
              gap-2

              rounded-full

              bg-[#8B572F]

              px-5
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

            <Video size={16} />

            Join Consultation

          </button>

        )}


        {/* Reschedule */}

        {onReschedule && (

          <button
            type="button"
            onClick={() =>
              onReschedule(appointment)
            }
            className="
              flex-1

              rounded-full

              bg-[#F3F0EE]

              px-5
              py-3

              text-sm
              font-medium

              text-[#5D514A]

              cursor-pointer

              hover:bg-[#EAE4E0]

              transition
            "
          >
            Reschedule
          </button>

        )}


        {/* View details */}

        {onViewDetails && (

          <button
            type="button"
            onClick={() =>
              onViewDetails(appointment)
            }
            className="
              flex-1

              rounded-full

              bg-[#F3F0EE]

              px-5
              py-3

              text-sm
              font-medium

              text-[#5D514A]

              cursor-pointer

              hover:bg-[#EAE4E0]

              transition
            "
          >
            View Details
          </button>

        )}


        {/* Cancel */}

        {onCancel && (

          <button
            type="button"
            onClick={() =>
              onCancel(appointment)
            }
            className="
              rounded-full

              px-5
              py-3

              text-sm
              font-medium

              text-[#8B572F]

              cursor-pointer

              hover:bg-[#FBF3EE]

              transition
            "
          >
            Cancel
          </button>

        )}

      </div>

    </div>
  );
};


export default AppointmentCard;