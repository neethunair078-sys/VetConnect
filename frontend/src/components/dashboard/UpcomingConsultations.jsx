import SectionHeader from "./SectionHeader";
import ConsultationCard from "./ConsultationCard";
import { useNavigate } from "react-router-dom";

const UpcomingConsultations = ({
  appointments = [],
  onViewAll,
}) => {

  const navigate = useNavigate()

  return (
    <section>

      <SectionHeader
        title="Upcoming Consultations"
        action="View All"
        onAction={() => navigate("/pet-owner/appointments")}
      />

      <div className="space-y-4">

        {appointments.map((item) => (
          <ConsultationCard
            key={item.id}
            consultation={item}
          />
        ))}

      </div>

    </section>
  );
};

export default UpcomingConsultations;