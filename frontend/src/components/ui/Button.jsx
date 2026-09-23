const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) => {

  const variants = {
    primary: `
      bg-vet-primary
      text-vet-text-primary
      hover:bg-[#E3A674]
      hover:shadow-md
    `,

    secondary: `
      bg-white
      border
      border-secondary
      text-vet-text-primary
      hover:bg-[#F8F4F1]
      hover:border-[#D8CEC7]
    `,

    ghost: `
      bg-transparent
      text-[#645A54]
      hover:bg-[#F4EFEC]
    `,
  };


  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-5 py-3 text-sm",
    lg: "px-6 py-3.5 text-base",
  };


  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        font-medium

        cursor-pointer

        transition-all
        duration-200
        ease-out

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-50
        disabled:hover:shadow-none
        disabled:hover:translate-y-0

        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;