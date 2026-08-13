import { ArrowRight } from "lucide-react";

const AuthButton = ({
  children,
  type = "submit",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className="
        w-full
        h-[40px]
        rounded-full
        bg-primary
        text-text-primary
        text-[11px]
        font-semibold
        flex
        items-center
        justify-center
        gap-2
        hover:opacity-90
        transition
      "
    >
      {children}

      <ArrowRight size={16} />

    </button>
  );
}

export default AuthButton;