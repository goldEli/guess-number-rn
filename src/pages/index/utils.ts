import { NUMBER_RANGE } from "./config";

export const getRandomNumbers = (): number[] => {
  const blueBalls = getBallNumbers(5, NUMBER_RANGE[0]);

  const yellowBalls = getBallNumbers(2, NUMBER_RANGE[1]);

  console.log({ blueBalls, yellowBalls });

  return [...blueBalls, ...yellowBalls];
};

export const getRandomId = (): number => {
  return parseInt(Math.random() * 10000000 + "");
};

export const getDoubleColorRandomNumbers = () => {
  const blueBalls = getBallNumbers(6, NUMBER_RANGE[0]);

  const yellowBalls = getBallNumbers(1, NUMBER_RANGE[1]);

  console.log({ blueBalls, yellowBalls });

  return [...blueBalls, ...yellowBalls];
};

export const checkWinNum = (
  result: number[],
  myNums: number[],
  index: number
): boolean => {
  const len = result?.length;
  if (len != 7) {
    return false;
  }
  if (index < 5) {
    return result.slice(0, 5).includes(myNums[index]);
  } else {
    return result.slice(5).includes(myNums[index]);
  }
};

function getBallNumbers(
  len: number,
  range: [number, number],
  selected: number[] = []
): number[] {
  if (selected.length === len) {
    return selected.sort((a, b) => a - b);
  }

  // 不能重复
  let num = getRandomInt(...range);
  while (selected.includes(num)) {
    num = getRandomInt(...range);
  }

  return getBallNumbers(len, range, [...selected, num]);
}

function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function classnames(
  classes: string[] | string,
  obj: { [key in string]: boolean }
): string {
  let str = "";

  if (typeof classes === "string") {
    str = classes;
  } else if (Array.isArray(classes)) {
    str = classes.join("");
  }

  for (let key in obj) {
    if (obj[key]) {
      str += ` ${key}`;
    }
  }
  return str;
}
