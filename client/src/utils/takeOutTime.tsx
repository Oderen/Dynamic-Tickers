export const takeOutTime = (date: string) => {
  // eslint-disable-next-line
  const [_, time] = date.split(/[T.]/);
  return time;
};
