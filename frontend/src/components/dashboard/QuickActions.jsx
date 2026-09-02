import {
  CalendarPlus,
  Pill,
  FileText,
} from "lucide-react";

import Button from "../ui/Button";


const QuickActions = ({
  onBookVet,
  onViewRecords,
}) => {

  return (
    <section
      className="
        rounded-[28px]
        bg-white
        p-6
        sm:p-7
        lg:p-8
        shadow-[0_12px_40px_rgba(70,45,30,0.05)]
      "
    >

      <h2
        className="
          text-xl
          sm:text-2xl
          font-semibold
          text-[#292421]
        "
      >
        Quick Actions
      </h2>


      <div className="mt-6 space-y-4">

        <Button
          variant="primary"
          className="w-full"
          onClick={onBookVet}
        >
          <CalendarPlus size={17} />
          Book a Vet
        </Button>



        <Button
          variant="secondary"
          className="w-full"
          onClick={onViewRecords}
        >
          <FileText size={17} />
          View Records
        </Button>

      </div>

    </section>
  );
};

export default QuickActions;