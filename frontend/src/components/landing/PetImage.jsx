
import "../../css/landing.css"
import vetDog from "../../assets/vet-dog.jpeg";
import sleepingDog from "../../assets/sleeping-dog.jpeg";
import cat from "../../assets/cat.jpeg";

const PetImage = () => {
  return (
    <div className="relative w-full max-w-[620px] mx-auto">

      <div className="relative aspect-square w-full">

        {/* Main image */}
        <div
          className="
            absolute
            w-[68%]
            aspect-square
            top-[4%]
            left-[18%]
            rounded-full
            overflow-hidden
            border-4
            sm:border-[6px]
            border-white
            shadow-xl
            animate-float-main
            z-10
          "
        >
          <img
            src={vetDog}
            alt="Veterinarian with dog"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Sleeping dog */}
        <div
          className="
            absolute
            w-[36%]
            aspect-square
            bottom-[35%]
            left-[2%]
            rounded-full
            overflow-hidden
            border-4
            sm:border-[6px]
            border-white
            shadow-xl
            animate-float-left
            z-20
          "
        >
          <img
            src={sleepingDog}
            alt="Sleeping dog"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cat */}
        <div
          className="
            absolute
            w-[29%]
            aspect-square
            bottom-[20%]
            right-[2%]
            rounded-full
            overflow-hidden
            border-4
            sm:border-[6px]
            border-white
            shadow-xl
            animate-float-right
            z-20
          "
        >
          <img
            src={cat}
            alt="Cat"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Medical icon */}
        <div
          className="
            absolute
            w-[10%]
            aspect-square
            top-[2%]
            right-[22%]
            rounded-full
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-[10px]
            sm:text-xl
            z-30
            animate-float-icon
          "
        >
          🩺
        </div>

        {/* Paw */}
        <div
          className="
            absolute
            w-[9%]
            aspect-square
            top-[10%]
            right-[4%]
            rounded-full
            bg-white
            shadow-md
            flex
            items-center
            justify-center
            text-[9px]
            sm:text-lg
            z-30
            animate-float-icon
          "
        >
          🐾
        </div>

      </div>
    </div>
  );
}

export default PetImage;