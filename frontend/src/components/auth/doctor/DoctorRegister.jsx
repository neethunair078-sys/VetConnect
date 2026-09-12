import { useState } from "react";

import {
  User,
  Mail,
  Phone,
  Lock,
  Stethoscope,
  Award,
} from "lucide-react";
import toast from "react-hot-toast";

import AuthInput from "../common/AuthInput";
import AuthButton from "../common/AuthButton";


import { validators } from "../../../utils/validation";

import { doctorRegister } from "../../../api/authApi";

const DoctorRegister = ({onRegistrationSuccess}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    licenseNumber: "",
    specialization: "",
    password: "",
    confirmPassword: "",
  });



  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({});


  const [touched, setTouched] = useState({});


  const validateField = (
    name,
    value,
    data = formData
  ) => {

    let error = "";


    switch (name) {

      case "fullName":
        error = validators.name(
          value,
          "Full name"
        );
        break;


      case "email":
        error = validators.email(value);
        break;


      case "phone":
        error = validators.phone(value);
        break;


      case "licenseNumber":
        error = validators.licenseNumber(value);
        break;


      case "specialization":
        error = validators.specialization(value);
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
      validateField(
        name,
        value,
        updatedData
      );
    }


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


    newErrors.licenseNumber =
      validators.licenseNumber(
        formData.licenseNumber
      );


    newErrors.specialization =
      validators.specialization(
        formData.specialization
      );


    newErrors.password =
      validators.password(
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


  const handleSubmit = async (e) => {

    e.preventDefault();


    if (!validateForm()) {
      return;
    }


    setLoading(true);

    try {
      setErrors({});

      const data = await doctorRegister(formData);

      // console.log("Doctor Registration Success:", data);
      toast.success(data.message);

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        licenseNumber: "",
        specialization: "",
        password: "",
        confirmPassword: "",
      });

      onRegistrationSuccess();


    } catch (error) {
      console.error(
        "Doctor Registration Failed:",
        error.response?.data || error.message
      );

      const apiErrors = error.response?.data;

      const firstError =
        apiErrors?.email?.[0] ||
        apiErrors?.licenseNumber?.[0] ||
        apiErrors?.phone?.[0] ||
        apiErrors?.fullName?.[0] ||
        apiErrors?.specialization?.[0] ||
        apiErrors?.password?.[0] ||
        apiErrors?.confirmPassword?.[0] ||
        apiErrors?.non_field_errors?.[0] ||
        apiErrors?.detail ||
        "Registration failed. Please try again.";

      toast.error(firstError);

      setErrors({
        submit: firstError
      });
    } finally {
      setLoading(false);
    }



    // Django API 
  };

  return (
    <div>

      {/* Heading */}

      <div className="text-center mt-5">

        <h2
          className="
            text-[27px]
            font-semibold
            text-text-primary
          "
        >
          Doctor Registration
        </h2>

        <p className="mt-1 text-[13px] text-text-mute">
          Submit your details for verification.
        </p>

      </div>


      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="mt-6 space-y-4"
      >

        <AuthInput
        name="fullName"
          label="Full Name"
          placeholder="Dr. John Doe"
          icon={User}
          value={formData.fullName}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.fullName}
        />

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
        name="licenseNumber"
          label="License Number"  
          placeholder="License number"
          icon={Award}
          value={formData.licenseNumber}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.licenseNumber}
        />

        <AuthInput
        name="specialization"
          label="Specialization"
          placeholder="Veterinary Medicine"
          icon={Stethoscope}
          value={formData.specialization}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.specialization}
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

        {/* {errors.submit && (
          <p className="mt-3 text-sm text-red-500">
            {errors.submit}
          </p>
        )} */}
        <AuthButton loading={loading}>
          Submit for Verification
        </AuthButton>

      </form>

    </div>
  );
}

export default DoctorRegister;