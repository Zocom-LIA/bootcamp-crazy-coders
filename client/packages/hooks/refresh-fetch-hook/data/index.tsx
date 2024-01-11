import { useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';

export const useData = () => {
  return {
    useRefreshFetch<T>(fetcher: [T, () => void]) {
      const [data, refetch] = fetcher;
      const [refresh, setRefresh] = useState(false);

      useWebSocket(import.meta.env.VITE_WS_URL, {
        onMessage(event) {
          if (event.data === 'refresh-data') {
            setRefresh(!refresh);
          }
        },
      });

      useEffect(() => refetch(), [refresh]);

      return data;
    },
  };
};
