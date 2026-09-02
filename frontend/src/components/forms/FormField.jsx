const FormField = ({
  label,
  required = false,
  error,
  children,
}) => {
  return (
    <div className="w-full">

      <label
        className="
          block
          mb-2
          text-xs
          font-medium
          text-[#4D423B]
        "
      >
        {label}

        {required && (
          <span className="ml-1 text-red-500">
            *
          </span>
        )}
      </label>

      {children}

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error}
        </p>
      )}

    </div>
  );
};

export default FormField;