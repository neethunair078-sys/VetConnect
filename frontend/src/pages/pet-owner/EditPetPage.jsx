import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import PetBasicInfoForm from "../../components/forms/pets/PetBasicInfoForm";

import PetMedicalForm from "../../components/forms/pets/PetMedicalForm";

import PetPhotoForm from "../../components/forms/pets/PetPhotoForm";

import { dashboardData } from "../../data/dashboardData";

import { validators } from "../../utils/validation";


const EditPetPage = () => {

  const navigate = useNavigate();

  const { id } = useParams();


  // ==========================================
  // FIND PET
  // ==========================================

  const pet = dashboardData.pets.find(
    (item) => item.id === Number(id)
  );


  // ==========================================
  // PET NOT FOUND
  // ==========================================

  if (!pet) {

    return (
      <DashboardLayout>

        <div
          className="
            min-h-[400px]
            flex
            items-center
            justify-center
          "
        >

          <div className="text-center">

            <h2
              className="
                text-xl
                font-semibold
                text-[#302925]
              "
            >
              Pet not found
            </h2>


            <button
              type="button"
              onClick={() =>
                navigate("/pet-owner/pets")
              }
              className="
                mt-4

                rounded-full

                bg-[#8B572F]

                px-5
                py-2.5

                text-sm
                font-medium

                text-white

                cursor-pointer

                hover:bg-[#744622]

                transition
              "
            >
              Back to Pets
            </button>

          </div>

        </div>

      </DashboardLayout>
    );
  }


  // ==========================================
  // STEP
  // ==========================================

  const [currentStep, setCurrentStep] =
    useState(1);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    name: pet.name || "",

    species: pet.species || "",

    breed: pet.breed || "",

    age: extractAge(pet.age),

    weight: pet.weight || "",

    gender: pet.gender || "",

    microchip: pet.microchip || "",

    vaccinationStatus:
      pet.vaccinationStatus || "",

    medicalNotes:
      pet.medicalNotes || "",

    photo: null,

  });


  // ==========================================
  // ERRORS
  // ==========================================

  const [errors, setErrors] =
    useState({});


  // ==========================================
  // TOUCHED
  // ==========================================

  const [touched, setTouched] =
    useState({});


  // ==========================================
  // PHOTO PREVIEW
  // ==========================================

  const [preview, setPreview] =
    useState(pet.image || null);


  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {

    const {
      name,
      value,
    } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    if (errors[name]) {

      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));

    }

  };


  // ==========================================
  // VALIDATE BASIC INFO
  // ==========================================

  const validateBasicInfo = () => {

    const newErrors = {};


    newErrors.name =
      validators.petName(
        formData.name
      );


    newErrors.species =
      validators.species(
        formData.species
      );


    newErrors.age =
      validators.age(
        formData.age
      );


    newErrors.weight =
      validators.weight(
        formData.weight
      );


    newErrors.gender =
      validators.gender(
        formData.gender
      );


    return Object.fromEntries(
      Object.entries(newErrors)
        .filter(
          ([, value]) => value
        )
    );

  };


  // ==========================================
  // VALIDATE MEDICAL
  // ==========================================

  const validateMedicalInfo = () => {

    const newErrors = {};


    newErrors.vaccinationStatus =
      validators.vaccinationStatus(
        formData.vaccinationStatus
      );


    return Object.fromEntries(
      Object.entries(newErrors)
        .filter(
          ([, value]) => value
        )
    );

  };


  // ==========================================
  // BLUR
  // ==========================================

  const handleBlur = (e) => {

    const { name } = e.target;


    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));


    let validationErrors = {};


    if (currentStep === 1) {

      validationErrors =
        validateBasicInfo();

    }


    if (currentStep === 2) {

      validationErrors =
        validateMedicalInfo();

    }


    setErrors((prev) => ({
      ...prev,
      [name]:
        validationErrors[name] || "",
    }));

  };


  // ==========================================
  // GENDER
  // ==========================================

  const handleGenderChange = (gender) => {

    setFormData((prev) => ({
      ...prev,
      gender,
    }));


    setTouched((prev) => ({
      ...prev,
      gender: true,
    }));


    setErrors((prev) => ({
      ...prev,
      gender: "",
    }));

  };


  // ==========================================
  // PHOTO
  // ==========================================

  const handlePhotoChange = (e) => {

    const file =
      e.target.files?.[0];


    if (!file) return;


    setFormData((prev) => ({
      ...prev,
      photo: file,
    }));


    const reader =
      new FileReader();


    reader.onloadend = () => {

      setPreview(
        reader.result
      );

    };


    reader.readAsDataURL(file);

  };


  // ==========================================
  // NEXT
  // ==========================================

  const handleNext = () => {

    // ----------------------------------------
    // STEP 1
    // ----------------------------------------

    if (currentStep === 1) {

      const validationErrors =
        validateBasicInfo();


      setErrors(
        validationErrors
      );


      setTouched((prev) => ({
        ...prev,

        name: true,
        species: true,
        age: true,
        weight: true,
        gender: true,
      }));


      if (
        Object.keys(validationErrors)
          .length > 0
      ) {
        return;
      }


      setCurrentStep(2);

      return;
    }


    // ----------------------------------------
    // STEP 2
    // ----------------------------------------

    if (currentStep === 2) {

      const validationErrors =
        validateMedicalInfo();


      setErrors(
        validationErrors
      );


      setTouched((prev) => ({
        ...prev,

        vaccinationStatus: true,
      }));


      if (
        Object.keys(validationErrors)
          .length > 0
      ) {
        return;
      }


      setCurrentStep(3);

      return;
    }


    // ----------------------------------------
    // STEP 3
    // ----------------------------------------

    handleSubmit();

  };


  // ==========================================
  // BACK
  // ==========================================

  const handleBack = () => {

    if (currentStep > 1) {

      setCurrentStep(
        (prev) => prev - 1
      );

      setErrors({});

    }

  };


  // ==========================================
  // SAVE CHANGES
  // ==========================================

  const handleSubmit = () => {

    const updatedPet = {

      ...pet,

      name: formData.name,

      species: formData.species,

      breed: formData.breed,

      age: formData.age
        ? `${formData.age} yrs`
        : "",

      weight: formData.weight,

      gender: formData.gender,

      microchip:
        formData.microchip,

      vaccinationStatus:
        formData.vaccinationStatus,

      medicalNotes:
        formData.medicalNotes,

      image:
        preview || pet.image,

    };


    console.log(
      "Updated pet:",
      updatedPet
    );


    /*
      ==========================================
      LATER WITH DJANGO
      ==========================================

      const formDataToSend =
        new FormData();

      formDataToSend.append(
        "name",
        formData.name
      );

      formDataToSend.append(
        "species",
        formData.species
      );

      formDataToSend.append(
        "breed",
        formData.breed
      );

      formDataToSend.append(
        "age",
        formData.age
      );

      formDataToSend.append(
        "weight",
        formData.weight
      );

      formDataToSend.append(
        "gender",
        formData.gender
      );

      formDataToSend.append(
        "microchip",
        formData.microchip
      );

      formDataToSend.append(
        "vaccinationStatus",
        formData.vaccinationStatus
      );

      formDataToSend.append(
        "medicalNotes",
        formData.medicalNotes
      );

      if (formData.photo) {
        formDataToSend.append(
          "photo",
          formData.photo
        );
      }

      await petService.updatePet(
        pet.id,
        formDataToSend
      );
    */


    alert(
      `${formData.name}'s profile is ready to be updated.`
    );


    navigate(
      `/pet-owner/pets/${pet.id}`
    );

  };


  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {

    navigate(
      `/pet-owner/pets/${pet.id}`
    );

  };


  return (
    <DashboardLayout>

      <div className="w-full">

        {/* =====================================
            BACK
        ===================================== */}

        <button
          type="button"
          onClick={handleCancel}
          className="
            mb-6

            inline-flex
            items-center
            gap-2

            text-sm
            font-medium

            text-[#665D57]

            cursor-pointer

            hover:text-[#8B572F]

            transition
          "
        >

          <ArrowLeft size={17} />

          Back to {pet.name}'s Profile

        </button>


        {/* =====================================
            PAGE HEADER
        ===================================== */}

        <div className="mb-7">

          <h1
            className="
              text-3xl
              sm:text-4xl

              font-bold

              tracking-tight

              text-[#181615]
            "
          >
            Edit {pet.name}'s Profile
          </h1>


          <p
            className="
              mt-2

              text-sm
              sm:text-base

              text-[#786D67]
            "
          >
            Update your pet's information
            and keep their profile up to date.
          </p>

        </div>


        {/* =====================================
            STEPPER
        ===================================== */}

        <div
          className="
            max-w-[720px]

            mx-auto

            mb-8
          "
        >

          <div
            className="
              flex
              items-start
              justify-center
            "
          >

            <Step
              number={1}
              label="Basic Info"
              active={
                currentStep === 1
              }
              completed={
                currentStep > 1
              }
            />


            <StepLine
              active={
                currentStep > 1
              }
            />


            <Step
              number={2}
              label="Medical"
              active={
                currentStep === 2
              }
              completed={
                currentStep > 2
              }
            />


            <StepLine
              active={
                currentStep > 2
              }
            />


            <Step
              number={3}
              label="Photo"
              active={
                currentStep === 3
              }
            />

          </div>

        </div>


        {/* =====================================
            FORM CARD
        ===================================== */}

        <div
          className="
            max-w-[720px]

            mx-auto

            rounded-[28px]

            bg-white

            px-5
            py-7

            sm:px-8
            sm:py-9

            lg:px-10
            lg:py-10

            shadow-[0_12px_40px_rgba(70,45,30,0.06)]
          "
        >

          {/* =================================
              BASIC INFO
          ================================= */}

          {currentStep === 1 && (

            <PetBasicInfoForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
              onGenderChange={
                handleGenderChange
              }
            />

          )}


          {/* =================================
              MEDICAL
          ================================= */}

          {currentStep === 2 && (

            <PetMedicalForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
            />

          )}


          {/* =================================
              PHOTO
          ================================= */}

          {currentStep === 3 && (

            <PetPhotoForm
              preview={preview}
              onPhotoChange={
                handlePhotoChange
              }
            />

          )}


          {/* =================================
              ACTIONS
          ================================= */}

          <div
            className="
              mt-8
              pt-6

              border-t
              border-[#EEE7E3]

              flex
              items-center
              justify-between
            "
          >

            {/* LEFT */}

            {currentStep === 1 ? (

              <button
                type="button"
                onClick={handleCancel}
                className="
                  px-3
                  py-2

                  text-sm
                  font-medium

                  text-[#665D57]

                  cursor-pointer

                  hover:text-[#8B572F]

                  transition
                "
              >
                Cancel
              </button>

            ) : (

              <button
                type="button"
                onClick={handleBack}
                className="
                  inline-flex
                  items-center
                  gap-2

                  px-3
                  py-2

                  text-sm
                  font-medium

                  text-[#665D57]

                  cursor-pointer

                  hover:text-[#8B572F]

                  transition
                "
              >

                <ArrowLeft size={16} />

                Back

              </button>

            )}


            {/* RIGHT */}

            <button
              type="button"
              onClick={handleNext}
              className="
                inline-flex
                items-center
                justify-center
                gap-2

                rounded-full

                bg-[#8B572F]

                px-5
                sm:px-6

                py-2.5
                sm:py-3

                text-xs
                sm:text-sm

                font-semibold

                text-white

                cursor-pointer

                transition-all
                duration-200

                hover:bg-[#744622]

                hover:-translate-y-0.5

                hover:shadow-md

                active:translate-y-0

                active:scale-[0.98]
              "
            >

              {currentStep === 3
                ? "Save Changes"
                : "Continue"
              }


              {currentStep === 3 ? (

                <Check size={16} />

              ) : (

                <ArrowRight size={16} />

              )}

            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
};


// =================================================
// STEP
// =================================================

const Step = ({
  number,
  label,
  active,
  completed,
}) => {

  return (
    <div
      className="
        flex
        flex-col
        items-center
        shrink-0
      "
    >

      <div
        className={`
          w-8
          h-8

          rounded-full

          flex
          items-center
          justify-center

          text-xs
          font-semibold

          transition-all

          ${
            active || completed
              ? "bg-[#8B572F] text-white"
              : "bg-[#E7E2DE] text-[#776B64]"
          }
        `}
      >

        {completed ? (
          <Check size={15} />
        ) : (
          number
        )}

      </div>


      <span
        className={`
          mt-2

          text-[10px]
          sm:text-xs

          whitespace-nowrap

          ${
            active
              ? "text-[#8B572F] font-medium"
              : "text-[#887C74]"
          }
        `}
      >
        {label}
      </span>

    </div>
  );
};


// =================================================
// STEP LINE
// =================================================

const StepLine = ({
  active,
}) => {

  return (
    <div
      className={`
        mt-4

        w-10
        sm:w-16
        lg:w-24

        h-px

        ${
          active
            ? "bg-[#8B572F]"
            : "bg-[#DED8D3]"
        }
      `}
    />
  );
};


// =================================================
// EXTRACT AGE
// =================================================

const extractAge = (age) => {

  if (!age) {
    return "";
  }


  const match =
    String(age).match(
      /[\d.]+/
    );


  return match
    ? match[0]
    : "";
};


export default EditPetPage;