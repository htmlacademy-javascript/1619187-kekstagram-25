import './thumbnail-rendering.js';
import './user-form.js';
import './api.js';
import {getData} from './api.js';
import {renderSimilarListPictures} from './thumbnail-rendering.js';
import {showAlert} from './util.js';

getData(renderSimilarListPictures, showAlert);

