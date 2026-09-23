const AuthTabs = ({userType, setUserType, authMode, setAuthMode}) => {
  return (
    <div>

      {/* ================= USER TYPE ================= */}

      <div className="flex flex-col items-center">

        <p className="text-[10px] text-gray-500 mb-1">
          I am a...
        </p>

        <div className="flex items-center w-[176px] h-[29px] p-1 rounded-full bg-vet-background-soft">

          {/* Pet Owner */}

          <button
            type="button"
            onClick={() => setUserType("petOwner")}
            className={`
              flex-1
              h-full
              rounded-full
              text-[11px]
              transition-all
              duration-200
              ${
                userType === "petOwner"
                  ? "bg-white shadow-sm font-semibold text-dark"
                  : "text-text-dark"
              }
            `}
          >
            Pet Owner
          </button>


          {/* Doctor */}

          <button
            type="button"
            onClick={() => setUserType("doctor")}
            className={`
              flex-1
              h-full
              rounded-full
              text-[11px]
              transition-all
              duration-200
              ${
                userType === "doctor"
                  ? "bg-white shadow-sm font-semibold text-dark"
                  : "text-text-dark"
              }
            `}
          >
            Doctor
          </button>

        </div>

      </div>


      {/* ================= SIGN IN / REGISTER ================= */}

      <div className="mt-5 flex items-center h-[58px] p-1 rounded-full bg-vet-background-soft">

        {/* Sign In */}

        <button
          type="button"
          onClick={() => setAuthMode("signin")}
          className={`
            flex-1
            h-full
            rounded-full
            text-sm
            transition-all
            duration-200
            ${
              authMode === "signin"
                ? "bg-white shadow-sm font-semibold text-dark"
                : "text-text-dark"
            }
          `}
        >
          Sign In
        </button>


        {/* Register */}

        <button
          type="button"
          onClick={() => setAuthMode("register")}
          className={`
            flex-1
            h-full
            rounded-full
            text-sm
            transition-all
            duration-200
            ${
              authMode === "register"
                ? "bg-white shadow-sm font-semibold text-text-dark"
                : "text-text-dark"
            }
          `}
        >
          Register
        </button>
      </div>

    </div>
  );
}

export default AuthTabs;