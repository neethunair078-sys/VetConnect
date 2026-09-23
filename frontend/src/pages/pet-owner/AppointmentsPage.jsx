import { useEffect, useMemo, useState } from "react";

import { ChevronLeft, ChevronRight, Plus, CalendarDays } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import toast from "react-hot-toast";


import DashboardLayout from "../../components/dashboard/DashboardLayout";

import AppointmentCard from "../../components/appointments/AppointmentCard";

import { getAppointments } from "../../api/appointmentApi";

import { setPets } from "../../store/slices/petSlice";
import { getPets } from "../../api/petsApi";

const AppointmentsPage = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  const dispatch = useDispatch();
  const pets = useSelector((state) => state.pets.pets);

  // ==========================================
  // TODAY
  // ==========================================

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ==========================================
  // CURRENT CALENDAR MONTH
  // ==========================================

  const [currentMonth, setCurrentMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1),
  );

  // ==========================================
  // Get all pets when page opens
  // ==========================================

  useEffect(() => {
    const fetchPets = async () => {
        try {
            const data = await getPets();
            dispatch(setPets(data));
        } catch (error) {
            console.error(
            "Failed to load pets:",
            error.response?.data || error.message
        );
        }
    };

    if (pets.length === 0) {
        fetchPets();
    }
    }, [pets.length, dispatch]);

  // ==========================================
  // ALL APPOINTMENTS
  // ==========================================

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setAppointmentsLoading(true);

        const data = await getAppointments();

        setAppointments(data);
      } catch (error) {
        console.error(
          "Failed to fetch appointments:",
          error.response?.data || error.message,
        );

        toast.error("Unable to load appointments.");
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // ==========================================
  // FIND UPCOMING APPOINTMENTS
  // ==========================================

  const upcomingAppointments = appointments.filter((appointment) => {
    const appointmentDate = parseDate(appointment.appointment_date);

    return (
      appointmentDate >= today &&
      appointment.status !== "CANCELLED" &&
      appointment.status !== "REJECTED"
    );
  });

  // ==========================================
  // FIND PAST APPOINTMENTS
  // ==========================================

  const pastAppointments = appointments.filter((appointment) => {
    const appointmentDate = parseDate(appointment.appointment_date);

    return (
      appointmentDate < today ||
      appointment.status === "COMPLETED" ||
      appointment.status === "CANCELLED" ||
      appointment.status === "REJECTED"
    );
  });

  // ==========================================
  // CALENDAR VALUES
  // ==========================================

  const year = currentMonth.getFullYear();

  const month = currentMonth.getMonth();

  const monthName = currentMonth.toLocaleString("default", {
    month: "long",
  });

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const firstDay = new Date(year, month, 1).getDay();

  // ==========================================
  // CALENDAR DAYS
  // ==========================================

  const calendarDays = useMemo(() => {
    const days = [];
    // Empty spaces before first day
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }
    // Actual days

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  }, [firstDay, daysInMonth]);

  // ==========================================
  // PREVIOUS MONTH
  // ==========================================

  const previousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  // ==========================================
  // NEXT MONTH
  // ==========================================

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  // ==========================================
  // BOOK CONSULTATION
  // ==========================================

  const handleBookAppointment = () => {
    navigate("/pet-owner/appointments/book");
  };

  // ==========================================
  // JOIN CONSULTATION
  // ==========================================

  const handleJoin = (appointment) => {
    console.log("Join consultation:", appointment);
  };

  // ==========================================
  // RESCHEDULE
  // ==========================================

  const handleReschedule = (appointment) => {
    console.log("Reschedule:", appointment);
  };

  // ==========================================
  // VIEW DETAILS
  // ==========================================

  const handleViewDetails = (appointment) => {
    console.log("View appointment:", appointment);
  };

  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = (appointment) => {
    console.log("Cancel appointment:", appointment);
  };

  return (
    <DashboardLayout>
      <div className="w-full">
       {/* PAGE HEADER */}
  
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#181615]">
              Appointments
            </h1>

            <p className="mt-2 text-sm sm:text-base text-vet-text-secondary">
              Manage your pet's health schedule and upcoming consultations.
            </p>
          </div>

          {/* BOOK BUTTON */}

          <button
            type="button"
            onClick={handleBookAppointment}
            className="inline-flex items-center justify-center gap-2 self-start lg:self-auto rounded-full bg-vet-primary-dark px-5 sm:px-6
                                    py-3 text-sm font-semibold text-white cursor-pointer shadow-[0_8px_20px_rgba(139,87,47,0.18)] hover:bg-vet-primary-dark-hover hover:-translate-y-0.5
                                    hover:shadow-lg active:translate-y-0 transition-all"
          >
            <Plus size={18} />
            Book New Consultation
          </button>
        </div>
         {/* UPCOMING  */}
        <section>
          <SectionTitle title="Upcoming Consultations" />

          <div className="mt-4 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5">
            {/* UPCOMING LIST */}
            <div className="space-y-4">
              {appointmentsLoading ? (
                <div className="py-10 text-center text-sm text-vet-text-secondary">
                  Loading appointments...
                </div>
              ) : upcomingAppointments.length > 0 ? (
                upcomingAppointments.map((appointment) => {
                  const pet = pets.find((item) => item.id === appointment.pet);

                  const displayAppointment = {
                    ...appointment,
                    pet: appointment.pet_name,
                    petId: appointment.pet,
                    doctor: appointment.doctor_name,
                    date: appointment.appointment_date,
                    time: formatAppointmentTime(appointment.appointment_time),
                    type:
                      appointment.appointment_type === "FOLLOW_UP"
                        ? "Follow-up"
                        : "General Checkup",

                    status: getDisplayStatus(appointment.status),

                    petImage: getPetImageUrl(pet?.image),
                    displayDate: formatAppointmentDate(
                      appointment.appointment_date,
                    ),
                  };

                  return (
                    <AppointmentCard
                      key={appointment.id}
                      appointment={displayAppointment}
                      onJoin={handleJoin}
                      onReschedule={handleReschedule}
                      onViewDetails={handleViewDetails}
                      onCancel={handleCancel}
                    />
                  );
                })
              ) : (
                <EmptyState />
              )}
            </div>
            {/* CALENDAR */}
            <CalendarCard
              monthName={monthName}
              year={year}
              month={month}
              calendarDays={calendarDays}
              appointments={upcomingAppointments}
              onPrevious={previousMonth}
              onNext={nextMonth}
            />
          </div>
        </section>
       {/* PAST APPOINTMENTS  */}

        <section className="mt-10">
          <SectionTitle title="Past Consultations" muted />
          {pastAppointments.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-[28px] bg-white border border-vet-border shadow-[0_8px_30px_rgba(70,45,30,0.04)]">
              <table className="w-full min-w-[760px] text-left">
                {/* TABLE HEADER */}
                <thead>
                  <tr className="border-b border-vet-border text-xs font-semibold text-vet-text-secondary">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Pet</th>
                    <th className="px-6 py-4">Veterinarian</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>

                {/* TABLE BODY */}

                <tbody>
                  {pastAppointments.map((appointment) => {
                    const pet = pets.find(
                      (item) => item.id === appointment.pet,
                    );
                    return (
                      <tr
                        key={appointment.id}
                        className="border-b border-[#F1ECE9] last:border-b-0 text-sm text-[#4C423C] hover:bg-[#FCFAF9] transition"
                      >
                        {/* DATE */}
                        <td className="px-6 py-5">
                          {formatAppointmentDate(appointment.appointment_date)}
                        </td>
                        {/* PET */}
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full overflow-hidden bg-[#F4EFEB] shrink-0">
                              <img src={pet?.image} alt={appointment.pet} className="w-full h-full object-cover"/>
                            </div>

                            <span className="font-medium text-vet-text-primary">
                              {appointment.pet_name}
                            </span>
                          </div>
                        </td>

                        {/* DOCTOR */}

                        <td className="px-6 py-5">
                          {appointment.doctor_name}
                        </td>

                        {/* TYPE */}

                        <td
                          className="
                              px-6
                              py-5
                            "
                        >
                          <span
                            className="
                                inline-flex
                                items-center
                                gap-1.5

                                rounded-full

                                bg-[#F6EADF]

                                px-3
                                py-1

                                text-xs

                                text-[#8B572F]
                              "
                          >
                            <CalendarDays size={12} />
                            Online Consultation
                          </span>
                        </td>

                        {/* STATUS */}

                        <td
                          className="
                              px-6
                              py-5
                            "
                        >
                          <StatusBadge status={
                                appointment.status === "COMPLETED"
                                ? "Completed"
                                : appointment.status === "CANCELLED"
                                ? "Cancelled"
                                : appointment.status === "REJECTED"
                                ? "Rejected"
                                : appointment.status
                            }/>
                        </td>

                        {/* ACTION */}

                        <td
                          className="
                              px-6
                              py-5

                              text-right
                            "
                        >
                          <button
                            type="button"
                            onClick={() => handleViewDetails(appointment)}
                            className="
                                text-sm
                                font-medium

                                text-[#8B572F]

                                cursor-pointer

                                hover:underline
                              "
                          >
                            View Summary
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className="
                mt-4
                rounded-[28px]
                bg-white
                border
                border-vet-border
                p-10
                text-center
              "
            >
              <p
                className="
                  text-sm
                  text-vet-text-secondary
                "
              >
                No past consultations yet.
              </p>
            </div>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
};

// =================================================
// SECTION TITLE
// =================================================

const SectionTitle = ({ title, muted = false }) => {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className={`
          w-1.5
          h-7

          rounded-full

          ${muted ? "bg-[#D8D4D1]" : "bg-[#EBB183]"}
        `}
      />

      <h2
        className="
          text-xl
          sm:text-2xl

          font-semibold

          text-vet-text-primary
        "
      >
        {title}
      </h2>
    </div>
  );
};

// =================================================
// CALENDAR
// =================================================

const CalendarCard = ({
  monthName,
  year,
  month,
  calendarDays,
  appointments,
  onPrevious,
  onNext,
}) => {
  // ==========================================
  // TODAY
  // ==========================================

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  // ==========================================
  // APPOINTMENT DAYS FOR CURRENT MONTH
  // ==========================================

  const appointmentDays = appointments
    .map((appointment) => {
      const date = parseDate(appointment.appointment_date);

      return {
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
      };
    })
    .filter((date) => {
      return date.year === year && date.month === month;
    });

  // ==========================================
  // CHECK APPOINTMENT
  // ==========================================

  const hasAppointment = (day) => {
    return appointmentDays.some((appointment) => appointment.day === day);
  };

  return (
    <div
      className="
        rounded-[28px]

        bg-white

        border
        border-vet-border

        p-5
        sm:p-6

        shadow-[0_8px_30px_rgba(70,45,30,0.04)]

        h-fit
      "
    >
      {/* =====================================
          HEADER
      ===================================== */}

      <div
        className="
          flex
          items-center
          justify-between
        "
      >
        <h3
          className="
            text-lg
            font-semibold
            text-vet-text-primary
          "
        >
          {monthName} {year}
        </h3>

        <div
          className="
            flex
            items-center
            gap-1
          "
        >
          <button
            type="button"
            onClick={onPrevious}
            className="
              w-8
              h-8

              rounded-full

              flex
              items-center
              justify-center

              cursor-pointer

              hover:bg-[#F5F0ED]

              transition
            "
            aria-label="Previous month"
          >
            <ChevronLeft size={17} />
          </button>

          <button
            type="button"
            onClick={onNext}
            className="
              w-8
              h-8

              rounded-full

              flex
              items-center
              justify-center

              cursor-pointer

              hover:bg-[#F5F0ED]

              transition
            "
            aria-label="Next month"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>

      {/* =====================================
          WEEKDAYS
      ===================================== */}

      <div
        className="
          mt-6

          grid
          grid-cols-7

          text-center
        "
      >
        {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
          <span
            key={`${day}-${index}`}
            className="
              text-[11px]
              font-medium
              text-[#8B7E77]
            "
          >
            {day}
          </span>
        ))}
      </div>

      {/* =====================================
          DAYS
      ===================================== */}

      <div
        className="
          mt-3

          grid
          grid-cols-7

          gap-y-2
        "
      >
        {calendarDays.map((day, index) => {
          // Empty cell

          if (!day) {
            return (
              <div
                key={index}
                className="
                    flex
                    items-center
                    justify-center
                  "
              >
                <span
                  className="
                      w-8
                      h-8
                    "
                />
              </div>
            );
          }

          // Appointment date

          const isAppointmentDay = hasAppointment(day);

          // Today

          const isToday =
            day === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear();

          return (
            <div
              key={index}
              className="
                  flex
                  items-center
                  justify-center
                "
            >
              <button
                type="button"
                className={`
                    w-8
                    h-8

                    rounded-full

                    text-xs

                    cursor-pointer

                    transition

                    ${
                      isAppointmentDay
                        ? `
                          bg-vet-primary-dark
                          text-white
                          font-semibold

                          hover:bg-vet-primary-dark-hover
                        `
                        : isToday
                          ? `
                          border
                          border-[#EBB183]

                          text-[#8B572F]

                          font-semibold

                          hover:bg-vet-background-soft
                        `
                          : `
                          text-[#4C423C]

                          hover:bg-vet-background-soft
                        `
                    }
                  `}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>

      {/* =====================================
          LEGEND
      ===================================== */}

      <div
        className="
          mt-6

          pt-5

          border-t
          border-vet-border

          space-y-3
        "
      >
        <Legend label="Upcoming Consultation" type="dark" />

        <Legend label="Today" type="light" />
      </div>
    </div>
  );
};

// =================================================
// LEGEND
// =================================================

const Legend = ({ label, type }) => {
  return (
    <div
      className="
        flex
        items-center
        gap-2
      "
    >
      <span
        className={`
          w-2.5
          h-2.5

          rounded-full

          ${type === "dark" ? "bg-vet-primary-dark" : "border border-[#EBB183]"}
        `}
      />

      <span
        className="
          text-xs
          text-vet-text-secondary
        "
      >
        {label}
      </span>
    </div>
  );
};

// =================================================
// STATUS BADGE
// =================================================

const getDisplayStatus = (status) => {
  if (status === "PENDING" || status === "CONFIRMED") {
    return "Upcoming";
  }

  if (status === "COMPLETED") {
    return "Completed";
  }

  if (status === "CANCELLED" || status === "REJECTED") {
    return "Cancelled";
  }

  return status;
};

const StatusBadge = ({ status }) => {
  const styles = {
    Completed: "bg-vet-success-bg text-vet-success-text",
    Cancelled: "bg-vet-error-bg text-vet-error-text",
    Rejected: "bg-vet-error-bg text-vet-error-text",
    Upcoming: "bg-vet-warning-bg text-vet-warning-text",
  };

  return (
    <span
      className={`
        inline-flex

        rounded-full

        px-3
        py-1

        text-xs
        font-medium

        ${styles[status] || "bg-[#F3F0EE] text-[#665D57]"}
      `}
    >
      {status}
    </span>
  );
};

// =================================================
// EMPTY STATE
// =================================================

const EmptyState = () => {
  return (
    <div
      className="
        rounded-[28px]

        bg-white

        border
        border-vet-border

        px-6
        py-12

        text-center
      "
    >
      <div
        className="
          mx-auto

          w-12
          h-12

          rounded-full

          bg-vet-background-soft

          flex
          items-center
          justify-center
        "
      >
        <CalendarDays size={22} className="text-[#8B572F]" />
      </div>

      <h3
        className="
          mt-4

          text-lg
          font-semibold

          text-vet-text-primary
        "
      >
        No upcoming consultations
      </h3>

      <p
        className="
          mt-2

          text-sm

          text-vet-text-secondary
        "
      >
        You don't have any upcoming veterinary consultations.
      </p>
    </div>
  );
};

// =================================================
// PARSE DATE
// =================================================

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

// =================================================
// FORMAT DATE
// =================================================

const formatAppointmentDate = (dateString) => {
  const date = parseDate(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// =================================================
// FORMAT TIME
// =================================================

const formatAppointmentTime = (timeString) => {
  if (!timeString) {
    return "";
  }

  const [hours, minutes] = timeString.split(":").map(Number);

  const date = new Date();

  date.setHours(hours, minutes, 0, 0);

  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
};

// =================================================
// Pet Image Helper
// =================================================

const getPetImageUrl = (image) => {
  if (!image) {
    return "/images/pets/default-pet.jpg";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `${import.meta.env.VITE_MEDIA_BASE_URL}${image}`;
};

export default AppointmentsPage;
