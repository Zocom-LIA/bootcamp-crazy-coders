export const getMenuData = () => {
  return {
    async fetchMenu() {
      try {
        const URL = 'https://api.jsonbin.io/v3/b/6582ed781f5677401f10d131';
        const response = await fetch(URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.log(error);
      }
    },
  };
};
