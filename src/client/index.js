import { handleSubmit } from './js/formHandler';
import { minDate } from './js/inputDate';

import './styles/stylesheet.scss';


window.addEventListener('DOMContentLoaded', () => {
  minDate();
  document.getElementById('submitBtn').addEventListener('click', handleSubmit);
});

export {
  handleSubmit,
  minDate
 }
