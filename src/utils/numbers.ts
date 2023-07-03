export function roundNumber(num: number, decimalPoints: number): number {
  const factor = 10 ** decimalPoints;
  const roundedNum = Math.round(num * factor) / factor;
  return roundedNum;
}
