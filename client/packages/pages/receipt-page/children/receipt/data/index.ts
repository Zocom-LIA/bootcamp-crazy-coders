export const getReceiptData = () => {
  return {
    async fetchReceipt(orderId: string) {
      try {
        const URL = `https://m36aao3akl.execute-api.eu-north-1.amazonaws.com/api/receipt?orderId=${orderId}`;
        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error(`Failed to fetch receipt. Status: ${response.status}`);
        }

        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.error('Error fetching receipt:', error);
        throw error; // Re-throw the error to be caught by the calling code
      }
    },
  };
};
