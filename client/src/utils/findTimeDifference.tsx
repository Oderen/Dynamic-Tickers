export {};

const timeToMilliseconds = (timeString: string): number => {
  const [hours, minutes, seconds] = timeString.split(':').map(Number);
  return hours * 3600 * 1000 + minutes * 60 * 1000 + seconds * 1000;
};

export const findTimeDifference = (
  prevTime: string,
  currentTime: string
): number => {
  const differenceInMs =
    timeToMilliseconds(currentTime) - timeToMilliseconds(prevTime);
  const differenceInSeconds = differenceInMs / 1000;
  return differenceInSeconds;
};
