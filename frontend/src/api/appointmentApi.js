import api from "./axios";

export const createAppointment = async (appointmentData) => {
  const response = await api.post("/appointments/", appointmentData);

  return response.data;
};