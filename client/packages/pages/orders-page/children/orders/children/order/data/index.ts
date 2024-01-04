import dayjs from 'dayjs';
import { useState, useEffect } from 'react';

export const useData = () => {
  return {
    timeDifference(start: string, end: string): string {
      const diff = dayjs(end).diff(start, 's');

      const minutes = Math.floor(diff / 60);
      const seconds = diff - minutes * 60;

      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
      )}`;
    },

    useRefresher(timeInMs: number) {
      const [refresh, setRefresh] = useState(false);

      useEffect(() => {
        const interval = setInterval(() => setRefresh(!refresh), timeInMs);
        return () => clearInterval(interval);
      }, [refresh]);
    },
  };
};
