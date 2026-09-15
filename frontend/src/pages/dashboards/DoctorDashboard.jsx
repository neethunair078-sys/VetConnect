import {
  CalendarDays,
  Clock3,
  Users,
  Video,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

const DoctorDashboard = () => {
  // Temporary data
  // Later these values can come from Django REST APIs.
  const stats = [
    {
      label: "Today's Appointments",
      value: "8",
      icon: CalendarDays,
      description: "2 remaining",
    },
    {
      label: "Total Patients",
      value: "124",
      icon: Users,
      description: "12 new this month",
    },
    {
      label: "Consultations",
      value: "6",
      icon: Video,
      description: "Completed today",
    },
    {
      label: "Pending Tasks",
      value: "4",
      icon: ClipboardList,
      description: "Needs attention",
    },
  ];

  const appointments = [
    {
      id: 1,
      patient: "Bruno",
      owner: "Anu Thomas",
      time: "10:00 AM",
      type: "Video Consultation",
      status: "Upcoming",
    },
    {
      id: 2,
      patient: "Luna",
      owner: "Rahul Menon",
      time: "11:30 AM",
      type: "Follow-up",
      status: "Upcoming",
    },
    {
      id: 3,
      patient: "Max",
      owner: "Meera Nair",
      time: "2:00 PM",
      type: "General Consultation",
      status: "Upcoming",
    },
  ];

  const tasks = [
    {
      id: 1,
      title: "Review medical record",
      patient: "Bruno",
      completed: false,
    },
    {
      id: 2,
      title: "Update vaccination record",
      patient: "Luna",
      completed: false,
    },
    {
      id: 3,
      title: "Complete consultation notes",
      patient: "Max",
      completed: true,
    },
  ];

  return (
    <DashboardLayout role="DOCTOR">
      <div className="space-y-6">

        {/* -------------------------------------------------- */}
        {/* Welcome Section */}
        {/* -------------------------------------------------- */}

        <section>
          <p className="text-sm text-[#786D67] mb-2">
            Tuesday, September 15, 2026
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold text-[#302925]">
            Good afternoon, Doctor
          </h1>

          <p className="mt-2 text-sm sm:text-base text-[#786D67]">
            Here is an overview of your appointments and patients for today.
          </p>
        </section>


        {/* -------------------------------------------------- */}
        {/* Statistics */}
        {/* -------------------------------------------------- */}

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  rounded-[24px]
                  bg-white
                  p-5
                  sm:p-6
                  shadow-[0_8px_30px_rgba(70,45,30,0.05)]
                "
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm text-[#786D67]">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-semibold text-[#302925]">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-[#786D67]">
                      {stat.description}
                    </p>
                  </div>

                  <div
                    className="
                      w-11
                      h-11
                      rounded-full
                      bg-[#F9F1EA]
                      flex
                      items-center
                      justify-center
                      text-[#8B572F]
                    "
                  >
                    <Icon size={20} />
                  </div>

                </div>
              </div>
            );
          })}

        </section>


        {/* -------------------------------------------------- */}
        {/* Main Dashboard Grid */}
        {/* -------------------------------------------------- */}

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-5">


          {/* ------------------------------------------------ */}
          {/* Today's Schedule */}
          {/* ------------------------------------------------ */}

          <div
            className="
              xl:col-span-2
              rounded-[24px]
              bg-white
              p-6
              shadow-[0_8px_30px_rgba(70,45,30,0.05)]
            "
          >

            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="text-xl font-semibold text-[#302925]">
                  Today's Schedule
                </h2>

                <p className="mt-1 text-sm text-[#786D67]">
                  Your upcoming appointments
                </p>
              </div>

              <button
                type="button"
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-1
                  text-sm
                  font-medium
                  text-[#8B572F]
                  hover:text-[#744622]
                "
              >
                View all
                <ArrowRight size={16} />
              </button>

            </div>


            <div className="space-y-3">

              {appointments.map((appointment) => (

                <div
                  key={appointment.id}
                  className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    justify-between
                    gap-4
                    rounded-[18px]
                    border
                    border-[#E8E1DD]
                    p-4
                    hover:bg-[#FAF7F4]
                    transition
                  "
                >

                  {/* Patient */}

                  <div className="flex items-center gap-3">

                    <div
                      className="
                        w-11
                        h-11
                        rounded-full
                        bg-[#EBB183]
                        flex
                        items-center
                        justify-center
                        text-lg
                      "
                    >
                      🐾
                    </div>

                    <div>

                      <p className="text-sm font-semibold text-[#302925]">
                        {appointment.patient}
                      </p>

                      <p className="text-xs text-[#786D67]">
                        Owner: {appointment.owner}
                      </p>

                    </div>

                  </div>


                  {/* Appointment details */}

                  <div className="flex items-center gap-5">

                    <div className="flex items-center gap-2">

                      <Clock3
                        size={16}
                        className="text-[#8B572F]"
                      />

                      <span className="text-sm text-[#665D57]">
                        {appointment.time}
                      </span>

                    </div>

                    <div className="hidden md:block">

                      <p className="text-xs text-[#786D67]">
                        {appointment.type}
                      </p>

                    </div>

                  </div>


                  {/* Status */}

                  <span
                    className="
                      w-fit
                      rounded-full
                      bg-[#F9F1EA]
                      px-3
                      py-1.5
                      text-xs
                      font-medium
                      text-[#8B572F]
                    "
                  >
                    {appointment.status}
                  </span>

                </div>

              ))}

            </div>


            {/* Mobile View All */}

            <button
              type="button"
              className="
                sm:hidden
                mt-4
                flex
                items-center
                gap-1
                text-sm
                font-medium
                text-[#8B572F]
              "
            >
              View all appointments
              <ArrowRight size={16} />
            </button>

          </div>


          {/* ------------------------------------------------ */}
          {/* Tasks */}
          {/* ------------------------------------------------ */}

          <div
            className="
              rounded-[24px]
              bg-white
              p-6
              shadow-[0_8px_30px_rgba(70,45,30,0.05)]
            "
          >

            <div className="mb-5">

              <h2 className="text-xl font-semibold text-[#302925]">
                Tasks
              </h2>

              <p className="mt-1 text-sm text-[#786D67]">
                Items that need your attention
              </p>

            </div>


            <div className="space-y-4">

              {tasks.map((task) => (

                <div
                  key={task.id}
                  className="
                    flex
                    items-start
                    gap-3
                  "
                >

                  <div className="pt-0.5">

                    {task.completed ? (
                      <CheckCircle2
                        size={20}
                        className="text-[#8B572F]"
                      />
                    ) : (
                      <div
                        className="
                          w-5
                          h-5
                          rounded-full
                          border-2
                          border-[#D8CEC7]
                        "
                      />
                    )}

                  </div>

                  <div className="min-w-0">

                    <p
                      className={`
                        text-sm
                        font-medium
                        ${
                          task.completed
                            ? "text-[#A49A94] line-through"
                            : "text-[#302925]"
                        }
                      `}
                    >
                      {task.title}
                    </p>

                    <p className="mt-1 text-xs text-[#786D67]">
                      Patient: {task.patient}
                    </p>

                  </div>

                </div>

              ))}

            </div>


            <button
              type="button"
              className="
                mt-6
                w-full
                rounded-full
                border
                border-[#E5DDD8]
                py-2.5
                text-sm
                font-medium
                text-[#8B572F]
                hover:bg-[#FAF7F4]
                transition
              "
            >
              View all tasks
            </button>

          </div>

        </section>


        {/* -------------------------------------------------- */}
        {/* Current Patient + Quick Actions */}
        {/* -------------------------------------------------- */}

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-5">


          {/* Current Patient */}

          <div
            className="
              rounded-[24px]
              bg-white
              p-6
              shadow-[0_8px_30px_rgba(70,45,30,0.05)]
            "
          >

            <div className="flex items-center justify-between mb-5">

              <div>
                <h2 className="text-xl font-semibold text-[#302925]">
                  Current Patient
                </h2>

                <p className="mt-1 text-sm text-[#786D67]">
                  Patient from your upcoming consultation
                </p>
              </div>

              <Video
                size={20}
                className="text-[#8B572F]"
              />

            </div>


            <div
              className="
                rounded-[20px]
                bg-[#FAF7F4]
                p-5
                flex
                items-center
                justify-between
                gap-4
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    w-14
                    h-14
                    rounded-full
                    bg-[#EBB183]
                    flex
                    items-center
                    justify-center
                    text-2xl
                  "
                >
                  🐶
                </div>

                <div>

                  <h3 className="text-base font-semibold text-[#302925]">
                    Bruno
                  </h3>

                  <p className="text-sm text-[#786D67]">
                    Golden Retriever
                  </p>

                  <p className="mt-1 text-xs text-[#786D67]">
                    4 years · Male · 28 kg
                  </p>

                </div>

              </div>


              <button
                type="button"
                className="
                  hidden
                  sm:flex
                  items-center
                  gap-2
                  rounded-full
                  bg-[#8B572F]
                  px-4
                  py-2.5
                  text-xs
                  font-medium
                  text-white
                  hover:bg-[#744622]
                  transition
                "
              >
                View profile
                <ArrowRight size={14} />

              </button>

            </div>

          </div>


          {/* Quick Actions */}

          <div
            className="
              rounded-[24px]
              bg-white
              p-6
              shadow-[0_8px_30px_rgba(70,45,30,0.05)]
            "
          >

            <div className="mb-5">

              <h2 className="text-xl font-semibold text-[#302925]">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-[#786D67]">
                Frequently used doctor tools
              </p>

            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <button
                type="button"
                className="
                  rounded-[18px]
                  border
                  border-[#E8E1DD]
                  p-4
                  text-left
                  hover:bg-[#FAF7F4]
                  transition
                "
              >
                <CalendarDays
                  size={20}
                  className="text-[#8B572F]"
                />

                <p className="mt-3 text-sm font-semibold text-[#302925]">
                  Manage Appointments
                </p>

                <p className="mt-1 text-xs text-[#786D67]">
                  View and manage your schedule
                </p>
              </button>


              <button
                type="button"
                className="
                  rounded-[18px]
                  border
                  border-[#E8E1DD]
                  p-4
                  text-left
                  hover:bg-[#FAF7F4]
                  transition
                "
              >
                <Users
                  size={20}
                  className="text-[#8B572F]"
                />

                <p className="mt-3 text-sm font-semibold text-[#302925]">
                  View Patients
                </p>

                <p className="mt-1 text-xs text-[#786D67]">
                  Access your patient list
                </p>
              </button>


              <button
                type="button"
                className="
                  rounded-[18px]
                  border
                  border-[#E8E1DD]
                  p-4
                  text-left
                  hover:bg-[#FAF7F4]
                  transition
                "
              >
                <Clock3
                  size={20}
                  className="text-[#8B572F]"
                />

                <p className="mt-3 text-sm font-semibold text-[#302925]">
                  Set Availability
                </p>

                <p className="mt-1 text-xs text-[#786D67]">
                  Manage your consultation hours
                </p>
              </button>


              <button
                type="button"
                className="
                  rounded-[18px]
                  border
                  border-[#E8E1DD]
                  p-4
                  text-left
                  hover:bg-[#FAF7F4]
                  transition
                "
              >
                <ClipboardList
                  size={20}
                  className="text-[#8B572F]"
                />

                <p className="mt-3 text-sm font-semibold text-[#302925]">
                  Health Records
                </p>

                <p className="mt-1 text-xs text-[#786D67]">
                  Review patient records
                </p>
              </button>

            </div>

          </div>

        </section>

      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;