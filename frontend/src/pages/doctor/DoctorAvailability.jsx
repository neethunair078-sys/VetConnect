import { useEffect, useState } from "react";
import { Clock3, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import {
  getMyAvailability,
  createAvailability,
} from "../../api/availabilityApi";

const DoctorAvailability = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    date: "",
    start_time: "",
    end_time: "",
  });

  // ==========================================
  // FETCH AVAILABILITY
  // ==========================================

  const fetchAvailability = async () => {
    try {
      setLoading(true);

      const data = await getMyAvailability();

      setAvailabilities(data);
    } catch (error) {
      console.error(
        "Failed to load availability:",
        error.response?.data || error.message,
      );

      toast.error("Unable to load your availability.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAvailability();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // CREATE AVAILABILITY
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (form.start_time >= form.end_time) {
      toast.error("End time must be later than start time.");
      return;
    }

    try {
      setSaving(true);

      const createdAvailability = await createAvailability({
        date: form.date,
        start_time: `${form.start_time}:00`,
        end_time: `${form.end_time}:00`,
      });

      setAvailabilities((previous) => [...previous, createdAvailability]);

      setForm({
        date: "",
        start_time: "",
        end_time: "",
      });

      toast.success("Availability added successfully.");
    } catch (error) {
      console.error(
        "Failed to create availability:",
        error.response?.data || error.message,
      );

      const errorData = error.response?.data;

      if (errorData && typeof errorData === "object") {
        const firstError = Object.values(errorData)[0];

        if (Array.isArray(firstError)) {
          toast.error(firstError[0]);
        } else {
          toast.error(String(firstError));
        }
      } else {
        toast.error("Unable to add availability.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout role="DOCTOR">
      <div className="min-h-screen bg-vet-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* ======================================
              HEADER
          ====================================== */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-vet-text-primary sm:text-4xl">
              Availability
            </h1>

            <p className="mt-2 text-sm text-vet-text-secondary sm:text-base">
              Set the dates and times when you are available for online
              consultations.
            </p>
          </div>

          {/* ======================================
              ADD AVAILABILITY
          ====================================== */}

          <section className="rounded-[26px] border border-vet-border bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6EADF] text-[#8B572F]">
                <Plus size={20} />
              </div>

              <div>
                <h2 className="text-lg font-semibold text-vet-text-primary">
                  Add Availability
                </h2>

                <p className="mt-1 text-sm text-vet-text-secondary">
                  Choose a date and time range for consultations.
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3"
            >
              {/* Date */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4C423C]">
                  Date
                </label>

                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-2xl border border-[#E5DDD8] bg-[#FCFAF9] px-4 py-3 text-sm text-vet-text-primary outline-none focus:border-[#B98A68]"
                />
              </div>

              {/* Start Time */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4C423C]">
                  Start Time
                </label>

                <input
                  type="time"
                  name="start_time"
                  value={form.start_time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#E5DDD8] bg-[#FCFAF9] px-4 py-3 text-sm text-vet-text-primary outline-none focus:border-[#B98A68]"
                />
              </div>

              {/* End Time */}

              <div>
                <label className="mb-2 block text-sm font-medium text-[#4C423C]">
                  End Time
                </label>

                <input
                  type="time"
                  name="end_time"
                  value={form.end_time}
                  onChange={handleChange}
                  required
                  className="w-full rounded-2xl border border-[#E5DDD8] bg-[#FCFAF9] px-4 py-3 text-sm text-vet-text-primary outline-none focus:border-[#B98A68]"
                />
              </div>

              <div className="md:col-span-3 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-full
                    bg-vet-primary-dark
                    px-7
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-vet-primary-dark-hover
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  <Plus size={17} />

                  {saving ? "Adding..." : "Add Availability"}
                </button>
              </div>
            </form>
          </section>

          {/* ======================================
              EXISTING AVAILABILITY
          ====================================== */}

          <section className="mt-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-vet-text-primary">
                  My Availability
                </h2>

                <p className="mt-1 text-sm text-vet-text-secondary">
                  Your available consultation slots.
                </p>
              </div>
            </div>

            {loading ? (
              <div className="rounded-[26px] bg-white py-12 text-center text-sm text-vet-text-secondary">
                Loading availability...
              </div>
            ) : availabilities.length === 0 ? (
              <div className="rounded-[26px] border border-dashed border-[#DCCFC6] bg-white py-12 text-center">
                <Clock3 size={32} className="mx-auto text-[#B98A68]" />

                <p className="mt-4 text-sm font-medium text-[#4C423C]">
                  No availability added yet.
                </p>

                <p className="mt-1 text-xs text-[#8B7E77]">
                  Add your available dates and times above.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {availabilities.map((availability) => (
                  <AvailabilityCard
                    key={availability.id}
                    availability={availability}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
};

// ==========================================
// AVAILABILITY CARD
// ==========================================

const AvailabilityCard = ({ availability }) => {
  return (
    <div className="flex flex-col gap-4 rounded-[22px] border border-vet-border bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F6EADF] text-[#8B572F]">
          <Clock3 size={19} />
        </div>

        <div>
          <p className="text-sm font-semibold text-vet-text-primary">
            {formatDate(availability.date)}
          </p>

          <p className="mt-1 text-sm text-vet-text-secondary">
            {formatTime(availability.start_time)} -{" "}
            {formatTime(availability.end_time)}
          </p>
        </div>
      </div>

      <span
        className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-medium ${
          availability.is_available
            ? "bg-vet-success-bg text-vet-success-text"
            : "bg-[#FBEAEA] text-[#A15A5A]"
        }`}
      >
        {availability.is_available ? "Available" : "Unavailable"}
      </span>
    </div>
  );
};

// ==========================================
// HELPERS
// ==========================================

const formatDate = (dateString) => {
  const [year, month, day] = dateString.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const formatTime = (timeString) => {
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

export default DoctorAvailability;
