export const timeToMinutes: (hours: number, minutes: number) => number = (
  hours,
  minutes
) => {
  if (hours < 0 || minutes < 0) return -1;
  return hours * 60 + minutes;
};

export const minutesToFormTime: (
  preparation_time_minutes: number,
  cooking_time_minutes: number
) => {
  cookingHours: number;
  cookingMinutes: number;
  preparationHours: number;
  preparationMinutes: number;
} = (preparation_time_minutes, cooking_time_minutes) => {
  const preparationHours = Math.floor(preparation_time_minutes / 60);
  const preparationMinutes = preparation_time_minutes % 60;
  const cookingHours = Math.floor(cooking_time_minutes / 60);
  const cookingMinutes = cooking_time_minutes % 60;
  return {
    cookingHours,
    cookingMinutes,
    preparationHours,
    preparationMinutes,
  };
};

export const minutesToReadableTime: (minutes: number) => string = (minutes) => {
  if (minutes <= 0) return "0 minutes";
  const hours = Math.floor(minutes / 60);
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
