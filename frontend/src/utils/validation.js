export const validators = {

  required: (value, fieldName) => {
    if (!value || !value.trim()) {
      return `${fieldName} is required`;
    }

    return "";
  },


  email: (value) => {
    if (!value || !value.trim()) {
      return "Email address is required";
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(value)) {
      return "Please enter a valid email address";
    }

    return "";
  },


  phone: (value) => {
    if (!value || !value.trim()) {
      return "Phone number is required";
    }

    const phoneRegex = /^[6-9]\d{9}$/;

    if (!phoneRegex.test(value)) {
      return "Please enter a valid 10-digit phone number";
    }

    return "";
  },


  password: (value) => {
    if (!value) {
      return "Password is required";
    }

    if (value.length < 8) {
      return "Password must be at least 8 characters";
    }

    if (!/[A-Z]/.test(value)) {
      return "Password must contain at least one uppercase letter";
    }

    if (!/[a-z]/.test(value)) {
      return "Password must contain at least one lowercase letter";
    }

    if (!/[0-9]/.test(value)) {
      return "Password must contain at least one number";
    }

    return "";
  },


  confirmPassword: (password, confirmPassword) => {
    if (!confirmPassword) {
      return "Please confirm your password";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return "";
  },


  name: (value, fieldName = "Name") => {

    if (!value || !value.trim()) {
      return `${fieldName} is required`;
    }

    if (value.trim().length < 2) {
      return `${fieldName} must contain at least 2 characters`;
    }

    return "";
  },


  licenseNumber: (value) => {

    if (!value || !value.trim()) {
      return "License number is required";
    }

    if (value.trim().length < 4) {
      return "Please enter a valid license number";
    }

    return "";
  },


  specialization: (value) => {

    if (!value || !value.trim()) {
      return "Specialization is required";
    }

    return "";
  },
};