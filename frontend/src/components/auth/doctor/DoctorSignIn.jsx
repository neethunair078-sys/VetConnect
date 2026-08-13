import { useState } from "react";
import { Mail, Lock } from "lucide-react";

import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";
import { validators } from "../../../utils/validation";

const DoctorSignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


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


  const handleSubmit = (e) => {

    e.preventDefault();


    if (!validateForm()) {
      return;
    }


    console.log(
      "Doctor Sign In:",
      formData
    );

    // Django API
  };

  return (
    <div>

      {/* Heading */}

      <div className="text-center mt-16">

        <h2
          className="
            text-[27px]
            font-semibold
            text-text-primary
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

          <AuthButton>
            Sign In
          </AuthButton>

        </div>

      </form>

    </div>
  );
}

export default DoctorSignIn;