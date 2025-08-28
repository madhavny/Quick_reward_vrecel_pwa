import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
export default function PaymentProcess() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(true);
  const [statusMessage, setStatusMessage] = useState(
    'Click "Proceed" to start payment.'
  );

  useEffect(() => {
    if (isProcessing) {
      if (step === 1) {
        setStatusMessage("Verifying UPI ID...");
        const timer = setTimeout(() => {
          setStep(2);
        }, 2000); 
        return () => clearTimeout(timer);
      } else if (step === 2) {
        setStatusMessage("Processing Payment...");
        const timer = setTimeout(() => {
          setStep(3);
        }, 2000); 
        return () => clearTimeout(timer);
      } else if (step === 3) {
        setStatusMessage("Payment Successful!");
        setIsProcessing(false);
        setTimeout(() => {
          navigate("/dashboard", { replace: true })
        }, 2000); 
      }
    }
  }, [step, isProcessing]);

  const renderStepCircle = (stepNumber, currentStep) => {
    const isCompleted = currentStep >= stepNumber;
    const isActive = currentStep === stepNumber;
    return (
      <div
        className={`
          relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-white font-bold transition-colors duration-500 ease-in-out
          ${isCompleted ? "bg-indigo-600" : "bg-gray-400"}
        `}
      >
        {isCompleted ? (
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          stepNumber
        )}
      </div>
    );
  };

  const getProgressBarWidth = () => {
    switch (step) {
      case 1:
        return "w-0";
      case 2:
        return "w-1/2";
      case 3:
        return "w-full";
      default:
        return "w-0";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gray-100 p-4"   style={{
        backgroundImage: "url('/financial-pattern.png')",
        backgroundRepeat: "repeat",
      }}>
      <div className="w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Secure Payment
        </h1>

        <div className="relative flex items-center justify-between mx-auto max-w-md mb-8">
          <div className="absolute top-1/2 left-0 w-full h-2 bg-gray-200 rounded-full -translate-y-1/2 z-0"></div>
          <div
            className={`absolute top-1/2 left-0 h-2 bg-indigo-600 rounded-full -translate-y-1/2 z-0 transition-all duration-1000 ease-in-out ${getProgressBarWidth()}`}
          ></div>

          {renderStepCircle(1, step)}
          {renderStepCircle(2, step)}
          {renderStepCircle(3, step)}
        </div>
        <div className="text-center">
          <AnimatePresence mode="wait">
            <motion.p
              key={statusMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-medium text-gray-600"
            >
              {statusMessage}
            </motion.p>
          </AnimatePresence>
        </div>


      </div>
    </div>
  );
}
