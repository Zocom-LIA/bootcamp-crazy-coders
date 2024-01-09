import { useEffect, useState } from 'react';

export const useData = () => {
  return {
    useFetch<T>(endpoint: string, init?: RequestInit): [T, () => void] {
      const [data, setData] = useState<T>();
      const [refetch, setRefetch] = useState(false);

      const fetcher = async (): Promise<T | undefined> => {
        try {
          const URL = `${import.meta.env.VITE_API_URL}${endpoint}`;

          const response = await fetch(URL, init);
          const data = await response.json();

          return data;
        } catch (error) {
          console.log(error);
        }
      };

      useEffect(() => {
        const fetchData = async () => {
          const data = await fetcher();
          setData(data);
        };

        fetchData();
      }, [refetch]);

      return [data as T, () => setRefetch(!refetch)];
    },
  };
};
