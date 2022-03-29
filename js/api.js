import {body} from './full-size-modal.js';
import {showAlert} from './util.js';

const succesTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


const getData = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((similarPictures) => {
      if (similarPictures.ok) {
        onSuccess(similarPictures());
      } else {
        onFail(showAlert('Невозможно загрузить изображения!'));
      }
    })
    .catch(() => {
      onFail(showAlert('Невозможно загрузить изображения!'));
    });
};

const createSuccessMessage = function () {
  const succesElement = succesTemplate.cloneNode(true);
  succesElement.querySelector('.success__inner');
  succesElement.querySelector('.success__title');
  succesElement.querySelector('.success__button');

  body.appendChild(succesElement);
};

const createErrorMessage = function () {
  const errorElement = errorTemplate.cloneNode(true);
  errorElement.querySelector('.error__inner');
  errorElement.querySelector('.error__title');
  errorElement.querySelector('.error__button');

  body.appendChild(errorElement);
};


const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://25.javascript.pages.academy/kekstagra',
    {
      method: 'POST',
      type: 'multipart/form-data',
      body,
    }
  )
    .then((response) => {
      if (response.ok) {
        onSuccess(createSuccessMessage());
      } else {
        onFail(createErrorMessage());
      }
    })
    .catch(() => {
      onFail(createErrorMessage());
    });
};

export {getData, sendData};
