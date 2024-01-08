/**
 * Converts time from hours and minutes to total minutes.
 *
 * @function
 * @name timeToMinutes
 *
 * @param {number} hours - The number of hours.
 * @param {number} minutes - The number of minutes.
 *
 * @returns {number} - The total time in minutes, or -1 if either hours or minutes are negative.
 */
export const timeToMinutes: (hours: number, minutes: number) => number = (
  hours,
  minutes
) => {
  if (hours < 0 || minutes < 0) return -1;
  return hours * 60 + minutes;
};

/**
 * Converts total preparation and cooking time in minutes to formatted hours and minutes.
 *
 * @function
 * @name minutesToFormTime
 *
 * @param {number} preparation_time_minutes - Total preparation time in minutes.
 * @param {number} cooking_time_minutes - Total cooking time in minutes.
 *
 * @returns {object} - An object containing formatted hours and minutes
 *                     for cooking and preparation times.
 */
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

/**
 * Converts total minutes to a human-readable time format
 *
 * @function
 * @name minutesToReadableTime
 *
 * @param {number} minutes - Total minutes to be converted
 * @returns {string} - A readable string showing the time
 *
 */
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
