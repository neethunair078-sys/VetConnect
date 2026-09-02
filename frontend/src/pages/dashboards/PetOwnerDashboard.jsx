import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MyPets from "../../components/dashboard/MyPets";
import QuickActions from "../../components/dashboard/QuickActions";
import UpcomingConsultations from "../../components/dashboard/UpcomingConsultations";
import HealthIntelligence from "../../components/dashboard/HealthIntelligence";

import { dashboardData } from "../../data/dashboardData";


const PetOwnerDashboard = () => {

    const {
        user,
        pets,
        consultations,
        healthUpdates,
    } = dashboardData;


    const handlePetClick = (pet) => {
        console.log("Selected pet:", pet);
    };


    // const handleQuickAction = (action) => {
    //     console.log("Quick action:", action);
    // };

    const handleBookVet = () => {
        console.log("Book a Vet clicked");
    };


    const handleViewRecords = () => {
        console.log("View Health Records clicked");
    };

    const upcomingAppointments = dashboardData.appointments.filter(
  (appointment) => appointment.status === "Upcoming"
);

const pastAppointments = dashboardData.appointments.filter(
  (appointment) => appointment.status === "Completed"
);


    return (
        <DashboardLayout>

            {/* Page heading */}

            <section className="mb-8">

                <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight text-[#171412]" >
                    Overview
                </h1>

                <p className="mt-2 text-sm sm:text-base text-[#81756E]">
                    Here is what's happening with your furry family members.
                </p>

            </section>


            {/* Top row */}

            <section className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-5">

                <MyPets
                    pets={pets}
                    onPetClick={handlePetClick}
                    onViewAll={() =>
                        console.log("View all pets")
                    }
                />

                <QuickActions
                    onBookVet={handleBookVet}
                    onViewRecords={handleViewRecords}
                />

            </section>


            {/* Bottom row */}

            <section className="mt-6 grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-6">

                <UpcomingConsultations
                    appointments={upcomingAppointments}
                    onViewAll={() =>
                        console.log("View all consultations")
                    }
                />

                <HealthIntelligence
                    updates={healthUpdates}
                />

            </section>

        </DashboardLayout>
    );
};


export default PetOwnerDashboard;