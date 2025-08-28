const RetailerHomePage = ({ user, onLogout }) => {
  const [showScanner, setShowScanner] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [upiId, setUpiId] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('retailerHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  const handleScan = (data) => {
    setScannedData(data);
    setShowScanner(false);
    setShowPaymentForm(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    if (!upiId.trim()) return;

    const newEntry = {
      ...scannedData,
      upiId,
      timestamp: new Date().toLocaleString()
    };

    const newHistory = [newEntry, ...history];
    setHistory(newHistory);
    localStorage.setItem('retailerHistory', JSON.stringify(newHistory));

    setShowPaymentForm(false);
    setShowConfetti(true);
    setUpiId('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="w-8 h-8 text-green-500 mr-3" />
            <div>
              <h1 className="text-xl font-semibold">Retailer Portal</h1>
              <p className="text-sm text-gray-600">+91 {user.mobile}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <div className="grid gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Payment Scanner</h2>
            <button
              onClick={() => setShowScanner(true)}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-4 px-6 rounded-lg flex items-center justify-center text-lg"
            >
              <Scan className="w-6 h-6 mr-3" />
              Scan Payment QR
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Payment Ledger</h2>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {history.length} payments
              </span>
            </div>
            <HistoryList entries={history} type="payment" />
          </div>
        </div>
      </main>

      {showScanner && (
        <Scanner
          onScan={handleScan}
          onClose={() => setShowScanner(false)}
          role="retailer"
        />
      )}

      {showPaymentForm && scannedData && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
            
            <div className="bg-gray-50 rounded-lg p-4 mb-4">
              <div className="space-y-2">
                <div>
                  <span className="text-gray-600">Product:</span>
                  <p className="font-medium">{scannedData.productName}</p>
                </div>
                <div>
                  <span className="text-gray-600">Amount:</span>
                  <p className="font-medium text-green-600">₹{scannedData.amount}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your UPI ID
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="example@paytm"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowPaymentForm(false)}
                  className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePaymentSubmit}
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-4 rounded-lg"
                >
                  Receive Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Confetti 
        show={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
    </div>
  );
};
export default RetailerHomePage