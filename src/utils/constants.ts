export const Constants = {
  DEFAULT_SELECT_NUMBER: 12,
  COMMENTS_SELECT_NUMBER: 50,
  MAX_SELECT_NUMBER: 90,
  MAX_SEARCH: 5,
  MONTH_WEEKS: 5,
  DAYS_WEEK: 7,
  MIN_NAME: 3,
  MAX_NAME: 50,
  MIN_QUANTITY: 0.01,
  MIN_DESCRIPTION: 15,
  MAX_DESCRIPTION: 1000,
  MAX_DESCRIPTION_SENTENCES: 10,
  LOADING_SPINNER_SIZE_PX: 128,
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

export const CAROUSEL_TYPE: "embla" | "swiper" = "embla";
