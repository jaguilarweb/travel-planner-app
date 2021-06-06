import { handleSubmit } from './js/formHandler';
import { deleteSubmit } from './js/deleteResult';
import { minDate } from './js/inputDate';
import { print } from './js/printTrip';

import './styles/stylesheet.scss';

window.addEventListener('DOMContentLoaded', () => {
  minDate();
  document.getElementById('submit-btn').addEventListener('click', handleSubmit);
  document.getElementById('reset-btn').addEventListener('click', deleteSubmit);
  document.getElementById('print-btn').addEventListener('click', print);
});

export {
  handleSubmit,
  minDate,
  print,
  deleteSubmit
}
