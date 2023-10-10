export const setTime = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};
