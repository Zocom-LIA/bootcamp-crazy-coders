type Order = {
  customerId?: string;
  orderId?: string;
  totalSum: number;
  selection: Cart;
};

type Cart = {
  count: number;
  name: string;
  totalPrice: number;
}[];

export const postOrder = async (order: Order) => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': `${import.meta.env.VITE_API_KEY}`,
      },
      body: JSON.stringify(order),
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
