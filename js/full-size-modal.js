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


const generateModal = (data) => {
  const {url, likes, comments, description} = data;
  const commentsState = {
    countRenderComments: 0,
    totalCountComments: comments.length,
    comments,
    step: 5,
  };

  bigImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;
  socialComments.innerHTML = '';

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
  const clickHandler = () => {
    if (commentsState.totalCountComments > commentsState.countRenderComments + commentsState.step) {
      for (let i = commentsState.countRenderComments; i < commentsState.countRenderComments + commentsState.step; i++) {
        renderComments(commentsState.comments[i]);
      }
      commentsState.countRenderComments = commentsState.countRenderComments + commentsState.step;
      socialCommentsCount.textContent = `${commentsState.countRenderComments} из ${commentsState.totalCountComments} комментариев`;
    } else {
      for (let i = commentsState.countRenderComments; i < commentsState.totalCountComments; i++) {
        renderComments(commentsState.comments[i]);
      }
      commentsState.countRenderComments = commentsState.totalCountComments;
      socialCommentsCount.textContent = `${commentsState.countRenderComments} из ${commentsState.totalCountComments} комментариев`;
    }

  };
  commentsLoader.addEventListener('click', clickHandler);

  if (commentsState.totalCountComments > commentsState.countRenderComments + commentsState.step) {
    for (let i = commentsState.countRenderComments; i < commentsState.countRenderComments + commentsState.step; i++) {
      renderComments(commentsState.comments[i]);
    }
    commentsState.countRenderComments = commentsState.countRenderComments + commentsState.step;
    socialCommentsCount.textContent = `${commentsState.countRenderComments} из ${commentsState.totalCountComments} комментариев`;
  } else {
    for (let i = commentsState.countRenderComments; i < commentsState.totalCountComments; i++) {
      renderComments(commentsState.comments[i]);
    }
    commentsState.countRenderComments = commentsState.totalCountComments;
    socialCommentsCount.textContent = `${commentsState.countRenderComments} из ${commentsState.totalCountComments} комментариев`;
  }
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
};

const openUserModal = function () {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onPopupEscKeydown);
};

const closeUserModal = function () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
};

closeButton.addEventListener('click', () => {
  closeUserModal();
});


export {generateModal, openUserModal, body};
