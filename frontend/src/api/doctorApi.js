import api from "./axios";

export const getApprovedDoctors = async () => {
  const response = await api.get("/doctors/approved/");
  return response.data;
};