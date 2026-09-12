import { useState } from "react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthTabs from "../components/auth/AuthTabs";

import PetOwnerSignIn from "../components/auth/pet-owner/PetOwnerSignIn";
import PetOwnerRegister from "../components/auth/pet-owner/PetOwnerRegister";

import DoctorSignIn from "../components/auth/doctor/DoctorSignIn";
import DoctorRegister from "../components/auth/doctor/DoctorRegister";

const AuthPage = () => {

  const [userType, setUserType] = useState("petOwner");

  const [authMode, setAuthMode] = useState("signin");


  const renderForm = () => {

    /* ================= PET OWNER ================= */

    if (userType === "petOwner") {

      if (authMode === "signin") {
        return <PetOwnerSignIn />;
      }
      return (
        <PetOwnerRegister
          onRegistrationSuccess={() => setAuthMode("signin")}
        />
      );
    }


    /* ================= DOCTOR ================= */

    if (userType === "doctor") {

      if (authMode === "signin") {
        return <DoctorSignIn />;
      }
      return <DoctorRegister onRegistrationSuccess={() => setAuthMode("signin")} />;
    }

    return null;
  };


  return (
    <AuthLayout>
      <AuthTabs
        userType={userType}
        setUserType={setUserType}
        authMode={authMode}
        setAuthMode={setAuthMode}
      />
      {renderForm()}
    </AuthLayout>
  );
}

export default AuthPage;