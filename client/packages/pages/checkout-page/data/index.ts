type Order = {
  customerId?: string;
  totalSum: number;
  selection: Cart;
};

type Cart = {
  count: number;
  name: string;
  totalPrice: number;
}[];

export const postOrder = async (order: Order) => {
  console.log(order);
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
