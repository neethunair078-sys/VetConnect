import FormField from "./FormField";

const FormInput = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  type = "text",
  required = false,
  error,
  min,
  max,
  step,
}) => {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
    >
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        min={min}
        max={max}
        step={step}
        className={`
          w-full
          h-11
          rounded-full
          border
          bg-[#FCFAF9]

          px-4

          text-sm
          text-[#302925]

          placeholder:text-[#A69A93]

          outline-none

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

export default FormInput;