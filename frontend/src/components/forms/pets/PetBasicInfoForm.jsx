import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import FormField from "../FormField";


const speciesOptions = [
  {
    value: "Dog",
    label: "Dog",
  },
  {
    value: "Cat",
    label: "Cat",
  },
  {
    value: "Bird",
    label: "Bird",
  },
  {
    value: "Rabbit",
    label: "Rabbit",
  },
  {
    value: "Other",
    label: "Other",
  },
];


const PetBasicInfoForm = ({
  formData,
  errors,
  onChange,
  onBlur,
  onGenderChange,
}) => {

  return (
    <div>

      {/* =====================================
          IDENTITY
      ===================================== */}

      <h2
        className="
          text-xl
          sm:text-2xl
          font-semibold
          text-[#292421]
        "
      >
        Identity
      </h2>


      <div
        className="
          mt-6

          grid
          grid-cols-1
          sm:grid-cols-2

          gap-5
        "
      >

        <FormInput
          label="Pet's Name"
          name="name"
          value={formData.name}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. Bella"
          required
          error={errors.name}
        />


        <FormSelect
          label="Species"
          name="species"
          value={formData.species}
          onChange={onChange}
          onBlur={onBlur}
          options={speciesOptions}
          placeholder="Select species"
          required
          error={errors.species}
        />

      </div>


      {/* =====================================
          DETAILS
      ===================================== */}

      <h2
        className="
          mt-9

          text-xl
          sm:text-2xl

          font-semibold

          text-[#292421]
        "
      >
        Details
      </h2>


      <div className="mt-6 space-y-5">

        {/* Breed */}

        <FormInput
          label="Breed"
          name="breed"
          value={formData.breed}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="e.g. Golden Retriever"
          error={errors.breed}
        />


        {/* Age / Weight */}

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            gap-5
          "
        >

          <FormInput
            label="Age (Years)"
            name="age"
            type="number"
            value={formData.age}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="e.g. 3.5"
            min="0"
            step="0.1"
            required
            error={errors.age}
          />


          <FormInput
            label="Weight (lbs)"
            name="weight"
            type="number"
            value={formData.weight}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="e.g. 45"
            min="0"
            step="0.1"
            required
            error={errors.weight}
          />

        </div>


        {/* Gender */}

        <FormField
          label="Gender"
          required
          error={errors.gender}
        >

          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >

            {["Male", "Female"].map(
              (gender) => {

                const selected =
                  formData.gender === gender;


                return (
                  <button
                    key={gender}
                    type="button"
                    onClick={() =>
                      onGenderChange(gender)
                    }
                    className={`
                      h-11

                      rounded-full

                      border

                      text-sm

                      cursor-pointer

                      transition-all

                      ${
                        selected
                          ? `
                            border-[#8B572F]
                            bg-[#FBEDE2]
                            text-[#8B572F]
                            font-medium
                          `
                          : `
                            border-[#E3D9D2]
                            bg-white
                            text-[#655B55]

                            hover:bg-[#FAF5F1]
                          `
                      }
                    `}
                  >
                    {gender}
                  </button>
                );

              }
            )}

          </div>

        </FormField>

      </div>

    </div>
  );
};


export default PetBasicInfoForm;