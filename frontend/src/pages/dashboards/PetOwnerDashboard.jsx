import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MyPets from "../../components/dashboard/MyPets";
import QuickActions from "../../components/dashboard/QuickActions";
import UpcomingConsultations from "../../components/dashboard/UpcomingConsultations";
import HealthIntelligence from "../../components/dashboard/HealthIntelligence";
import { dashboardData } from "../../data/dashboardData";
import { getAppointments } from "../../api/appointmentApi";
import { setPets, setLoading, setError } from "../../store/slices/petSlice";

import { getPets } from "../../api/petsApi";

const PetOwnerDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  const { healthUpdates } = dashboardData;

  //   Fetch appointments

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        setAppointmentsLoading(true);

        const data = await getAppointments();

        setAppointments(data);
      } catch (error) {
        console.error(
          "Failed to fetch dashboard appointments:",
          error.response?.data || error.message,
        );
      } finally {
        setAppointmentsLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  //  PETS FROM REDUX

  const { pets, loading, error } = useSelector((state) => state.pets);

  // FETCH PETS

  useEffect(() => {
    const fetchPets = async () => {
      try {
        dispatch(setLoading(true));

        const data = await getPets();

        dispatch(setPets(data));
      } catch (error) {
        console.error(
          "Failed to fetch dashboard pets:",
          error.response?.data || error.message,
        );

        dispatch(setError(error.response?.data || "Failed to load pets."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPets();
  }, [dispatch]);

  const handlePetClick = (pet) => {
    // console.log("Selected pet:", pet);
    navigate(`/pet-owner/pets/${pet.id}`);
  };

  // const handleQuickAction = (action) => {
  //     console.log("Quick action:", action);
  // };

  const handleBookVet = () => {
    navigate("/pet-owner/appointments/book");
  };

  const handleViewRecords = () => {
    console.log("View Health Records clicked");
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingAppointments = appointments
    .filter((appointment) => {
      const appointmentDate = parseDate(appointment.appointment_date);

      return (
        appointmentDate >= today &&
        appointment.status !== "CANCELLED" &&
        appointment.status !== "REJECTED"
      );
    })
    .map((appointment) => {
      const pet = pets.find((item) => item.id === appointment.pet);

      return {
        ...appointment,
        pet: appointment.pet_name,
        petId: appointment.pet,
        doctor: appointment.doctor_name,
        date: appointment.appointment_date,
        displayDate: formatAppointmentDate(appointment.appointment_date),
        time: formatAppointmentTime(appointment.appointment_time),
        type:
          appointment.appointment_type === "FOLLOW_UP"
            ? "Follow-up"
            : "General Checkup",
        status: "Upcoming",
        petImage: getPetImageUrl(pet?.image),
      };
    });

  //   const upcomingAppointments = dashboardData.appointments.filter(
  //     (appointment) => appointment.status === "Upcoming",
  //   );

  //   const pastAppointments = dashboardData.appointments.filter(
  //     (appointment) => appointment.status === "Completed",
  //   );

  return (
    <DashboardLayout>
      {/* Page heading */}

      <section className="mb-8">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-[#171412]">
          Overview
        </h1>

        <p className="mt-2 text-sm sm:text-base text-[#81756E]">
          Here is what's happening with your furry family members.
        </p>
      </section>

      {/* Top row */}

      <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5">
        <MyPets
          pets={pets}
          onPetClick={handlePetClick}
          // onViewAll={() =>
          //     console.log("View all pets")
          // }
        />

        <QuickActions
          onBookVet={handleBookVet}
          onViewRecords={handleViewRecords}
        />
      </section>

      {/* Bottom row */}

      <section className="mt-6 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">
        <UpcomingConsultations
          appointments={upcomingAppointments}
          loading={appointmentsLoading}
          onViewAll={() => navigate("/pet-owner/appointments")}
        />

        <HealthIntelligence updates={healthUpdates} />
      </section>
    </DashboardLayout>
  );
};

const parseDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  return new Date(year, month - 1, day);
};

const formatAppointmentDate = (dateString) => {
  const date = parseDate(dateString);

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

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

const getPetImageUrl = (image) => {
  if (!image) {
    return "/images/pets/default-pet.jpg";
  }

  if (image.startsWith("http")) {
    return image;
  }

  return `${import.meta.env.VITE_MEDIA_BASE_URL}${image}`;
};

export default PetOwnerDashboard;
