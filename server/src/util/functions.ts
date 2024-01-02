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
