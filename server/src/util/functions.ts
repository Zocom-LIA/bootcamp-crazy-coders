import { IOrderHistoryItem, IOrderItem } from "@src/types";

export const sortOrderBydate = (
  orders: IOrderItem[] | IOrderHistoryItem[] | undefined
) => {
  if (!orders) {
    return;
  }
  orders.sort(({ createdAt: a }, { createdAt: b }) => {
    return a < b ? -1 : a > b ? 1 : 0;
  });
};

export const objectLength = (obj: object | undefined) => {
  if (!obj) {
    return 0;
  }
  if (Object.getPrototypeOf(obj) === Object.prototype) {
    return (
      Object.getOwnPropertyNames(obj).length ||
      Object.getOwnPropertySymbols(obj).length
    );
  }
  return 0;
};

export const calculateSecPassedBetweenDates = (
  startTimeIsoString: string | undefined,
  endTimeIsoString: string | undefined
): number => {
  if (!startTimeIsoString || !endTimeIsoString) {
    return 0;
  }
  let elapsedMilliSec =
    new Date(endTimeIsoString).getTime() -
    new Date(startTimeIsoString).getTime();

  return elapsedMilliSec < 1000 ? 0 : Math.floor(elapsedMilliSec / 1000);
};
