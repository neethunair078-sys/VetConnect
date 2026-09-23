const BookingProgress = ({ currentStep }) => {
  const steps = [
    {
      number: 1,
      label: "Veterinarian",
    },
    {
      number: 2,
      label: "Schedule",
    },
    {
      number: 3,
      label: "Confirm",
    },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">

        {steps.map((step, index) => {

          const active =
            currentStep >= step.number;

          return (
            <div
              key={step.number}
              className="flex items-center flex-1"
            >

              <div className="flex flex-col items-center">

                <div
                  className={`
                    w-7
                    h-7

                    rounded-full

                    flex
                    items-center
                    justify-center

                    text-xs
                    font-semibold

                    transition-all

                    ${
                      active
                        ? "bg-vet-primary-dark text-white"
                        : "bg-[#E9E5E2] text-vet-text-secondary"
                    }
                  `}
                >
                  {step.number}
                </div>

                <span
                  className={`
                    mt-2
                    text-[11px]
                    sm:text-xs

                    ${
                      active
                        ? "text-[#8B572F] font-medium"
                        : "text-vet-text-secondary"
                    }
                  `}
                >
                  {step.label}
                </span>

              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                    h-[3px]
                    flex-1
                    mx-2
                    sm:mx-4
                    mt-[-18px]

                    rounded-full

                    ${
                      currentStep > step.number
                        ? "bg-[#EBB183]"
                        : "bg-[#E8E3E0]"
                    }
                  `}
                />
              )}

            </div>
          );
        })}

      </div>
    </div>
  );
};

export default BookingProgress;