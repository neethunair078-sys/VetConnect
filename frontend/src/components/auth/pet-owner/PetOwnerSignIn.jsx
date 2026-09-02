import { useState } from "react";

import { Mail, Lock } from "lucide-react";

import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";
import { validators } from "../../../utils/validation";
import { useNavigate } from "react-router-dom";

const PetOwnerSignIn = () => {

  const naviagte = useNavigate()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const [touched, setTouched] = useState({});


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));


    // Validate while typing after field has been touched

    if (touched[name]) {
      validateField(name, value);
    }
  };


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


    const isValid = validateForm();


    if (!isValid) {
      return;
    }


    console.log("Pet Owner Sign In:", formData);

    // Django API
    navigate("/pet-owner/dashboard");
  };




  return (
    <div>

      {/* Heading */}

      <div className="text-center mt-16">

        <h2 className="text-[27px] font-semibold text-text-primary">
          Welcome Back
        </h2>

        <p className="mt-1 text-[13px] text-text-mute">
          Sign in to manage your pet's health records.
        </p>

      </div>


      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="mt-10"
      >

        <AuthInput
          name="email"
          label="Email Address"
          type="email"
          placeholder="hello@example.com"
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

            <button type="button" className="text-[10px] text-secondary hover:text-text-highlight">
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

export default PetOwnerSignIn;