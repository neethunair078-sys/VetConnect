import { useEffect, useState } from "react";
import { Camera, Save } from "lucide-react";
import toast from "react-hot-toast";

import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const DoctorProfileForm = ({ mode = "complete", onSuccess }) => {
  const isCompleteMode = mode === "complete";
  const { updateUser } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    profile_image: null,

    license_number: "",
    specialization: "",

    qualification: "",
    years_of_experience: "",
    // clinic_name: "",
    // clinic_address: "",
    consultation_fee: "",
    bio: "",
    // consultation_mode: "",
    languages: [],
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  // ==========================================
  // FETCH PROFILE
  // ==========================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get("/doctors/profile/");

        const data = response.data;

        setProfile({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
          phone: data.phone || "",
          profile_image: data.profile_image || null,

          license_number: data.license_number || "",
          specialization: data.specialization || "",

          qualification: data.qualification || "",
          years_of_experience: data.years_of_experience ?? "",
          //   clinic_name: data.clinic_name || "",
          //   clinic_address: data.clinic_address || "",
          consultation_fee: data.consultation_fee ?? "",
          bio: data.bio || "",
          //   consultation_mode: data.consultation_mode || "",
          languages: data.languages || [],
        });

        if (data.profile_image) {
          setImagePreview(
            data.profile_image.startsWith("http")
              ? data.profile_image
              : `${import.meta.env.VITE_MEDIA_BASE_URL}${data.profile_image}`,
          );
        }
      } catch (error) {
        console.error(
          "Failed to load doctor profile:",
          error.response?.data || error.message,
        );

        toast.error("Unable to load your profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ==========================================
  // HANDLE INPUT
  // ==========================================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // HANDLE IMAGE
  // ==========================================

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setSelectedImage(file);

    setImagePreview(URL.createObjectURL(file));
  };

  // ==========================================
  // HANDLE LANGUAGES
  // ==========================================

  const handleLanguagesChange = (event) => {
    const value = event.target.value;

    const languages = value
      .split(",")
      .map((language) => language.trim())
      .filter(Boolean);

    setProfile((previous) => ({
      ...previous,
      languages,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("first_name", profile.first_name);
      formData.append("last_name", profile.last_name);
      formData.append("phone", profile.phone);

      formData.append("qualification", profile.qualification);

      formData.append("years_of_experience", profile.years_of_experience);

      //   formData.append("clinic_name", profile.clinic_name);

      //   formData.append("clinic_address", profile.clinic_address);

      formData.append("consultation_fee", profile.consultation_fee);

      formData.append("bio", profile.bio);

      //   formData.append("consultation_mode", profile.consultation_mode);

      formData.append("languages", JSON.stringify(profile.languages));

      if (selectedImage) {
        formData.append("profile_image", selectedImage);
      }

      const response = await api.patch("/doctors/profile/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const updatedProfile = response.data;

      const userData = {
        fullName: [updatedProfile.first_name, updatedProfile.last_name]
          .filter(Boolean)
          .join(" "),

        phone: updatedProfile.phone,

        doctorProfile: {
          approvalStatus: updatedProfile.approval_status,
          isProfileComplete: updatedProfile.is_profile_complete,
        },
      };

      if (updatedProfile.profile_image) {
        userData.profileImage = updatedProfile.profile_image;
      }

      updateUser(userData);

      toast.success(
        isCompleteMode
          ? "Profile completed successfully!"
          : "Profile updated successfully!",
      );

      if (onSuccess) {
        onSuccess(response.data);
      }
    } catch (error) {
      console.error(
        "Failed to save doctor profile:",
        error.response?.data || error.message,
      );

      const errorData = error.response?.data;

      if (errorData && typeof errorData === "object") {
        const firstError = Object.values(errorData)[0];

        if (Array.isArray(firstError)) {
          toast.error(firstError[0]);
        } else {
          toast.error(String(firstError));
        }
      } else {
        toast.error("Unable to save your profile.");
      }
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="py-12 text-center text-sm text-vet-text-secondary">
        Loading your profile...
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* ======================================
          PROFILE PHOTO
      ====================================== */}

      <section className="rounded-[26px] bg-white border border-vet-border p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-5">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-[#F3EEEA] border-4 border-[#FBF7F4]">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Doctor profile"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[#8B572F]">
                  <Camera size={28} />
                </div>
              )}
            </div>

            <label
              htmlFor="profile-image"
              className="
                absolute
                bottom-0
                right-0
                w-8
                h-8
                rounded-full
                bg-vet-primary-dark
                text-white
                flex
                items-center
                justify-center
                cursor-pointer
                hover:bg-vet-primary-dark-hover
                transition
              "
            >
              <Camera size={15} />

              <input
                id="profile-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="text-center sm:text-left">
            <h2 className="text-lg font-semibold text-vet-text-primary">
              Profile Photo
            </h2>

            <p className="mt-1 text-sm text-vet-text-secondary">
              Upload a professional photo for your doctor profile.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================
          PERSONAL INFORMATION
      ====================================== */}

      <section className="rounded-[26px] bg-white border border-vet-border p-6 sm:p-8">
        <SectionHeading title="Personal Information" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="First Name"
            name="first_name"
            value={profile.first_name}
            onChange={handleChange}
            required
          />

          <InputField
            label="Last Name"
            name="last_name"
            value={profile.last_name}
            onChange={handleChange}
            required
          />

          <InputField
            label="Email"
            name="email"
            value={profile.email}
            disabled
          />

          <InputField
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            required
          />
        </div>
      </section>

      {/* ======================================
          PROFESSIONAL INFORMATION
      ====================================== */}

      <section className="rounded-[26px] bg-white border border-vet-border p-6 sm:p-8">
        <SectionHeading title="Professional Information" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="License Number"
            name="license_number"
            value={profile.license_number}
            disabled
          />

          <InputField
            label="Specialization"
            name="specialization"
            value={profile.specialization}
            disabled
          />

          <InputField
            label="Qualification"
            name="qualification"
            value={profile.qualification}
            onChange={handleChange}
            required
          />

          <InputField
            label="Years of Experience"
            name="years_of_experience"
            type="number"
            min="0"
            value={profile.years_of_experience}
            onChange={handleChange}
            required
          />
        </div>
      </section>

      {/* ======================================
          CLINIC INFORMATION
      ====================================== */}

      {/* <section className="rounded-[26px] bg-white border border-vet-border p-6 sm:p-8">
        <SectionHeading title="Clinic Information" />

        <div className="space-y-5">
          <InputField
            label="Clinic / Hospital Name"
            name="clinic_name"
            value={profile.clinic_name}
            onChange={handleChange}
            required
          />

          <div>
            <label className="block text-sm font-medium text-[#4C423C] mb-2">
              Clinic Address
            </label>

            <textarea
              name="clinic_address"
              value={profile.clinic_address}
              onChange={handleChange}
              required
              rows={3}
              className="w-full rounded-2xl border border-[#E5DDD8] bg-[#FCFAF9] px-4 py-3 text-sm text-vet-text-primary outline-none focus:border-[#B98A68] resize-none"
            />
          </div>
        </div>
      </section> */}

      {/* ======================================
          CONSULTATION DETAILS
      ====================================== */}

      <section className="rounded-[26px] bg-white border border-vet-border p-6 sm:p-8">
        <SectionHeading title="Consultation Details" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <InputField
            label="Consultation Fee"
            name="consultation_fee"
            type="number"
            min="0"
            step="0.01"
            value={profile.consultation_fee}
            onChange={handleChange}
            required
          />

          {/* <div>
            <label className="block text-sm font-medium text-[#4C423C] mb-2">
              Consultation Mode
            </label>

            <select
              name="consultation_mode"
              value={profile.consultation_mode}
              onChange={handleChange}
              required
              className="w-full rounded-2xl border border-[#E5DDD8] bg-[#FCFAF9] px-4 py-3 text-sm text-vet-text-primary outline-none focus:border-[#B98A68]"
            >
              <option value="">Select consultation mode</option>

              <option value="ONLINE">Online</option>

              <option value="IN_PERSON">In-person</option>

              <option value="BOTH">Both</option>
            </select>
          </div> */}

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-[#4C423C] mb-2">
              Languages Spoken
            </label>

            <input
              type="text"
              value={profile.languages.join(", ")}
              onChange={handleLanguagesChange}
              placeholder="English, Malayalam, Hindi"
              required
              className="w-full rounded-2xl border border-[#E5DDD8] bg-[#FCFAF9] px-4 py-3 text-sm text-vet-text-primary outline-none focus:border-[#B98A68]"
            />

            <p className="mt-2 text-xs text-[#8B7E77]">
              Separate multiple languages with commas.
            </p>
          </div>
        </div>
      </section>

      {/* ======================================
          ABOUT
      ====================================== */}

      <section className="rounded-[26px] bg-white border border-vet-border p-6 sm:p-8">
        <SectionHeading title="About You" />

        <textarea
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Tell pet owners about your experience and approach to veterinary care..."
          className="w-full rounded-2xl border border-[#E5DDD8] bg-[#FCFAF9] px-4 py-3 text-sm text-vet-text-primary outline-none focus:border-[#B98A68] resize-none"
        />
      </section>

      {/* ======================================
          SAVE BUTTON
      ====================================== */}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-full
            bg-vet-primary-dark
            px-7
            py-3.5
            text-sm
            font-semibold
            text-white
            shadow-[0_8px_20px_rgba(139,87,47,0.18)]
            hover:bg-vet-primary-dark-hover
            disabled:opacity-60
            disabled:cursor-not-allowed
            transition
          "
        >
          <Save size={17} />

          {saving
            ? "Saving..."
            : isCompleteMode
              ? "Save & Continue"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
};

// =================================================
// SECTION HEADING
// =================================================

const SectionHeading = ({ title }) => {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-vet-text-primary">{title}</h2>
    </div>
  );
};

// =================================================
// INPUT FIELD
// =================================================

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  disabled = false,
  required = false,
  min,
  step,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-[#4C423C] mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        min={min}
        step={step}
        className={`
          w-full
          rounded-2xl
          border
          border-[#E5DDD8]
          px-4
          py-3
          text-sm
          outline-none
          transition

          ${
            disabled
              ? "bg-[#F3EEEA] text-[#8B7E77] cursor-not-allowed"
              : "bg-[#FCFAF9] text-vet-text-primary focus:border-[#B98A68]"
          }
        `}
      />
    </div>
  );
};

export default DoctorProfileForm;
