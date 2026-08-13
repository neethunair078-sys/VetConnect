import vetLogin from '../../assets/login-side-image.png'
import Container from '../layout/Container';

const AuthLayout = ({ children }) => {
    return (
        <main className="min-h-screen bg-light flex items-center justify-center p-4 sm:p-6 lg:p-8">

            <div className="w-full max-w-[940px] min-h-[610px] bg-white rounded-[38px] overflow-hidden shadow-[0_20px_60px_rgba(50,30,20,0.08)] grid grid-cols-1 lg:grid-cols-2">

                {/* ================= LEFT PANEL ================= */}

                <div className="relative hidden lg:flex overflow-hidden p-12 items-center">

                    {/* Background image */}

                    <img src={vetLogin} alt="Veterinarian with dog" className="absolute inset-0 w-full h-full object-cover" />

                    {/* Peach overlay */}

                    <div className="absolute inset-0 bg-primary/80" />

                    {/* Content */}

                    <div className="relative z-10 w-full text-dark">

                        {/* Logo */}

                        <div className="flex items-center gap-2 mb-52">

                            <span className="text-2xl">
                                🐾
                            </span>

                            <span className="text-xl font-semibold">
                                VetConnect
                            </span>

                        </div>


                        {/* Heading */}

                        <h1 className="text-4xl xl:text-5xl font-bold leading-[1.15] max-w-[420px]">
                            Join the
                            <br />
                            VetConnect family
                        </h1>


                        {/* Description */}

                        <p className=" mt-5 max-w-[390px] text-base leading-6">
                            Your all-in-one portal for managing your
                            pet's health and wellness.
                        </p>


                        {/* Features */}

                        <div className="mt-6 space-y-4">

                            <Feature>
                                24/7 Access to medical records
                            </Feature>

                            <Feature>
                                Easy online appointment scheduling
                            </Feature>

                            <Feature>
                                Direct messaging with your care team
                            </Feature>

                        </div>

                    </div>

                </div>


                {/* ================= RIGHT PANEL ================= */}

                <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">
                    <div className="w-full max-w-[305px]">
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}


const Feature = ({ children }) => {
    return (
        <div className="flex items-center gap-3 text-sm">

            <span className="w-5 h-5 rounded-full border border-[#6B452A] flex items-center justify-center text-xs">
                ✓
            </span>

            <span>{children}</span>

        </div>
    );
}

export default AuthLayout;
