import { useEffect, useState } from "react";
import { CalendarDays, Search, FileText } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDoctorHealthRecords } from "../../api/doctorApi";

const DoctorHealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchHealthRecords = async () => {
      try {
        setLoading(true);

        const data = await getDoctorHealthRecords();

        setRecords(data);
      } catch (error) {
        console.error(
          "Failed to fetch health records:",
          error.response?.data || error.message
        );

        toast.error("Unable to load health records.");
      } finally {
        setLoading(false);
      }
    };

    fetchHealthRecords();
  }, []);

  const filteredRecords = records.filter((record) => {
    const search = searchTerm.toLowerCase();

    return (
      record.pet_name?.toLowerCase().includes(search) ||
      record.record_type?.toLowerCase().includes(search) ||
      record.diagnosis?.toLowerCase().includes(search)
    );
  });

  return (
    <DashboardLayout role="DOCTOR">
      <div className="w-full">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-vet-text-primary sm:text-4xl">
            Health Records
          </h1>

          <p className="mt-2 text-sm text-vet-text-secondary sm:text-base">
            View and manage medical records for your patients.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative w-full max-w-xl">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-vet-text-muted"
            />

            <input
              type="text"
              placeholder="Search by patient, record type or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-xl border border-vet-border-input bg-vet-input py-3 pl-11 pr-4 text-sm text-vet-text-primary outline-none transition focus:border-vet-primary-dark"
            />
          </div>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-vet-text-secondary">
              Loading health records...
            </p>
          </div>
        ) : filteredRecords.length === 0 ? (
          /* Empty */
          <div className="rounded-[24px] bg-vet-card p-10 text-center shadow-[0_8px_30px_rgba(70,45,30,0.05)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-vet-icon-soft">
              <FileText
                size={24}
                className="text-vet-primary-dark"
              />
            </div>

            <h2 className="mt-4 text-lg font-semibold text-vet-text-primary">
              No health records found
            </h2>

            <p className="mt-2 text-sm text-vet-text-secondary">
              {searchTerm
                ? "Try a different search term."
                : "Health records for your patients will appear here."}
            </p>
          </div>
        ) : (
          /* Records */
          <div className="grid grid-cols-1 gap-5">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="rounded-[24px] bg-vet-card p-6 shadow-[0_8px_30px_rgba(70,45,30,0.05)]"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-vet-text-primary">
                      {record.pet_name}
                    </h2>

                    <p className="mt-1 text-sm text-vet-text-secondary">
                      {record.record_type}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-vet-text-muted">
                    <CalendarDays size={16} />
                    {record.record_date}
                  </div>
                </div>

                {record.diagnosis && (
                  <div className="mt-5">
                    <p className="text-xs font-medium text-vet-text-muted">
                      Diagnosis
                    </p>

                    <p className="mt-1 text-sm text-vet-text-secondary">
                      {record.diagnosis}
                    </p>
                  </div>
                )}

                {record.treatment && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-vet-text-muted">
                      Treatment
                    </p>

                    <p className="mt-1 text-sm text-vet-text-secondary">
                      {record.treatment}
                    </p>
                  </div>
                )}

                {record.prescription && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-vet-text-muted">
                      Prescription
                    </p>

                    <p className="mt-1 text-sm text-vet-text-secondary">
                      {record.prescription}
                    </p>
                  </div>
                )}

                {record.notes && (
                  <div className="mt-4">
                    <p className="text-xs font-medium text-vet-text-muted">
                      Notes
                    </p>

                    <p className="mt-1 text-sm text-vet-text-secondary">
                      {record.notes}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default DoctorHealthRecords;