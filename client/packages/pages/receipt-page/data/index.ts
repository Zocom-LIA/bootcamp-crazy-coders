export const getReceiptData = () => {
    return {
      async fetchReceipt(orderId: string) {
        try {
            const URL = `https://m36aao3akl.execute-api.eu-north-1.amazonaws.com/api/receipt?orderId=${orderId}`;
            const response = await fetch(URL)
            const jsonData = await response.json()
            return jsonData;
          } catch (error) {
            console.log(error);
        }
      },
    };
  };
  