export const dashboardData = {
  user: {
    name: "Sarah",
    avatar: "/images/profile/user.jpg",
  },

  pets: [
    {
      id: 1,
      name: "Bella",
      species: "Dog",
      breed: "Golden Retriever",
      age: "3 Years, 2 Mos",
      weight: 65,
      gender: "Female",
      status: "Healthy",
      image: "/images/pets/bella.jpg",

      tags: [
        "Flea Meds: Up to date",
      ],
    },

    {
      id: 2,
      name: "Oliver",
      species: "Cat",
      breed: "Domestic Shorthair",
      age: "8 Mos",
      weight: 12,
      gender: "Male",
      status: "Vaccine Due",
      image: "/images/pets/oliver.jpg",

      tags: [
        "Indoor",
        "Microchipped",
      ],
    },
  ],

  // ==========================================
  // ALL APPOINTMENTS
  // ==========================================

  appointments: [
    {
      id: 1,

      petId: 1,
      pet: "Bella",

      doctor: "Dr. Sarah Jenkins",

      type: "General Checkup",

      date: "2026-09-05",

      time: "10:00 AM - 10:30 AM",

      status: "Upcoming",

      mode: "video",
    },

    {
      id: 2,

      petId: 2,
      pet: "Oliver",

      doctor: "Dr. Emily Chen",

      type: "Vaccination Consultation",

      date: "2026-09-12",

      time: "2:15 PM - 3:00 PM",

      status: "Upcoming",

      mode: "video",
    },

    {
      id: 3,

      petId: 1,
      pet: "Bella",

      doctor: "Dr. Sarah Jenkins",

      type: "General Checkup",

      date: "2026-08-20",

      time: "11:00 AM - 11:30 AM",

      status: "Completed",

      mode: "video",
    },

    {
      id: 4,

      petId: 2,
      pet: "Oliver",

      doctor: "Dr. Emily Chen",

      type: "Nutrition Consultation",

      date: "2026-08-10",

      time: "3:00 PM - 3:30 PM",

      status: "Completed",

      mode: "video",
    },
  ],

  healthUpdates: [
    {
      id: 1,
      date: "Today, 8:45 AM",
      message:
        "Bella's activity is up 15% from last week. Great job keeping her active!",
    },

    {
      id: 2,
      date: "Yesterday",
      message:
        "Reminder: Oliver is due for his rabies booster next week.",
    },

    {
      id: 3,
      date: "Oct 10",
      message:
        "Bella's latest health record has been updated.",
    },
  ],
};