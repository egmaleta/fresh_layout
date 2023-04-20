export const isLayout = (fileName: string) => {
  return /^(_layout\.(tsx|jsx|ts|js))$/.test(fileName);
};

export const is404 = (fileName: string) => {
  return /^(_404\.(tsx|jsx|ts|js))$/.test(fileName);
};

export const is500 = (fileName: string) => {
  return /^(_500\.(tsx|jsx|ts|js))$/.test(fileName);
};

export const isMiddleware = (fileName: string) => {
  return /^(_middleware\.(tsx|jsx|ts|js))$/.test(fileName);
};

export const isApp = (fileName: string) => {
  return /^(_app\.(tsx|jsx|ts|js))$/.test(fileName);
};
