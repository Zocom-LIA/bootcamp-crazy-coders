import { useState, useEffect } from 'react';

export const useData = () => {
  return {
    useStateRestorer<T>(
      startValue: T,
      timeInMs: number
    ): [T, React.Dispatch<React.SetStateAction<T>>] {
      const [state, setState] = useState<T>(startValue);

      useEffect(() => {
        if (state !== startValue) {
          const interval = setInterval(() => setState(startValue), timeInMs);
          return () => clearInterval(interval);
        }
      }, [state]);

      return [state, setState];
    },
  };
};
