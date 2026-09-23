import { Video, Building2 } from "lucide-react";

const ConsultationCard = ({ consultation }) => {

  return (
    <div
      className="
        bg-white
        rounded-[20px]
        px-5
        py-4
        flex
        items-center
        gap-4
        shadow-[0_10px_30px_rgba(70,45,30,0.04)]
      "
    >
      <div
        className="
          w-12
          h-12
          rounded-full
          bg-[#F5F1EE]
          flex
          items-center
          justify-center
          shrink-0
        "
      >
         <img
          src={consultation.petImage}
          alt={consultation.pet}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <p
          className="
            text-sm
            font-semibold
            text-vet-text-primary
          "
        >
          {consultation.doctor}
        </p>

        <p
          className="
            mt-1
            text-xs
            text-[#81756E]
          "
        >
          {consultation.type} - {consultation.pet}
        </p>
      </div>

      <div className="text-right">
        <p
          className="
          text-sm
          font-medium
          text-[#4A403A]
        "
        >
          {consultation.displayDate}
        </p>

        <p
          className="
          text-xs
          text-[#8B7E77]
        "
        >
          {consultation.time}
        </p>
      </div>
    </div>
  );
};

export default ConsultationCard;
