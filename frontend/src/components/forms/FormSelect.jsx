import { ChevronDown } from "lucide-react";

import FormField from "./FormField";

const FormSelect = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  placeholder = "Select",
  required = false,
  error,
}) => {
  return (
    <FormField
      label={label}
      required={required}
      error={error}
    >
      <div className="relative">

        <select
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full
            h-11

            rounded-full

            border

            bg-[#FCFAF9]

            px-4
            pr-10

            text-sm

            outline-none

            appearance-none

            cursor-pointer

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

            ${
              value
                ? "text-vet-text-primary"
                : "text-[#A69A93]"
            }
          `}
        >
          <option value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>

        <ChevronDown
          size={16}
          className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2

            pointer-events-none

            text-[#796C64]
          "
        />

      </div>
    </FormField>
  );
};

export default FormSelect;