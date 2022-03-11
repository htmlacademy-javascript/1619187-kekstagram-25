const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigImage = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const socialComments = bigPicture.querySelector('.social__comments');

const closeButton = bigPicture.querySelector('.big-picture__cancel');

const generateModal = (data) => {
  const {url, likes, comments, description} = data;

  bigImage.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialCaption.textContent = description;

  comments.forEach(({avatar, message, name}) => {
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
  });

  bigPicture.classList.remove('hidden');
  const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
  socialCommentsCount.classList.add('hidden');
  const commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
  body.classList.add('modal-open');
};

closeButton.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

export {generateModal};
