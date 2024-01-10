import { Item } from '@zocom/types';
import { useData as useHookData } from '@zocom/fetch-hook';

type OrderResponse = {
  totalSum: number;
  orderId: string;
  status: string;
  selection: Item[];
  customerId: string;
};

export const useData = () => {
  const { useFetch } = useHookData();

  return {
    useFetchOrder(orderId: string) {
      return useFetch<OrderResponse>(`/order/${orderId}`, {
        headers: {
          'x-api-key': `${import.meta.env.VITE_API_KEY}`,
        },
      });
    },
  };
};
