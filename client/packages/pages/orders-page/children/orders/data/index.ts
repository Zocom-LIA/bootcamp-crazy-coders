import { OrderType } from '@zocom/types';

export type OrdersRepsonse = OrderType[];

export const useData = () => {
  return {
    async fetchOrders(): Promise<OrdersRepsonse> {
      try {
        const token =
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlNGVkZWExLTEwZTMtNDc0ZS1hZTgyLWU2M2RlZjU2ZGUwYiIsInVzZXJuYW1lIjoiY2hpZWYtY29vayIsImlhdCI6MTcwNDI3MDQ0OSwiZXhwIjoxNzA0Mjk5MjQ5fQ.tEJqO25gBDNtRoPpY7BVhhEHGqP95mU-yk_bOpS7tlU        ';

        const URL =
          'https://uciquejkd6.execute-api.eu-north-1.amazonaws.com/api/admin/orders';

        const response = await fetch(URL, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        return data;
      } catch (error) {
        console.log(error);

        return [];
      }
    },
  };
};
