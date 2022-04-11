const getRandomNumber = function (min, max) {
  if (max <= min || min < 0 || max < 0) {
    return false;
  }
  const ROUNDED_TO_TOP = Math.ceil(min);
  const ROUNDED_TO_BOTTOM = Math.floor(max);
  return Math.floor(Math.random() * (ROUNDED_TO_BOTTOM - ROUNDED_TO_TOP + 1)) + ROUNDED_TO_TOP;
};

// const isLessThanMax = function (str, maxLength) {
//   return (str.length <= maxLength);
// };


const getRandomArrayElement = function (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
};

const isEscapeKey = (evt) => evt.key === 'Escape';


const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.className = 'alert';
  alertContainer.textContent = message;

  document.body.append(alertContainer);


  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}
export {getRandomArrayElement,getRandomNumber, isEscapeKey, showAlert, debounce};
