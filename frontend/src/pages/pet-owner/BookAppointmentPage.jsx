import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

import {
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import BookingProgress from "../../components/appointments/BookingProgress";

import DoctorCard from "../../components/appointments/DoctorCard";

import AppointmentCalendar from "../../components/appointments/AppointmentCalendar";

import TimeSlotPicker from "../../components/appointments/TimeSlotPicker";

import BookingSummary from "../../components/appointments/BookingSummary";

import TelehealthReadiness from "../../components/appointments/TelehealthReadiness";


import { createAppointment } from "../../api/appointmentApi";

import { getApprovedDoctors } from "../../api/doctorApi";

import { getDoctorAvailability } from "../../api/availabilityApi";


const BookAppointmentPage = () => {

  const navigate = useNavigate();
  const pets = useSelector((state) => state.pets.pets);

  // ==========================================
  // BOOKING STATE
  // ==========================================
  

  const [currentStep, setCurrentStep] = useState(1);

  const [selectedPet, setSelectedPet] = useState(null);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedTime, setSelectedTime] = useState(null);

  const [notes, setNotes] = useState("");

  const [bookingLoading, setBookingLoading] = useState(false);

  const [doctors, setDoctors] = useState([]);
  const [doctorsLoading, setDoctorsLoading] = useState(true);

  const [doctorAvailability, setDoctorAvailability] = useState([]);
  const [availabilityLoading, setAvailabilityLoading] = useState(false);


  useEffect(() => {
    if (pets.length > 0 && !selectedPet) {
      setSelectedPet(pets[0]);
    }
  }, [pets, selectedPet]);


  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setDoctorsLoading(true);

        const data = await getApprovedDoctors();

        console.log(data)

        const mappedDoctors = data.map((doctor) => ({
          ...doctor,

          image: "/images/doctors/default-doctor.jpg",
          rating: 0,
          reviews: 0,
        }));

        setDoctors(mappedDoctors);
      } catch (error) {
        console.error(
          "Failed to fetch approved doctors:",
          error.response?.data || error.message
        );

        toast.error("Unable to load doctors. Please try again.");
      } finally {
        setDoctorsLoading(false);
      }
    };

    fetchDoctors();
  }, []);


  useEffect(() => {
    const fetchAvailability = async () => {
      if (!selectedDoctor) {
        setDoctorAvailability([]);
        return;
      }

      try {
        setAvailabilityLoading(true);

        const data = await getDoctorAvailability(
          selectedDoctor.id
        );

        setDoctorAvailability(data);
      } catch (error) {
        console.error(
          "Failed to fetch doctor availability:",
          error.response?.data || error.message
        );

        setDoctorAvailability([]);

        toast.error(
          "Unable to load doctor availability."
        );
      } finally {
        setAvailabilityLoading(false);
      }
    };

    fetchAvailability();
  }, [selectedDoctor]);



  // ==========================================
  // CALENDAR MONTH
  // ==========================================

  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 8, 1) );


  // ==========================================
  // AVAILABLE DATES
  // ==========================================

  const availableDates = useMemo(() => {
    return doctorAvailability
      .filter((availability) => availability.is_available)
      .map((availability) => availability.date);
  }, [doctorAvailability]);

  // ==========================================
  // AVAILABLE TIMES
  // ==========================================

const availableTimes = useMemo(() => {
  if (!selectedDate) {
    return [];
  }

  const availability = doctorAvailability.find(
    (item) =>
      item.date === selectedDate &&
      item.is_available
  );

  if (!availability) {
    return [];
  }

  return generateTimeSlots(
    availability.start_time,
    availability.end_time
  );
}, [
  selectedDate,
  doctorAvailability,
]);


  // ==========================================
  // SELECT DOCTOR
  // ==========================================

  const handleDoctorSelect = (doctor) => {

    setSelectedDoctor(doctor);

    setSelectedDate(null);

    setSelectedTime(null);

    setDoctorAvailability([]);

  };


  // ==========================================
  // SELECT DATE
  // ==========================================

  const handleDateSelect = (date) => {

    setSelectedDate(date);

    setSelectedTime(null);

  };


  // ==========================================
  // CHANGE MONTH
  // ==========================================

  const handleMonthChange = (direction) => {

    setCurrentMonth(
      (previous) =>
        new Date(
          previous.getFullYear(),
          previous.getMonth() +
            direction,
          1
        )
    );

  };


  // ==========================================
  // STEP 1 → STEP 2
  // ==========================================

  const handleContinueToSchedule = () => {
    if (!selectedDoctor) {
      return;
    }
    setCurrentStep(2);
  };

  // ==========================================
  // STEP 2 → STEP 3
  // ==========================================

  const handleContinueToConfirmation = () => {

    if (!selectedDoctor || !selectedDate || !selectedTime) {
      return;
    }
    setCurrentStep(3);
  };


  // ==========================================
  // CONFIRM BOOKING
  // ==========================================

  const convertTimeToApiFormat = (time) => {
    const [timePart, modifier] = time.split(" ");

    let [hours, minutes] = timePart
      .split(":")
      .map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }

    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return `${String(hours).padStart(2, "0")}:${String(
      minutes
    ).padStart(2, "0")}:00`;
  };

  const handleConfirmBooking = async () => {

    if (!selectedPet || !selectedDoctor || !selectedDate || !selectedTime) {
      toast.error("Please complete all appointment details.");
      return;
    }

    try {
      setBookingLoading(true);

      const bookingData = {
        pet: selectedPet.id,
        doctor: selectedDoctor.id,
        appointment_date: selectedDate,
        appointment_time: convertTimeToApiFormat(selectedTime),
        appointment_type: "GENERAL",
        reason: notes,
      };

      await createAppointment(bookingData);

      toast.success("Appointment booked successfully!");

      navigate("/pet-owner/appointments");

    } catch (error) {
      console.error(
        "Appointment booking failed:",
        error.response?.data || error.message
      );

      const apiErrors = error.response?.data;

      const errorMessage =
        apiErrors?.appointment_date?.[0] ||
        apiErrors?.appointment_time?.[0] ||
        apiErrors?.appointment_type?.[0] ||
        apiErrors?.pet?.[0] ||
        apiErrors?.doctor?.[0] ||
        apiErrors?.reason?.[0] ||
        apiErrors?.non_field_errors?.[0] ||
        apiErrors?.detail ||
        "Unable to book appointment. Please try again.";

      toast.error(errorMessage);

    } finally {
      setBookingLoading(false);
    }

  };


  // ==========================================
  // BACK
  // ==========================================

  const handleBack = () => {

    if (currentStep === 1) {

      navigate(
        "/pet-owner/appointments"
      );

      return;
    }


    setCurrentStep(
      currentStep - 1
    );

  };


  return (
    <DashboardLayout>

      <div className="max-w-[1200px] mx-auto w-full">

        {/* =====================================
            HEADER
        ===================================== */}

        <div className="mb-8">

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#8B572F]">
            Book Appointment
          </h1>

          <p className="mt-2 text-sm sm:text-base text-vet-text-secondary">
            Schedule an online consultation for your furry family member.
          </p>
        </div>


        {/* =====================================
            PROGRESS
        ===================================== */}

        <div
          className="
            mb-10

            max-w-[700px]
          "
        >

          <BookingProgress
            currentStep={
              currentStep
            }
          />

        </div>


        {/* =====================================
            MAIN LAYOUT
        ===================================== */}

        <div
          className="
            grid

            grid-cols-1

            lg:grid-cols-[minmax(0,1fr)_320px]

            gap-6
          "
        >

          {/* ===================================
              LEFT
          =================================== */}

          <div>

            {/* =================================
                STEP 1
            ================================= */}

            {currentStep === 1 && (

              <section>

                <h2
                  className="
                    text-2xl
                    sm:text-3xl

                    font-semibold

                    text-[#181615]
                  "
                >
                  1. Choose a Veterinarian
                </h2>


                {/* Pet selector */}

                <div className="mt-6">

                  <h3
                    className="
                      text-sm
                      font-medium

                      text-[#5D514A]
                    "
                  >
                    Select Pet
                  </h3>


                  <div
                    className="
                      mt-3

                      flex
                      gap-3

                      overflow-x-auto

                      pb-2
                    "
                  >

                    {pets.map(
                      (pet) => {

                        const selected =
                          selectedPet?.id ===
                          pet.id;


                        return (
                          <button
                            key={pet.id}
                            type="button"
                            onClick={() =>
                              setSelectedPet(
                                pet
                              )
                            }
                            className={`
                              shrink-0

                              flex
                              items-center
                              gap-3

                              rounded-full

                              px-3
                              py-2

                              border

                              cursor-pointer

                              transition

                              ${
                                selected
                                  ? "border-[#8B572F] bg-[#FBF3EE]"
                                  : "border-[#E8E1DD] bg-white"
                              }
                            `}
                          >

                            <img
                              src={pet.image}
                              alt={pet.name}
                              className="
                                w-9
                                h-9

                                rounded-full

                                object-cover
                              "
                            />

                            <span
                              className="
                                text-sm
                                font-medium

                                text-[#4C423C]
                              "
                            >
                              {pet.name}
                            </span>

                          </button>
                        );

                      }
                    )}

                  </div>

                </div>


                {/* Doctors */}

                {doctorsLoading ? (
                  <div className="py-10 text-center text-sm text-vet-text-secondary">
                    Loading doctors...
                  </div>
                ) : doctors.length === 0 ? (
                  <div className="py-10 text-center text-sm text-vet-text-secondary">
                    No approved doctors are currently available.
                  </div>
                ) : (

                  <div className="mt-7 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {doctors.map(
                      (doctor) => (

                        <DoctorCard 
                          key={doctor.id} 
                          doctor={doctor}
                          selected={
                            selectedDoctor?.id ===
                            doctor.id
                          }
                          onSelect={
                            handleDoctorSelect
                          }
                        />

                      )
                    )}

                  </div>
                )}

                {/* Continue */}

                <div
                  className="
                    mt-6

                    flex
                    justify-end
                  "
                >

                  <button
                    type="button"
                    disabled={!selectedDoctor}
                    onClick={
                      handleContinueToSchedule
                    }
                    className={`
                      inline-flex
                      items-center
                      gap-2

                      rounded-full

                      px-6
                      py-3

                      text-sm
                      font-semibold

                      transition

                      ${
                        selectedDoctor
                          ? `
                            bg-vet-primary-dark
                            text-white
                            cursor-pointer
                            hover:bg-vet-primary-dark-hover
                          `
                          : `
                            bg-[#E7E3E0]
                            text-[#A49B95]
                            cursor-not-allowed
                          `
                      }
                    `}
                  >

                    Continue to Schedule

                    <ArrowRight
                      size={16}
                    />

                  </button>

                </div>

              </section>
            )}


            {/* =================================
                STEP 2
            ================================= */}

            {currentStep === 2 && (

              <section>

                <h2
                  className="
                    text-2xl
                    sm:text-3xl

                    font-semibold

                    text-[#181615]
                  "
                >
                  2. Select Date & Time
                </h2>


                <p
                  className="
                    mt-2

                    text-sm

                    text-vet-text-secondary
                  "
                >
                  Choose a date and available
                  time for your online consultation
                  with {selectedDoctor?.name}.
                </p>


                <div
                  className="
                    mt-6

                    grid

                    grid-cols-1
                    md:grid-cols-[320px_minmax(0,1fr)]

                    gap-6
                  "
                >

                  {availabilityLoading ? (
                    <div className="py-10 text-center text-sm text-vet-text-secondary">
                      Loading available dates...
                    </div>
                  ) : (
                    <AppointmentCalendar
                      currentMonth={currentMonth}
                      selectedDate={selectedDate}
                      availableDates={availableDates}
                      onMonthChange={handleMonthChange}
                      onDateSelect={handleDateSelect}
                    />
                  )}


                  <div>

                    <TimeSlotPicker
                      selectedDate={selectedDate}
                      slots={availableTimes}
                      selectedTime={selectedTime}
                      onSelectTime={setSelectedTime}
                    />

                  </div>

                </div>


                {/* Actions */}

                <div
                  className="
                    mt-8

                    flex
                    flex-col-reverse
                    sm:flex-row

                    gap-3
                  "
                >

                  <button
                    type="button"
                    onClick={
                      handleBack
                    }
                    className="
                      flex-1

                      inline-flex
                      items-center
                      justify-center
                      gap-2

                      rounded-full

                      border
                      border-[#B98A68]

                      py-3

                      text-sm
                      font-medium

                      text-[#5F422F]

                      cursor-pointer

                      hover:bg-[#FBF3EE]

                      transition
                    "
                  >

                    <ArrowLeft
                      size={16}
                    />

                    Back to Veterinarian

                  </button>


                  <button
                    type="button"
                    disabled={
                      !selectedDate ||
                      !selectedTime
                    }
                    onClick={
                      handleContinueToConfirmation
                    }
                    className={`
                      flex-1

                      inline-flex
                      items-center
                      justify-center
                      gap-2

                      rounded-full

                      py-3

                      text-sm
                      font-semibold

                      transition

                      ${
                        selectedDate &&
                        selectedTime
                          ? `
                            bg-vet-primary-dark
                            text-white
                            cursor-pointer
                            hover:bg-vet-primary-dark-hover
                          `
                          : `
                            bg-[#E7E3E0]
                            text-[#A49B95]
                            cursor-not-allowed
                          `
                      }
                    `}
                  >

                    Review & Confirm

                    <ArrowRight
                      size={16}
                    />

                  </button>

                </div>

              </section>
            )}


            {/* =================================
                STEP 3
            ================================= */}

            {currentStep === 3 && (

              <section>

                <h2
                  className="
                    text-2xl
                    sm:text-3xl

                    font-semibold

                    text-[#181615]
                  "
                >
                  3. Review & Confirm
                </h2>


                {/* Doctor */}

                <div
                  className="
                    mt-6

                    rounded-[24px]

                    bg-white

                    border
                    border-vet-border

                    p-5
                  "
                >

                  <div
                    className="
                      flex
                      items-center
                      gap-4
                    "
                  >

                    <img
                      src={
                        selectedDoctor?.image
                      }
                      alt={
                        selectedDoctor?.name
                      }
                      className="
                        w-16
                        h-16

                        rounded-full

                        object-cover
                      "
                    />


                    <div>

                      <h3
                        className="
                          text-lg
                          font-semibold

                          text-vet-text-primary
                        "
                      >
                        {
                          selectedDoctor?.name
                        }
                      </h3>


                      <p
                        className="
                          text-sm

                          text-vet-text-secondary
                        "
                      >
                        {
                          selectedDoctor?.specialization
                        }
                      </p>

                    </div>

                  </div>


                  <div
                    className="
                      mt-5

                      grid

                      grid-cols-1
                      sm:grid-cols-2

                      gap-5

                      border-t
                      border-vet-border

                      pt-5
                    "
                  >

                    {/* Pet */}

                    <div>

                      <p
                        className="
                          text-xs
                          text-[#8B7E77]
                        "
                      >
                        Pet Information
                      </p>


                      <div
                        className="
                          mt-2

                          flex
                          items-center
                          gap-2
                        "
                      >

                        <img
                          src={
                            selectedPet?.image
                          }
                          alt={
                            selectedPet?.name
                          }
                          className="
                            w-8
                            h-8

                            rounded-full

                            object-cover
                          "
                        />


                        <div>

                          <p
                            className="
                              text-sm
                              font-medium

                              text-vet-text-primary
                            "
                          >
                            {
                              selectedPet?.name
                            }
                          </p>

                          <p
                            className="
                              text-xs
                              text-vet-text-secondary
                            "
                          >
                            {
                              selectedPet?.breed
                            }
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* Date */}

                    <div>

                      <p
                        className="
                          text-xs
                          text-[#8B7E77]
                        "
                      >
                        Date & Time
                      </p>


                      <p
                        className="
                          mt-2

                          text-sm
                          font-medium

                          text-vet-text-primary
                        "
                      >
                        {formatDate(
                          selectedDate
                        )}
                      </p>


                      <p
                        className="
                          mt-1

                          text-xs

                          text-vet-text-secondary
                        "
                      >
                        {selectedTime}
                      </p>

                    </div>

                  </div>

                </div>


                {/* Notes */}

                <div className="mt-6">

                  <label
                    className="
                      text-sm
                      font-medium

                      text-[#5D514A]
                    "
                  >
                    Notes for the Vet
                  </label>


                  <textarea
                    value={notes}
                    onChange={(e) =>
                      setNotes(
                        e.target.value
                      )
                    }
                    placeholder="Describe symptoms or anything you'd like the veterinarian to know..."
                    rows={5}
                    className="
                      w-full

                      mt-2

                      rounded-[18px]

                      border
                      border-[#E5DCD6]

                      bg-white

                      px-4
                      py-3

                      text-sm

                      text-vet-text-primary

                      outline-none

                      resize-none

                      focus:border-[#B98A68]

                      focus:ring-2
                      focus:ring-[#EBB183]/20
                    "
                  />

                </div>


                {/* Telehealth */}

                <div
                  className="
                    mt-6
                  "
                >

                  <TelehealthReadiness />

                </div>


                {/* Buttons */}

                <div
                  className="
                    mt-8

                    flex
                    flex-col-reverse
                    sm:flex-row

                    gap-3
                  "
                >

                  <button
                    type="button"
                    onClick={
                      handleBack
                    }
                    className="
                      flex-1

                      inline-flex
                      items-center
                      justify-center
                      gap-2

                      rounded-full

                      border
                      border-[#B98A68]

                      py-3

                      text-sm
                      font-medium

                      text-[#5F422F]

                      cursor-pointer

                      hover:bg-[#FBF3EE]

                      transition
                    "
                  >

                    <ArrowLeft
                      size={16}
                    />

                    Back to Schedule

                  </button>


                  <button
                    type="button"
                    onClick={handleConfirmBooking}
                    disabled={bookingLoading}
                    className="flex-1 rounded-full bg-vet-primary-dark py-3 text-sm font-semibold text-white cursor-pointer hover:bg-vet-primary-dark-hover hover:-translate-y-0.5 transition-all"
                  >
                    {bookingLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <span
                          className="
                            h-4
                            w-4
                            rounded-full
                            border-2
                            border-white
                            border-t-transparent
                            animate-spin
                          "
                        />
                        Booking...
                      </span>
                    ) : (
                      "Confirm & Book Appointment"
                    )}
                  </button>

                </div>

              </section>
            )}

          </div>


          {/* ===================================
              SUMMARY
          =================================== */}

          <BookingSummary

            pet={
              selectedPet
            }

            doctor={
              selectedDoctor
            }

            selectedDate={
              selectedDate
            }

            selectedTime={
              selectedTime
            }

            onContinue={() => {

              if (
                currentStep === 1
              ) {

                handleContinueToSchedule();

              } else if (
                currentStep === 2
              ) {

                handleContinueToConfirmation();

              } else {

                handleConfirmBooking();

              }

            }}

          />

        </div>

      </div>

    </DashboardLayout>
  );
};


// =================================================
// FORMAT DATE
// =================================================

const formatDate = (
  dateString
) => {

  if (!dateString) {
    return "Not selected";
  }


  return new Date(
    `${dateString}T00:00:00`
  ).toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }
  );
};


const generateTimeSlots = (startTime, endTime) => {
  const slots = [];

  let [hours, minutes] = startTime.split(":").map(Number);

  const [endHours, endMinutes] = endTime.split(":").map(Number);

  const current = new Date();

  current.setHours(hours);
  current.setMinutes(minutes);
  current.setSeconds(0);

  const end = new Date();

  end.setHours(endHours);
  end.setMinutes(endMinutes);
  end.setSeconds(0);

  while (current < end) {
    slots.push(
      current.toLocaleTimeString(
        "en-US",
        {
          hour: "numeric",
          minute: "2-digit",
        }
      )
    );

    current.setMinutes(
      current.getMinutes() + 30
    );
  }

  return slots;
};


export default BookAppointmentPage;