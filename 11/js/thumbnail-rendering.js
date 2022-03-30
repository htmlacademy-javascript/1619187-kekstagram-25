import {generateModal, openUserModal} from './full-size-modal.js';

const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarListElement = document.querySelector('.pictures');

const renderSimilarListPictures = function (similarPictures) {
  const similarListFragment = document.createDocumentFragment();

  similarPictures.forEach((data) => {
    const {url, likes, comments} = data;
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    pictureElement.addEventListener('click', () => {
      generateModal(data);
      openUserModal();
    });
    similarListFragment.appendChild(pictureElement);
  });

  similarListElement.appendChild(similarListFragment);
};

export {renderSimilarListPictures};
