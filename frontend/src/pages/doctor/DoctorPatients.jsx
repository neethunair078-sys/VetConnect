import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, PawPrint } from "lucide-react";
import toast from "react-hot-toast";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import { getDoctorPatients } from "../../api/doctorApi";

const DoctorPatients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);

        const data = await getDoctorPatients();

        setPatients(data);
      } catch (error) {
        console.error(
          "Failed to fetch patients:",
          error.response?.data || error.message
        );

        toast.error("Failed to load patients.");
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const filteredPatients = patients.filter((patient) => {
    const search = searchTerm.toLowerCase();

    return (
      patient.name?.toLowerCase().includes(search) ||
      patient.breed?.toLowerCase().includes(search) ||
      patient.species?.toLowerCase().includes(search) ||
      patient.owner_name?.toLowerCase().includes(search)
    );
  });

  const getPetImageUrl = (image) => {
    if (!image) {
      return "/images/pets/default-pet.jpg";
    }

    if (image.startsWith("http")) {
      return image;
    }

    return `${import.meta.env.VITE_MEDIA_BASE_URL}${image}`;
  };

  return (
    <DashboardLayout role="DOCTOR">
      <div className="min-h-screen bg-vet-background px-4 py-8 sm:px-6 lg:px-8">
        <div className="w-full">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-vet-text-primary sm:text-4xl">
              Patients
            </h1>

            <p className="mt-2 text-sm text-vet-text-secondary sm:text-base">
              View pets who have appointments with you.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6">
            <div className="relative w-full max-w-xl">
              <Search
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-vet-text-muted"
              />

              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="w-full rounded-xl border border-vet-border-input bg-vet-card py-3 pl-10 pr-4 text-sm text-vet-text-primary outline-none transition focus:border-vet-primary"
              />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-vet-text-secondary">
                Loading patients...
              </p>
            </div>
          )}

          {/* Empty */}
          {!loading && filteredPatients.length === 0 && (
            <div className="rounded-2xl border border-vet-border bg-vet-card p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-vet-icon-soft">
                <PawPrint className="text-vet-primary-dark" size={26} />
              </div>

              <h2 className="text-lg font-semibold text-vet-text-primary">
                No patients found
              </h2>

              <p className="mt-2 text-sm text-vet-text-secondary">
                {searchTerm
                  ? "Try searching with a different name or keyword."
                  : "Patients will appear here when they have appointments with you."}
              </p>
            </div>
          )}

          {/* Patients */}
          {!loading && filteredPatients.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {filteredPatients.map((patient) => (
                <button
                    type="button"
                    key={patient.id}
                    onClick={() => navigate(`/doctor/patients/${patient.id}`)}
                    className="w-full overflow-hidden rounded-2xl border border-vet-border bg-vet-card text-left transition hover:-translate-y-1 hover:shadow-md"
                >
                  {/* Patient image */}
                  <div className="flex items-center gap-4 border-b border-vet-border p-5">
                    <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full bg-vet-icon-soft">
                      <img
                        src={getPetImageUrl(patient.image)}
                        alt={patient.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <div className="min-w-0">
                      <h2 className="truncate text-lg font-semibold text-vet-text-primary">
                        {patient.name}
                      </h2>

                      <p className="text-sm text-vet-text-secondary">
                        {patient.breed || patient.species}
                      </p>

                      <p className="mt-1 text-xs text-vet-text-muted">
                        Owner: {patient.owner_name || "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Patient details */}
                  <div className="grid grid-cols-2 gap-4 p-5">
                    <div>
                      <p className="text-xs text-vet-text-muted">
                        Species
                      </p>

                      <p className="mt-1 text-sm font-medium text-vet-text-primary">
                        {patient.species || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-vet-text-muted">
                        Gender
                      </p>

                      <p className="mt-1 text-sm font-medium text-vet-text-primary">
                        {patient.gender || "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-vet-text-muted">
                        Age
                      </p>

                      <p className="mt-1 text-sm font-medium text-vet-text-primary">
                        {patient.age ?? "N/A"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-vet-text-muted">
                        Weight
                      </p>

                      <p className="mt-1 text-sm font-medium text-vet-text-primary">
                        {patient.weight ? `${patient.weight} kg` : "N/A"}
                      </p>
                    </div>
                  </div>

                  {/* Vaccination */}
                  <div className="border-t border-vet-border px-5 py-4">
                    <p className="text-xs text-vet-text-muted">
                      Vaccination Status
                    </p>

                    <span className="mt-2 inline-flex rounded-full bg-vet-success-bg px-3 py-1 text-xs font-medium text-vet-success-text">
                      {patient.vaccination_status
                        ?.replaceAll("_", " ")
                        .toLowerCase()
                        .replace(/\b\w/g, (char) => char.toUpperCase()) ||
                        "N/A"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorPatients;