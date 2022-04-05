//import './data.js';
import './thumbnail-rendering.js';
import './user-form.js';
import './api.js';
import {getData} from './api.js';
import {renderSimilarListPictures} from './thumbnail-rendering.js';

getData((similarPictures) => {
  renderSimilarListPictures(similarPictures);
});

