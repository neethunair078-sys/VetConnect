import {
  CheckCircle2,
} from "lucide-react";

const TelehealthReadiness = () => {

  const items = [
    "Stable internet connection",
    "Camera & microphone access",
    "Quiet environment",
  ];


  return (
    <div>

      <h3
        className="
          text-sm
          font-medium

          text-[#5D514A]
        "
      >
        Telehealth Readiness
      </h3>


      <div className="mt-3 space-y-2">

        {items.map((item) => (

          <div
            key={item}
            className="
              flex
              items-center
              gap-2

              text-xs

              text-vet-text-secondary
            "
          >

            <CheckCircle2
              size={13}
              className="text-[#8B572F]"
            />

            {item}

          </div>

        ))}

      </div>

    </div>
  );
};

export default TelehealthReadiness;