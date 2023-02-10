export const getRandomInteger = (minimum: number, maximum: number) => {
  if (maximum === undefined) {
    maximum = minimum;
    minimum = 0;
  }

  return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
};
