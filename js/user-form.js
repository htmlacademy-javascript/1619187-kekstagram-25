import {body} from './full-size-modal.js';
import {isEscapeKey} from './util.js';
import './apply-effects.js';
import {sendData} from './api.js';


const inputElement = document.querySelector('#upload-file');
const imageEditingForm = document.querySelector('.img-upload__overlay');
const closeButtonForm = document.querySelector('.img-upload__cancel');
const form = document.querySelector('.img-upload__form');
const hashtagsText = form.querySelector('.text__hashtags');
const descriptionText = form.querySelector('.text__description');
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const picrurePreviev = document.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('.img-upload__submit');

const handleFiles = function () {
  const fileList = this.files;
  inputElement.value = fileList[0].name;
};

const onFormEscKeydown = (evt) => {
  if (isEscapeKey(evt) && evt.target === inputElement) {
    evt.preventDefault();
    imageEditingForm.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const scaleState = {
  step: 25,
  maxValue: 100,
  mainValue: 25,
  defaultValue: 100,
};

const changesScaleMin = function () {
  if (parseInt(scaleControlValue.value, 10) > scaleState.mainValue) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) - scaleState.step} %`;
    picrurePreviev.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
  }
};

const changesScaleMax = function () {
  if (parseInt(scaleControlValue.value, 10) < scaleState.maxValue) {
    scaleControlValue.value = `${parseInt(scaleControlValue.value, 10) + scaleState.step} %`;
    picrurePreviev.style.transform = `scale(${parseInt(scaleControlValue.value, 10)/100})`;
  }
};

const openUserForm = function () {
  imageEditingForm.classList.remove('hidden');
  body.classList.add('modal-open');
  scaleControlValue.value =`${scaleState.defaultValue} %`;

  document.addEventListener('keydown', onFormEscKeydown);
  scaleControlSmaller.addEventListener('click', changesScaleMin);
  scaleControlBigger.addEventListener('click', changesScaleMax);
};

inputElement.addEventListener('change', handleFiles);
inputElement.addEventListener('change', openUserForm);


const closeUserForm = function () {
  imageEditingForm.classList.add('hidden');
  body.classList.remove('modal-open');
  picrurePreviev.className = '';
  picrurePreviev.style.filter = 'none';
  picrurePreviev.style.transform = 'scale(1)';
  hashtagsText.value = '';
  descriptionText.value = '';

  document.removeEventListener('keydown', onFormEscKeydown);
  scaleControlSmaller.removeEventListener('click', changesScaleMin);
  scaleControlBigger.removeEventListener('click', changesScaleMax);
};

closeButtonForm.addEventListener('click', closeUserForm);
closeButtonForm.addEventListener('click', closeUserForm);


//валидатор
const pristine = new Pristine(form, {
  classTo: 'text__label',
  errorTextParent: 'text__label',
  errorTextClass: 'text__label--error-text',
});
const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setUserFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
        },
        () => {
          onFail();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

pristine.addValidator(hashtagsText, (value) => {
  const result = value.split(' ').reduce((acc, hashtag) => {
    if (acc === false) {
      return false;
    }
    if (hashtag.startsWith('#')) {
      return true;
    }
    return false;
  }, true);
  return result;
}, 'Хэш-тег начинается с символа # (решётка)', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  const re = /^[#A-Za-zА-Яа-яЁё0-9 ]{1,}$/;
  const result = re.test(value);
  return result;
}, 'Строка после решётки должна состоять из букв и чисел', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  const result = value.split(' ').reduce((acc, hashtag) => {
    if (acc === false) {
      return false;
    }
    if (hashtag.length < 19) {
      return true;
    }
  }, true);
  return result;
}, 'Максимальная длина одного хэш-тега 20 символов', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  const result = value.toLowerCase().split(' ');
  const arr = [];
  for (let i = 0; i < result.length; i++) {
    if (arr.includes(result[i])) {
      return false;
    }
    arr.push(result[i]);
  }
  return result;
}, 'Один и тот же хэш-тег не может быть использован дважды', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  const result = value.split(' ');
  if (result.length > 5) {
    return false;
  }
  return result;
}, 'Нельзя указать больше пяти хэш-тегов', 2, false);

pristine.addValidator(hashtagsText, (value) => {
  const result = value.split(' ');
  for (let i = 0; i< result.length; i++) {
    if (result[i].length === 1) {
      return false;
    }
  }
  return result;
}, 'Хеш-тег не может состоять только из одной решётки;', 2, false);

export {closeUserForm, setUserFormSubmit};
