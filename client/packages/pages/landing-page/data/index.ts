export const getMenuData = () => {
  return {
    async fetchMenu() {
      try {
          const URL = "https://m36aao3akl.execute-api.eu-north-1.amazonaws.com/api/menu";
          const response = await fetch(URL, {
            method: 'GET',
          });
          const response = await fetch(URL);
          const jsonData = await response.json();
          return jsonData;
        } catch (error) {
          console.log(error);
      }
    },
  };
};
