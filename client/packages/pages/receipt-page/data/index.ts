export const getReceiptData = () => {
  return {
    async fetchReceipt(orderId: string) {
      try {
        const URL = `${
          import.meta.env.VITE_API_URL
        }/receipt?orderId=${orderId}`;
        const response = await fetch(URL);
        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.log(error);
      }
    },
  };
};
