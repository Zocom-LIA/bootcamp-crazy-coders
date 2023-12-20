export const getMenuData = () => {
  return {
    async fetchMenu(){
      try {
        const URL = "urlToAws";
        const response = await fetch(URL);
        return await response.json();
      } catch (error) {
        console.error(error);
      }
    },
  };
};
