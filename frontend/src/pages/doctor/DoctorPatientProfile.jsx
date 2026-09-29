import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  CalendarDays,
  Heart,
  Scale,
} from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDoctorPatient, getDoctorPatientAppointments  } from "../../api/doctorApi";

const DoctorPatientProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  const [appointments, setAppointments] = useState([]);
  const [appointmentsLoading, setAppointmentsLoading] = useState(true);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoading(true);
        setAppointmentsLoading(true);

        const [patientData, appointmentData] = await Promise.all([
          getDoctorPatient(id),
          getDoctorPatientAppointments(id),
        ]);

        setPatient(patientData);
        setAppointments(appointmentData);
      } catch (error) {
        console.error(
          "Failed to fetch patient:",
          error.response?.data || error.message
        );

        toast.error("Unable to load patient details.");
      } finally {
        setLoading(false);
        setAppointmentsLoading(false);
      }
  };

  fetchPatient();
}, [id]);

  const getPetImageUrl = (image) => {
    if (!image) {
      return "/images/pets/default-pet.jpg";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${import.meta.env.VITE_MEDIA_BASE_URL}${image}`;
  };

  const formatValue = (value) => {
    if (!value) {
      return "Not available";
    }

    return value;
  };

  const formatGender = (gender) => {
    if (!gender) {
      return "Not available";
    }

    return (
      gender.charAt(0) +
      gender.slice(1).toLowerCase()
    );
  };

  const formatVaccinationStatus = (status) => {
    if (!status) {
      return "Not available";
    }

    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  if (loading) {
    return (
      <DashboardLayout role="DOCTOR">
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-vet-text-secondary">
            Loading patient details...
          </p>
        </div>
      </DashboardLayout>
    );
  }

  if (!patient) {
    return (
      <DashboardLayout role="DOCTOR">
        <div className="flex min-h-[400px] items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-vet-text-primary">
              Patient not found
            </h2>

            <button
              type="button"
              onClick={() => navigate("/doctor/patients")}
              className="mt-4 rounded-full bg-vet-primary-dark px-5 py-2.5 text-sm font-medium text-white transition hover:bg-vet-primary-dark-hover"
            >
              Back to Patients
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout role="DOCTOR">
      <div className="w-full">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/doctor/patients")}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-vet-text-secondary transition hover:text-vet-primary-dark"
        >
          <ArrowLeft size={17} />
          Back to Patients
        </button>

        {/* Header */}
        <section className="rounded-[28px] bg-vet-card p-6 shadow-[0_8px_30px_rgba(70,45,30,0.05)] sm:p-8">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* Pet image */}
            <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-vet-icon-soft">
              <img
                src={getPetImageUrl(patient.image)}
                alt={patient.name}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Pet information */}
            <div>
              <h1 className="text-3xl font-bold text-vet-text-primary sm:text-4xl">
                {patient.name}
              </h1>

              <p className="mt-1 text-base text-vet-text-secondary">
                {patient.breed || patient.species}
              </p>

              <p className="mt-2 text-sm text-vet-text-muted">
                Owner: {patient.owner_name || "Not available"}
              </p>
            </div>
          </div>
        </section>

        {/* Main content */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* Pet Information */}
          <section className="rounded-[24px] bg-vet-card p-6 shadow-[0_8px_30px_rgba(70,45,30,0.05)] lg:col-span-2">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vet-icon-soft">
                <Heart
                  size={20}
                  className="text-vet-primary-dark"
                />
              </div>

              <h2 className="text-lg font-semibold text-vet-text-primary">
                Pet Information
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">

              <InfoItem
                label="Species"
                value={formatValue(patient.species)}
              />

              <InfoItem
                label="Breed"
                value={formatValue(patient.breed)}
              />

              <InfoItem
                label="Age"
                value={
                  patient.age
                    ? `${patient.age} years`
                    : "Not available"
                }
              />

              <InfoItem
                label="Gender"
                value={formatGender(patient.gender)}
              />

              <InfoItem
                label="Weight"
                value={
                  patient.weight
                    ? `${patient.weight} kg`
                    : "Not available"
                }
              />

              <InfoItem
                label="Microchip"
                value={formatValue(patient.microchip)}
              />

            </div>
          </section>

          {/* Vaccination */}
          <section className="rounded-[24px] bg-vet-card p-6 shadow-[0_8px_30px_rgba(70,45,30,0.05)]">

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vet-success-bg">
                <Heart
                  size={20}
                  className="text-vet-success-text"
                />
              </div>

              <h2 className="text-lg font-semibold text-vet-text-primary">
                Vaccination
              </h2>
            </div>

            <p className="mt-5 text-sm text-vet-text-secondary">
              Vaccination Status
            </p>

            <span className="mt-2 inline-flex rounded-full bg-vet-success-bg px-3 py-1.5 text-sm font-medium text-vet-success-text">
              {formatVaccinationStatus(
                patient.vaccination_status
              )}
            </span>
          </section>

          {/* Owner Information */}
          <section className="rounded-[24px] bg-vet-card p-6 shadow-[0_8px_30px_rgba(70,45,30,0.05)] lg:col-span-2">

            <h2 className="text-lg font-semibold text-vet-text-primary">
              Owner Information
            </h2>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

              <InfoItem
                label="Name"
                value={formatValue(patient.owner_name)}
              />

              <InfoItem
                label="Email"
                value={formatValue(patient.owner_email)}
                icon={Mail}
              />

              <InfoItem
                label="Phone"
                value={formatValue(patient.owner_phone)}
                icon={Phone}
              />

            </div>
          </section>

          {/* Medical Notes */}
          <section className="rounded-[24px] bg-vet-card p-6 shadow-[0_8px_30px_rgba(70,45,30,0.05)]">

            <h2 className="text-lg font-semibold text-vet-text-primary">
              Medical Notes
            </h2>

            <p className="mt-4 text-sm leading-6 text-vet-text-secondary">
              {patient.medical_notes || "No medical notes available."}
            </p>

          </section>

        </div>

        {/* Future sections */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">

          <section className="rounded-[24px] bg-vet-card p-6 shadow-[0_8px_30px_rgba(70,45,30,0.05)] md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-vet-icon-soft">
                <CalendarDays
                  size={20}
                  className="text-vet-primary-dark"
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-vet-text-primary">
                  Appointment History
                </h2>

                <p className="mt-1 text-sm text-vet-text-secondary">
                  Previous and upcoming appointments for this patient.
                </p>
              </div>
            </div>

            <div className="mt-6">
              {appointmentsLoading ? (
                <p className="text-sm text-vet-text-secondary">
                  Loading appointment history...
                </p>
              ) : appointments.length === 0 ? (
                <div className="rounded-xl bg-vet-background-soft p-5 text-center">
                  <p className="text-sm text-vet-text-secondary">
                    No appointments found for this patient.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {appointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="rounded-xl border border-vet-border bg-vet-background-soft p-4"
                    >
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="font-medium text-vet-text-primary">
                            {appointment.appointment_type === "FOLLOW_UP"
                              ? "Follow-up"
                              : "General Consultation"}
                          </p>

                          <p className="mt-1 text-sm text-vet-text-secondary">
                            {appointment.appointment_date}{" "}
                            •{" "}
                            {appointment.appointment_time}
                          </p>
                        </div>

                        <span
                          className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-medium ${
                            appointment.status === "COMPLETED"
                              ? "bg-vet-success-bg text-vet-success-text"
                              : appointment.status === "CONFIRMED"
                              ? "bg-vet-warning-bg text-vet-warning-text"
                              : appointment.status === "CANCELLED" ||
                                appointment.status === "REJECTED"
                              ? "bg-vet-error-bg text-vet-error-text"
                              : "bg-vet-icon-soft text-vet-text-secondary"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                      {appointment.reason && (
                        <p className="mt-3 text-sm text-vet-text-secondary">
                          <span className="font-medium text-vet-text-primary">
                            Reason:
                          </span>{" "}
                          {appointment.reason}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <ActionCard
            icon={Scale}
            title="Health Records"
            description="View medical records, prescriptions and vaccination history."
            onClick={() =>
              toast("Health records will be connected next.")
            }
          />

        </div>

      </div>
    </DashboardLayout>
  );
};

const InfoItem = ({
  label,
  value,
  icon: Icon,
}) => {
  return (
    <div>
      <p className="text-xs text-vet-text-muted">
        {label}
      </p>

      <div className="mt-1 flex items-center gap-2">
        {Icon && (
          <Icon
            size={15}
            className="text-vet-text-secondary"
          />
        )}

        <p className="text-sm font-medium text-vet-text-primary">
          {value}
        </p>
      </div>
    </div>
  );
};

const ActionCard = ({
  icon: Icon,
  title,
  description,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-[24px] bg-vet-card p-6 text-left shadow-[0_8px_30px_rgba(70,45,30,0.05)] transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-vet-icon-soft">
        <Icon
          size={21}
          className="text-vet-primary-dark"
        />
      </div>

      <h3 className="mt-4 text-base font-semibold text-vet-text-primary">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-vet-text-secondary">
        {description}
      </p>
    </button>
  );
};

export default DoctorPatientProfile;