import { useEffect, useState } from "react";

import {
  CalendarDays,
  Clock3,
  Users,
  Video,
  ClipboardList,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { getAppointments } from "../../api/appointmentApi";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

const DoctorDashboard = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();


  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);

        const data = await getAppointments();

        setAppointments(data);
      } catch (error) {
        console.error(
          "Failed to fetch appointments:",
          error.response?.data || error.message
        );

        toast.error("Unable to load dashboard appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);


  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter(
    (appointment) => appointment.appointment_date === today
  );

  const upcomingAppointments = appointments
  .filter(
    (appointment) =>
      appointment.status === "PENDING" ||
      appointment.status === "CONFIRMED"
  )
  .sort((a, b) => {
    const dateA = new Date(
      `${a.appointment_date}T${a.appointment_time}`
    );
    const dateB = new Date(
      `${b.appointment_date}T${b.appointment_time}`
    );

    return dateA - dateB;
  });

  const currentPatient = upcomingAppointments[0];

  const remainingAppointments = todayAppointments.filter(
    (appointment) =>
      appointment.status === "PENDING" ||
      appointment.status === "CONFIRMED"
  ).length;


  const completedToday = todayAppointments.filter(
    (appointment) => appointment.status === "COMPLETED"
  ).length;


  const stats = [
    {
      label: "Today's Appointments",
      value: todayAppointments.length,
      icon: CalendarDays,
      description: `${remainingAppointments} remaining`,
    },
    {
      label: "Total Patients",
      value: new Set(
        appointments.map((appointment) => appointment.pet)
      ).size,
      icon: Users,
      description: "Based on your appointments",
    },
    {
      label: "Consultations",
      value: completedToday,
      icon: Video,
      description: "Completed today",
    },
    {
      label: "Pending Tasks",
      value: appointments.filter(
        (appointment) => appointment.status === "PENDING"
      ).length,
      icon: ClipboardList,
      description: "Appointments needing attention",
    },
  ];


  return (
    <DashboardLayout role="DOCTOR">
      <div className="space-y-6">

        {/* -------------------------------------------------- */}
        {/* Welcome Section */}
        {/* -------------------------------------------------- */}

        <section>
          <p className="text-sm text-vet-text-secondary mb-2">
            Tuesday, September 15, 2026
          </p>

          <h1 className="text-3xl sm:text-4xl font-semibold text-vet-text-primary">
            Good afternoon, Doctor
          </h1>

          <p className="mt-2 text-sm sm:text-base text-vet-text-secondary">
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
                    <p className="text-sm text-vet-text-secondary">
                      {stat.label}
                    </p>

                    <p className="mt-2 text-3xl font-semibold text-vet-text-primary">
                      {stat.value}
                    </p>

                    <p className="mt-1 text-xs text-vet-text-secondary">
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
                <h2 className="text-xl font-semibold text-vet-text-primary">
                  Today's Schedule
                </h2>

                <p className="mt-1 text-sm text-vet-text-secondary">
                  Your upcoming appointments
                </p>
              </div>

              <button
                type="button"
                onClick={() => navigate("/doctor/appointments")}
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

              {todayAppointments.map((appointment) => (

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

                      <p className="text-sm font-semibold text-vet-text-primary">
                        {appointment.pet_name}
                      </p>

                      <p className="text-xs text-vet-text-secondary">
                        Owner: {appointment.owner_name}
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
                        {appointment.appointment_time}
                      </span>

                    </div>

                    <div className="hidden md:block">

                      <p className="text-xs text-vet-text-secondary">
                        {appointment.appointment_type === "FOLLOW_UP" ? "Follow-up" : "General Consultation"}
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
              onClick={() => navigate("/doctor/appointments")}
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

              <h2 className="text-xl font-semibold text-vet-text-primary">
                Tasks
              </h2>

              <p className="mt-1 text-sm text-vet-text-secondary">
                Items that need your attention
              </p>

            </div>


            <div className="space-y-4">

              {appointments.filter(
                (appointment) => appointment.status === "PENDING"
              ).length === 0 ? (
                <div className="rounded-xl bg-[#FAF7F4] p-4 text-center">
                  <CheckCircle2
                    size={22}
                    className="mx-auto text-[#8B572F]"
                  />

                  <p className="mt-2 text-sm font-medium text-vet-text-primary">
                    No pending tasks
                  </p>

                  <p className="mt-1 text-xs text-vet-text-secondary">
                    You're all caught up.
                  </p>
                </div>
              ) : (
                appointments
                  .filter((appointment) => appointment.status === "PENDING")
                  .slice(0, 3)
                  .map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-start gap-3"
                    >
                      <div className="pt-0.5">
                        <div className="h-5 w-5 rounded-full border-2 border-[#D8CEC7]" />
                      </div>

                      <div className="min-w-0">
                        <p className="text-sm font-medium text-vet-text-primary">
                          Review appointment request
                        </p>

                        <p className="mt-1 text-xs text-vet-text-secondary">
                          Patient: {appointment.pet_name}
                        </p>
                      </div>
                    </div>
                  ))
              )}

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
                <h2 className="text-xl font-semibold text-vet-text-primary">
                  Current Patient
                </h2>

                <p className="mt-1 text-sm text-vet-text-secondary">
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

                {currentPatient ? (
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
                ) : null}

                <div>

                  {currentPatient ? (
                    <>
                      <h3>{currentPatient.pet_name}</h3>

                      <p>
                        {currentPatient.appointment_type === "FOLLOW_UP"
                          ? "Follow-up"
                          : "General Consultation"}
                      </p>

                      <p>
                        Owner: {currentPatient.owner_name}
                      </p>

                      <p>
                        Appointment: {currentPatient.appointment_date}
                      </p>

                      <p>
                        Time: {currentPatient.appointment_time}
                      </p>
                    </>
                  ) : (
                    <p>No upcoming patients.</p>
                  )}

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
                  bg-vet-primary-dark
                  px-4
                  py-2.5
                  text-xs
                  font-medium
                  text-white
                  hover:bg-vet-primary-dark-hover
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

              <h2 className="text-xl font-semibold text-vet-text-primary">
                Quick Actions
              </h2>

              <p className="mt-1 text-sm text-vet-text-secondary">
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

                <p className="mt-3 text-sm font-semibold text-vet-text-primary">
                  Manage Appointments
                </p>

                <p className="mt-1 text-xs text-vet-text-secondary">
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

                <p className="mt-3 text-sm font-semibold text-vet-text-primary">
                  View Patients
                </p>

                <p className="mt-1 text-xs text-vet-text-secondary">
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

                <p className="mt-3 text-sm font-semibold text-vet-text-primary">
                  Set Availability
                </p>

                <p className="mt-1 text-xs text-vet-text-secondary">
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

                <p className="mt-3 text-sm font-semibold text-vet-text-primary">
                  Health Records
                </p>

                <p className="mt-1 text-xs text-vet-text-secondary">
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