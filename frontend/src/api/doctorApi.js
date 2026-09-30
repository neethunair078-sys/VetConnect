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


// Get each patient appointment details
export const getDoctorPatientAppointments = async (patientId) => {
  const response = await api.get(`/doctors/patients/${patientId}/appointments/`);
  return response.data;
};


// For health record
export const getDoctorPatientHealthRecords = async (patientId) => {
  const response = await api.get(`/health-records/patient/${patientId}/`);
  return response.data;
};


export const createHealthRecord = async (patientId, recordData) => {
  const response = await api.post(`/health-records/patient/${patientId}/`, recordData);

  return response.data;
};