import Navbar from "../components/landing/Navbar";
import PetImage from "../components/landing/PetImage";
import Container from "../components/layout/Container";

const LandingPage = () => {
    return (
        <>
            <Navbar />

            <Container >
                <section className="min-h-[calc(100vh-70px)] grid grid-cols-1 lg:grid-cols-2 items-center gap-10 py-12 lg:py-16">

                    {/* LEFT CONTENT */}
                    <div className="max-w-xl">

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1] text-vet-text-primary">
                            Your Pet Care <br /> <span className="text-vet-primary">Center</span>
                        </h1>

                        <p className="mt-6 max-w-lg text-base sm:text-lg leading-7 sm:leading-8 text-text-secondary">
                            Experience premium online consultations,
                            personalized nutrition plans, and 24/7
                            dedicated vet access. Because your pets are
                            family.
                        </p>

                        {/* Buttons */}
                        {/* <div className="mt-8 flex flex-wrap items-center gap-4">

                        <button
                        className="
                            bg-vet-primary
                            text-white
                            px-7
                            py-3
                            rounded-full
                            font-semibold
                            hover:opacity-90
                            transition
                        "
                        >
                        Shop Now
                        </button>

                        <button
                        className="
                            px-5
                            py-3
                            text-vet-text-primary
                            font-semibold
                            hover:text-primary
                            transition
                        "
                        >
                        Schedule a Call
                        </button>

                    </div> */}

                    </div>


                    {/* RIGHT IMAGE */}
                    <div className="w-full">
                        <PetImage />
                    </div>

                </section>
            </Container>
        </>
    )
}

export default LandingPage;