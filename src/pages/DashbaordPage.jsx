import {
  Package,
  LogOut,
  Scan,
  CreditCard,
  ArrowBigDownIcon,
  ArrowDown01,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Scanner from "../components/Scanner/Scanner";
import { useGetUserDetailQuery } from "../store/services/getUserDetail";
import HistoryList from "../components/HistoryList/History";

const bannerSlides = [
  {
    id: 1,
    title: "Welcome Back 👋",
    subtitle: "Check your rewards and scanned history here",
    bg: "from-blue-500 to-indigo-600",
  },
  {
    id: 2,
    title: "Earn Cashback 💰",
    subtitle: "Scan payment QR to win exciting rewards",
    bg: "from-green-500 to-teal-600",
  },
  {
    id: 3,
    title: "Track Products 📦",
    subtitle: "Easily scan and manage your product history",
    bg: "from-purple-500 to-pink-600",
  },
];

const DashbaordPage = ({ user, onLogout }) => {
  const [showScanner, setShowScanner] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [userData, setUserData] = useState([]);
  const [history, setHistory] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Check if user token exists
  const userToken = JSON.parse(localStorage.getItem("userToken") || "null");

  const { data, error, isLoading, isSuccess, isError, refetch } =
    useGetUserDetailQuery(undefined, {
      skip: !userToken, // Skip query if no token
      refetchOnMountOrArgChange: true, // Refetch when component mounts
    });

  useEffect(() => {
    getUserData();
    const savedHistory =
      JSON.parse(localStorage.getItem("distributorHistory")) || [];
    setHistory(savedHistory);
  }, [data, isLoading, isSuccess]);

  const getUserData = async () => {
    try {
      if (data?.success) {
        setUserData(data.result);
        localStorage.setItem("mobileNo", data.result.mobileNo);
      }
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  // 🔹 Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 3000); // change every 3 sec
    return () => clearInterval(interval);
  }, []);

  const handleScan = (scannedData) => {
    const newEntry = {
      ...scannedData,
      timestamp: new Date().toLocaleString(),
    };
    const newHistory = [newEntry, ...history];
    setHistory(newHistory);
    localStorage.setItem("distributorHistory", JSON.stringify(newHistory));
    setShowScanner(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            {userData.influencerType === "Retailer" ? (
              <CreditCard className="w-8 h-8 text-green-500 mr-3" />
            ) : (
              <Package className="w-8 h-8 text-blue-500 mr-3" />
            )}
            <div>
              <h1 className="text-xl text-gray-600 font-semibold">
                {userData.name}{" "}
                <p className="text-sm text-gray-600">{userData.uniqueId}</p>
              </h1>
              <p className="text-sm text-gray-600">+91 {userData.mobileNo}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center text-red-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2 text-red-600" />
            Logout
          </button>
        </div>
      </header>
      {/* 🔹 Banner Carousel */}
      <div className="relative h-28 overflow-hidden mt-4">
        <AnimatePresence>
          <motion.div
            key={bannerSlides[currentSlide].id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.6 }}
            className={`absolute inset-0 flex flex-col items-center justify-center rounded-2xl ml-4 mr-4 text-white bg-gradient-to-r ${bannerSlides[currentSlide].bg}`}
          >
            <h1 className="text-lg font-bold">
              {bannerSlides[currentSlide].title}
            </h1>
            <p className="text-sm">{bannerSlides[currentSlide].subtitle}</p>
          </motion.div>
        </AnimatePresence>

        {/* Dots Indicator */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
          {bannerSlides.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-6 w-full flex flex-col">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-600">
            Quick Actions
          </h2>
          <button
            onClick={() => setShowScanner(true)}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 px-6 rounded-lg flex items-center justify-center text-lg"
          >
            <Scan className="w-6 h-6 mr-3" />
            {userData.influencerType === "Retailer"
              ? "Scan Payment QR"
              : "Scan Product QR"}
          </button>
        </div>

        {/* History Section with Scroll */}
        <div
          className={`bg-white rounded-lg shadow-sm p-6  flex-col ${
            showHistory ? "flex-1 flex" : ""
          }`}
        >
          <div >
            <div className="flex flex-row justify-between items-center ">
              <h2 className="text-lg font-semibold text-gray-600">
                {userData.influencerType === "Retailer"
                  ? "Cash Reward History"
                  : "Scanned Products"}
              </h2>
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="flex p-2 bg-blue-800 rounded-2xl"
              >
                  <span className=" text-blue-800  ml-2 px-2 mr-2 rounded-full bg-blue-200 inline-block">
                  {userData.totalScan}
                </span>{" "}
                View All{" "}
              
                {showHistory ? (
                  <ChevronUp className="w-6 h-6" />
                ) : (
                  <ChevronDown className="w-6 h-6" />
                )}
              </button>
            </div>
            {userData.influencerType === "Retailer" &&
            <span className="mt-4 text-green-800 font-extrabold text-2xl px-4 py-2 rounded-full bg-green-100 inline-block">
              Rs: ₹ {userData.totalEarnings}
            </span>
            }
          </div>

          {/* 🔹 Scrollable History Only */}
          {showHistory && (
            <div className="overflow-y-auto flex-1 max-h-[400px] pr-2">
              <HistoryList show={showHistory} />
            </div>
          )}
        </div>
      </main>

      {/* Scanner Modal */}
      {showScanner && (
        <Scanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
          role={userData.influencerType}
        />
      )}
    </div>
  );
};

export default DashbaordPage;
