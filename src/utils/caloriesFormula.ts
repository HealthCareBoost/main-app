// Calorie intake

// W is body weight in kg
// H is body height in cm
// A is age
// F is body fat in percentage

// Mifflin-St Jeor Equation:
// For men:
// BMR = 10W + 6.25H - 5A + 5
// For women:
// BMR = 10W + 6.25H - 5A - 161

// Revised Harris-Benedict Equation:
// For men:
// BMR = 13.397W + 4.799H - 5.677A + 88.362
// For women:
// BMR = 9.247W + 3.098H - 4.330A + 447.593

// Katch-McArdle Formula:
// BMR = 370 + 21.6(1 - F)W

// BMR * activity level coef
// sedentary - 1.2
// lightly active - 1.375
// moderately active - 1.55
// very active - 1.725
// extremly active - 1.9

type FNInput = {
  weight: number;
  height: number;
  age: number;
  biological_gender: "W" | "M";
  activityLevel:
    | "Sedentary"
    | "Lightly Active"
    | "Moderately Active"
    | "Very Active"
    | "Extremely Active";
};

export const ActivityLevelMap = {
  sedentary: 1.2,
  lightly: 1.375,
  moderately: 1.55,
  very: 1.725,
  extremely: 1.9,
};

export const calculateCalories: (input: FNInput) => number = ({
  weight,
  activityLevel,
  age,
  biological_gender,
  height,
}) => {
  if (weight < 0 || height < 0 || age < 0) return 0;
  const multiplier =
    ActivityLevelMap[activityLevel as keyof typeof ActivityLevelMap];

  if (biological_gender === "M") {
    return (10 * weight + 6.25 * height - 5 * age + 5) * multiplier;
  } else {
    return (10 * weight + 6.25 * height - 5 * age - 161) * multiplier;
  }
};
