export const removeTimezoneOffset: (date: Date) => Date = (date) => {
  const userTimezoneOffset = date.getTimezoneOffset() * 60000;
  return new Date(date.getTime() - userTimezoneOffset);
};
