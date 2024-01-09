import { OrderType } from '@zocom/types';
import { useData as uesHookData } from '@zocom/fetch-hook';

export type OrdersRepsonse = OrderType[];

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlNGVkZWExLTEwZTMtNDc0ZS1hZTgyLWU2M2RlZjU2ZGUwYiIsInVzZXJuYW1lIjoiY2hpZWYtY29vayIsImlhdCI6MTcwNDc0ODA1MiwiZXhwIjoxNzA0Nzc2ODUyfQ.S_wPZ3BTrgx0tDwsww3jU22TKo8JeFyetjTJVjcg-cA';

export const useData = () => {
  const { useFetch } = uesHookData();

  return {
    useFetchOrders() {
      return useFetch<OrdersRepsonse>('/admin/orders', {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });
    },

    async updateOrder(orderId: string, customerId: string) {
      try {
        const URL = `${import.meta.env.VITE_API_URL}/admin/order`;

        await fetch(URL, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${TOKEN}`,
          },
          body: JSON.stringify({ orderId, customerId }),
        });
      } catch (error) {
        console.log(error);
      }
    },
  };
};
