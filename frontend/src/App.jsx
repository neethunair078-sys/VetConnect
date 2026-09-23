import { BrowserRouter, Routes, Route } from "react-router-dom";

import Button from "./components/ui/Button"
import LandingPage from "./pages/Landingpage"
import Theme from "./pages/Theme";
// import Authentication from "./components/auth/AuthLayout";
// import Login from "./pages/Login";
import AuthPage from "./pages/AuthPage";
import PetOwnerDashboard from "./pages/dashboards/PetOwnerDashboard";
import PetsPage from "./pages/pet-owner/PetsPage";
import AddPetPage from "./pages/pet-owner/AddPetPage";
import PetProfilePage from "./pages/pet-owner/PetProfilePage";
import EditPetPage from "./pages/pet-owner/EditPetPage";
import AppointmentsPage from "./pages/pet-owner/AppointmentsPage";
import BookAppointmentPage from "./pages/pet-owner/BookAppointmentPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import DoctorDashboard from "./pages/dashboards/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorCompleteProfile from "./pages/doctor/DoctorCompleteProfile";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import DoctorProfileRoute from "./components/auth/DoctorProfileRoute";
import DoctorAvailability from "./pages/doctor/DoctorAvailability";

function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          {/* Development reference page */}
          <Route path="/theme" element={<Theme />} />

          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<ProtectedRoute />}>

            {/* PET-OWNER  */}
            <Route path="/pet-owner/dashboard" element={<PetOwnerDashboard />} />
            <Route path="/pet-owner/pets" element={<PetsPage />} />
            <Route path="/pet-owner/pets/add" element={<AddPetPage />} />
            <Route path="/pet-owner/pets/:id" element={<PetProfilePage />} />
            <Route path="/pet-owner/pets/:id/edit" element={<EditPetPage />} />
            <Route path="/pet-owner/appointments" element={<AppointmentsPage />} />
            <Route path="/pet-owner/appointments/book" element={<BookAppointmentPage />} />

            {/* DOCTOR   */}

            <Route element={<DoctorProfileRoute />}>
              <Route path="/doctor/complete-profile" element={<DoctorCompleteProfile />}/>
              <Route path="/doctor/dashboard" element={<DoctorDashboard /> }/>
              <Route path="/doctor/appointments" element={<DoctorAppointments />} />
              <Route path="/doctor/profile" element={<DoctorProfile />}/>
              <Route path="/doctor/availability" element={<DoctorAvailability />} />
            </Route>
            
            {/* <Route path="/doctor/availability" element={<DoctorAvailabilityPage />} /> */}
            {/* <Route path="/doctor/patients" element={<DoctorPatientsPage />} /> */}
            {/* <Route path="/doctor/consultations" element={<DoctorConsultationsPage />} /> */}
            {/* <Route path="/doctor/health-records" element={<DoctorHealthRecordsPage />} /> */}
            {/* <Route path="/doctor/settings" element={<DoctorSettingsPage />} /> */}
          </Route>
          

        

        </Routes>
      </BrowserRouter>



    </>
  )
}

export default App
