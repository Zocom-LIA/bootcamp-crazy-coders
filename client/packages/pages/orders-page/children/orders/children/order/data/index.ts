import dayjs from 'dayjs';

export const useData = () => {
  return {
    timeDifference(start: string, end: string): string {
      const diff = dayjs(end).diff(start, 's');

      const minutes = Math.floor(diff / 60);
      const seconds = Math.floor(diff - minutes * 60);

      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
        2,
        '0'
      )}`;
    },
  };
};
