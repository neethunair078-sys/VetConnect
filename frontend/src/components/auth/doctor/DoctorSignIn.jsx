import { useState } from "react";
import { Mail, Lock } from "lucide-react";

import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";
import toast from "react-hot-toast";
import { validators } from "../../../utils/validation";

import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DoctorSignIn = () => {

  const { login } = useAuth();
  const navigate = useNavigate();



  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});


  const [touched, setTouched] = useState({});


  const validateField = (name, value) => {

    let error = "";


    if (name === "email") {
      error = validators.email(value);
    }


    if (name === "password") {
      error = validators.password(value);
    }


    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));


    return error;
  };


  const handleChange = (e) => {

    const { name, value } = e.target;


    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    if (touched[name]) {
      validateField(name, value);
    }
  };


  const handleBlur = (e) => {

    const { name, value } = e.target;


    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));


    validateField(name, value);
  };


  const validateForm = () => {

    const newErrors = {};


    newErrors.email = validators.email(
      formData.email
    );


    newErrors.password = validators.password(
      formData.password
    );


    setErrors(newErrors);


    return !Object.values(newErrors).some(
      (error) => error
    );
  };


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const data = await login({email: formData.email, password: formData.password, role: "DOCTOR",})

      // console.log("Doctor Login Success:", data)

      toast.success(data.message);

      const user = data.user

      if (user.role !== "DOCTOR") {
        setErrors({
          submit: "This account is not registered as a doctor.",
        });
        return;
      }


      // Approved doctor but profile is not completed

      if (user.doctorProfile && !user.doctorProfile.isProfileComplete) {
        navigate("/doctor/complete-profile");
        return;
      }

      navigate("/doctor/dashboard");
    } catch (error) {

    console.error(
      "Doctor Login Failed:",
      error.response?.data || error.message
    );

    const apiErrors = error.response?.data;

    const firstError =
        apiErrors?.email?.[0] ||
        apiErrors?.password?.[0] ||
        apiErrors?.role?.[0] ||
        apiErrors?.non_field_errors?.[0] ||
        apiErrors?.detail ||
        "Unable to sign in. Please try again.";

    toast.error(firstError);

    setErrors({
      submit: firstError
    });
  } finally {
      setLoading(false);
  }

  };

  return (
    <div>

      {/* Heading */}

      <div className="text-center mt-16">

        <h2
          className="
            text-[27px]
            font-semibold
            text-vet-text-primary
          "
        >
          Welcome, Doctor
        </h2>

        <p className="mt-1 text-[13px] text-text-mute">
          Sign in to access your VetConnect dashboard.
        </p>

      </div>


      {/* Form */}

     

      <form
        onSubmit={handleSubmit}
        className="mt-10"
      >

        <AuthInput
          name="email"
          label="Professional Email"
          type="email"
          placeholder="doctor@example.com"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />


        <div className="mt-5">

          <AuthInput
            name="password"
            label="Password"
            type="password"
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.password}
          />

          <div className="flex justify-end mt-2">

            <button
              type="button"
              className="
                text-[10px]
                text-text-mute
                hover:text-primary
              "
            >
              Forgot password?
            </button>

          </div>

        </div>


        <div className="mt-5">

          {/* {errors.submit && (
            <p className="mt-3 text-sm text-red-500">
              {errors.submit}
            </p>
          )} */}

          <AuthButton loading={loading}>
            Sign In
          </AuthButton>

        </div>

      </form>

    </div>
  );
}

export default DoctorSignIn;