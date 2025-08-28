import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormInput } from "../components/FormInput";
import { FormSubmitButton } from "../components/FormSubmitButton";
import { ArrowLeftIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  usePincodeDetailsMutation,
  useRegisterUserMutation,
} from "../store/services/auth/authApi";
import { useEffect } from "react";
import { showToast } from "../components/Toast/showToast";

const schema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("First name is required"),
  mobile: yup
    .string()
    .matches(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number")
    .required("Mobile number is required"),
});

export default function Registration({ onLogin }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { userMobile } = location.state || {};

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      contact_person: "",
      mobile: "",
      pincode: "",
      district: "",
      state: "",
      city: "",
      address: "",
    },
  });
  const [registerUser, { isLoading, isSuccess, isError, error }] =
    useRegisterUserMutation();
  const [
    getPincode,
    {
      isLoading: otpLoading,
      isSuccess: otpSuccess,
      isError: otpErrorStatus,
      error: otpError,
    },
  ] = usePincodeDetailsMutation();
  useEffect(() => {
    if (userMobile) {
      setValue("mobile", userMobile, { shouldValidate: true });
    }
  }, [userMobile, setValue]);

  const onSubmit = async (formData) => {
    try {
      try {
        const response = await registerUser({ basicInfo: formData }).unwrap();
        localStorage.setItem("userToken", JSON.stringify(response.token));
        onLogin(response.token);
        showToast("success", "Success", response.message);
        navigate("/dashboard");
      } catch (err) {
        showToast("error", "Error", response.message);
      }
    } catch (error) {
      showToast("error", "Error", "Error submitting form. Please try again.");
    }
  };

  const getPincodeData = async (value) => {
    try {
      const response = await getPincode({ pincode: value }).unwrap();

      // Assuming API returns in "result" object like you shared above
      const result = response?.result;
      if (result) {
        reset(
          {
            state: result.stateName || "",
            district: result.districtName || "",
            city: result.city || "",
          },
          {
            keepDirty: true,
            keepTouched: true,
          }
        );
      }
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-white from-blue-50 to-indigo-100  p-4">
      <button onClick={() => navigate(-1)} className="text-black mb-4 flex ">
        <ArrowLeftIcon /> Register yourself
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="border border-section-background p-6 rounded-lg">
          <div className="grid grid-cols-1 gap-4">
            <FormInput
              label="Firm Name"
              name="name"
              register={register}
              error={errors.firstName}
              required
            />
            <FormInput
              label="Contact Person"
              name="contact_person"
              register={register}
              error={errors.contact_person}
              required
            />
            <FormInput
              label="Mobile Number"
              name="mobile"
              register={register}
              error={errors.mobile}
              disabled={true}
              type="tel"
              required
            />
            <FormInput
              label="Pincode"
              name="pincode"
              register={register}
              error={errors.pincode}
              type="tel"
              required
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, "").slice(0, 6);
                if (value.length === 6) {
                  getPincodeData(value);
                }
              }}
            />
            <FormInput
              label="State"
              name="state"
              register={register}
              error={errors.state}
              disabled={true}
              required
            />
            <FormInput
              label="District"
              name="district"
              register={register}
              error={errors.district}
              disabled={true}
              required
            />
            <FormInput
              label="City"
              name="city"
              register={register}
              error={errors.city}
              required
            />
            <FormInput
              label="Address"
              name="address"
              register={register}
              error={errors.address}
              required
            />
            <FormSubmitButton
              isLoading={isSubmitting}
              variant="primary"
              size="sm"
              className="w-40"
            >
              {"Save Changes"}
            </FormSubmitButton>
          </div>
        </div>
      </form>
    </div>
  );
}
