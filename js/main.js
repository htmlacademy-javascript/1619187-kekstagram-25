const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = [
  'Иван',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Анастасия',
  'Елена',
  'Сергей',
];

const DESCRIPTIONS = [
  'Небольшая площадь',
  'Красивая дорога',
  'Закат на море — это самый красивый закат на всей планете',
  'Горы – это необычайно красивое творение природы',
  'Да, еще одно фото',
];

const getRandomNumber = function (min, max) {
  if (max <= min || min < 0 || max < 0) {
    return false;
  }
  const ROUNDED_TO_TOP = Math.ceil(min);
  const ROUNDED_TO_BOTTOM = Math.floor(max);
  return Math.floor(Math.random() * (ROUNDED_TO_BOTTOM - ROUNDED_TO_TOP + 1)) + ROUNDED_TO_TOP;
};

const isLessThanMax = function (str, maxLength) {
  return (str.length <= maxLength);
};

isLessThanMax();

// id
const randomIdCreator = () => {
  const IDS = [];

  return () => {
    if (IDS.length === 25) {
      return null;
    }

    let randomId = getRandomNumber(1, 25);

    if (IDS.includes(randomId) ) {
      randomId = getRandomNumber(1, 25);
    }

    IDS.push(randomId);

    return randomId;
  };
};

const getRandomId = randomIdCreator();
const getRandomId2 = randomIdCreator();

//url

const getRandomUrl = () => {
  const NUM_FOTO = getRandomId2();
  return `photos/${NUM_FOTO}.jpg`;
};


//likes

const getRandomLikes = function () {
  return getRandomNumber(15, 200);
};

//comments
//commentsId

const commentsIdCreator = () => {
  const IDS = [];

  return () => {

    let randomId = getRandomNumber(1, 2**53-1); //У каждого комментария есть id — случайное число. А есть какой-то диапазон? Пока поставила максимальное целое.

    if (IDS.includes(randomId) ) {
      randomId = getRandomNumber(1, 2**53-1); //тоже самое
    }

    IDS.push(randomId);

    return randomId;
  };
};

const getRandomIdComment = commentsIdCreator();

//avatar

const getRandomAvatar = function () {
  const NUM_AVATAR = getRandomNumber(1, 6);
  return `img/avatar-${NUM_AVATAR}.svg`;
};

//messages, names, descriptions
const getRandomArrayElement = function (elements) {
  return elements[getRandomNumber(0, elements.length - 1)];
};

//create comments

const createComments = function () {
  return {
    id: getRandomIdComment(),
    avatar: getRandomAvatar(),
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};
const SIMILAR_COMMENT_COUNT = 2;
const similarComments = Array.from({length: SIMILAR_COMMENT_COUNT }, createComments);


//photo description
const createPhotoDescription = function () {
  return {
    id: getRandomId(),
    url: getRandomUrl(),
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomLikes(),
    comments: similarComments,
  };
};

const SIMILAR_PHOTO_DESCRIPTION_COUNT = 25;
const similarPhotoDescription = function () {
  return Array.from({length: SIMILAR_PHOTO_DESCRIPTION_COUNT  }, createPhotoDescription);
};
similarPhotoDescription();
