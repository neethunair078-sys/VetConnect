import FormInput from "../FormInput";
import FormSelect from "../FormSelect";
import FormTextarea from "../FormTextarea";


const vaccinationOptions = [
  {
    value: "VACCINATED",
    label: "Vaccinated",
  },
  {
    value: "Partially vaccinated",
    label: "Partially vaccinated",
  },
  {
    value: "Not vaccinated",
    label: "Not vaccinated",
  },
];


const PetMedicalForm = ({
  formData,
  errors,
  onChange,
  onBlur,
}) => {

  return (
    <div>

      <h2
        className="
          text-xl
          sm:text-2xl

          font-semibold

          text-[#292421]
        "
      >
        Medical Information
      </h2>


      <p
        className="
          mt-2

          text-sm
          leading-6

          text-[#776B64]
        "
      >
        Add important medical information
        about your pet.
      </p>


      <div className="mt-7 space-y-5">

        <FormInput
          label="Microchip Number"
          name="microchip"
          value={formData.microchip}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter microchip number"
          error={errors.microchip}
        />


        <FormSelect
          label="Vaccination Status"
          name="vaccinationStatus"
          value={formData.vaccinationStatus}
          onChange={onChange}
          onBlur={onBlur}
          options={vaccinationOptions}
          placeholder="Select vaccination status"
          required
          error={errors.vaccinationStatus}
        />


        <FormTextarea
          label="Medical Notes"
          name="medicalNotes"
          value={formData.medicalNotes}
          onChange={onChange}
          onBlur={onBlur}
          placeholder="Enter any relevant medical information..."
          rows={5}
          error={errors.medicalNotes}
        />

      </div>

    </div>
  );
};


export default PetMedicalForm;