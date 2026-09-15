import {
  CalendarDays,
  Clock3,
  Video,
  UserRound,
  ChevronRight,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

const DoctorAppointments = () => {
  // Temporary data
  // Later this will come from Django REST API.
  const appointments = [
    {
      id: 1,
      patient: "Bruno",
      species: "Dog",
      breed: "Golden Retriever",
      owner: "Anu Thomas",
      date: "Today",
      time: "10:00 AM",
      type: "Video Consultation",
      status: "UPCOMING",
    },
    {
      id: 2,
      patient: "Luna",
      species: "Cat",
      breed: "Persian",
      owner: "Rahul Menon",
      date: "Today",
      time: "11:30 AM",
      type: "Follow-up",
      status: "UPCOMING",
    },
    {
      id: 3,
      patient: "Max",
      species: "Dog",
      breed: "Labrador",
      owner: "Meera Nair",
      date: "Today",
      time: "2:00 PM",
      type: "General Consultation",
      status: "UPCOMING",
    },
    {
      id: 4,
      patient: "Coco",
      species: "Dog",
      breed: "Beagle",
      owner: "Arun Kumar",
      date: "Sep 16, 2026",
      time: "10:30 AM",
      type: "Follow-up",
      status: "UPCOMING",
    },
    {
      id: 5,
      patient: "Milo",
      species: "Cat",
      breed: "British Shorthair",
      owner: "Priya Joseph",
      date: "Sep 17, 2026",
      time: "3:00 PM",
      type: "Video Consultation",
      status: "UPCOMING",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "UPCOMING":
        return "bg-[#F9F1EA] text-[#8B572F]";

      case "COMPLETED":
        return "bg-[#EEF5EF] text-[#55745A]";

      case "CANCELLED":
        return "bg-[#FBECEC] text-[#A85A5A]";

      default:
        return "bg-[#F5F2F0] text-[#786D67]";
    }
  };

  return (
    <DashboardLayout role="DOCTOR">
      <div className="space-y-6">

        {/* Page Header */}

        <section>
          <p className="text-sm text-[#786D67] mb-2">
            Manage your schedule
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

            <div>
              <h1 className="text-3xl sm:text-4xl font-semibold text-[#302925]">
                Appointments
              </h1>

              <p className="mt-2 text-sm sm:text-base text-[#786D67]">
                View and manage your upcoming and previous appointments.
              </p>
            </div>

            <button
              type="button"
              className="
                w-fit
                rounded-full
                bg-[#8B572F]
                px-5
                py-3
                text-sm
                font-medium
                text-white
                hover:bg-[#744622]
                transition
              "
            >
              Manage Availability
            </button>

          </div>
        </section>


        {/* Summary */}

        <section className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          <div
            className="
              rounded-[24px]
              bg-white
              p-5
              shadow-[0_8px_30px_rgba(70,45,30,0.05)]
            "
          >
            <p className="text-sm text-[#786D67]">
              Today's Appointments
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#302925]">
              3
            </p>

            <p className="mt-1 text-xs text-[#786D67]">
              2 appointments remaining
            </p>
          </div>


          <div
            className="
              rounded-[24px]
              bg-white
              p-5
              shadow-[0_8px_30px_rgba(70,45,30,0.05)]
            "
          >
            <p className="text-sm text-[#786D67]">
              Upcoming
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#302925]">
              5
            </p>

            <p className="mt-1 text-xs text-[#786D67]">
              Scheduled appointments
            </p>
          </div>


          <div
            className="
              rounded-[24px]
              bg-white
              p-5
              shadow-[0_8px_30px_rgba(70,45,30,0.05)]
            "
          >
            <p className="text-sm text-[#786D67]">
              Consultation Type
            </p>

            <p className="mt-2 text-3xl font-semibold text-[#302925]">
              Online
            </p>

            <p className="mt-1 text-xs text-[#786D67]">
              Video consultations available
            </p>
          </div>

        </section>


        {/* Appointment List */}

        <section
          className="
            rounded-[24px]
            bg-white
            p-5
            sm:p-6
            shadow-[0_8px_30px_rgba(70,45,30,0.05)]
          "
        >

          {/* Section Header */}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

            <div>
              <h2 className="text-xl font-semibold text-[#302925]">
                Upcoming Appointments
              </h2>

              <p className="mt-1 text-sm text-[#786D67]">
                Your scheduled consultations
              </p>
            </div>


            {/* Filter */}

            <select
              className="
                w-full
                sm:w-auto
                rounded-full
                border
                border-[#E5DDD8]
                bg-white
                px-4
                py-2.5
                text-sm
                text-[#665D57]
                outline-none
                focus:border-[#EBB183]
              "
              defaultValue="ALL"
            >
              <option value="ALL">
                All Appointments
              </option>

              <option value="TODAY">
                Today
              </option>

              <option value="UPCOMING">
                Upcoming
              </option>

              <option value="COMPLETED">
                Completed
              </option>
            </select>

          </div>


          {/* Cards */}

          <div className="space-y-4">

            {appointments.map((appointment) => (

              <div
                key={appointment.id}
                className="
                  rounded-[20px]
                  border
                  border-[#E8E1DD]
                  p-4
                  sm:p-5
                  hover:bg-[#FAF7F4]
                  transition
                "
              >

                <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                  {/* Patient */}

                  <div className="flex items-center gap-4 flex-1">

                    <div
                      className="
                        w-14
                        h-14
                        shrink-0
                        rounded-full
                        bg-[#EBB183]
                        flex
                        items-center
                        justify-center
                        text-2xl
                      "
                    >
                      🐾
                    </div>

                    <div className="min-w-0">

                      <h3 className="text-base font-semibold text-[#302925]">
                        {appointment.patient}
                      </h3>

                      <p className="mt-1 text-sm text-[#786D67]">
                        {appointment.breed}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">

                        <UserRound
                          size={13}
                          className="text-[#786D67]"
                        />

                        <span className="text-xs text-[#786D67]">
                          {appointment.owner}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* Date / Time */}

                  <div className="flex items-center gap-4 lg:min-w-[210px]">

                    <div
                      className="
                        w-10
                        h-10
                        rounded-full
                        bg-[#F9F1EA]
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <CalendarDays
                        size={18}
                        className="text-[#8B572F]"
                      />
                    </div>

                    <div>

                      <p className="text-sm font-medium text-[#302925]">
                        {appointment.date}
                      </p>

                      <div className="mt-1 flex items-center gap-1.5">

                        <Clock3
                          size={13}
                          className="text-[#786D67]"
                        />

                        <span className="text-xs text-[#786D67]">
                          {appointment.time}
                        </span>

                      </div>

                    </div>

                  </div>


                  {/* Consultation */}

                  <div className="lg:min-w-[190px]">

                    <div className="flex items-center gap-2">

                      <Video
                        size={16}
                        className="text-[#8B572F]"
                      />

                      <span className="text-sm text-[#665D57]">
                        {appointment.type}
                      </span>

                    </div>

                  </div>


                  {/* Status */}

                  <span
                    className={`
                      w-fit
                      rounded-full
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      ${getStatusStyle(appointment.status)}
                    `}
                  >
                    {appointment.status}
                  </span>


                  {/* Action */}

                  <button
                    type="button"
                    className="
                      flex
                      items-center
                      justify-center
                      gap-1
                      rounded-full
                      border
                      border-[#E5DDD8]
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-[#8B572F]
                      hover:bg-[#F9F1EA]
                      transition
                    "
                  >
                    View
                    <ChevronRight size={16} />
                  </button>

                </div>

              </div>

            ))}

          </div>

        </section>

      </div>
    </DashboardLayout>
  );
};

export default DoctorAppointments;