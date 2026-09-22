import { useNavigate } from "react-router-dom";

import DashboardLayout from "../../components/dashboard/DashboardLayout";
import DoctorProfileForm from "../../components/doctor/DoctorProfileForm";

const DoctorProfile = () => {
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/doctor/profile");
  };

  return (
    <DashboardLayout role="DOCTOR">
      <div className="min-h-screen bg-[#F9F5F0] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">

          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#302925] sm:text-4xl">
              My Profile
            </h1>

            <p className="mt-2 text-sm text-[#786D67] sm:text-base">
              View and manage your professional information.
            </p>
          </div>

          <DoctorProfileForm
            mode="edit"
            onSuccess={handleSuccess}
          />

        </div>
      </div>
    </DashboardLayout>
  );
};

export default DoctorProfile;