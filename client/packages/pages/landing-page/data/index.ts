export const getMenuData = () => {
  return {
    async fetchMenu() {
      try {
        const URL = `${import.meta.env.VITE_API_URL}/menu`;
        const response = await fetch(URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': import.meta.env.VITE_API_KEY,
          },
        });
        const jsonData = await response.json();
        return jsonData.items;
      } catch (error) {
        console.log(error);
      }
    },
  };
};
