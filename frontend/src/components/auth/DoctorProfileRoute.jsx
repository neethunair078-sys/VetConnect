import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const DoctorProfileRoute = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isDoctor = user?.role === "DOCTOR";
  const isProfileComplete = user?.doctorProfile?.isProfileComplete;

  // Only apply profile-completion logic to doctors
  if (isDoctor && !isProfileComplete) {
    // Allow the doctor to access the completion page
    if (location.pathname === "/doctor/complete-profile") {
      return <Outlet />;
    }

    return <Navigate to="/doctor/complete-profile" replace />;
  }

  return <Outlet />;
};

export default DoctorProfileRoute;