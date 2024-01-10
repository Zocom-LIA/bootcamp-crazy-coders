import { OrderType } from '@zocom/types';
import { useData as useHookData } from '@zocom/fetch-hook';

export type OrdersRepsonse = OrderType[];

export const useData = () => {
  const TOKEN = localStorage.getItem('AccessToken');

  const { useFetch } = useHookData();

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
