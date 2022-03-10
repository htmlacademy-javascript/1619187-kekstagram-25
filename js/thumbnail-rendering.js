import {similarPhotoDescription} from './data.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarListElement = document.querySelector('.pictures');

const similarPictures = similarPhotoDescription(25);

const similarListFragment = document.createDocumentFragment();

similarPictures.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  similarListFragment.appendChild(pictureElement);
});

similarListElement.appendChild(similarListFragment);
