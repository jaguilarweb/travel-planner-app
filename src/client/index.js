import { handleSubmit } from './js/formHandler';
import { deleteSubmit } from './js/deleteResult';
import { minDate } from './js/inputDate';
import { print } from './js/printTrip';

import './styles/stylesheet.scss';

window.addEventListener('DOMContentLoaded', () => {
  minDate();
  document.getElementById('submitBtn').addEventListener('click', handleSubmit);
  document.getElementById('resetBtn').addEventListener('click', deleteSubmit);
  document.getElementById('printBtn').addEventListener('click', print);
});

export {
  handleSubmit,
  minDate,
  print,
  deleteSubmit
}
