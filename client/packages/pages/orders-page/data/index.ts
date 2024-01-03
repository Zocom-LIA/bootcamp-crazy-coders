import { OrderType } from '@zocom/types';

export type OrdersRepsonse = OrderType[];

export const useData = () => {
  return {
    async fetchOrders(): Promise<OrdersRepsonse> {
      const token =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlNGVkZWExLTEwZTMtNDc0ZS1hZTgyLWU2M2RlZjU2ZGUwYiIsInVzZXJuYW1lIjoiY2hpZWYtY29vayIsImlhdCI6MTcwNDE5NjkzMCwiZXhwIjoxNzA0MjI1NzMwfQ.fYZOmTAgsvbbSG1c0moARoJOHBPXdba2QlNXHwhRx7g';

      try {
        const URL =
          'https://uciquejkd6.execute-api.eu-north-1.amazonaws.com/api/admin/orders/assigned';

        const response = await fetch(URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const jsonData = await response.json();
        return jsonData;
      } catch (error) {
        console.log(error);
        return [];
      }
    },
  };
};
