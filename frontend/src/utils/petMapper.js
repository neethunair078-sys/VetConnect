const MEDIA_BASE_URL = import.meta.env.VITE_MEDIA_BASE_URL;

export const mapPet = (pet) => {
  let imageUrl = null;

  if (pet.image) {
    imageUrl = pet.image.startsWith("http")
      ? pet.image
      : `${MEDIA_BASE_URL}${pet.image}`;
  }

  const vaccinationLabels = {
    VACCINATED: "Vaccinated",
    PARTIALLY_VACCINATED: "Partially vaccinated",
    NOT_VACCINATED: "Not vaccinated",
  };

  return {
    ...pet,

    // Used by the existing PetCard
    status: vaccinationLabels[pet.vaccination_status] || "Unknown",

    // Used by the existing PetCard tags
    tags: [
      pet.gender === "MALE" ? "Male" : "Female",
      `${pet.weight} lbs`,
    ],

    // Full image URL for the browser
    image: imageUrl,

    // Keep age as years because your form uses years
    age: `${pet.age} years`,
  };
};