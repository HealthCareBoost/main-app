export const timeToMinutes: (hours: number, minutes: number) => number = (
  hours,
  minutes
) => {
  if (hours < 0 || minutes < 0) return -1;
  return hours * 60 + minutes;
};

export const minuteToReadableTime: (minutes: number) => string | undefined = (
  minutes
) => {
  if (minutes <= 0) return;
  const hours = Math.round(minutes / 60);
  const minutesLeft = minutes % 60;
  let str = ``;
  if (hours > 0) {
    str += `${hours} ${hours === 1 ? "hour" : "hours"}`;
    if (minutesLeft > 0) {
      str += ` and ${minutesLeft} ${minutesLeft === 1 ? "minute" : "minutes"}`;
    }
  } else if (minutesLeft > 0) {
    str += `${minutesLeft} ${minutesLeft === 1 ? "minute" : "minutes"}`;
  }

  return str;
};
