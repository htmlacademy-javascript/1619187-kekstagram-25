//import './data.js';
import './thumbnail-rendering.js';
import './user-form.js';
import './api.js';
import {getData} from './api.js';
import {renderSimilarListPictures} from './thumbnail-rendering.js';
import {setUserFormSubmit, closeUserForm} from './user-form.js';

getData((similarPictures) => {
  renderSimilarListPictures(similarPictures);
});
setUserFormSubmit(closeUserForm);
