import { useState } from "react";
import { User, Mail, Phone, Lock } from "lucide-react";

import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";
import { validators } from "../../../utils/validation";

const PetOwnerRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });


  const [errors, setErrors] = useState({});


  const [touched, setTouched] = useState({});


  const validateField = (name, value, data = formData) => {

    let error = "";


    switch (name) {

      case "fullName":
        error = validators.name(value, "Full name");
        break;


      case "email":
        error = validators.email(value);
        break;


      case "phone":
        error = validators.phone(value);
        break;


      case "password":
        error = validators.password(value);
        break;


      case "confirmPassword":
        error = validators.confirmPassword(
          data.password,
          value
        );
        break;


      default:
        break;
    }


    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));


    return error;
  };


  const handleChange = (e) => {

    const { name, value } = e.target;


    const updatedData = {
      ...formData,
      [name]: value,
    };


    setFormData(updatedData);


    if (touched[name]) {
      validateField(name, value, updatedData);
    }


    // Revalidate confirm password when password changes

    if (
      name === "password" &&
      touched.confirmPassword
    ) {
      validateField(
        "confirmPassword",
        updatedData.confirmPassword,
        updatedData
      );
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


    newErrors.fullName = validators.name(
      formData.fullName,
      "Full name"
    );


    newErrors.email = validators.email(
      formData.email
    );


    newErrors.phone = validators.phone(
      formData.phone
    );


    newErrors.password = validators.password(
      formData.password
    );


    newErrors.confirmPassword =
      validators.confirmPassword(
        formData.password,
        formData.confirmPassword
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
      "Pet Owner Registration:",
      formData
    );

    // Django registration API will go here
  };

  return (
    <div>

      {/* Heading */}

      <div className="text-center mt-10">

        <h2
          className="
            text-[27px]
            font-semibold
            text-text-primary
          "
        >
          Create Account
        </h2>

        <p className="mt-1 text-[13px] text-text-mute">
          Create your pet owner account.
        </p>

      </div>


      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="mt-7 space-y-4"
        noValidate
      >

        <AuthInput
          name="fullName"
          label="Full Name"
          placeholder="Your name"
          icon={User}
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
        />

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

        <AuthInput
          name="phone"
          label="Phone Number"
          type="tel"
          placeholder="9876543210"
          icon={Phone}
          value={formData.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
        />

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

        <AuthInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.confirmPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.confirmPassword}
        />

        <AuthButton>
          Create Account
        </AuthButton>

      </form>

    </div>
  );
}

export default PetOwnerRegister;