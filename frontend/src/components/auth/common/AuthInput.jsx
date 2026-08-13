const AuthInput = ({label, type = "text", placeholder, icon: Icon, value, onChange, onBlur, error, name,}) => {
  return (
    <div>

      <label htmlFor={name} className="block text-[11px] font-semibold text-dark mb-2">
        {label}
      </label>

      <div 
        className={`
          flex
          items-center
          h-[40px]
          rounded-full
          border
          bg-light
          px-3
          gap-3
          transition
          ${
            error
              ? "border-red-400"
              : "border-dark focus-within:border-primary"
          }
        `}
      >

        {Icon && (
          <Icon 
            size={17} 
            strokeWidth={1.5} 
            className={
              error
                ? "text-red-400 shrink-0"
                : "text-secondary shrink-0"
            }
          />
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur} 
          placeholder={placeholder}
          className="flex-1 min-w-0 bg-transparent outline-none text-sm text-text-dark placeholder:text-text-mute"
        />
      </div>


      {/* Error */}

      {error && (
        <p className="mt-1 ml-3 text-[10px] text-red-500">
          {error}
        </p>
      )}

    </div>
  );
}

export default AuthInput;