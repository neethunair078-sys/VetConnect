const HealthIntelligence = ({
  updates,
}) => {
  return (
    <section>

      <h2 className="
        text-[18px]
        sm:text-[20px]
        font-semibold
        text-[#292421]
        mb-4
      ">
        Health Intelligence
      </h2>


      <div className="relative pl-5">

        {/* Timeline */}

        <div
          className="
            absolute
            left-[3px]
            top-2
            bottom-2
            w-px
            bg-[#E5DDD8]
          "
        />


        <div className="space-y-5">

          {updates.map((update) => (
            <div
              key={update.id}
              className="relative"
            >

              <span
                className="
                  absolute
                  -left-[21px]
                  top-1
                  w-[7px]
                  h-[7px]
                  rounded-full
                  bg-[#EBB183]
                  ring-4
                  ring-[#F9F5F0]
                "
              />


              <p className="
                text-[7px]
                text-[#81756E]
                mb-1
              ">
                {update.date}
              </p>


              <div
                className="
                  bg-white
                  rounded-[14px]
                  px-3
                  py-2.5
                  shadow-[0_6px_20px_rgba(70,45,30,0.04)]
                "
              >

                <p className="
                  text-[8px]
                  sm:text-[9px]
                  leading-4
                  text-[#554A44]
                ">
                  {update.message}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
};

export default HealthIntelligence;