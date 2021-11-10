export const MAP_RULES: {
  condition: [number, number][];
  result: number;
  money?: number;
}[] = [
  {
    result: 1,
    condition: [[5, 2]]
  },
  {
    result: 2,
    condition: [[5, 1]]
  },
  {
    result: 3,
    money: 10000,
    condition: [[5, 0]]
  },
  {
    result: 4,
    money: 3000,
    condition: [[4, 2]]
  },
  {
    result: 5,
    money: 300,
    condition: [[4, 1]]
  },
  {
    result: 6,
    money: 200,
    condition: [[3, 2]]
  },
  {
    result: 7,
    money: 100,
    condition: [[4, 0]]
  },
  {
    result: 8,
    money: 15,
    condition: [
      [3, 1],
      [2, 2]
    ]
  },
  {
    result: 9,
    money: 5,
    condition: [
      [3, 0],
      [1, 2],
      [2, 1],
      [0, 2]
    ]
  }
];

export const NUMBER_RANGE: [number, number][] = [
  [1, 35],
  [1, 12]
];
export const DOUBLE_COLOR_BALL_RANGE: [number, number][] = [
  [1, 33],
  [1, 16]
];
