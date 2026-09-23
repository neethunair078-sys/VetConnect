import FormField from "./FormField";

const FormTextarea = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  rows = 5,
  required = false,
  error,
}) => {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
    >
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        rows={rows}
        className={`
          w-full

          rounded-[20px]

          border

          bg-[#FCFAF9]

          px-4
          py-3

          text-sm
          text-vet-text-primary

          placeholder:text-[#A69A93]

          outline-none

          resize-none

          transition-all

          ${
            error
              ? `
                border-red-400
                focus:border-red-400
                focus:ring-2
                focus:ring-red-100
              `
              : `
                border-[#E3D9D2]
                focus:border-[#EBB183]
                focus:ring-2
                focus:ring-[#EBB183]/20
              `
          }
        `}
      />
    </FormField>
  );
};

export default FormTextarea;