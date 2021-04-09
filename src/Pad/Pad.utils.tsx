export const clamp = (min: number, value: number, max: number): number => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};

export const getRelativePosition = (pos: number, size: number): number => {
  return (clamp(0, pos, size) - size / 2) / (size / 2);
};

export const isIn = (min: number, value: number, max: number) => {
  if (value < min) return false;
  if (value > max) return false;
  return true;
};
