export const isLayout = (s: string) => {
  return /^(_layout\.(tsx|jsx|ts|js))$/.test(s);
};

export const is404 = (s: string) => {
  return /^(_404\.(tsx|jsx|ts|js))$/.test(s);
};

export const is500 = (s: string) => {
  return /^(_500\.(tsx|jsx|ts|js))$/.test(s);
};

export const isMiddleware = (s: string) => {
  return /^(_middleware\.(tsx|jsx|ts|js))$/.test(s);
};

export const isApp = (s: string) => {
  return /^(_app\.(tsx|jsx|ts|js))$/.test(s);
};
