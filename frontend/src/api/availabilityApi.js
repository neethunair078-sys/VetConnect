import api from "./axios";

export const getDoctorAvailability = async (doctorId) => {
  const response = await api.get(`/availability/doctor/${doctorId}/`);

  return response.data;
};