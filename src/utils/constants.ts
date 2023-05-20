export const Constants = {
  DEFAULT_SELECT_NUMBER: 12,
  MAX_SELECT_NUMBER: 90,
  MONTH_WEEKS: 5,
  DAYS_WEEK: 7,
} as const;

export const WindowSizes = {
  xs: 480,
  ss: 620,
  sm: 768,
  md: 1060,
  lg: 1200,
  xl: 1700,
} as const;

export const WEEK_DAYS = [
  { name: "Monday", short: "Mon" },
  { name: "Tuesday", short: "Tue" },
  { name: "Wednesday", short: "Wed" },
  { name: "Thursday", short: "Thu" },
  { name: "Friday", short: "Fri" },
  { name: "Saturday", short: "Sat" },
  { name: "Sunday", short: "Sun" },
] as const;
