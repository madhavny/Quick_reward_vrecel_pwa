import { useState } from "react";
import { Scan } from "lucide-react";
import {
  useSendOTPMutation,
  useVerifyOTPMutation,
} from "../store/services/auth/authApi";
import { useNavigate } from "react-router-dom";
import { showToast } from "../components/Toast/showToast";
const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile"); // mobile, otp
  const [loading, setLoading] = useState(false);

  const [
    sendOTP,
    {
      isLoading: otpLoading,
      isSuccess: otpSuccess,
      isError: otpErrorStatus,
      error: otpError,
    },
  ] = useSendOTPMutation();
  const [verifyOtp, { isLoading, isSuccess, isError, error }] =
    useVerifyOTPMutation();

  const handleSendOTP = async (e) => {
    if (mobile.length !== 10) return;
    setLoading(true);

    try {
      const response = await sendOTP({ phone: mobile }).unwrap();
      if (response.success == true) {
        setStep("otp");
        showToast("success", "Success", response.message);
        setLoading(otpLoading);
      } else {
        setLoading(otpLoading);
        showToast("error", "Something went wrong", response.message);
      }
    } catch (err) {
      showToast("error", "Error", "Error submitting form. Please try again.");
      setLoading(otpLoading);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (otp !== "123456") {
      alert("Invalid otp ");
      return;
    }

    setLoading(true);
    try {
      const response = await verifyOtp({ phone: mobile, otp: otp }).unwrap();
      if (response.success == true) {
        if (response.token) {
          localStorage.setItem("userToken", JSON.stringify(response.token));
          onLogin(response.token);
          navigate("/dashboard", { replace: true });
        } else {
          navigate(
            "/registration",
            { replace: true },
            { state: { userMobile: mobile } }
          );
        }
        setLoading(isLoading);
        showToast("success", "Success", response.message);
      } else {
        setLoading(isLoading);
        showToast("error", "Something went wrong", response.message);
      }
    } catch (err) {
      setLoading(isLoading);
      showToast("success", "Error", "Error submitting form. Please try again.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4 relative"
      style={{
        backgroundImage: "url('/financial-pattern.png')",
        backgroundRepeat: "repeat",
      }}
    >
      {/* <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4"> */}
      <div className="bg-white rounded-lg shadow-xl  w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Scan className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Quick Rewards</h1>
        </div>

        {step === "mobile" ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mobile Number
              </label>
              <input
                type="tel"
                value={mobile}
                onChange={(e) =>
                  setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                }
                placeholder="Enter 10-digit mobile number"
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <button
              onClick={handleSendOTP}
              disabled={mobile.length !== 10 || loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg transition-colors"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600">OTP sent to +91 {mobile}</p>
              <button
                type="button"
                onClick={() => setStep("mobile")}
                className="text-blue-500 text-sm hover:underline"
              >
                Change number
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter OTP
              </label>
              <input
                type="text"
                value={otp}
                onChange={(e) =>
                  setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                placeholder="Enter 6-digit OTP (123456)"
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Use OTP: 12346 for demo
              </p>
            </div>

            <button
              onClick={handleVerifyOTP}
              disabled={otp.length !== 6 || loading}
              className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white py-3 px-4 rounded-lg transition-colors"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}
      </div>
      {/* </div> */}
    </div>
  );
};

export default LoginPage;
