import { useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import PetBasicInfoForm
  from "../../components/forms/pets/PetBasicInfoForm";

import PetMedicalForm
  from "../../components/forms/pets/PetMedicalForm";

import PetPhotoForm
  from "../../components/forms/pets/PetPhotoForm";

import { validators }
  from "../../utils/validation";


const AddPetPage = () => {

  const navigate = useNavigate();


  // ==========================================
  // STEP
  // ==========================================

  const [currentStep, setCurrentStep] =
    useState(1);


  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({

    name: "",
    species: "",
    breed: "",
    age: "",
    weight: "",
    gender: "",

    microchip: "",
    vaccinationStatus: "",
    medicalNotes: "",

    photo: null,

  });


  // ==========================================
  // ERRORS
  // ==========================================

  const [errors, setErrors] = useState({});


  // ==========================================
  // TOUCHED
  // ==========================================

  const [touched, setTouched] =
    useState({});


  // ==========================================
  // PHOTO PREVIEW
  // ==========================================

  const [preview, setPreview] =
    useState(null);


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


    // Clear error after editing

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
  // HANDLE BLUR
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

    if (currentStep === 1) {

      const validationErrors =
        validateBasicInfo();


      setErrors(
        validationErrors
      );


      // Mark all required fields touched

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
  // SUBMIT
  // ==========================================

  const handleSubmit = () => {

    console.log(
      "Pet data:",
      formData
    );


    /*
      Later:

      const formDataToSend =
        new FormData();

      formDataToSend.append(
        "name",
        formData.name
      );

      ...

      await petService.createPet(
        formDataToSend
      );
    */


    alert(
      "Pet information ready to be saved."
    );


    navigate(
      "/pet-owner/pets"
    );

  };


  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {

    navigate(
      "/pet-owner/pets"
    );

  };


  return (
    <DashboardLayout>

      <div className="w-full">

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


          {currentStep === 2 && (

            <PetMedicalForm
              formData={formData}
              errors={errors}
              onChange={handleChange}
              onBlur={handleBlur}
            />

          )}


          {currentStep === 3 && (

            <PetPhotoForm
              preview={preview}
              onPhotoChange={
                handlePhotoChange
              }
            />

          )}


          {/* =====================================
              ACTIONS
          ===================================== */}

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

                <ArrowLeft
                  size={16}
                />

                Back

              </button>

            )}


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
                ? "Save Pet"
                : "Save & Continue"
              }


              {currentStep === 3 ? (

                <Check size={16} />

              ) : (

                <ArrowRight
                  size={16}
                />

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

          ${active || completed
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

          ${active
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

        ${active
          ? "bg-[#8B572F]"
          : "bg-[#DED8D3]"
        }
      `}
    />
  );
};


export default AddPetPage;