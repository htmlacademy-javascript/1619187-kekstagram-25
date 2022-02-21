const getRandomNumber = function (min, max) {
  if (max <= min || min < 0 || max < 0) {
    return false;
  }
  const ROUNDED_TO_TOP = Math.ceil(min);
  const ROUNDED_TO_BOTTOM = Math.floor(max);
  return Math.floor(Math.random() * (ROUNDED_TO_BOTTOM - ROUNDED_TO_TOP + 1)) + ROUNDED_TO_TOP;
};

getRandomNumber();

const getMaxLength = function (str, maxLength) {
  return (str.length <= maxLength);
};

getMaxLength();
