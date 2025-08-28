export const generateMockQRData = (role) => {
  if (role === 'distributor') {
    return {
      id: `PROD-${Date.now()}`,
      name: `Product ${Math.floor(Math.random() * 100)}`,
      price: Math.floor(Math.random() * 1000) + 100,
      quantity: Math.floor(Math.random() * 50) + 1
    };
  } else {
    return {
      productName: `Item ${Math.floor(Math.random() * 100)}`,
      price: Math.floor(Math.random() * 500) + 50,
      amount: Math.floor(Math.random() * 1000) + 100
    };
  }
};

export const MOCK_OTP = '1234';