import api from "./axios";

export const getApprovedDoctors = async () => {
  const response = await api.get("/doctors/approved/");
  return response.data;
};

export const getDoctorPatients = async () => {
  const response = await api.get("/doctors/patients/");
  return response.data;
};

// get single patient detail 
export const getDoctorPatient = async (patientId) => {
  const response = await api.get(`/doctors/patients/${patientId}/`);
  return response.data;
};