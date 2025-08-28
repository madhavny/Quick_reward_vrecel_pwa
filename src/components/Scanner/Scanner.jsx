import React, { useEffect, useState } from "react";
import { X, Camera, Loader2, CheckCircle2, ScanQrCodeIcon,RectangleEllipsis } from "lucide-react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import { useGetCuponDataMutation } from "../../store/services/getCuponCodeDetail";
import { CustomAlert } from "../AlertComponent";
import { showToast } from "../Toast/showToast";
import { useNavigate } from "react-router-dom";
import { useCouponCodeScanMutation } from "../../store/services/couponCodeScan";
const Scanner = ({ onClose,role }) => {
  const navigate = useNavigate();
  const [upiId, setUpiId] = useState("");
  const [data, setData] = useState(null);
  const [facingMode, setFacingMode] = useState("environment"); // start with back camera
  const [alertData, setAlertData] = useState(null);
  const [
    getCuponCode,
    {
      isLoading: detailLoading,
      isSuccess: detailIsSuccess,
      isError: detailIsError,
      error: detailLoadingError,
    },
  ] = useGetCuponDataMutation();
  const [scanCouponCode, { isLoading, isSuccess, isError, error }] =
    useCouponCodeScanMutation();
  const getCouponData = async (result) => {
    try {
      const response = await getCuponCode({ couponCode: result }).unwrap();
      if (response.success == true) {
        showToast("success", "Success", response.message);
        setData(response);
      } else {
        showToast("warning", "Alert !", response.message);
      }
    } catch (err) {
      showToast("success", "Error", "Error submitting form. Please try again.");
    }
  };
  const couponCodeScan = async (result) => {
    try {
      const response = await scanCouponCode({ couponCode: result }).unwrap();
      if (response.success == true) {
        showToast("success", "Success", response.message);
        setData(response.result);
      } else {
        showToast("warning", "Alert !", response.message);
      }
    } catch (err) {
      showToast("success", "Error", "Error submitting form. Please try again.");
    }
  };
  useEffect(() => {
    if (data != null && role== 'Retailer' ) {
      const mobileNo = localStorage.getItem("mobileNo");
      setTimeout(() => {
        setUpiId(mobileNo + "@ybl");
      }, 2000);
    }else if(data){
      onClose()
    }
  }, [data]);
  const processPayement = () => {
    couponCodeScan(data.couponCode);
    onClose();
    navigate("/paymentProcess");
  };
  return (
  <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
  <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl transform scale-100 animate-in slide-in-from-bottom-4 duration-300">
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
            <ScanQrCodeIcon />
          </div>
          <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            QR Scanner
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 p-2 rounded-full group"
        >
          <X className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
        </button>
      </div>

      {/* Scanner / Result */}
      {!data ? (
        <div className=" bg-blue-900 from-slate-900 rounded-3xl overflow-hidden  shadow-2xl">
          {/* Scanner Container with Enhanced Corner Borders */}
          <div className="relative p-2">
            <div className="relative bg-black rounded-2xl h-full overflow-hidden">
              <BarcodeScannerComponent
               className="w-full h-full"
                facingMode={facingMode}
                onUpdate={(err, result) => {
                  if (result) {
                    getCouponData(result.text);
                  }
                }}
              />

              {/* Enhanced Animated Corner Borders Overlay */}
              <div className="absolute inset-0 pointer-events-none">
               

                {/* Enhanced scanning line animation */}
                <div className="absolute inset-x-0 top-1/2 transform -translate-y-1/2">
                  <div className="h-0.5 bg-gradient-to-r from-transparent via-red-500 to-transparent animate-pulse opacity-90 shadow-lg shadow-red-500/50">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-red-400 to-transparent animate-pulse"></div>
                  </div>
                </div>

                {/* Center crosshair */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-2 border-white/30 rounded-lg animate-ping"></div>
              </div>
            </div>

            {/* Enhanced Instructions */}
            <div className="mt-6 text-center space-y-2">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <p className="text-white text-sm font-semibold">
                  Position QR code within the frame
                </p>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-gray-300 text-xs">
                Keep steady for optimal scanning results
              </p>
            </div>
          </div>
        </div>
      ) : (
       ( role == "Retailer" &&
        <>
          <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 border-2 border-emerald-200 p-4 rounded-3xl mb-6 shadow-xl relative overflow-hidden">
          
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600"></div>
            </div>
            
            <div className="relative flex items-start space-x-2">
    
              <div className="flex-1">
                <h4 className="font-bold text-green-800 text-xl mb-4 flex items-center">
                  Scan Successful!
                 
                </h4>

                <div className="space-y-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-green-200/50 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                  
                      <p className="text-sm text-green-700 font-semibold">Coupon Details</p>
                    </div>
                    <p className="text-gray-800 font-bold text-lg break-words bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text ml-4">
                      {data?.prodName || "N/A"}
                    </p>
                    <p className="text-gray-500  break-words bg-clip-text ml-4">
                     {'Coupon code - '} {data?.couponCode || "N/A"}
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-green-200/50 shadow-sm">
                    <div className="flex items-center space-x-2 mb-2">
                     
                      <p className="text-sm text-green-700 font-semibold">Cash Reward</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      <p className="text-xl font-black text-green-700 bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text ml-4">
                        ₹{data?.couponPoint || "0"}
                      </p>
                   
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

  
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-200 p-6 shadow-xl">
            <label className="text-sm font-bold text-gray-700 mb-4 flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <RectangleEllipsis className="text-white" />
              </div>
              UPI ID 
            </label>

            <div className="relative">
              <input
                type="text"
                value={upiId}
                disabled={true}
                onChange={(e) => setUpiId(e.target.value)}
                placeholder="example@upi"
                className={`w-full border-2 text-gray-800 rounded-2xl px-5 py-4 pr-14 font-semibold text-lg focus:outline-none focus:ring-4 transition-all duration-300 shadow-inner ${
                  upiId
                    ? "border-green-400 bg-green-50 focus:ring-green-200 focus:border-green-500 shadow-green-100"
                    : "border-gray-300 bg-gray-50 focus:ring-blue-200 focus:border-blue-400"
                }`}
              />

           
              {upiId && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              )}

     
              {!upiId && (
                <div className="flex items-center mt-4 text-sm text-blue-700 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-200 shadow-inner">
                  <Loader2 className="animate-spin mr-3 w-6 h-6 text-blue-600" />
                  <span className="font-semibold flex-1">
                    Fetching your UPI ID...
                  </span>
                  <div className="flex space-x-1">
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-sm"></div>
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce shadow-sm" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
       )
      )}


      <div className="space-y-4 mt-6">
    
        {upiId && (
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              onClick={() => processPayement()}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-4 px-6 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center group"
            >
              <span>Proceed</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  </div>
</div>
  );
};

export default Scanner;
