import Button from "../components/ui/Button";

const Theme = () => {
  return (
    <div className="min-h-screen bg-background-primary">

      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold text-text-primary">
            VetConnect Design System
          </h1>

          <p className="mt-2 text-text-secondary">
            UI components, colors, typography and design references.
          </p>
        </div>
      </div>


      <main className="max-w-7xl mx-auto px-6 py-12 space-y-16">

        {/* ================= COLORS ================= */}

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Colors
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <ColorCard
              name="Primary"
              color="#EBB183"
              className="bg-primary"
            />

            <ColorCard
              name="Secondary"
              color="#F9F5F0"
              className="bg-secondary"
            />

            <ColorCard
              name="Dark"
              color="#1A1A1A"
              className="bg-dark"
            />

            <ColorCard
              name="White"
              color="#FFFFFF"
              className="bg-white border"
            />

          </div>
        </section>


        {/* ================= TYPOGRAPHY ================= */}

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Typography
          </h2>

          <div className="bg-white rounded-2xl p-8 space-y-6">

            <div>
              <p className="text-sm text-text-secondary mb-2">
                Heading 1
              </p>

              <h1 className="text-5xl font-bold text-text-primary">
                Your Pet Care Center
              </h1>
            </div>


            <div>
              <p className="text-sm text-text-secondary mb-2">
                Heading 2
              </p>

              <h2 className="text-3xl font-bold text-text-primary">
                Quality Care For Your Pets
              </h2>
            </div>


            <div>
              <p className="text-sm text-text-secondary mb-2">
                Body
              </p>

              <p className="text-lg text-text-secondary leading-8">
                Connect with qualified veterinarians and get
                professional veterinary consultations online.
              </p>
            </div>


            <div>
              <p className="text-sm text-text-secondary mb-2">
                Small Text
              </p>

              <p className="text-sm text-text-secondary">
                This is an example of small supporting text.
              </p>
            </div>

          </div>
        </section>


        {/* ================= BUTTONS ================= */}

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Buttons
          </h2>

          <div className="bg-white rounded-2xl p-8">

            <div className="flex flex-wrap gap-4">

              <Button variant="primary">
                Primary Button
              </Button>

              <Button variant="secondary">
                Secondary Button
              </Button>

              <Button variant="dark">
                Dark Button
              </Button>

            </div>

          </div>
        </section>


        {/* ================= INPUTS ================= */}

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Form Elements
          </h2>

          <div className="bg-white rounded-2xl p-8 max-w-xl space-y-5">

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter your email"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                "
              />
            </div>


            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Password
              </label>

              <input
                type="password"
                placeholder="Enter your password"
                className="
                  w-full
                  px-4
                  py-3
                  rounded-xl
                  border
                  border-gray-200
                  outline-none
                  focus:border-primary
                  focus:ring-2
                  focus:ring-primary/20
                "
              />
            </div>

          </div>
        </section>


        {/* ================= CARDS ================= */}

        <section>
          <h2 className="text-2xl font-bold text-text-primary mb-6">
            Cards
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                🩺
              </div>

              <h3 className="mt-5 text-xl font-bold text-text-primary">
                24/7 Vet Access
              </h3>

              <p className="mt-2 text-text-secondary">
                Get access to qualified veterinarians whenever
                you need help.
              </p>
            </div>


            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                🐾
              </div>

              <h3 className="mt-5 text-xl font-bold text-text-primary">
                Pet Care
              </h3>

              <p className="mt-2 text-text-secondary">
                Personalized care recommendations for your pets.
              </p>
            </div>


            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
                ❤️
              </div>

              <h3 className="mt-5 text-xl font-bold text-text-primary">
                Trusted Care
              </h3>

              <p className="mt-2 text-text-secondary">
                Professional veterinary support you can trust.
              </p>
            </div>

          </div>
        </section>

      </main>

    </div>
  );
}


/* Color Card */

const ColorCard = ({ name, color, className }) => {
  return (
    <div>

      <div
        className={`h-32 rounded-2xl ${className}`}
      />

      <div className="mt-3">
        <p className="font-semibold text-text-primary">
          {name}
        </p>

        <p className="text-sm text-text-secondary">
          {color}
        </p>
      </div>

    </div>
  );
}

export default Theme;