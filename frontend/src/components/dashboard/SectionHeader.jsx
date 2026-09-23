const SectionHeader = ({
  title,
  action,
  onAction,
}) => {

  return (
    <div
      className="
        flex
        items-center
        justify-between
        mb-5
      "
    >

      <h2
        className="
          text-xl
          sm:text-2xl
          font-semibold
          text-vet-text-primary
        "
      >
        {title}
      </h2>

      {action && (
        <button
          onClick={onAction}
          className="
          cursor-pointer
            text-sm
            text-[#8A6A55]
            transition-colors
            hover:text-primary
          "
        >
          {action} →
        </button>
      )}

    </div>
  );
};

export default SectionHeader;