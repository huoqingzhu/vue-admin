/**
 * 生产范围随机数
 * @param min
 * @param max
 * @returns
 */
export const randomNum = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min) + min);
};
/**
 * 生成随机颜色
 * @param min
 * @param max
 * @returns rgb
 */
export const randomColor = (min: number, max: number): string => {
  let r = randomNum(min, max);
  let g = randomNum(min, max);
  let b = randomNum(min, max);
  return "rgb(" + r + "," + g + "," + b + ")";
};
