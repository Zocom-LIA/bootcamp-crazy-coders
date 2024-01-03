export const getMenuData = () => {
  return {
    async fetchMenu() {
      try {
          const URL = "https://m36aao3akl.execute-api.eu-north-1.amazonaws.com/api/menu";
          const response = await fetch(URL, {
            method: 'GET', // Specify the HTTP method (GET in this case)
            headers: {
              'Content-Type': 'application/json', // Example of a common header
              'x-api-key': "df6fdea1-10c3-474c-ae62-e63def80de0b", // Add your API key header
            },
          });
          const jsonData = await response.json()
          return jsonData;
        } catch (error) {
          console.log(error);
      }
    },
  };
};
