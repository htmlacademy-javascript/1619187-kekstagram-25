import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');

const commentsState = {
  countRenderComments: 0,
  step: 5,
};
const step = commentsState.step;
let countRenderComments = commentsState.countRenderComments;

const renderComments = ({avatar, message, name}) => {
  const commentsListItem = document.createElement('li');
  commentsListItem.classList.add('social__comment');
  const commentsPicture = document.createElement('img');
  commentsPicture.classList.add('social__picture');
  commentsPicture.src = avatar;
  commentsPicture.alt = name;
  const commentsText = document.createElement('p');
  commentsText.classList.add('social__text');
  commentsText.textContent = message;

  commentsListItem.append(commentsPicture);
  commentsListItem.append(commentsText);
  socialComments.append(commentsListItem);
};

const onCommentsLoaderClick = () => {
  if (commentsState.totalCountComments > countRenderComments + step) {
    for (let i = countRenderComments; i < countRenderComments + step; i++) {
      renderComments(commentsState.comments[i]);
    }
    countRenderComments = countRenderComments + step;
    socialCommentsCount.textContent = `${countRenderComments} из ${commentsState.totalCountComments} комментариев`;
  } else {
    for (let i = countRenderComments; i < commentsState.totalCountComments; i++) {
      renderComments(commentsState.comments[i]);
    }
    countRenderComments = commentsState.totalCountComments;
    socialCommentsCount.textContent = `${countRenderComments} из ${commentsState.totalCountComments} комментариев`;
  }
  if (countRenderComments === commentsState.totalCountComments) {
    commentsLoader.style.display = 'none';
  }
};

const generateModal = (data) => {
  const {url, likes, comments, description} = data;
  commentsState.comments = comments;
  commentsState.totalCountComments = comments.length;
  countRenderComments = 0;

  if (commentsState.totalCountComments > countRenderComments + step) {
    commentsLoader.style.display = 'block';
  }

  bigImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
  socialComments.innerHTML = '';

  onCommentsLoaderClick();

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openUserModal = () => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUserModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
};

closeButton.addEventListener('click', closeUserModal);


export {generateModal, openUserModal, body};
