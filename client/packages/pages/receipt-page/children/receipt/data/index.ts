export const getRecieptData = () => {
    return {
      async fetchReciept() {
        try {
            const URL = "`m36aao3akl.execute-api.eu-north-1.amazonaws.com/api/receipt;";
            const response = await fetch(URL)
            const jsonData = await response.json()
            return jsonData;
          } catch (error) {
            console.log(error);
        }
      },
    };
  };
  