import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Video,
  UserRound,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getAppointments } from "../../api/appointmentApi";

const DoctorAppointments = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setLoading(true);

        const data = await getAppointments();
        setAppointments(data);
      } catch (error) {
        console.error(
          "Failed to fetch appointments:",
          error.response?.data || error.message,
        );

        toast.error("Failed to load appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const parseDate = (dateString) => {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day);
  };

  const formatDate = (dateString) => {
    const date = parseDate(dateString);

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "";

    const [hours, minutes] = timeString.split(":").map(Number);

    const date = new Date();
    date.setHours(hours, minutes, 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "CONFIRMED":
        return "bg-[#F9F1EA] text-[#8B572F]";

      case "PENDING":
        return "bg-[#F5F2F0] text-vet-text-secondary";

      case "COMPLETED":
        return "bg-[#EEF5EF] text-[#55745A]";

      case "CANCELLED":
      case "REJECTED":
        return "bg-[#FBECEC] text-[#A85A5A]";

      default:
        return "bg-[#F5F2F0] text-vet-text-secondary";
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const appointmentDate = parseDate(appointment.appointment_date);

      return (
        appointmentDate >= today &&
        appointment.status !== "COMPLETED" &&
        appointment.status !== "CANCELLED" &&
        appointment.status !== "REJECTED"
      );
    });
  }, [appointments]);

  const pastAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const appointmentDate = parseDate(appointment.appointment_date);

      return (
        appointmentDate < today ||
        appointment.status === "COMPLETED" ||
        appointment.status === "CANCELLED" ||
        appointment.status === "REJECTED"
      );
    });
  }, [appointments]);

  const filteredAppointments = useMemo(() => {
    switch (filter) {
      case "TODAY":
        return appointments.filter(
          (appointment) =>
            parseDate(appointment.appointment_date).getTime() ===
            today.getTime(),
        );

      case "UPCOMING":
        return appointments.filter((appointment) => {
          const appointmentDate = parseDate(appointment.appointment_date);

          return (
            appointmentDate > today &&
            appointment.status !== "CANCELLED" &&
            appointment.status !== "REJECTED"
          );
        });

      case "PAST":
        return appointments.filter((appointment) => {
          const appointmentDate = parseDate(appointment.appointment_date);

          return (
            appointmentDate < today ||
            appointment.status === "COMPLETED" ||
            appointment.status === "CANCELLED" ||
            appointment.status === "REJECTED"
          );
        });

      case "COMPLETED":
        return appointments.filter(
          (appointment) => appointment.status === "COMPLETED",
        );

      default:
        return appointments;
    }
  }, [appointments, filter]);

  return (
    <DashboardLayout role="DOCTOR">
      <div className="space-y-6">
        {/* Page Header */}
        <section>
          <p className="mb-2 text-sm text-vet-text-secondary">
            Manage your schedule
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-vet-text-primary sm:text-4xl">
                Appointments
              </h1>

              <p className="mt-2 text-sm text-vet-text-secondary sm:text-base">
                View and manage your upcoming and previous appointments.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate("/doctor/availability")}
              className="
                w-fit
                rounded-full
                bg-vet-primary-dark
                px-5
                py-3
                text-sm
                font-medium
                text-white
                transition
                hover:bg-vet-primary-dark-hover
              "
            >
              Manage Availability
            </button>
          </div>
        </section>

        {/* Summary */}
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div
            className="
              rounded-[24px]
              bg-white
              p-5
              shadow-[0_8px_30px_rgba(70,45,30,0.05)]
            "
          >
            <p className="text-sm text-vet-text-secondary">
              Today's Appointments
            </p>

            <p className="mt-2 text-3xl font-semibold text-vet-text-primary">
              {
                appointments.filter(
                  (appointment) =>
                    parseDate(appointment.appointment_date).getTime() ===
                    today.getTime(),
                ).length
              }
            </p>

            <p className="mt-1 text-xs text-vet-text-secondary">
              Appointments scheduled today
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
            <p className="text-sm text-vet-text-secondary">Upcoming</p>

            <p className="mt-2 text-3xl font-semibold text-vet-text-primary">
              {upcomingAppointments.length}
            </p>

            <p className="mt-1 text-xs text-vet-text-secondary">
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
            <p className="text-sm text-vet-text-secondary">Consultation Type</p>

            <p className="mt-2 text-3xl font-semibold text-vet-text-primary">
              Online
            </p>

            <p className="mt-1 text-xs text-vet-text-secondary">
              General Consultation available
            </p>
          </div>
        </section>

        {/* Appointment List */}
        <section
          className="
            rounded-[24px]
            bg-white
            p-5
            shadow-[0_8px_30px_rgba(70,45,30,0.05)]
            sm:p-6
          "
        >
          {/* Section Header */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-vet-text-primary">
                {filter === "ALL" && "All Appointments"}
                {filter === "TODAY" && "Today's Appointments"}
                {filter === "UPCOMING" && "Upcoming Appointments"}
                {filter === "PAST" && "Past Appointments"}
                {filter === "COMPLETED" && "Completed Appointments"}
              </h2>

              <p className="mt-1 text-sm text-vet-text-secondary">
                {filter === "ALL" && "View all your appointments"}
                {filter === "TODAY" && "Appointments scheduled for today"}
                {filter === "UPCOMING" && "Your scheduled consultations"}
                {filter === "PAST" && "Your previous appointments"}
                {filter === "COMPLETED" && "Completed consultations"}
              </p>
            </div>

            {/* Filter */}
            <select
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              className="
                w-full
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
                sm:w-auto
              "
            >
              <option value="ALL">All Appointments</option>
              <option value="TODAY">Today</option>
              <option value="UPCOMING">Upcoming</option>
              <option value="PAST">Past</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          {/* Loading */}
          {loading && (
            <div className="py-10 text-center text-sm text-vet-text-secondary">
              Loading appointments...
            </div>
          )}

          {/* Empty State */}
          {!loading && filteredAppointments.length === 0 && (
            <div className="py-10 text-center">
              <p className="text-sm text-vet-text-secondary">
                No appointments found.
              </p>
            </div>
          )}

          {/* Cards */}
          {!loading && filteredAppointments.length > 0 && (
            <div className="space-y-4">
              {filteredAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="
                    rounded-[20px]
                    border
                    border-[#E8E1DD]
                    p-4
                    transition
                    hover:bg-[#FAF7F4]
                    sm:p-5
                  "
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-center">
                    {/* Patient */}
                    <div className="flex flex-1 items-center gap-4">
                      <div
                        className="
                          flex
                          h-14
                          w-14
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          bg-[#EBB183]
                          text-2xl
                        "
                      >
                        🐾
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-base font-semibold text-vet-text-primary">
                          {appointment.pet_name}
                        </h3>

                        <p className="mt-1 text-sm text-vet-text-secondary">
                          {appointment.owner_name}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <UserRound
                            size={13}
                            className="text-vet-text-secondary"
                          />

                          <span className="text-xs text-vet-text-secondary">
                            Pet Owner
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Date / Time */}
                    <div className="flex items-center gap-4 lg:min-w-[210px]">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          items-center
                          justify-center
                          rounded-full
                          bg-[#F9F1EA]
                        "
                      >
                        <CalendarDays size={18} className="text-[#8B572F]" />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-vet-text-primary">
                          {formatDate(appointment.appointment_date)}
                        </p>

                        <div className="mt-1 flex items-center gap-1.5">
                          <Clock3
                            size={13}
                            className="text-vet-text-secondary"
                          />

                          <span className="text-xs text-vet-text-secondary">
                            {formatTime(appointment.appointment_time)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Consultation */}
                    <div className="lg:min-w-[190px]">
                      <div className="flex items-center gap-2">
                        <Video size={16} className="text-[#8B572F]" />

                        <span className="text-sm text-[#665D57]">
                          {appointment.appointment_type === "FOLLOW_UP"
                            ? "Follow-up"
                            : "General Consultation"}
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
                        transition
                        hover:bg-[#F9F1EA]
                      "
                    >
                      View
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

export default DoctorAppointments;
