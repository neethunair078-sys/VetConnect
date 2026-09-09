import api from "./axios";
import { mapPet } from "../utils/petMapper";


// Get all pets belonging to the logged-in user
export const getPets = async () => {
  const response = await api.get("/pets/");
  return response.data.map(mapPet);
};

// Get one pet
export const getPet = async (id) => {
  const response = await api.get(`/pets/${id}/`);
  return mapPet(response.data)
};

// Create a pet
export const createPet = async (petData) => {
  const response = await api.post("/pets/", petData);
  return mapPet(response.data);
};

// Update a pet
export const updatePet = async (id, petData) => {
  const response = await api.patch(`/pets/${id}/`, petData);
  return mapPet(response.data);
};

// Delete a pet
export const deletePet = async (id) => {
  const response = await api.delete(`/pets/${id}/`);
  return response.data;
};

