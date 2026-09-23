import SectionHeader from "./SectionHeader";
import ConsultationCard from "./ConsultationCard";

const UpcomingConsultations = ({
  appointments = [],
  loading = false,
  onViewAll,
}) => {
  return (
    <section>
      <SectionHeader
        title="Upcoming Consultations"
        action="View All"
        onAction={onViewAll}
      />

      <div className="space-y-4">
        {loading ? (
          <div className="py-8 text-center text-sm text-vet-text-secondary">
            Loading consultations...
          </div>
        ) : appointments.length > 0 ? (
          appointments.map((item) => (
            <ConsultationCard key={item.id} consultation={item} />
          ))
        ) : (
          <div className="py-8 text-center text-sm text-vet-text-secondary">
            No upcoming consultations.
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingConsultations;
