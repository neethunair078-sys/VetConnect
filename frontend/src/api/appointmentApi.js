import api from "./axios";

export const createAppointment = async (appointmentData) => {
  const response = await api.post("/appointments/", appointmentData);

  return response.data;
};

export const getAppointments = async () => {
  const response = await api.get("/appointments/");
  return response.data;
};

export const updateAppointmentStatus = async (appointmentId, action) => {
  const response = await api.patch(
    `/appointments/${appointmentId}/status/`,
    { action }
  );

  return response.data;
};