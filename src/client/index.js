import { handleSubmit } from './js/formHandler';
import { minDate } from './js/inputDate';
import { print } from './js/printTrip';

import './styles/stylesheet.scss';


window.addEventListener('DOMContentLoaded', () => {
  minDate();
  document.getElementById('submitBtn').addEventListener('click', handleSubmit);
  document.getElementById('printBtn').addEventListener('click', print);
  //TODO reset button function
});

export {
  handleSubmit,
  minDate,
  print
 }
