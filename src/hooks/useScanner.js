import { useState, useRef } from 'react';
import { generateMockQRData } from '../utils/mockData';

export const useScanner = () => {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const startScanning = async () => {
    try {
      setError('');
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setScanning(true);
    } catch (err) {
      setError('Camera access denied or unavailable');
    }
  };

  const stopScanning = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setScanning(false);
  };

  const simulateQRScan = (role) => {
    return generateMockQRData(role);
  };

  return { scanning, error, videoRef, startScanning, stopScanning, simulateQRScan };
};