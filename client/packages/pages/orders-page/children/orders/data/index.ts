import { useEffect, useState } from 'react';
import { OrderType } from '@zocom/types';

export type OrdersRepsonse = OrderType[];

const BASE_URL =
  'https://uciquejkd6.execute-api.eu-north-1.amazonaws.com/api/admin';

const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlNGVkZWExLTEwZTMtNDc0ZS1hZTgyLWU2M2RlZjU2ZGUwYiIsInVzZXJuYW1lIjoiY2hpZWYtY29vayIsImlhdCI6MTcwNDQ0NDIyMSwiZXhwIjoxNzA0NDczMDIxfQ.FFgIMaWJfetEpumEVwi5rZkgyoz2FfaOOoAIJ0LXzqI';

export const useData = () => {
  return {
    useFetchOrders() {
      const [orders, setOrders] = useState<OrdersRepsonse>([]);

      const fetchOrders = async (): Promise<OrdersRepsonse> => {
        try {
          const URL = `${BASE_URL}/orders`;

          const response = await fetch(URL, {
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });

          const data = await response.json();

          return data;
        } catch (error) {
          console.log(error);

          return [];
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          const orders = await fetchOrders();
          setOrders(orders);
        };

        fetchData();
      }, []);

      return orders;
    },

    async updateOrder(orderId: string, customerId: string) {
      try {
        const URL = `${BASE_URL}/order`;

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
