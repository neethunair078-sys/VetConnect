import { useNavigate } from "react-router-dom";

import DoctorProfileForm from "../../components/doctor/DoctorProfileForm";

const DoctorCompleteProfile = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/doctor/dashboard");
  };

  return (
    <div className="min-h-screen bg-vet-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-vet-text-primary">
            Complete Your Professional Profile
          </h1>

          <p className="mt-3 max-w-2xl mx-auto text-sm sm:text-base text-vet-text-secondary">
            Complete your professional information to access the VetConnect
            Doctor Portal.
          </p>
        </div>

        {/* Profile Form */}
        <DoctorProfileForm
          mode="complete"
          onSuccess={handleSuccess}
        />

      </div>
    </div>
  );
};

export default DoctorCompleteProfile;