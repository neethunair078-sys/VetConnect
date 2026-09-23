import api from "./axios";

export const getDoctorAvailability = async (doctorId) => {
  const response = await api.get(`/availability/doctor/${doctorId}/`);

  return response.data;
};

// Get the logged-in doctor's availability
export const getMyAvailability = async () => {
  const response = await api.get("/availability/");
  return response.data;
};

// Create availability for the logged-in doctor
export const createAvailability = async (availabilityData) => {
  const response = await api.post("/availability/", availabilityData);
  return response.data;
};