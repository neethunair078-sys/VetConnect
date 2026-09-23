import { ArrowRight } from "lucide-react";

const AuthButton = ({
  children,
  loading = false,
  type = "submit",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className="
        w-full
        h-[40px]
        rounded-full
        bg-vet-primary
        text-vet-text-primary
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
      {loading ? (
        <>
          <span
            className="
              h-4
              w-4
              rounded-full
              border-2
              border-current
              border-t-transparent
              animate-spin
            "
          />

          <span>Processing...</span>
        </>
      ) : (
        <>
          {children}
          <ArrowRight size={16} />
        </>
      )}

    </button>
  );
}

export default AuthButton;