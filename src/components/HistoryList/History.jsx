import React, { useEffect, useState } from "react";
import { History, CheckCircle } from "lucide-react";
import { useGetscanningHistoryQuery } from "../../store/services/getScanningHistory";
import moment from "moment";
const HistoryList = ({ show }) => {
  const [scanningkHistory, setScanningHistory] = useState([]);
  const { data, error, refetch, isLoading, isSuccess } =
    useGetscanningHistoryQuery({
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    refetch();
    getSacnningList();
  }, [data, isLoading, isSuccess, show]);
  const getSacnningList = async () => {
    try {
      if (data?.success) {
        setScanningHistory(data.result.couponScanList);
      }
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    // <div className="space-y-4 m-4 ">
    //   {entries.map((entry, index) => (
    //     <div key={index} className="bg-white rounded-lg shadow-sm border p-4">
    //       {type === 'scan' ? (
    //         <div>
    //           <div className="flex justify-between items-start mb-2">
    //             <h4 className="font-semibold text-gray-800">{entry.name}</h4>
    //             <span className="text-sm text-gray-500">{entry.timestamp}</span>
    //           </div>
    //           <div className="grid grid-cols-3 gap-4 text-sm">
    //             <div>
    //               <span className="text-gray-600">ID:</span>
    //               <p className="font-medium">{entry.id}</p>
    //             </div>
    //             <div>
    //               <span className="text-gray-600">Price:</span>
    //               <p className="font-medium">₹{entry.price}</p>
    //             </div>
    //             <div>
    //               <span className="text-gray-600">Qty:</span>
    //               <p className="font-medium">{entry.quantity}</p>
    //             </div>
    //           </div>
    //         </div>
    //       ) : (
    //         <div>
    //           <div className="flex justify-between items-start mb-2">
    //             <h4 className="font-semibold text-gray-800">{entry.productName}</h4>
    //             <span className="text-sm text-gray-500">{entry.timestamp}</span>
    //           </div>
    //           <div className="grid grid-cols-2 gap-4 text-sm">
    //             <div>
    //               <span className="text-gray-600">Amount:</span>
    //               <p className="font-medium text-green-600">₹{entry.amount}</p>
    //             </div>
    //             <div>
    //               <span className="text-gray-600">UPI ID:</span>
    //               <p className="font-medium text-gray-800">{entry.upiId}</p>
    //             </div>
    //           </div>
    //           <div className="mt-2 flex items-center text-green-600">
    //             <CheckCircle className="w-4 h-4 mr-1" />
    //             <span className="text-sm">Payment Received</span>
    //           </div>
    //         </div>
    //       )}
    //     </div>
    //   ))}
    // </div>
    <div>
      {scanningkHistory.map((item, i) => (
        <div key={i} className="mb-6">
          <h3 className="font-semibold text-gray-400 mb-3">
            {moment(item.dateCreated).format("DD MMM, hh:mm a")}
          </h3>
          {/* {section.items.map((item, i) => ( */}
          <div
            key={i}
            className="bg-white rounded-lg shadow-sm border  p-4 flex items-start mb-3"
          >
            {/* <img
                src={item.logo}
                alt={item.merchant}
                className="w-8 h-8 mr-3"
              /> */}
            <div className="flex-1">
              <p className="text-sm font-bold text-blue-800">{item.trans_id}</p>
              <p className="text-xs text-gray-500">{item.transactionRemark}</p>
            </div>
            <div className="text-right">
              <p className={"font-semibold  text-green-600"}>₹{item.credit}</p>
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>
          </div>
          {/* ))} */}
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
