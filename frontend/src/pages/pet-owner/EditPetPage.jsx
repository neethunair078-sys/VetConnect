import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  ArrowLeft,
  ArrowRight,
  Check,
} from "lucide-react";

import DashboardLayout from "../../components/dashboard/DashboardLayout";

import PetBasicInfoForm from "../../components/forms/pets/PetBasicInfoForm";

import PetMedicalForm from "../../components/forms/pets/PetMedicalForm";

import PetPhotoForm from "../../components/forms/pets/PetPhotoForm";


import { validators } from "../../utils/validation";

import { getPet, updatePet as updatePetApi } from "../../api/petsApi";

import { updatePets as updatePetsRedux } from "../../store/slices/petSlice";


const EditPetPage = () => {

  const navigate = useNavigate();

  const { id } = useParams();

  const dispatch = useDispatch()

  const [pet, setPet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null); 


  // ==========================================
  // FIND PET
  // ==========================================


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

  const [preview, setPreview] = useState(null);



  // ==========================================
  // FETCH PET
  // ==========================================


  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true)
        setLoadError(null)

        const data = await getPet(id)

        setPet(data)

        setFormData({
          name: data.name || "",
          species: data.species || "",
          breed: data.breed || "",
          age: extractAge(data.age),
          weight: data.weight || "",

          // Backend MALE/FEMALE → form Male/Female
          gender:
            data.gender === "MALE"
              ? "Male"
              : data.gender === "FEMALE"
              ? "Female"
              : "",

          microchip: data.microchip || "",

          vaccinationStatus:
            data.vaccination_status === "VACCINATED"
              ? "Vaccinated"
              : data.vaccination_status === "PARTIALLY_VACCINATED"
              ? "Partially vaccinated"
              : data.vaccination_status === "NOT_VACCINATED"
              ? "Not vaccinated"
              : "",

          medicalNotes: data.medical_notes || "",
          photo: null,
        })

        setPreview(data.image || null)
      } catch (error) {
        console.error(
          "Failed to fetch pet:",
          error.response?.data || error.message
        );

        setLoadError("Unable to load pet.");
      } finally {
        setLoading(false)
      }
    }

    fetchApi()

  }, [id])


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

const handleSubmit = async () => {
  try {
    const data = new FormData();

    data.append("name", formData.name);
    data.append("species", formData.species);
    data.append("breed", formData.breed);
    data.append("age", formData.age);
    data.append("weight", formData.weight);

    data.append(
      "gender",
      formData.gender.toUpperCase()
    );

    data.append("microchip", formData.microchip);

    data.append(
      "vaccination_status",
      formData.vaccinationStatus
        .toUpperCase()
        .replaceAll(" ", "_")
    );

    data.append(
      "medical_notes",
      formData.medicalNotes
    );

    // Only send image if user selected a NEW one
    if (formData.photo) {
      data.append("image", formData.photo);
    }

    const updatedPet = await updatePetApi(id, data);

    dispatch(updatePetsRedux(updatedPet));

    navigate(`/pet-owner/pets/${id}`);
  } catch (error) {
    console.error(
      "Failed to update pet:",
      error.response?.data || error.message
    );

    alert("Failed to update pet. Please try again.");
  }
};


  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = () => {

    navigate(
      `/pet-owner/pets/${pet.id}`
    );

  };



  

  // ==========================================
  // LOADER
  // ==========================================


  if (loading) {
  return (
    <DashboardLayout>
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-[#665D57]">
          Loading pet...
        </p>
      </div>
    </DashboardLayout>
  );
}


  // ==========================================
  // PET NOT FOUND
  // ==========================================


if (loadError || !pet) {
  return (
    <DashboardLayout>
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-vet-text-primary">
            Pet not found
          </h2>

          <button
            type="button"
            onClick={() => navigate("/pet-owner/pets")}
            className="
              mt-4
              rounded-full
              bg-vet-primary-dark
              px-5
              py-2.5
              text-sm
              font-medium
              text-white
              cursor-pointer
              hover:bg-vet-primary-dark-hover
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

              text-vet-text-secondary
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

                bg-vet-primary-dark

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

                hover:bg-vet-primary-dark-hover

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
              ? "bg-vet-primary-dark text-white"
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
            ? "bg-vet-primary-dark"
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