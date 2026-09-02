import { Camera } from "lucide-react";


const PetPhotoForm = ({
  preview,
  onPhotoChange,
}) => {

  return (
    <div>

      <h2
        className="
          text-xl
          sm:text-2xl

          font-semibold

          text-[#292421]
        "
      >
        Profile Photo
      </h2>


      <p
        className="
          mt-2

          text-sm

          text-[#776B64]
        "
      >
        Add a profile photo for your pet.
      </p>


      <label
        className="
          group

          mt-6

          min-h-[250px]

          rounded-[24px]

          border
          border-dashed
          border-[#D8C9BE]

          bg-[#FCFAF9]

          flex
          flex-col
          items-center
          justify-center

          px-6

          text-center

          cursor-pointer

          transition-all
          duration-200

          hover:bg-[#FBF5F0]
          hover:border-[#EBB183]
        "
      >

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/gif"
          onChange={onPhotoChange}
          className="hidden"
        />


        {preview ? (

          <div className="flex flex-col items-center">

            <img
              src={preview}
              alt="Pet preview"
              className="
                w-36
                h-36

                rounded-full

                object-cover

                border-4
                border-white

                shadow-md
              "
            />


            <p
              className="
                mt-4

                text-sm
                font-medium

                text-[#8B572F]
              "
            >
              Click to change photo
            </p>

          </div>

        ) : (

          <>

            <div
              className="
                w-14
                h-14

                rounded-full

                bg-[#EBB183]

                flex
                items-center
                justify-center

                text-[#704728]

                transition-all

                group-hover:scale-105
              "
            >
              <Camera size={24} />
            </div>


            <p
              className="
                mt-5

                text-sm
                font-medium

                text-[#4D423B]
              "
            >
              Click to upload or drag and drop
            </p>


            <p
              className="
                mt-1

                text-xs

                text-[#8B7E77]
              "
            >
              SVG, PNG, JPG or GIF
              <br />
              (max. 800x400px)
            </p>

          </>

        )}

      </label>

    </div>
  );
};


export default PetPhotoForm;